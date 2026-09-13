"use client";

import { useEffect } from "react";
import { hexToHslTriplet } from "@/lib/webmcp-color";

const STORAGE_KEY = "webmcp:primaryColor";
const CSS_VARS = ["--gold", "--primary"] as const;

type ToolResult = { content: { type: "text"; text: string }[] };

type ModelContextTool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (input: { color: string }) => Promise<ToolResult> | ToolResult;
};

type ModelContext = {
  registerTool: (
    tool: ModelContextTool,
    options?: { signal?: AbortSignal }
  ) => unknown;
};

function getModelContexts(): ModelContext[] {
  const doc = (document as Document & { modelContext?: ModelContext }).modelContext;
  const nav = (navigator as Navigator & { modelContext?: ModelContext }).modelContext;
  return [...new Set([doc, nav].filter((mc): mc is ModelContext => !!mc))];
}

function applyColor(hsl: string) {
  for (const cssVar of CSS_VARS) {
    document.documentElement.style.setProperty(cssVar, hsl);
  }
}

function clearColor() {
  for (const cssVar of CSS_VARS) {
    document.documentElement.style.removeProperty(cssVar);
  }
}

/**
 * Renders nothing. Exposes a tool (set_primary_color) via the experimental
 * WebMCP API (`document.modelContext`, falling back to the legacy
 * `navigator.modelContext` alias) so a browser agent can restyle the site's
 * accent color for its own session. No-ops entirely in browsers/agents that
 * don't implement the API - no UI is ever shown to a human visitor.
 */
export default function WebmcpColorTool() {
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) applyColor(saved);

    const modelContexts = getModelContexts();
    if (modelContexts.length === 0) return;

    const controller = new AbortController();

    const tool: ModelContextTool = {
      name: "set_primary_color",
      description:
        "Changes this website's primary accent color for the current visitor only. " +
        "Pass a 6-digit hex color (e.g. #3b82f6), or 'reset' to restore the default.",
      inputSchema: {
        type: "object",
        properties: {
          color: {
            type: "string",
            description: "6-digit hex color code, or 'reset'",
          },
        },
        required: ["color"],
      },
      execute({ color }) {
        if (color.trim().toLowerCase() === "reset") {
          localStorage.removeItem(STORAGE_KEY);
          clearColor();
          return {
            content: [{ type: "text", text: "Primary color reset to default." }],
          };
        }

        const hsl = hexToHslTriplet(color);
        if (!hsl) {
          return {
            content: [
              {
                type: "text",
                text: `"${color}" isn't a valid 6-digit hex color.`,
              },
            ],
          };
        }

        localStorage.setItem(STORAGE_KEY, hsl);
        applyColor(hsl);
        return {
          content: [{ type: "text", text: `Primary color updated to ${color}.` }],
        };
      },
    };

    for (const modelContext of modelContexts) {
      modelContext.registerTool(tool, { signal: controller.signal });
    }

    return () => controller.abort();
  }, []);

  return null;
}
