import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Fuzzy matching for chatbot
export function fuzzyMatch(query: string, keywords: string[]): boolean {
  const normalizedQuery = query.toLowerCase().trim()
  return keywords.some((keyword) => normalizedQuery.includes(keyword.toLowerCase()))
}

// LocalStorage utilities
export function getFromLocalStorage(key: string, defaultValue: any = null) {
  if (typeof window === "undefined") return defaultValue
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

export function saveToLocalStorage(key: string, value: any) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    console.error(`Failed to save to localStorage: ${key}`)
  }
}

// Component utilities
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}
