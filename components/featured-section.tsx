"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { COMPONENTS, TUTORIALS } from "@/lib/seed-data"

export function FeaturedSection() {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      {/* Featured Components */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mb-20"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Featured Components</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {COMPONENTS.slice(0, 3).map((comp, idx) => (
            <motion.div
              key={comp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass p-6 rounded-lg border border-primary/20 hover:border-primary/40 transition-all group cursor-pointer"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4 neon-glow-blue group-hover:scale-110 transition-transform">
                <span className="text-lg font-bold text-white">{comp.symbol}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{comp.name}</h3>
              <p className="text-sm text-foreground/60 mb-4">{comp.shortDescription}</p>
              <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Featured Tutorials */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Quick Tutorials</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {TUTORIALS.slice(0, 2).map((tutorial, idx) => (
            <motion.div
              key={tutorial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="glass p-8 rounded-lg border border-accent/20 hover:border-accent/40 transition-all group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium mb-2">
                    {tutorial.difficulty}
                  </div>
                  <h3 className="text-xl font-semibold">{tutorial.title}</h3>
                </div>
              </div>
              <p className="text-foreground/60 mb-4">{tutorial.description}</p>
              <p className="text-sm text-accent font-medium">{tutorial.duration}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
