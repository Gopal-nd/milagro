"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const COLORS = [
  { name: "Black", value: 0, hex: "#000000" },
  { name: "Brown", value: 1, hex: "#8B4513" },
  { name: "Red", value: 2, hex: "#FF0000" },
  { name: "Orange", value: 3, hex: "#FFA500" },
  { name: "Yellow", value: 4, hex: "#FFFF00" },
  { name: "Green", value: 5, hex: "#00AA00" },
  { name: "Blue", value: 6, hex: "#0000FF" },
  { name: "Violet", value: 7, hex: "#EE82EE" },
  { name: "Grey", value: 8, hex: "#808080" },
  { name: "White", value: 9, hex: "#FFFFFF" },
]

const TOLERANCES = [
  { name: "Gold", value: "±5%", hex: "#FFD700" },
  { name: "Silver", value: "±10%", hex: "#C0C0C0" },
  { name: "Brown", value: "±1%", hex: "#8B4513" },
]

export function ResistorColorCode() {
  const [firstBand, setFirstBand] = useState(2) // Red
  const [secondBand, setSecondBand] = useState(7) // Violet
  const [multiplier, setMultiplier] = useState(2) // Red
  const [tolerance, setTolerance] = useState(0) // Gold

  const resistanceValue =
    ((COLORS[firstBand].value * 10 + COLORS[secondBand].value) * Math.pow(10, COLORS[multiplier].value)) /
    (multiplier < 2 ? 1 : 1)

  const formatValue = (value: number) => {
    if (value >= 1000000) return (value / 1000000).toFixed(1) + "MΩ"
    if (value >= 1000) return (value / 1000).toFixed(1) + "kΩ"
    return value.toFixed(0) + "Ω"
  }

  return (
    <div className="space-y-6">
      {/* Visual Resistor */}
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="glass p-8 rounded-lg border border-primary/20 flex justify-center"
      >
        <div className="flex items-center gap-4">
          <div className="text-foreground/30 text-3xl">━</div>
          <div className="relative w-40 h-12 bg-gradient-to-r from-amber-900 to-yellow-900 rounded-full flex items-center justify-center gap-1">
            {/* Color bands */}
            {[firstBand, secondBand, multiplier, tolerance].map((bandIdx, idx) => {
              const isToleranceBand = idx === 3
              const color = isToleranceBand ? TOLERANCES[bandIdx] : COLORS[bandIdx]
              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.2 }}
                  className="w-3 h-10 rounded border border-black/30"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              )
            })}
          </div>
          <div className="text-foreground/30 text-3xl">━</div>
        </div>
      </motion.div>

      {/* Band selection */}
      <div className="space-y-4">
        {[
          { label: "1st Band (First Digit)", value: firstBand, setValue: setFirstBand },
          { label: "2nd Band (Second Digit)", value: secondBand, setValue: setSecondBand },
          { label: "3rd Band (Multiplier)", value: multiplier, setValue: setMultiplier },
        ].map((band, idx) => (
          <div key={idx}>
            <p className="text-sm font-semibold mb-2">{band.label}</p>
            <div className="grid grid-cols-5 gap-2">
              {COLORS.map((color, colorIdx) => (
                <button
                  key={colorIdx}
                  onClick={() => band.setValue(colorIdx)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    band.value === colorIdx
                      ? "border-primary ring-2 ring-primary"
                      : "border-primary/20 hover:border-primary/40"
                  }`}
                  style={{ backgroundColor: color.hex, opacity: 0.7 }}
                  title={`${color.value} - ${color.name}`}
                >
                  <span className="text-xs font-semibold text-black">{color.value}</span>
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Tolerance */}
        <div>
          <p className="text-sm font-semibold mb-2">Tolerance Band</p>
          <div className="flex gap-3">
            {TOLERANCES.map((tol, idx) => (
              <button
                key={idx}
                onClick={() => setTolerance(idx)}
                className={`flex-1 p-3 rounded-lg border-2 transition-all font-semibold ${
                  tolerance === idx ? "border-primary ring-2 ring-primary" : "border-primary/20 hover:border-primary/40"
                }`}
                style={{ backgroundColor: tol.hex, opacity: 0.7 }}
              >
                <span className="text-black text-sm">{tol.value}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="grid md:grid-cols-2 gap-4">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 0.5 }}
          className="glass p-6 rounded-lg border border-accent/20 text-center"
        >
          <p className="text-xs text-accent font-semibold mb-2">RESISTANCE VALUE</p>
          <p className="text-3xl font-bold">{formatValue(resistanceValue)}</p>
          <p className="text-sm text-foreground/60 mt-2">{TOLERANCES[tolerance].value}</p>
        </motion.div>

        <div className="glass p-6 rounded-lg border border-primary/20">
          <p className="text-xs text-primary font-semibold mb-3">FORMULA</p>
          <p className="font-mono text-sm mb-3">
            ({COLORS[firstBand].value}
            {COLORS[secondBand].value}) × 10^{COLORS[multiplier].value}
          </p>
          <p className="text-xs text-foreground/60">
            {COLORS[firstBand].value}
            {COLORS[secondBand].value} × {Math.pow(10, COLORS[multiplier].value).toLocaleString()} ={" "}
            {resistanceValue.toLocaleString()}Ω
          </p>
        </div>
      </div>
    </div>
  )
}
