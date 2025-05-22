"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface AnimatedSvgIconProps {
  type:
    | "design"
    | "responsive"
    | "usability"
    | "performance"
    | "interactive"
    | "integration"
    | "maintenance"
    | "ecommerce"
    | "maps"
  className?: string
}

export function AnimatedSvgIcon({ type, className }: AnimatedSvgIconProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    // Add animation trigger when element is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            svg.classList.add("animate")
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(svg)

    return () => {
      observer.disconnect()
    }
  }, [])

  const renderIcon = () => {
    switch (type) {
      case "design":
        return (
          <svg
            ref={svgRef}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("w-12 h-12", className)}
          >
            <path className="svg-elem-1" d="M12 20h9"></path>
            <path className="svg-elem-2" d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            <path className="svg-elem-3" d="m2 22 3-3"></path>
            <path className="svg-elem-4" d="M18 2 22 6"></path>
          </svg>
        )

      case "responsive":
        return (
          <svg
            ref={svgRef}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("w-12 h-12", className)}
          >
            <rect className="svg-elem-1" x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line className="svg-elem-2" x1="8" y1="21" x2="16" y2="21"></line>
            <line className="svg-elem-3" x1="12" y1="17" x2="12" y2="21"></line>
            <path className="svg-elem-4" d="M2 9h20"></path>
          </svg>
        )

      case "usability":
        return (
          <svg
            ref={svgRef}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("w-12 h-12", className)}
          >
            <path className="svg-elem-1" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle className="svg-elem-2" cx="9" cy="7" r="4"></circle>
            <path className="svg-elem-3" d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path className="svg-elem-4" d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        )

      case "performance":
        return (
          <svg
            ref={svgRef}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("w-12 h-12", className)}
          >
            <path className="svg-elem-1" d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"></path>
          </svg>
        )

      case "interactive":
        return (
          <svg
            ref={svgRef}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("w-12 h-12", className)}
          >
            {/* 3D Cube */}
            <path
              className="svg-elem-1"
              d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
            ></path>
            <polyline className="svg-elem-2" points="3.29 7 12 12 20.71 7"></polyline>
            <line className="svg-elem-3" x1="12" y1="22" x2="12" y2="12"></line>
          </svg>
        )

      case "integration":
        return (
          <svg
            ref={svgRef}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("w-12 h-12", className)}
          >
            <rect className="svg-elem-1" x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
            <rect className="svg-elem-2" x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
            <line className="svg-elem-3" x1="6" y1="10" x2="6" y2="14"></line>
            <line className="svg-elem-4" x1="12" y1="10" x2="12" y2="14"></line>
            <line className="svg-elem-5" x1="18" y1="10" x2="18" y2="14"></line>
          </svg>
        )

      case "maintenance":
        return (
          <svg
            ref={svgRef}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("w-12 h-12", className)}
          >
            <path
              className="svg-elem-1"
              d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
            ></path>
          </svg>
        )

      case "ecommerce":
        return (
          <svg
            ref={svgRef}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("w-12 h-12", className)}
          >
            <circle className="svg-elem-1" cx="9" cy="21" r="1"></circle>
            <circle className="svg-elem-2" cx="20" cy="21" r="1"></circle>
            <path className="svg-elem-3" d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        )

      case "maps":
        return (
          <svg
            ref={svgRef}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("w-12 h-12", className)}
          >
            <circle className="svg-elem-1" cx="12" cy="10" r="3"></circle>
            <path className="svg-elem-2" d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"></path>
          </svg>
        )

      default:
        return null
    }
  }

  return renderIcon()
}
