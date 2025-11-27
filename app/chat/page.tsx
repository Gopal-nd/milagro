"use client"

import { useRef, useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion, AnimatePresence } from "framer-motion"
import { generateGeminiResponse, type Message } from "@/lib/gemini-client"

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm Electro, your electronics tutor. Ask me anything about circuits, components, Arduino, IoT, or any other electronics topic!",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const response = await generateGeminiResponse([...messages, userMessage])
      const assistantMessage: Message = { role: "assistant", content: response }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Chat error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen mt-10 bg-background flex flex-col">
      <Header />

      <div className="flex-1 container mx-auto max-w-3xl px-4 py-8 flex flex-col">
        {/* Messages */}
        <div className="flex-1 glass rounded-xl p-6 overflow-y-auto mb-6 space-y-4">
          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    msg.role === "user"
                      ? "border text-foreground"
                      : "border text-foreground"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div 
                className="border rounded-lg px-4 py-3"
                style={{ 
                  backgroundColor: 'oklch(from var(--secondary) l c h / 0.1)',
                  borderColor: 'oklch(from var(--secondary) l c h / 0.5)'
                }}
              >
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--secondary)' }} />
                  <div className="w-2 h-2 rounded-full animate-bounce delay-100" style={{ backgroundColor: 'var(--secondary)' }} />
                  <div className="w-2 h-2 rounded-full animate-bounce delay-200" style={{ backgroundColor: 'var(--secondary)' }} />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="glass rounded-xl p-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about electronics, circuits, Arduino, IoT..."
              className="flex-1 bg-input rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': 'oklch(from var(--primary) l c h / 0.5)' } as React.CSSProperties}
              disabled={loading}
            />
            <motion.button
              onClick={handleSend}
              disabled={loading}
              className="border px-6 py-2 rounded-lg font-semibold disabled:opacity-50 transition-all"
              style={{ 
                backgroundColor: 'oklch(from var(--primary) l c h / 0.2)',
                borderColor: 'var(--primary)',
                color: 'var(--primary)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'oklch(from var(--primary) l c h / 0.3)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'oklch(from var(--primary) l c h / 0.2)'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? "Sending..." : "Send"}
            </motion.button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
