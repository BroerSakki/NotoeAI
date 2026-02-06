"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Send, Sparkles, Settings, Plus, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

// Types for easy customization
export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [input])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

      // Call backend API for chat response
    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: userMessage.content,
        }),
      })

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data = await response.json()
      
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      }
      
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Sorry, I couldn't process your request. Please make sure the backend server is running.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card">
        <div className="p-4 border-b border-border">
          <Link href="/home" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">NotoeAI</span>
          </Link>
        </div>
        
        <div className="p-3">
          <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
            <Plus className="w-4 h-4" />
            New Chat
          </Button>
        </div>

        {/* Chat history placeholder */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          <p className="text-xs text-muted-foreground px-2">No previous chats</p>
        </div>

        <div className="p-3 border-t border-border">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </Button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-border">
          <Link href="/home" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">NotoeAI</span>
          </Link>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="max-w-3xl mx-auto py-6 px-4 space-y-6">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && <LoadingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-border p-4">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="relative flex items-end gap-2 rounded-xl border border-border bg-card p-2">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Send a message..."
                rows={1}
                className="flex-1 resize-none bg-transparent px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={!input.trim() || isLoading}
                className="shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="h-full flex flex-col items-center justify-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-6">
        <Sparkles className="w-8 h-8 text-foreground" />
      </div>
      <h2 className="text-2xl font-semibold text-foreground mb-2">How can I help you?</h2>
      <p className="text-muted-foreground text-center max-w-md">
        Start a conversation with your local AI model.
      </p>
    </div>
  )
}

function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user"
  
  return (
    <div className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 p-0 border shadow-md bg-foreground/5">
        <div className={cn(
          "w-full h-full rounded-full flex items-center justify-center",
          isUser ? "bg-teal-300/30" : "bg-slate-700/20"
        )}>
          {isUser ? (
            <User className="w-5 h-5 text-primary-foreground" />
          ) : (
            <Sparkles className="w-5 h-5 text-foreground" />
          )}
        </div>
      </div>
      <div className={cn(
        "rounded-2xl px-4 py-3 max-w-[80%]",
        isUser ? "bg-teal-300/30 text-primary-foreground shadow-lg shadow-primary/25" : "bg-slate-700/20 text-foreground shadow-md"
      )}>
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  )
}

function LoadingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 p-0 border shadow-md bg-foreground/5">
        <div className="w-full h-full rounded-full bg-slate-700/20 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-foreground" />
        </div>
      </div>
      <div className="rounded-2xl p-4 bg-slate-700/20 items-center shadow-md">
        <div className="flex gap-1 items-center">
          <span className="w-2 h-2 rounded-full bg-amber-100 animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 rounded-full bg-amber-100 animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 rounded-full bg-amber-100 animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  )
}
