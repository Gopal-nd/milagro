import { CHAT_RULES } from "./seed-data"
import { fuzzyMatch } from "./utils"

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export class ChatbotEngine {
  private rules: any

  constructor() {
    this.rules = CHAT_RULES
  }

  /**
   * Process user input and generate a response using rule-based matching
   */
  async generateResponse(userMessage: string): Promise<{
    response: string
    followUp?: string[]
  }> {
    // Simulate thinking delay
    await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 1000))

    // Find matching rule
    const matchedRule = this.rules.find((rule:any) => fuzzyMatch(userMessage, rule.keywords))

    if (matchedRule) {
      return {
        response: matchedRule.response,
        followUp: matchedRule.followUp,
      }
    }

    // Fallback response
    return {
      response: `I'm learning about "${userMessage.slice(0, 30)}..." - this is an interesting topic! Try asking me about:\n\n• Resistors and Ohm's Law\n• Capacitors and filtering\n• Transistors and amplification\n• Arduino and microcontrollers\n• Circuit design basics\n\nWhat would you like to know?`,
      followUp: ["Explain Ohm's law", "What is Arduino?", "Show resistor color code"],
    }
  }
}

export function createChatbot() {
  return new ChatbotEngine()
}
