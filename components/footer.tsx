"use client"

import { Zap } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/20 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-primary" />
              <span className="font-semibold">Electro</span>
            </div>
            <p className="text-sm text-foreground/60">Your interactive electronics learning companion.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm">Learn</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <a href="/components" className="hover:text-primary transition">
                  Components
                </a>
              </li>
              <li>
                <a href="/applications" className="hover:text-primary transition">
                  Applications
                </a>
              </li>
              <li>
                <a href="/resources" className="hover:text-primary transition">
                  Resources
                </a>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </footer>
  )
}
