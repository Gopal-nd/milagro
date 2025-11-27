"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { APPLICATIONS } from "@/lib/seed-data"

export default function ApplicationsPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Electronics Applications</h1>
          <p className="text-lg text-foreground/60 max-w-2xl">
            Discover how electronics principles are applied in real-world systems and applications. From power supplies
            to robotics and IoT.
          </p>
        </motion.div>

        {/* Applications grid */}
        <div className="space-y-12">
          {APPLICATIONS.map((app, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-8 rounded-lg border border-primary/20 hover:border-primary/40 transition-all"
            >
              <h2 className="text-3xl font-bold mb-3 text-primary">{app.name}</h2>
              <p className="text-lg text-foreground/70 mb-6">{app.description}</p>

              <div>
                <h3 className="font-semibold mb-4">Key Topics:</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {app.topics.map((topic, tIdx) => (
                    <motion.div
                      key={tIdx}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/10 rounded-lg hover:border-primary/30 transition-all cursor-pointer"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="font-medium">{topic}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Case study placeholder */}
              <div className="mt-8 pt-8 border-t border-border/20">
                <h3 className="font-semibold mb-4">Example Project</h3>
                <div className="bg-muted/30 p-6 rounded-lg border border-muted text-foreground/60 text-sm">
                  <p>
                    Interactive case study and project example coming soon. Includes schematics, components list, and
                    step-by-step build instructions.
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Ideas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20 glass p-8 rounded-lg border border-accent/20"
        >
          <h2 className="text-3xl font-bold mb-6">Get Started with a Project</h2>
          <p className="text-foreground/70 mb-6">
            Ready to apply what you've learned? Choose a difficulty level and build your first electronics project.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { level: "Beginner", desc: "LED blinker, simple circuits", time: "30 mins" },
              { level: "Intermediate", desc: "Sensors, Arduino projects", time: "2-3 hours" },
              { level: "Advanced", desc: "Custom design, PCB layout", time: "5+ hours" },
            ].map((project, idx) => (
              <button
                key={idx}
                className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 hover:border-primary/40 rounded-lg text-left transition-all hover:shadow-lg hover:shadow-primary/20"
              >
                <p className="font-semibold text-primary mb-2">{project.level}</p>
                <p className="text-sm text-foreground/60 mb-3">{project.desc}</p>
                <p className="text-xs text-muted-foreground">{project.time}</p>
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  )
}
