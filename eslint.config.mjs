import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // === Application Performance Rules ===
      "no-implied-eval": "error",           // Prevents slow eval-like logic
      "no-new-wrappers": "error",          // Forces primitive use over slow objects
      "prefer-spread": "warn",              // Modern engines optimize spread better than .apply()

      // React Performance (Requires eslint-plugin-react)
      "react/no-array-index-key": "warn",   // Prevents reconciliation bottlenecks
      "react/jsx-no-constructed-context-values": "error", // Prevents unnecessary sub-tree re-renders
      "react/jsx-key": "error",             // Essential for React's diffing performance

      // === Linting Process Performance (The "Slow" Rules) ===
      // If linting is slow, consider turning these OFF during local dev
      // and only ON during CI/CD or pre-commit hooks.
      "import/no-cycle": "off",             // High CPU/Memory usage (traverses whole tree)
      "import/no-deprecated": "off",        // Very slow on large codebases
      "import/no-unused-modules": "off",    // Significant impact on startup time
    },
  },
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts", ".claude/**"],
  },
];

export default eslintConfig;
