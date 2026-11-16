"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  alt: boolean
}

/** Parses "rgb(r, g, b)" or "#rrggbb" into "r, g, b". */
function toRgb(color: string, fallback: string): string {
  const c = color.trim()
  const rgb = c.match(/rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/)
  if (rgb) return `${rgb[1]}, ${rgb[2]}, ${rgb[3]}`
  const hex = c.match(/^#([0-9a-f]{6})$/i)
  if (hex) {
    const n = parseInt(hex[1], 16)
    return `${n >> 16}, ${(n >> 8) & 255}, ${n & 255}`
  }
  return fallback
}

/**
 * Quiet particle network tinted with the site accent (--brand / --brand-2). Fills its positioned parent (not the window),
 * pauses when off-screen and stays still for prefers-reduced-motion.
 */
export default function ElectronicBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    const ctx = canvas?.getContext("2d")
    if (!canvas || !parent || !ctx) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    let particles: Particle[] = []
    let frame = 0
    let visible = true
    let frameCount = 0
    let brand = "96, 165, 250"
    let brand2 = "129, 140, 248"
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement)
      brand = toRgb(cs.getPropertyValue("--brand"), brand)
      brand2 = toRgb(cs.getPropertyValue("--brand-2"), brand2)
    }

    const seed = () => {
      const count = Math.min(Math.floor((width * height) / 9000), 90)
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.2 + 0.6,
        alpha: Math.random() * 0.45 + 0.2,
        alt: Math.random() < 0.3,
      }))
    }

    const resize = () => {
      width = parent.clientWidth
      height = parent.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
      draw()
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.alt ? brand2 : brand}, ${p.alpha})`
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dist = Math.hypot(p.x - q.x, p.y - q.y)
          if (dist < 110) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${brand}, ${0.14 * (1 - dist / 110)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }
      }
    }

    const tick = () => {
      frame = requestAnimationFrame(tick)
      if (!visible) return
      // Follow theme changes (the accent can change at any time).
      if (frameCount++ % 10 === 0) readColors()
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx = -p.vx
        if (p.y < 0 || p.y > height) p.vy = -p.vy
      }
      draw()
    }

    const ro = new ResizeObserver(resize)
    ro.observe(parent)
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
    io.observe(canvas)
    readColors()
    resize()
    if (!reduceMotion) tick()
    // With motion off, still repaint when the theme changes.
    const mo = new MutationObserver(() => {
      readColors()
      setTimeout(() => {
        readColors()
        draw()
      }, 50)
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] })

    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
    />
  )
}
