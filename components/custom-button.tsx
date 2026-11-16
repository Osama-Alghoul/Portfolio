import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "gold" | "red" | "purple"
  href?: string
  external?: boolean
  children: React.ReactNode
}

export function CustomButton({
  variant = "default",
  href,
  external = false,
  className,
  children,
  ...props
}: CustomButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:opacity-50"

  // Monochrome system. "gold", "red" and "purple" are kept as aliases so older call sites still work.
  const solid = "bg-brand text-ink hover:bg-brand/85 shadow-[0_0_24px_-8px_var(--brand)]"
  const ghost = "border border-line bg-chip text-fg hover:bg-hover hover:border-brand/40"
  const variantStyles = {
    default: solid,
    gold: solid,
    outline: ghost,
    red: ghost,
    purple: ghost,
  }

  const buttonStyles = cn(baseStyles, variantStyles[variant], className)

  if (href) {
    return (
      <Link
        href={href}
        className={buttonStyles}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </Link>
    )
  }

  return (
    <button className={buttonStyles} {...props}>
      {children}
    </button>
  )
}
