export interface Message {
  role: "user" | "assistant"
  content: string
}

export async function generateGeminiResponse(messages: Message[]): Promise<string> {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    })

    if (!response.ok) {
      console.error("[v0] Chat API error:", response.status, response.statusText)
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return data.response || "I'm having trouble responding. Please try again."
  } catch (error) {
    console.error("[v0] Chat failed:", error)
    return "Sorry, I encountered an error. Please try again."
  }
}
