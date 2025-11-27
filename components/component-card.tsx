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
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link href={`/components/${component.slug}`}>
        <div className="glass p-6 rounded-lg border border-primary/20 hover:border-primary/40 transition-all h-full cursor-pointer">
          <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4 neon-glow-blue group-hover:scale-110 transition-transform">
            <span className="text-2xl font-bold text-white">{component.symbol}</span>
          </div>

          <h3 className="text-lg font-semibold mb-1">{component.name}</h3>
          <p className="text-xs text-primary font-medium mb-3">{component.category}</p>

          <p className="text-sm text-foreground/60 mb-4 line-clamp-2">{component.shortDescription}</p>

          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{component.unit}</span>
            <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
