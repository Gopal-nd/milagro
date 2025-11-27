"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ComponentCard } from "@/components/component-card"
import { COMPONENTS } from "@/lib/seed-data"
import { useState } from "react"

export default function ComponentsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = Array.from(new Set(COMPONENTS.map((c) => c.category)))
  const filteredComponents = selectedCategory ? COMPONENTS.filter((c) => c.category === selectedCategory) : COMPONENTS

  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Component Library</h1>
          <p className="text-lg text-foreground/60 max-w-2xl">
            Explore our comprehensive collection of electronic components with detailed explanations, interactive
            diagrams, and practical applications.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === null
                ? "bg-primary text-primary-foreground neon-glow-blue"
                : "glass border border-primary/20 hover:border-primary/40"
            }`}
          >
            All Components
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-accent text-accent-foreground neon-glow-gold"
                  : "glass border border-primary/20 hover:border-primary/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Components grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComponents.map((comp, idx) => (
            <ComponentCard key={comp.id} component={comp} index={idx} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
