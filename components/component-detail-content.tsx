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
        className="glass p-8 rounded-lg border border-primary/20 mb-8"
      >
        <div className="flex items-start gap-6 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center neon-glow-blue">
            <span className="text-4xl font-bold text-white">{component.symbol}</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">{component.name}</h1>
            <p className="text-lg text-foreground/60">{component.shortDescription}</p>
          </div>
        </div>

        {/* Key specs */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="glass-dark p-4 rounded-lg border border-primary/10">
            <p className="text-xs text-primary font-semibold mb-1">CATEGORY</p>
            <p className="text-lg font-semibold">{component.category}</p>
          </div>
          <div className="glass-dark p-4 rounded-lg border border-primary/10">
            <p className="text-xs text-primary font-semibold mb-1">SYMBOL</p>
            <p className="text-lg font-semibold">{component.symbol}</p>
          </div>
          <div className="glass-dark p-4 rounded-lg border border-primary/10">
            <p className="text-xs text-primary font-semibold mb-1">UNIT</p>
            <p className="text-lg font-semibold">{component.unit}</p>
          </div>
        </div>
        {component.typicalValues && (
          <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="text-xs text-primary font-semibold mb-1">TYPICAL VALUES</p>
            <p className="font-semibold">{component.typicalValues}</p>
          </div>
        )}
      </motion.div>

      {/* Tabs */}
      <Tab.Group>
        <Tab.List className="flex gap-2 mb-8 border-b border-border/20">
          {tabs.map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                `px-4 py-3 font-medium transition-all border-b-2 ${
                  selected
                    ? "border-primary text-primary"
                    : "border-transparent text-foreground/60 hover:text-foreground"
                }`
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass p-8 rounded-lg border border-primary/20"
            >
              <h3 className="text-xl font-semibold mb-4">About this Component</h3>
              <p className="text-foreground/70 leading-relaxed mb-6">{component.overview}</p>
              <h4 className="text-lg font-semibold mb-3 text-primary">Description</h4>
              <p className="text-foreground/70 leading-relaxed">{component.description}</p>
            </motion.div>
          </Tab.Panel>

          <Tab.Panel>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {getDemo() ? (
                <div className="glass p-8 rounded-lg border border-accent/20">
                  <h3 className="text-xl font-semibold mb-6">Interactive Simulator</h3>
                  {getDemo()}
                </div>
              ) : null}

              <div className="glass p-8 rounded-lg border border-primary/20">
                <h3 className="text-xl font-semibold mb-4">Technical Details</h3>
                <p className="text-foreground/70 leading-relaxed mb-6">
                  This section contains detailed technical information about how {component.name.toLowerCase()}{" "}
                  operates, including functional principles, electrical characteristics, and behavior under different
                  conditions.
                </p>
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 mt-6">
                  <p className="text-sm text-foreground/70">
                    Advanced 3D models and detailed circuit diagrams would be displayed here in the full version.
                  </p>
                </div>
              </div>
            </motion.div>
          </Tab.Panel>

          <Tab.Panel>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h3 className="text-xl font-semibold">Practical Applications</h3>
              {component.applications && component.applications.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {component.applications.map((app, idx) => (
                    <div
                      key={idx}
                      className="glass p-4 rounded-lg border border-accent/20 hover:border-accent/40 transition-all"
                    >
                      <p className="font-semibold text-accent mb-1">{app}</p>
                      <p className="text-sm text-foreground/60">
                        Common use case in electronics projects and industrial applications.
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass p-4 rounded-lg border border-primary/20">
                  <p className="text-foreground/60">Applications data for this component coming soon.</p>
                </div>
              )}
            </motion.div>
          </Tab.Panel>

          <Tab.Panel>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Resources & Documentation</h3>
              <div className="space-y-3">
                <a
                  href="#"
                  className="glass p-4 rounded-lg border border-primary/20 hover:border-primary/40 block transition-all hover:bg-primary/5"
                >
                  <p className="font-semibold text-primary">Datasheet PDF</p>
                  <p className="text-sm text-foreground/60">Download full technical specifications</p>
                </a>
                <a
                  href="#"
                  className="glass p-4 rounded-lg border border-primary/20 hover:border-primary/40 block transition-all hover:bg-primary/5"
                >
                  <p className="font-semibold text-primary">Video Tutorial</p>
                  <p className="text-sm text-foreground/60">Watch a detailed explanation</p>
                </a>
                <a
                  href="#"
                  className="glass p-4 rounded-lg border border-primary/20 hover:border-primary/40 block transition-all hover:bg-primary/5"
                >
                  <p className="font-semibold text-primary">Circuit Examples</p>
                  <p className="text-sm text-foreground/60">Practical circuit designs using this component</p>
                </a>
              </div>
            </motion.div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
