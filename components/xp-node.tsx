"use client";

import React, { useCallback } from "react";
import { usePlayerStore } from "@/lib/store";
import { cn } from "@/lib/utils";

interface XPNodeProps {
  id: string;
  amount: number;
  children: React.ReactNode;
  className?: string;
  onInteraction?: () => void;
}

export function XPNode({
  id,
  amount,
  children,
  className,
  onInteraction,
}: XPNodeProps) {
  const { addXP, collectedXP } = usePlayerStore();
  const isCollected = collectedXP.includes(id);

  const handleInteract = useCallback(() => {
    if (!isCollected) {
      addXP(id, amount);
      if (onInteraction) onInteraction();
    }
  }, [id, amount, isCollected, addXP, onInteraction]);

  return (
    <div onClick={handleInteract} className={cn(className)}>
      {children}
    </div>
  );
}
