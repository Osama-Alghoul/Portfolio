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
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"

  const variantStyles = {
    default: "bg-blue-600 hover:bg-blue-700 text-white",
    outline: "border border-gold text-gold hover:bg-gold/10 bg-transparent",
    gold: "bg-gold hover:bg-gold/90 text-black",
    red: "bg-red-600 hover:bg-red-700 text-white",
    purple: "bg-purple-600 hover:bg-purple-700 text-white",
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
