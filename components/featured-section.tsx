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
              whileHover={{ y: -8, scale: 1.03 }}
              className="glass border-glow-blue p-6 rounded-xl hover:border-glow-cyan transition-all group cursor-pointer"
            >
              <motion.div 
                className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4 neon-glow-blue"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-lg font-bold text-white">{comp.symbol}</span>
              </motion.div>
              <h3 className="text-lg font-bold mb-2 text-foreground">{comp.name}</h3>
              <p className="text-sm text-foreground/80 mb-4 leading-relaxed">{comp.shortDescription}</p>
              <div className="flex items-center text-primary text-sm font-semibold group-hover:gap-2 transition-all">
                Learn more 
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4 ml-1" />
                </motion.div>
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
              whileHover={{ scale: 1.03, y: -5 }}
              className="glass border-glow-gold p-8 rounded-xl hover:border-glow-cyan transition-all group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="inline-block px-3 py-1 bg-accent/20 border border-accent/50 text-accent rounded-full text-xs font-semibold mb-3">
                    {tutorial.difficulty}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{tutorial.title}</h3>
                </div>
              </div>
              <p className="text-foreground/80 mb-4 leading-relaxed">{tutorial.description}</p>
              <p className="text-sm text-accent font-semibold">{tutorial.duration}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
