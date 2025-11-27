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
        <motion.div className="mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">{topic.title}</h1>
              <p className="text-muted-foreground">{topic.description}</p>
            </div>
            <div className="text-right">
              <div className="inline-block bg-neon-blue/20 border border-neon-blue/50 rounded-lg px-4 py-2">
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-semibold text-neon-blue">{topic.duration}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="glass rounded-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex gap-4 mb-8 border-b border-border/30">
            {(["content", "video", "quiz"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-4 font-semibold transition-colors capitalize ${
                  activeTab === tab
                    ? "text-neon-blue border-b-2 border-neon-blue"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
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
              >
                <div className="prose prose-invert max-w-none space-y-6">
                  <div className="whitespace-pre-wrap text-foreground leading-relaxed">{topic.content}</div>

                  <div className="bg-neon-blue/10 border border-neon-blue/30 rounded-lg p-6 mt-8">
                    <h3 className="font-bold text-lg mb-4">Key Points</h3>
                    <ul className="space-y-2">
                      {topic.keyPoints.map((point, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <span className="text-neon-cyan font-bold mt-1">✓</span>
                          <span className="text-foreground">{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
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
                        className="bg-muted/30 rounded-lg p-6 border border-border/50"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: qIdx * 0.1 }}
                      >
                        <h4 className="font-semibold mb-4">
                          Question {qIdx + 1}: {question.question}
                        </h4>
                        <div className="space-y-2">
                          {question.options.map((option, optIdx) => (
                            <motion.button
                              key={optIdx}
                              onClick={() => handleQuizAnswer(question.id, optIdx)}
                              className={`w-full text-left p-3 rounded-lg border transition-all ${
                                quizAnswers[question.id] === optIdx
                                  ? "bg-neon-cyan/20 border-neon-cyan text-neon-cyan"
                                  : "bg-muted/20 border-border/50 text-foreground hover:border-border"
                              }`}
                              whileHover={{ x: 5 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <span className="font-semibold">{String.fromCharCode(65 + optIdx)}.</span> {option}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    ))}

                    <motion.button
                      onClick={() => setShowResults(true)}
                      className="w-full bg-neon-blue/20 border border-neon-blue text-neon-blue py-3 rounded-lg font-semibold hover:bg-neon-blue/30 transition-all"
                      whileHover={{ scale: 1.02 }}
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
                    <div className="bg-neon-green/10 border border-neon-green/30 rounded-lg p-8 text-center">
                      <h3 className="text-2xl font-bold mb-2 text-neon-green">Quiz Results</h3>
                      <p className="text-4xl font-bold mb-2 text-neon-blue">{Math.round(score)}%</p>
                      <p className="text-muted-foreground">
                        You got {Math.round(score / (100 / topic.quiz.length))} out of {topic.quiz.length} correct
                      </p>
                    </div>

                    <div className="space-y-4">
                      {topic.quiz.map((question) => (
                        <div
                          key={question.id}
                          className={`p-4 rounded-lg border ${
                            quizAnswers[question.id] === question.correctAnswer
                              ? "bg-green-500/10 border-green-500/30"
                              : "bg-red-500/10 border-red-500/30"
                          }`}
                        >
                          <p className="font-semibold mb-2">{question.question}</p>
                          <p className="text-sm text-muted-foreground mb-2">
                            {quizAnswers[question.id] === question.correctAnswer ? "✓ Correct" : "✗ Incorrect"}
                          </p>
                          <p className="text-sm">{question.explanation}</p>
                        </div>
                      ))}
                    </div>

                    <motion.button
                      onClick={() => {
                        setShowResults(false)
                        setQuizAnswers({})
                      }}
                      className="w-full bg-neon-blue/20 border border-neon-blue text-neon-blue py-3 rounded-lg font-semibold hover:bg-neon-blue/30 transition-all"
                      whileHover={{ scale: 1.02 }}
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
