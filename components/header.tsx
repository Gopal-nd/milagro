"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Zap, MessageSquare } from "lucide-react"

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 w-full z-50 glass backdrop-blur-md border-b"
      style={{ borderBottomColor: 'rgba(0, 188, 212, 0.5)' }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center neon-glow-blue group-hover:neon-glow-cyan transition-all">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span 
            className="text-xl font-bold bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(to right, var(--primary), var(--secondary), var(--accent))' }}
          >
            Electro Lab
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/learn" className="text-sm hover:text-primary transition-colors font-medium">
            Learn (20 Topics)
          </Link>
          <Link href="/components" className="text-sm hover:text-primary transition-colors font-medium">
            Components
          </Link>
          <Link href="/resources" className="text-sm hover:text-primary transition-colors font-medium">
            Resources
          </Link>
          <Link href="/applications" className="text-sm hover:text-primary transition-colors font-medium">
            Applications
          </Link>
        </div>

        <Link href="/chat">
          <motion.button
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 border border-primary text-primary rounded-lg font-semibold transition-all neon-glow-blue"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ color: 'var(--primary)' }}
          >
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm">Chat with Electro</span>
          </motion.button>
        </Link>
      </nav>
    </motion.header>
  )
}
