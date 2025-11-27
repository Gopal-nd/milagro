"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Component } from "@/lib/seed-data"

interface ComponentCardProps {
  component: Component
  index?: number
}

export function ComponentCard({ component, index = 0 }: ComponentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
    >
      <Link href={`/components/${component.slug}`}>
        <div className="glass border-glow-blue p-6 rounded-xl hover:border-glow-cyan transition-all h-full cursor-pointer">
          <motion.div 
            className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4 neon-glow-blue"
            whileHover={{ scale: 1.15, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="text-2xl font-bold text-white">{component.symbol}</span>
          </motion.div>

          <h3 className="text-lg font-bold mb-1 text-foreground">{component.name}</h3>
          <p className="text-xs text-primary font-semibold mb-3 uppercase tracking-wide">{component.category}</p>

          <p className="text-sm text-foreground/80 mb-4 line-clamp-2 leading-relaxed">{component.shortDescription}</p>

          <div className="flex items-center justify-between pt-2 border-t border-border/20">
            <span className="text-xs font-medium text-foreground/70">{component.unit}</span>
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
            >
              <ArrowRight 
                className="w-4 h-4 text-primary transition-colors" 
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--secondary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--primary)'}
              />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
