"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { LEARNING_TOPICS } from "@/lib/seed-data"
import { motion } from "framer-motion"

export default function LearnPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")

  const categories = Array.from(new Set(LEARNING_TOPICS.map((t) => t.category)))
  const difficulties = ["beginner", "intermediate", "advanced"]

  const filteredTopics = useMemo(() => {
    return LEARNING_TOPICS.filter((topic) => {
      const categoryMatch = selectedCategory === "all" || topic.category === selectedCategory
      const difficultyMatch = selectedDifficulty === "all" || topic.difficulty === selectedDifficulty
      return categoryMatch && difficultyMatch
    })
  }, [selectedCategory, selectedDifficulty])

  const difficultyColors = {
    beginner: "bg-green-500/20 text-green-400 border-green-500/30",
    intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    advanced: "bg-red-500/20 text-red-400 border-red-500/30",
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <motion.h1
            className="text-4xl font-bold mb-3 text-balance"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Electronics Learning Hub
          </motion.h1>
          <motion.p
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Master 20 comprehensive topics from basics to advanced concepts
          </motion.p>
        </div>

        {/* Filters */}
        <motion.div
          className="glass rounded-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="space-y-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold mb-3">Category</label>
              <div className="flex flex-wrap gap-2">
                <motion.button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-4 py-2 rounded-lg transition-all border ${
                    selectedCategory === "all"
                      ? ""
                      : "bg-muted border-border text-muted-foreground hover:border-muted-foreground"
                  }`}
                  style={selectedCategory === "all" ? {
                    backgroundColor: 'oklch(from var(--primary) l c h / 0.3)',
                    borderColor: 'var(--primary)',
                    color: 'var(--primary)'
                  } : {}}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  All
                </motion.button>
                {categories.map((cat) => (
                  <motion.button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg transition-all border ${
                      selectedCategory === cat
                        ? ""
                        : "bg-muted border-border text-muted-foreground hover:border-muted-foreground"
                    }`}
                    style={selectedCategory === cat ? {
                      backgroundColor: 'oklch(from var(--primary) l c h / 0.3)',
                      borderColor: 'var(--primary)',
                      color: 'var(--primary)'
                    } : {}}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-semibold mb-3">Difficulty</label>
              <div className="flex flex-wrap gap-2">
                <motion.button
                  onClick={() => setSelectedDifficulty("all")}
                  className={`px-4 py-2 rounded-lg transition-all border ${
                    selectedDifficulty === "all"
                      ? ""
                      : "bg-muted border-border text-muted-foreground hover:border-muted-foreground"
                  }`}
                  style={selectedDifficulty === "all" ? {
                    backgroundColor: 'oklch(from var(--secondary) l c h / 0.3)',
                    borderColor: 'var(--secondary)',
                    color: 'var(--secondary)'
                  } : {}}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  All
                </motion.button>
                {difficulties.map((diff) => (
                  <motion.button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-4 py-2 rounded-lg transition-all capitalize border ${
                      selectedDifficulty === diff
                        ? ""
                        : "bg-muted border-border text-muted-foreground hover:border-muted-foreground"
                    }`}
                    style={selectedDifficulty === diff ? {
                      backgroundColor: 'oklch(from var(--secondary) l c h / 0.3)',
                      borderColor: 'var(--secondary)',
                      color: 'var(--secondary)'
                    } : {}}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {diff}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Topics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredTopics.map((topic, idx) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <Link href={`/learn/${topic.slug}`}>
                <div 
                  className="glass rounded-xl p-6 h-full transition-colors cursor-pointer"
                  style={{ borderColor: 'rgba(0, 188, 212, 0.2)' }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(0, 188, 212, 0.5)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(0, 188, 212, 0.2)'}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-lg text-foreground flex-1">{topic.title}</h3>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full border capitalize whitespace-nowrap ml-2 ${
                        difficultyColors[topic.difficulty as keyof typeof difficultyColors]
                      }`}
                    >
                      {topic.difficulty}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{topic.description}</p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{topic.category}</span>
                    <span>{topic.duration}</span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border/30">
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {topic.keyPoints.slice(0, 2).map((point, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2" style={{ color: 'var(--secondary)' }}>•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                      {topic.keyPoints.length > 2 && (
                        <li className="font-semibold" style={{ color: 'var(--secondary)' }}>+{topic.keyPoints.length - 2} more</li>
                      )}
                    </ul>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredTopics.length === 0 && (
          <motion.div className="text-center py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-muted-foreground">No topics found matching your filters.</p>
          </motion.div>
        )}
      </div>

      <Footer />
    </main>
  )
}
