import React from "react"
import Link from "next/link"
import { Sparkles, MessageSquare, Settings, FileText, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { theme } from "@/components/ui/themes/themes"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-8 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-primary/5 to-secondary/5 opacity-50"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <Badge variant="outline" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border-primary/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            Self-hosted AI Solutions
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8">
            Meet NotoeAI
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            The AI assistant that works for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/chat">
              <Button
                size="lg"
                variant="default"
                className="bg-lime-200/5"
              >
                <MessageSquare className="w-5 h-5" />
                Start Chatting
              </Button>
            </Link>
            <Link href="/settings">
              <Button 
                size="lg"
                variant="secondary"
                className="bg-lime-200/5"
              >
                <Settings className="w-5 h-5" />
                Settings
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-card/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Powerful Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need for intelligent AI interactions without compromising privacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border border-border hover:bg-foreground/10 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2">
              <CardHeader className="text-center pb-2">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:bg-primary/20">
                  <Zap className="w-7 h-7 text-primary transition-all duration-300 hover:text-primary/90" />
                </div>
                <CardTitle className="text-xl">Local Processing</CardTitle>
                <CardDescription>
                  All computations happen on your device. Your data stays private.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No external servers, no data transfers. Enjoy complete control over your information.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border hover:bg-foreground/10 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2">
              <CardHeader className="text-center pb-2">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:bg-primary/20">
                  <MessageSquare className="w-7 h-7 text-primary transition-all duration-300 hover:text-primary/90" />
                </div>
                <CardTitle className="text-xl">Natural Conversations</CardTitle>
                <CardDescription>
                  Chat with AI that understands context and provides meaningful responses.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Have conversations that feel natural. The AI remembers context and provides relevant answers.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border hover:bg-foreground/10 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2">
              <CardHeader className="text-center pb-2">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:bg-primary/20">
                  <FileText className="w-7 h-7 text-primary transition-all duration-300 hover:text-primary/90" />
                </div>
                <CardTitle className="text-xl">Note Taking</CardTitle>
                <CardDescription>
                  Capture and organize your thoughts with AI-powered note taking.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Turn conversations into organized notes automatically. Never lose track of important information.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-8 lg:px-12 border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">NotoeAI</span>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link href="/home/documentation" className="hover:text-primary transition-colors">
              Documentation
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 NotoeAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
