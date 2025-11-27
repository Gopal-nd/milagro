"use client"

import { useState, useCallback } from "react"
import { generateGeminiResponse, type Message } from "@/lib/gemini-client"
import { getFromLocalStorage, saveToLocalStorage } from "@/lib/utils"

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const CHAT_STORAGE_KEY = "electro:chat:v1"

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const stored = getFromLocalStorage(CHAT_STORAGE_KEY, [])
    return Array.isArray(stored)
      ? stored.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }))
      : []
  })

  const [isLoading, setIsLoading] = useState(false)

  const updateMessages = useCallback((newMessages: ChatMessage[]) => {
    setMessages(newMessages)
    saveToLocalStorage(CHAT_STORAGE_KEY, newMessages)
  }, [])

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return

      const userMessage: ChatMessage = {
        id: `msg-${Date.now()}-${Math.random()}`,
        role: "user",
        content: content.trim(),
        timestamp: new Date(),
      }

      const newMessages = [...messages, userMessage]
      updateMessages(newMessages)
      setIsLoading(true)

      try {
        const geminiMessages: Message[] = newMessages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        }))

        const response = await generateGeminiResponse(geminiMessages)

        const botMessage: ChatMessage = {
          id: `msg-${Date.now()}-${Math.random()}`,
          role: "assistant",
          content: response,
          timestamp: new Date(),
        }

        updateMessages([...newMessages, botMessage])
      } catch (error) {
        console.error("[v0] Chat error:", error)
        const errorMessage: ChatMessage = {
          id: `msg-${Date.now()}-${Math.random()}`,
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
          timestamp: new Date(),
        }
        updateMessages([...newMessages, errorMessage])
      } finally {
        setIsLoading(false)
      }
    },
    [messages, isLoading, updateMessages],
  )

  const clearHistory = useCallback(() => {
    updateMessages([])
  }, [updateMessages])

  return {
    messages,
    isLoading,
    sendMessage,
    clearHistory,
  }
}
