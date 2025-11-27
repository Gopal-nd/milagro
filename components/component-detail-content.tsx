"use client"

import { motion } from "framer-motion"
import { Tab } from "@headlessui/react"
import type { Component } from "@/lib/seed-data"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { OhmsLawSimulator, ResistorColorCode } from "./interactive-demos"

interface ComponentDetailContentProps {
  component: Component
}

export function ComponentDetailContent({ component }: ComponentDetailContentProps) {
  const tabs = ["Overview", "How It Works", "Applications", "Resources"]

  const getDemo = () => {
    if (component.slug === "resistor") {
      return <ResistorColorCode />
    }
    if (component.slug === "resistor" || component.slug === "capacitor") {
      return <OhmsLawSimulator />
    }
    return null
  }

  return (
    <div>
      {/* Back button */}
      <Link href="/components">
        <motion.button
          whileHover={{ x: -4 }}
          className="flex items-center gap-2 text-primary hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Components
        </motion.button>
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass border-glow-blue p-8 rounded-xl mb-8"
      >
        <div className="flex items-start gap-6 mb-6">
          <motion.div 
            className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center neon-glow-blue"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="text-4xl font-bold text-white">{component.symbol}</span>
          </motion.div>
          <div className="flex-1">
            <h1 
              className="text-4xl md:text-5xl font-bold mb-3 text-foreground bg-clip-text text-transparent"
              style={{ 
                backgroundImage: 'linear-gradient(to right, var(--primary), var(--secondary), var(--accent))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {component.name}
            </h1>
            <p className="text-lg text-foreground/80 leading-relaxed">{component.shortDescription}</p>
          </div>
        </div>

        {/* Key specs */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {[
            { label: "CATEGORY", value: component.category },
            { label: "SYMBOL", value: component.symbol },
            { label: "UNIT", value: component.unit },
          ].map((spec, idx) => (
            <motion.div
              key={spec.label}
              className="glass-dark border-glow-cyan p-5 rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <p className="text-xs text-primary font-semibold mb-2 uppercase tracking-wide">{spec.label}</p>
              <p className="text-xl font-bold text-foreground">{spec.value}</p>
            </motion.div>
          ))}
        </div>
        {component.typicalValues && (
          <motion.div 
            className="mt-6 p-5 bg-gradient-to-br from-primary/10 to-neon-cyan/10 border-glow-gold rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-xs text-primary font-semibold mb-2 uppercase tracking-wide">TYPICAL VALUES</p>
            <p className="font-bold text-lg text-foreground">{component.typicalValues}</p>
          </motion.div>
        )}
      </motion.div>

      {/* Tabs */}
      <Tab.Group>
        <Tab.List className="flex gap-2 mb-8 border-b border-border/30 pb-2">
          {tabs.map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                `px-6 py-3 font-semibold transition-all relative ${
                  selected
                    ? ""
                    : "text-foreground/60 hover:text-foreground"
                }`
              }
              style={({ selected }) => selected ? { color: 'var(--primary)' } : {}}
            >
              {({ selected }) => (
                <>
                  {tab}
                  {selected && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ backgroundImage: 'linear-gradient(to right, var(--primary), var(--secondary))' }}
                      layoutId="activeTab"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </>
              )}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass border-glow p-8 rounded-xl"
            >
              <h3 className="text-2xl font-bold mb-6 text-foreground">About this Component</h3>
              <p className="text-foreground/90 leading-relaxed mb-6 text-lg">{component.overview}</p>
              <h4 className="text-xl font-semibold mb-4 text-primary border-b border-primary/30 pb-2">Description</h4>
              <p className="text-foreground/90 leading-relaxed text-base">{component.description}</p>
            </motion.div>
          </Tab.Panel>

          <Tab.Panel>
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="space-y-6"
            >
              {getDemo() ? (
                <motion.div 
                  className="glass border-glow-gold p-8 rounded-xl"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      ⚡
                    </motion.span>
                    Interactive Simulator
                  </h3>
                  {getDemo()}
                </motion.div>
              ) : null}

              <motion.div 
                className="glass border-glow p-8 rounded-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-4 text-foreground">Technical Details</h3>
                <p className="text-foreground/90 leading-relaxed mb-6 text-base">
                  This section contains detailed technical information about how {component.name.toLowerCase()}{" "}
                  operates, including functional principles, electrical characteristics, and behavior under different
                  conditions.
                </p>
                <div className="bg-gradient-to-br from-primary/10 to-neon-cyan/10 border-glow-cyan p-5 rounded-lg mt-6">
                  <p className="text-sm text-foreground/80">
                    Advanced 3D models and detailed circuit diagrams would be displayed here in the full version.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </Tab.Panel>

          <Tab.Panel>
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold text-foreground mb-6">Practical Applications</h3>
              {component.applications && component.applications.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {component.applications.map((app, idx) => (
                    <motion.div
                      key={idx}
                      className="glass border-glow-gold p-5 rounded-xl hover:border-glow-gold transition-all"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ scale: 1.03, y: -3 }}
                    >
                      <p className="font-bold text-lg text-accent mb-2">{app}</p>
                      <p className="text-sm text-foreground/80">
                        Common use case in electronics projects and industrial applications.
                      </p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div 
                  className="glass border-glow p-5 rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-foreground/70">Applications data for this component coming soon.</p>
                </motion.div>
              )}
            </motion.div>
          </Tab.Panel>

          <Tab.Panel>
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold text-foreground mb-6">Resources & Documentation</h3>
              <div className="space-y-3">
                {[
                  { title: "Datasheet PDF", desc: "Download full technical specifications", icon: "📄" },
                  { title: "Video Tutorial", desc: "Watch a detailed explanation", icon: "🎥" },
                  { title: "Circuit Examples", desc: "Practical circuit designs using this component", icon: "⚡" },
                ].map((resource, idx) => (
                  <motion.a
                    key={idx}
                    href="#"
                    className="glass border-glow-blue p-5 rounded-xl block transition-all hover:border-glow-cyan group"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{resource.icon}</span>
                      <div>
                        <p 
                          className="font-bold text-primary transition-colors"
                          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--secondary)'}
                          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--primary)'}
                        >
                          {resource.title}
                        </p>
                        <p className="text-sm text-foreground/70">{resource.desc}</p>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
