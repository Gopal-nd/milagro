"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TUTORIALS } from "@/lib/seed-data"
import { BookOpen, Video, Download, FileText } from "lucide-react"

export default function ResourcesPage() {
  const resourceTypes = [
    { icon: BookOpen, label: "Tutorials", desc: "Step-by-step guides" },
    { icon: Video, label: "Videos", desc: "Video explanations" },
    { icon: Download, label: "PDFs", desc: "Downloadable docs" },
    { icon: FileText, label: "References", desc: "Quick reference guides" },
  ]

  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Learning Resources</h1>
          <p className="text-lg text-foreground/60 max-w-2xl">
            Comprehensive materials to accelerate your electronics learning journey. From beginner tutorials to advanced
            references.
          </p>
        </motion.div>

        {/* Resource types */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="grid md:grid-cols-4 gap-4 mb-16">
          {resourceTypes.map((type, idx) => {
            const Icon = type.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-6 rounded-lg border border-primary/20 hover:border-primary/40 transition-all cursor-pointer hover:bg-primary/5"
              >
                <Icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold mb-1">{type.label}</h3>
                <p className="text-sm text-foreground/60">{type.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Featured Tutorials */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Featured Tutorials</h2>
          <div className="space-y-4">
            {TUTORIALS.map((tutorial, idx) => (
              <motion.div
                key={tutorial.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="glass p-6 rounded-lg border border-accent/20 hover:border-accent/40 transition-all hover:bg-accent/5 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          tutorial.difficulty === "beginner"
                            ? "bg-green-500/20 text-green-400"
                            : tutorial.difficulty === "intermediate"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {tutorial.difficulty.charAt(0).toUpperCase() + tutorial.difficulty.slice(1)}
                      </span>
                      <span className="text-sm text-foreground/60">{tutorial.duration}</span>
                    </div>
                    <h3 className="text-xl font-semibold group-hover:text-accent transition-colors">
                      {tutorial.title}
                    </h3>
                  </div>
                </div>
                <p className="text-foreground/60">{tutorial.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Download Center */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Download Center</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Resistor Color Code Chart", icon: "📋" },
              { title: "Component Datasheet Quick Reference", icon: "📄" },
              { title: "Math Cheat Sheet", icon: "🧮" },
              { title: "Circuit Symbols Reference", icon: "⚡" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="glass p-6 rounded-lg border border-primary/20 hover:border-primary/40 transition-all hover:bg-primary/5 cursor-pointer group"
              >
                <p className="text-3xl mb-3">{item.icon}</p>
                <h3 className="font-semibold mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                <button className="text-primary text-sm font-medium hover:text-accent transition-colors flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Curated Links */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <h2 className="text-3xl font-bold mb-8">Recommended Resources</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "MIT OpenCourseWare - Circuits & Electronics",
                desc: "Professional university-level course material",
                url: "#",
              },
              {
                title: "The Art of Electronics - Summary",
                desc: "Key concepts from the classic textbook",
                url: "#",
              },
              {
                title: "EEVblog Channel",
                desc: "Practical electronics and teardowns",
                url: "#",
              },
              {
                title: "Arduino Official Documentation",
                desc: "Complete Arduino reference and tutorials",
                url: "#",
              },
            ].map((resource, idx) => (
              <motion.a
                key={idx}
                href={resource.url}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="glass p-5 rounded-lg border border-secondary/20 hover:border-secondary/40 transition-all hover:bg-secondary/5 group"
              >
                <h3 className="font-semibold group-hover:text-secondary transition-colors">{resource.title}</h3>
                <p className="text-sm text-foreground/60 mt-1">{resource.desc}</p>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  )
}
