"use client"

import { motion } from "framer-motion"
import { Zap, Microscope, Lightbulb, ArrowRight } from "lucide-react"
import Link from "next/link"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
}

const floatingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: [0, -10, 0],
    transition: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
  },
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10">
      {/* Enhanced animated background with multiple layers */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
          className="absolute -top-40 right-10 w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0.15, 0.5, 0.15],
            scale: [1, 1.4, 1],
          }}
          transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
          className="absolute -bottom-40 left-10 w-96 h-96 bg-neon-cyan/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY, delay: 4 }}
          className="absolute top-1/2 left-1/3 w-80 h-80 bg-neon-gold/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-6xl mx-auto px-4 text-center"
      >
        {/* Badge with pulse animation */}
        <motion.div variants={itemVariants} className="mb-8 flex justify-center">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border border-neon-blue/50 backdrop-blur-md"
            whileHover={{ borderColor: "rgba(0, 188, 212, 1)" }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Microscope className="w-4 h-4 text-neon-blue" />
            </motion.div>
            <span className="text-sm text-neon-blue font-medium">Interactive Electronics Lab</span>
          </motion.div>
        </motion.div>

        {/* Main heading with animated gradient */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-tight">
            <span className="block text-white mb-2">Master</span>
            <motion.span
              className="block bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-gold bg-clip-text text-transparent py-2"
              animate={{
                backgroundPosition: ["0%", "100%", "0%"],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            >
              Electronics with AI
            </motion.span>
          </h1>
        </motion.div>

        {/* Enhanced subheading */}
        <motion.div variants={itemVariants} className="mb-12">
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed font-light">
            Explore 20 comprehensive topics covering everything from basic circuits to advanced embedded systems.
            Interact with{" "}
            <span className="font-semibold bg-gradient-to-r from-neon-blue to-neon-cyan bg-clip-text text-transparent">
              3D models
            </span>
            , run real-time simulations, and chat with <span className="font-semibold text-neon-gold">Electro AI</span>{" "}
            powered by Google Gemini for instant learning support.
          </p>
        </motion.div>

        {/* CTA Buttons with enhanced hover effects */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <Link href="/learn">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-cyan/70 border border-neon-blue text-white hover:shadow-2xl rounded-lg font-bold transition-all flex items-center gap-3 group"
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                <Zap className="w-5 h-5" />
              </motion.div>
              Start Learning
              <motion.div animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </Link>
          <Link href="/chat">
            <motion.button
              className="px-8 py-4 border-2 border-neon-cyan/60 text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan rounded-lg font-bold transition-all flex items-center gap-3 backdrop-blur-sm"
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Lightbulb className="w-5 h-5" />
              </motion.div>
              Chat with Electro
            </motion.button>
          </Link>
        </motion.div>

        {/* Key features with enhanced design */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-4 gap-4 mt-20">
          {[
            {
              icon: "📚",
              label: "20 Topics",
              desc: "From basics to advanced",
              color: "from-neon-blue",
            },
            {
              icon: "🎨",
              label: "3D Models",
              desc: "Interactive circuits",
              color: "from-neon-cyan",
            },
            {
              icon: "🧠",
              label: "AI Chat",
              desc: "Powered by Gemini",
              color: "from-neon-gold",
            },
            {
              icon: "✅",
              label: "Quizzes",
              desc: "Test knowledge instantly",
              color: "from-neon-blue",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              variants={floatingVariants}
              className="glass p-6 rounded-xl border border-neon-blue/20 hover:border-neon-blue/60 transition-all group hover:bg-neon-blue/5"
              whileHover={{ y: -8, scale: 1.05 }}
            >
              <motion.div
                className="text-4xl mb-3"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: idx * 0.3 }}
              >
                {feature.icon}
              </motion.div>
              <p className="font-bold text-white mb-1 text-lg">{feature.label}</p>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Enhanced scroll indicator */}
      <motion.div
        animate={{ y: [0, 15, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="text-xs text-foreground/50 flex flex-col items-center gap-3">
          <span>Scroll to explore</span>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
            <Zap className="w-5 h-5 text-neon-blue" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
