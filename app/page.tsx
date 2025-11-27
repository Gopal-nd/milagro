"use client"

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeaturedSection } from "@/components/featured-section"
import { Footer } from "@/components/footer"
import { CircuitSimulator3D } from "@/components/3d-circuit-simulator"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />

      <section className="py-20 px-4 bg-gradient-to-b from-background to-dark-bg/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold mb-3 text-center">Interactive 3D Circuit</h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto">
              Drag to rotate the circuit in 3D, click components to turn them on/off, and explore how circuits work in
              real-time with our interactive simulator.
            </p>
          </motion.div>
          <CircuitSimulator3D />
        </div>
      </section>

      <FeaturedSection />
      <Footer />
    </main>
  )
}
