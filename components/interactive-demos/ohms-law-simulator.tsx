"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"

export function OhmsLawSimulator() {
  const [voltage, setVoltage] = useState(5)
  const [resistance, setResistance] = useState(10)

  const current = useMemo(() => {
    return resistance > 0 ? voltage / resistance : 0
  }, [voltage, resistance])

  const power = useMemo(() => {
    return voltage * current
  }, [voltage, current])

  return (
    <div className="space-y-6">
      <p className="text-foreground/70">
        Explore Ohm's Law: <span className="text-primary font-semibold">V = I × R</span>
      </p>

      {/* Sliders */}
      <div className="space-y-4">
        {/* Voltage */}
        <div>
          <label className="block text-sm font-semibold text-primary mb-2">
            Voltage (V): <span className="text-accent">{voltage}V</span>
          </label>
          <input
            type="range"
            min="0"
            max="24"
            step="0.1"
            value={voltage}
            onChange={(e) => setVoltage(Number.parseFloat(e.target.value))}
            className="w-full h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>

        {/* Resistance */}
        <div>
          <label className="block text-sm font-semibold text-secondary mb-2">
            Resistance (Ω): <span className="text-accent">{resistance}Ω</span>
          </label>
          <input
            type="range"
            min="1"
            max="100"
            step="0.1"
            value={resistance}
            onChange={(e) => setResistance(Number.parseFloat(e.target.value))}
            className="w-full h-2 bg-secondary/20 rounded-lg appearance-none cursor-pointer accent-secondary"
          />
        </div>
      </div>

      {/* Results */}
      <div className="grid md:grid-cols-3 gap-4">
        <motion.div
          animate={{ scale: voltage > 10 ? 1.05 : 1 }}
          className="glass p-4 rounded-lg border border-primary/20"
        >
          <p className="text-xs text-primary font-semibold mb-1">CURRENT</p>
          <p className="text-2xl font-bold">{current.toFixed(3)}A</p>
          <p className="text-xs text-foreground/60 mt-1">(Amperes)</p>
        </motion.div>

        <motion.div animate={{ scale: power > 20 ? 1.05 : 1 }} className="glass p-4 rounded-lg border border-accent/20">
          <p className="text-xs text-accent font-semibold mb-1">POWER</p>
          <p className="text-2xl font-bold">{power.toFixed(2)}W</p>
          <p className="text-xs text-foreground/60 mt-1">(Watts)</p>
        </motion.div>

        <div className="glass p-4 rounded-lg border border-secondary/20">
          <p className="text-xs text-secondary font-semibold mb-1">FORMULA</p>
          <p className="text-sm font-mono">
            {voltage}V ÷ {resistance}Ω
          </p>
          <p className="text-xs text-foreground/60 mt-1">= {current.toFixed(3)}A</p>
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
        <p className="text-sm text-foreground/70">
          <span className="font-semibold text-primary">Current increases</span> when voltage goes up or resistance goes
          down.
          <span className="font-semibold text-accent ml-2">Power dissipation</span> grows quadratically with current.
        </p>
      </div>
    </div>
  )
}
