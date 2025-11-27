"use client"

import React, { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Zap, MessageSquare, Menu, X, Search, Moon, Sun } from "lucide-react"

export function Header() {
  const pathname = usePathname() || "/"
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [prefersDark, setPrefersDark] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // close on route change
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    // keyboard: escape to close
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        setSearchOpen(false)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    // persist theme preference (light/dark) on :root using a CSS class
    const root = document.documentElement
    if (prefersDark) root.classList.add("dark")
    else root.classList.remove("dark")
  }, [prefersDark])

  // close when clicking outside the mobile menu
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!open) return
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [open])

  const navLinks = [
    { href: "/learn", label: "Learn" },
    { href: "/components", label: "Components" },
    { href: "/resources", label: "Resources" },
    { href: "/applications", label: "Applications" },
  ]

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/")

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-b border-border/30">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* left: brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/40 rounded">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-primary to-secondary shadow-md group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg,var(--primary),var(--secondary))' }}>
              Electro Lab
            </span>
          </Link>

          {/* collapsed badge on desktop to show topics count */}
          {/* <div className="hidden md:flex items-center ml-2 px-3 py-1 rounded-full text-sm bg-muted/60 border border-border/50">
            <span className="text-foreground/80">20 topics</span>
          </div> */}
        </div>

        {/* center: links (desktop) */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <a href = {l.href}
              key={l.href}
              className={`text-sm font-medium px-2 py-1 rounded-md transition-colors hover:text-primary ${isActive(l.href) ? "text-primary underline underline-offset-4" : "text-foreground/70"}`}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* right: actions */}
        <div className="flex items-center gap-3">
          {/* search (mobile icon + desktop inline) */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setSearchOpen((s) => !s)}
                aria-expanded={searchOpen}
                aria-label="Search"
                className="p-2 rounded-md hover:bg-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <Search className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -6 }}
                    className="absolute right-0 mt-2 w-80 bg-card/90 dark:bg-slate-800/90 border border-border/30 rounded-lg shadow-lg p-3"
                  >
                    <input
                      autoFocus
                      className="w-full bg-transparent outline-none placeholder:opacity-60"
                      placeholder="Search topics, articles..."
                      aria-label="Search topics"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={() => setPrefersDark((d) => !d)}
              aria-label="Toggle theme"
              className="p-2 rounded-md hover:bg-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {prefersDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <Link href="/chat">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/20 text-primary font-semibold bg-primary/10"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm">Chat</span>
              </motion.button>
            </Link>
          </div>

          {/* mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((s) => !s)}
              className="p-2 rounded-md hover:bg-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden"
          >
            <motion.div
              ref={menuRef}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white/95 dark:bg-slate-900/95 border-t border-border/30 shadow-lg"
            >
              <div className="px-4 pt-4 pb-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">Electro Lab</div>
                      <div className="text-xs text-foreground/70">Learn electronics with bite-sized topics</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setPrefersDark((d) => !d)} className="p-2 rounded-md hover:bg-muted/40 focus:outline-none">
                      {prefersDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  {navLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className={`block px-3 py-2 rounded-md transition-colors ${isActive(l.href) ? "bg-primary/10 text-primary font-semibold" : "text-foreground/80 hover:bg-muted/40"}`}
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>

                <div className="pt-2 border-t border-border/20">
                  <Link href="/chat" className="block w-full text-center px-4 py-2 rounded-md bg-primary/10 text-primary font-semibold" onClick={() => setOpen(false)}>
                    Chat with Electro
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
