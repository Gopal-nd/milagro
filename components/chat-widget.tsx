"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Trash2, MessageCircle, Maximize2 } from "lucide-react"
import { useChat } from "@/hooks/use-chat"
import Link from "next/link"

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const { messages, isLoading, sendMessage, clearHistory } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue)
      setInputValue("")
    }
  }

  const hasMessages = messages.length > 0

  return (
    <>
      {/* Chat widget button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-neon-blue to-neon-cyan flex items-center justify-center text-white shadow-lg neon-glow-blue hover:shadow-xl transition-shadow"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6" />
            {hasMessages && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-0 right-0 w-4 h-4 bg-neon-gold rounded-full border-2 border-dark-bg"
              />
            )}
          </>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-40 w-96 h-[32rem] glass border border-neon-blue/30 rounded-lg shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-neon-blue to-neon-cyan p-4 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold">Electro Assistant</h3>
                <p className="text-xs opacity-90">Powered by Gemini AI</p>
              </div>
              <div className="flex gap-2">
                <Link href="/chat">
                  <motion.button
                    className="p-1 hover:bg-white/20 rounded transition-colors"
                    title="Open fullscreen"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Maximize2 className="w-4 h-4" />
                  </motion.button>
                </Link>
                <motion.button
                  onClick={clearHistory}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                  title="Clear history"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-12 h-12 bg-neon-blue/10 rounded-full flex items-center justify-center mb-3 neon-glow-blue">
                    <MessageCircle className="w-6 h-6 text-neon-blue" />
                  </div>
                  <p className="font-semibold mb-1">Welcome to Electro AI!</p>
                  <p className="text-xs text-muted-foreground">
                    Ask me anything about electronics, circuits, Arduino, IoT, or any component!
                  </p>
                </div>
              ) : (
                <>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`px-4 py-2 rounded-lg max-w-xs text-sm ${
                          msg.role === "user"
                            ? "bg-neon-blue/20 border border-neon-blue text-foreground"
                            : "bg-neon-cyan/10 border border-neon-cyan/30 text-foreground"
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                      <div className="bg-neon-cyan/10 border border-neon-cyan/30 px-4 py-2 rounded-lg">
                        <div className="flex gap-1">
                          <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                            className="w-2 h-2 bg-neon-cyan rounded-full"
                          />
                          <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.1 }}
                            className="w-2 h-2 bg-neon-cyan rounded-full"
                          />
                          <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                            className="w-2 h-2 bg-neon-cyan rounded-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border/20 bg-background/30">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask me anything..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  disabled={isLoading}
                  className="flex-1 px-3 py-2 bg-input border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neon-blue/50 disabled:opacity-50"
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="px-3 py-2 bg-neon-blue/20 border border-neon-blue text-neon-blue rounded-lg hover:bg-neon-blue/30 transition-colors disabled:opacity-50 flex items-center gap-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
