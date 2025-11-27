"use client"

import type { ReactNode } from "react"
import { ChatWidget } from "./chat-widget"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ChatWidget />
    </>
  )
}
