"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface CircuitComponent {
  id: string
  name: string
  x: number
  y: number
  active: boolean
  type: "resistor" | "led" | "capacitor" | "switch" | "battery"
}

export function CircuitSimulator3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [components, setComponents] = useState<CircuitComponent[]>([
    { id: "1", name: "Battery", x: 100, y: 150, active: true, type: "battery" },
    { id: "2", name: "Switch", x: 220, y: 150, active: false, type: "switch" },
    { id: "3", name: "Resistor", x: 340, y: 150, active: false, type: "resistor" },
    { id: "4", name: "LED", x: 460, y: 150, active: false, type: "led" },
    { id: "5", name: "Capacitor", x: 280, y: 280, active: false, type: "capacitor" },
  ])
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)

  // Draw 3D circuit with enhanced visuals
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas with gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "rgba(11, 18, 32, 0.95)")
    gradient.addColorStop(1, "rgba(5, 10, 20, 0.95)")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw animated grid
    ctx.strokeStyle = "rgba(0, 188, 212, 0.08)"
    ctx.lineWidth = 1
    for (let i = 0; i < canvas.width; i += 40) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvas.height)
      ctx.stroke()
    }
    for (let i = 0; i < canvas.height; i += 40) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
      ctx.stroke()
    }

    // Draw animated circuit connections
    ctx.strokeStyle = "rgba(0, 188, 212, 0.5)"
    ctx.lineWidth = 3
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    for (let i = 0; i < components.length - 1; i++) {
      const current = components[i]
      const next = components[i + 1]
      ctx.beginPath()
      ctx.moveTo(current.x, current.y)
      ctx.lineTo(next.x, next.y)
      ctx.stroke()
    }

    // Draw components with enhanced visuals
    components.forEach((comp, idx) => {
      const x = comp.x + Math.sin(rotation.y + Date.now() / 1000) * 5
      const y = comp.y + Math.cos(rotation.x + Date.now() / 1000) * 5
      const isSelected = comp.id === selectedComponent

      // Enhanced shadow
      ctx.shadowColor = comp.active ? "rgba(0, 188, 212, 0.8)" : "rgba(255, 202, 40, 0.3)"
      ctx.shadowBlur = comp.active ? 25 : 8
      ctx.shadowOffsetX = 3
      ctx.shadowOffsetY = 3

      // Draw component based on type
      switch (comp.type) {
        case "battery":
          // Draw battery with gradient
          const batteryGradient = ctx.createLinearGradient(x - 15, y - 25, x - 15, y + 25)
          batteryGradient.addColorStop(0, "#ffca28")
          batteryGradient.addColorStop(0.5, "#ffa726")
          batteryGradient.addColorStop(1, "#ff9800")
          ctx.fillStyle = batteryGradient
          ctx.fillRect(x - 15, y - 25, 30, 50)
          ctx.strokeStyle = "#ff6f00"
          ctx.lineWidth = 2
          ctx.strokeRect(x - 15, y - 25, 30, 50)
          // Positive terminal
          ctx.fillStyle = "#fff"
          ctx.fillRect(x - 8, y - 35, 16, 8)
          break

        case "led":
          // Draw LED with glow
          ctx.fillStyle = comp.active ? "#ff1744" : "#991111"
          ctx.beginPath()
          ctx.moveTo(x - 12, y - 18)
          ctx.lineTo(x + 12, y - 18)
          ctx.lineTo(x, y + 18)
          ctx.closePath()
          ctx.fill()

          if (comp.active) {
            ctx.shadowColor = "#ff1744"
            ctx.shadowBlur = 30
            ctx.fillStyle = "rgba(255, 23, 68, 0.4)"
            ctx.beginPath()
            ctx.moveTo(x - 20, y - 25)
            ctx.lineTo(x + 20, y - 25)
            ctx.lineTo(x, y + 25)
            ctx.closePath()
            ctx.fill()
          }
          break

        case "resistor":
          // Draw resistor with texture
          ctx.strokeStyle = comp.active ? "#00bcd4" : "#888"
          ctx.lineWidth = 4
          ctx.beginPath()
          ctx.moveTo(x - 25, y)
          for (let i = 0; i < 5; i++) {
            ctx.lineTo(x - 25 + (i + 1) * 10, y + (i % 2 === 0 ? -10 : 10))
          }
          ctx.lineTo(x + 25, y)
          ctx.stroke()
          break

        case "capacitor":
          // Draw capacitor with better design
          ctx.strokeStyle = comp.active ? "#00bcd4" : "#888"
          ctx.lineWidth = 3
          ctx.beginPath()
          ctx.moveTo(x - 25, y)
          ctx.lineTo(x - 8, y)
          ctx.stroke()

          ctx.lineWidth = 4
          ctx.beginPath()
          ctx.moveTo(x - 5, y - 18)
          ctx.lineTo(x - 5, y + 18)
          ctx.stroke()
          ctx.beginPath()
          ctx.moveTo(x + 5, y - 18)
          ctx.lineTo(x + 5, y + 18)
          ctx.stroke()

          ctx.lineWidth = 3
          ctx.beginPath()
          ctx.moveTo(x + 8, y)
          ctx.lineTo(x + 25, y)
          ctx.stroke()
          break

        case "switch":
          // Draw switch with indicator
          ctx.strokeStyle = comp.active ? "#4caf50" : "#dd7e00"
          ctx.fillStyle = comp.active ? "rgba(76, 175, 80, 0.3)" : "rgba(221, 126, 0, 0.2)"
          ctx.lineWidth = 3
          ctx.beginPath()
          ctx.arc(x, y, 12, 0, Math.PI * 2)
          ctx.fill()
          ctx.stroke()

          ctx.fillStyle = comp.active ? "#4caf50" : "#dd7e00"
          ctx.beginPath()
          ctx.arc(x, y, 6, 0, Math.PI * 2)
          ctx.fill()
          break
      }

      ctx.shadowColor = "transparent"

      // Label with enhanced styling
      ctx.fillStyle = isSelected ? "#00bcd4" : "#fff"
      ctx.font = "bold 13px Arial"
      ctx.textAlign = "center"
      ctx.fillText(comp.name, x, y + 50)

      if (isSelected) {
        ctx.strokeStyle = "#00bcd4"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(x, y, 35, 0, Math.PI * 2)
        ctx.stroke()
      }
    })
  }, [components, rotation, selectedComponent])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (dragging) {
      const deltaX = e.clientX - dragStart.x
      const deltaY = e.clientY - dragStart.y
      setRotation({
        x: rotation.x + deltaY * 0.01,
        y: rotation.y + deltaX * 0.01,
      })
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => {
    setDragging(false)
  }

  const toggleComponent = (id: string) => {
    setComponents((prev) => prev.map((comp) => (comp.id === id ? { ...comp, active: !comp.active } : comp)))
    setSelectedComponent(id)
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <motion.div
        className="glass rounded-2xl p-8 space-y-6 border border-neon-blue/20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-neon-blue to-neon-cyan bg-clip-text text-transparent">
              Interactive 3D Circuit Simulator
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Drag to rotate • Click components to toggle • Explore real-time circuit behavior
            </p>
          </div>
        </div>

        {/* Canvas */}
        <motion.canvas
          ref={canvasRef}
          width={700}
          height={480}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="w-full border-2 border-neon-cyan/30 rounded-xl cursor-grab active:cursor-grabbing bg-dark-bg"
          whileHover={{ borderColor: "rgba(0, 188, 212, 0.6)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        />

        {/* Controls */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {components.map((comp) => (
            <motion.button
              key={comp.id}
              onClick={() => toggleComponent(comp.id)}
              className={`p-4 rounded-lg transition-all font-semibold ${
                comp.active
                  ? "bg-gradient-to-br from-neon-blue/30 to-neon-cyan/20 border-2 border-neon-blue text-neon-blue shadow-lg"
                  : "bg-muted/30 border-2 border-border text-muted-foreground hover:border-neon-blue/50"
              }`}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.93 }}
            >
              <div className="text-sm font-bold">{comp.name}</div>
              <motion.div className="text-xs opacity-75 mt-1" animate={{ opacity: comp.active ? 1 : 0.5 }}>
                {comp.active ? "ON" : "OFF"}
              </motion.div>
            </motion.button>
          ))}
        </div>

        {/* Info */}
        {selectedComponent && (
          <motion.div
            className="p-5 bg-gradient-to-r from-neon-blue/10 to-neon-cyan/10 border-2 border-neon-blue/40 rounded-xl"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <p className="text-sm text-foreground font-medium">
              <span className="text-neon-blue">{components.find((c) => c.id === selectedComponent)?.name}</span>
              {" is currently "}
              <span
                className={
                  components.find((c) => c.id === selectedComponent)?.active ? "text-green-400" : "text-yellow-400"
                }
              >
                {components.find((c) => c.id === selectedComponent)?.active ? "ON" : "OFF"}
              </span>
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
