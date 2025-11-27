"use client"

import { Zap } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/20 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
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
          <div>
            <h4 className="font-semibold mb-4 text-sm">Resources</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <a href="#" className="hover:text-primary transition">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Community
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm">Connect</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <a href="#" className="hover:text-primary transition">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Discord
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/20 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-foreground/60">
          <p>&copy; 2025 Electro. Interactive Electronics Learning Platform.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition">
              Privacy
            </a>
            <a href="#" className="hover:text-primary transition">
              Terms
            </a>
            <a href="#" className="hover:text-primary transition">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
