import { type NextRequest, NextResponse } from "next/server"

interface Message {
  role: "user" | "assistant"
  content: string
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      console.error("[v0] GEMINI_API_KEY environment variable is not set")
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    const systemPrompt = `You are Electro, an expert electronics tutor. Help users learn about:
- Electronic components (resistors, capacitors, transistors, diodes, inductors, ICs)
- Circuit theory and Ohm's Law
- Arduino and microcontroller programming
- IoT and embedded systems
- Robotics and motor control
- Power supplies and regulation

Be educational, clear, and encourage hands-on learning. Provide code examples when relevant.
If unsure, suggest learning resources or related topics.`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: systemPrompt,
              },
            ],
          },
          contents: messages.map((msg: Message) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [
              {
                text: msg.content,
              },
            ],
          })),
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      },
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("[v0] Gemini API error:", response.status, errorData)
      return NextResponse.json({ error: "Failed to get response from Gemini" }, { status: response.status })
    }

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Unable to generate response."

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
