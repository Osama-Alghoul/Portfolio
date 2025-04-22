"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
}

export default function ElectronicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Create particles
    const particles: Particle[] = []
    const particleCount = Math.min(Math.floor(window.innerWidth / 10), 150)
    const colors = ["rgba(0, 100, 255, 0.5)", "rgba(0, 150, 255, 0.3)", "rgba(255, 215, 0, 0.4)"]

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    // Animation function
    const animate = () => {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Move particles
        p.x += p.vx
        p.y += p.vy

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx = -p.vx
        if (p.y < 0 || p.y > canvas.height) p.vy = -p.vy

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()

        // Connect particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(0, 150, 255, ${0.1 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()

            // Add occasional gold "circuit" connections
            if (Math.random() < 0.001) {
              ctx.beginPath()
              ctx.strokeStyle = `rgba(255, 215, 0, ${0.3 * (1 - distance / 100)})`
              ctx.lineWidth = 1
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.stroke()
            }
          }
        }
      }

      // Draw circuit patterns
      drawCircuitPatterns(ctx, canvas.width, canvas.height)
    }

    // Draw electronic circuit-like patterns
    const drawCircuitPatterns = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const time = Date.now() * 0.001

      // Draw a few random circuit lines that move slowly
      for (let i = 0; i < 5; i++) {
        const x = (Math.sin(time * 0.1 + i) * 0.5 + 0.5) * width
        const y = (Math.cos(time * 0.1 + i * 2) * 0.5 + 0.5) * height

        ctx.beginPath()
        ctx.strokeStyle = i % 2 === 0 ? "rgba(0, 150, 255, 0.2)" : "rgba(255, 215, 0, 0.2)"
        ctx.lineWidth = 1

        // Draw horizontal and vertical lines
        const lineLength = 100 + Math.sin(time + i) * 50

        if (i % 2 === 0) {
          // Horizontal line
          ctx.moveTo(x - lineLength / 2, y)
          ctx.lineTo(x + lineLength / 2, y)
        } else {
          // Vertical line
          ctx.moveTo(x, y - lineLength / 2)
          ctx.lineTo(x, y + lineLength / 2)
        }

        // Add circuit nodes
        ctx.arc(x, y, 3, 0, Math.PI * 2)

        ctx.stroke()
      }

      // Draw pulsing circuit nodes
      for (let i = 0; i < 10; i++) {
        const x = (Math.sin(time * 0.2 + i * 0.5) * 0.5 + 0.5) * width
        const y = (Math.cos(time * 0.2 + i * 0.7) * 0.5 + 0.5) * height
        const pulse = (Math.sin(time * 3 + i) * 0.5 + 0.5) * 5

        ctx.beginPath()
        ctx.arc(x, y, pulse, 0, Math.PI * 2)
        ctx.fillStyle = i % 3 === 0 ? "rgba(255, 215, 0, 0.3)" : "rgba(0, 150, 255, 0.3)"
        ctx.fill()
      }
    }

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ pointerEvents: "none" }} />
}
