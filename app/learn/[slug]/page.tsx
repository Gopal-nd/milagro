"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LEARNING_TOPICS } from "@/lib/seed-data"
import { motion, AnimatePresence } from "framer-motion"
import { useParams } from "next/navigation"

export default function TopicPage() {
  const [activeTab, setActiveTab] = useState<"content" | "video" | "quiz">("content")
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: number }>({})
  const [showResults, setShowResults] = useState(false)
  const params = useParams()
  const slug = params.slug as string

  const topic = LEARNING_TOPICS.find((t) => t.slug === slug)

  const handleQuizAnswer = (questionId: string, answerIndex: number) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: answerIndex }))
  }

  const calculateScore = () => {
    let correct = 0
    topic?.quiz.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correct++
      }
    })
    return (correct / topic?.quiz.length) * 100
  }

  const score = showResults ? calculateScore() : 0

  if (!topic) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">Topic not found</p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div 
          className="mb-8 glass border-glow-blue p-6 rounded-xl" 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
            <div className="flex-1">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-3 text-foreground bg-clip-text text-transparent"
                style={{ 
                  backgroundImage: 'linear-gradient(to right, var(--primary), var(--secondary), var(--accent))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {topic.title}
              </motion.h1>
              <p className="text-lg text-foreground/80 leading-relaxed">{topic.description}</p>
            </div>
            <motion.div 
              className="text-right"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div 
                className="inline-block border-glow-blue rounded-lg px-6 py-3"
                style={{ 
                  backgroundImage: 'linear-gradient(to bottom right, oklch(from var(--primary) l c h / 0.2), oklch(from var(--secondary) l c h / 0.2))'
                }}
              >
                <p className="text-xs text-foreground/70 mb-1 uppercase tracking-wide">Duration</p>
                <p className="font-bold text-lg" style={{ color: 'var(--primary)' }}>{topic.duration}</p>
              </div>
            </motion.div>
          </div>
          
          {/* Category and Difficulty badges */}
          <div className="flex gap-3 mt-4">
            <span className="px-3 py-1 bg-primary/20 border border-primary/50 rounded-full text-sm font-medium text-primary">
              {topic.category}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              topic.difficulty === 'beginner' 
                ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                : topic.difficulty === 'intermediate'
                ? 'bg-yellow-500/20 border border-yellow-500/50 text-yellow-400'
                : 'bg-red-500/20 border border-red-500/50 text-red-400'
            }`}>
              {topic.difficulty.charAt(0).toUpperCase() + topic.difficulty.slice(1)}
            </span>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="glass border-glow rounded-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex gap-2 mb-8 border-b border-border/30 pb-2">
            {(["content", "video", "quiz"] as const).map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-6 font-semibold transition-all capitalize relative ${
                  activeTab === tab
                    ? ""
                    : "text-foreground/60 hover:text-foreground"
                }`}
                style={activeTab === tab ? { color: 'var(--primary)' } : {}}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ backgroundImage: 'linear-gradient(to right, var(--primary), var(--secondary))' }}
                    layoutId="activeTab"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Content Tab */}
            {activeTab === "content" && (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="prose prose-invert max-w-none">
                  <div 
                    className="text-foreground/90 leading-relaxed space-y-4"
                    dangerouslySetInnerHTML={{ 
                      __html: topic.content
                        .split('\n')
                        .map(line => {
                          // Format headings
                          if (line.startsWith('# ')) return `<h1 class="text-4xl font-bold mb-4 text-foreground mt-8 first:mt-0">${line.slice(2)}</h1>`
                          if (line.startsWith('## ')) return `<h2 class="text-3xl font-bold mb-3 text-foreground mt-6">${line.slice(3)}</h2>`
                          if (line.startsWith('### ')) return `<h3 class="text-2xl font-semibold mb-2 text-foreground mt-4">${line.slice(4)}</h3>`
                          // Format code blocks
                          if (line.trim().startsWith('```')) return ''
                          // Format lists
                          if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
                            return `<li class="ml-6 mb-2 text-foreground/90">${line.trim().slice(2)}</li>`
                          }
                          // Format bold
                          let formatted = line.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-foreground">$1</strong>')
                          // Format inline code
                          formatted = formatted.replace(/`(.+?)`/g, '<code class="bg-muted/50 px-2 py-1 rounded text-sm font-mono text-primary border" style="border-color: rgba(0, 188, 212, 0.3)">$1</code>')
                          // Regular paragraphs
                          if (line.trim()) {
                            return `<p class="mb-4 text-foreground/90 leading-relaxed">${formatted}</p>`
                          }
                          return ''
                        })
                        .filter(Boolean)
                        .join('')
                    }}
                  />
                </div>

                <motion.div 
                  className="border-glow-blue rounded-lg p-6 mt-8"
                  style={{ 
                    backgroundImage: 'linear-gradient(to bottom right, oklch(from var(--primary) l c h / 0.1), oklch(from var(--secondary) l c h / 0.1), oklch(from var(--primary) l c h / 0.1))'
                  }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="font-bold text-xl mb-4 text-foreground flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      ⚡
                    </motion.span>
                    Key Points
                  </h3>
                  <ul className="space-y-3">
                    {topic.keyPoints.map((point, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <motion.span 
                          className="font-bold mt-1 text-xl"
                          style={{ color: 'var(--secondary)' }}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                        >
                          ✓
                        </motion.span>
                        <span className="text-foreground/90 flex-1">{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            )}

            {/* Video Tab */}
            {activeTab === "video" && (
              <motion.div
                key="video"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {topic.videoUrl ? (
                  <div className="aspect-video rounded-lg overflow-hidden bg-black/50">
                    <iframe
                      width="100%"
                      height="100%"
                      src={topic.videoUrl}
                      title={topic.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>Video coming soon</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Quiz Tab */}
            {activeTab === "quiz" && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {!showResults ? (
                  <div className="space-y-6">
                    {topic.quiz.map((question, qIdx) => (
                      <motion.div
                        key={question.id}
                        className="glass border-glow rounded-xl p-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: qIdx * 0.1 }}
                      >
                        <h4 className="font-bold text-lg mb-4 text-foreground">
                          Question {qIdx + 1}: {question.question}
                        </h4>
                        <div className="space-y-2">
                          {question.options.map((option, optIdx) => (
                            <motion.button
                              key={optIdx}
                              onClick={() => handleQuizAnswer(question.id, optIdx)}
                              className={`w-full text-left p-4 rounded-xl border transition-all ${
                                quizAnswers[question.id] === optIdx
                                  ? "border-glow-cyan font-semibold"
                    style={quizAnswers[question.id] === optIdx ? { 
                      backgroundColor: 'oklch(from var(--secondary) l c h / 0.2)',
                      color: 'var(--secondary)'
                    } : {}}
                                  : "bg-muted/30 border-border/50 text-foreground hover:border-glow-blue hover:bg-muted/50"
                              }`}
                              whileHover={{ x: 5, scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <span className="font-bold mr-2">{String.fromCharCode(65 + optIdx)}.</span> 
                              <span>{option}</span>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    ))}

                    <motion.button
                      onClick={() => setShowResults(true)}
                      className="w-full border-glow-blue py-4 rounded-xl font-bold transition-all"
                      style={{ 
                        backgroundImage: 'linear-gradient(to right, oklch(from var(--primary) l c h / 0.2), oklch(from var(--secondary) l c h / 0.2))',
                        color: 'var(--primary)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundImage = 'linear-gradient(to right, oklch(from var(--primary) l c h / 0.3), oklch(from var(--secondary) l c h / 0.3))'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundImage = 'linear-gradient(to right, oklch(from var(--primary) l c h / 0.2), oklch(from var(--secondary) l c h / 0.2))'
                      }}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Submit Quiz
                    </motion.button>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                  >
                    <motion.div 
                      className="border-glow-cyan rounded-lg p-8 text-center"
                      style={{ 
                        backgroundImage: 'linear-gradient(to bottom right, rgba(34, 197, 94, 0.2), oklch(from var(--secondary) l c h / 0.2))'
                      }}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <h3 className="text-2xl font-bold mb-2 text-green-400">Quiz Results</h3>
                      <motion.p 
                        className="text-5xl font-bold mb-2 bg-clip-text text-transparent"
                        style={{ 
                          backgroundImage: 'linear-gradient(to right, var(--primary), var(--secondary))',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                        {Math.round(score)}%
                      </motion.p>
                      <p className="text-foreground/80 text-lg">
                        You got {Math.round(score / (100 / topic.quiz.length))} out of {topic.quiz.length} correct
                      </p>
                    </motion.div>

                    <div className="space-y-4">
                      {topic.quiz.map((question) => (
                        <motion.div
                          key={question.id}
                          className={`p-5 rounded-xl border ${
                            quizAnswers[question.id] === question.correctAnswer
                              ? "bg-green-500/20 border-glow-cyan"
                              : "bg-red-500/20 border-red-500/50"
                          }`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <p className="font-bold mb-2 text-foreground">{question.question}</p>
                          <p className={`text-sm font-semibold mb-3 ${
                            quizAnswers[question.id] === question.correctAnswer 
                              ? "text-green-400" 
                              : "text-red-400"
                          }`}>
                            {quizAnswers[question.id] === question.correctAnswer ? "✓ Correct" : "✗ Incorrect"}
                          </p>
                          <p className="text-sm text-foreground/80 leading-relaxed">{question.explanation}</p>
                        </motion.div>
                      ))}
                    </div>

                    <motion.button
                      onClick={() => {
                        setShowResults(false)
                        setQuizAnswers({})
                      }}
                      className="w-full border-glow-blue py-4 rounded-xl font-bold transition-all"
                      style={{ 
                        backgroundImage: 'linear-gradient(to right, oklch(from var(--primary) l c h / 0.2), oklch(from var(--secondary) l c h / 0.2))',
                        color: 'var(--primary)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundImage = 'linear-gradient(to right, oklch(from var(--primary) l c h / 0.3), oklch(from var(--secondary) l c h / 0.3))'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundImage = 'linear-gradient(to right, oklch(from var(--primary) l c h / 0.2), oklch(from var(--secondary) l c h / 0.2))'
                      }}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Retake Quiz
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <Footer />
    </main>
  )
}
