"use client"

import React from "react"
import Link from "next/link"
import { ArrowLeft, Sparkles, Sun, Moon, Monitor, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

type ThemeOption = "light" | "dark" | "system"

const themeOptions: { value: ThemeOption; label: string; icon: React.ReactNode; description: string }[] = [
  {
    value: "light",
    label: "Light",
    icon: <Sun className="w-5 h-5" />,
    description: "A clean, bright interface",
  },
  {
    value: "dark",
    label: "Dark",
    icon: <Moon className="w-5 h-5" />,
    description: "Easy on the eyes, great for night use",
  },
  {
    value: "system",
    label: "System",
    icon: <Monitor className="w-5 h-5" />,
    description: "Follows your device settings",
  },
]

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="icon" className="bg-transparent">
            <Link href="/home">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">Settings</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8 max-w-2xl mx-auto w-full">
        <div className="space-y-8">
          {/* Theme Section */}
          <section className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Appearance</h2>
              <p className="text-sm text-muted-foreground">
                Customize how NotoeAI looks on your device
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {themeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTheme(option.value)}
                  className={`relative p-4 rounded-xl border text-left transition-all ${
                    theme === option.value
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-muted-foreground/30"
                  }`}
                >
                  {theme === option.value && (
                    <div className="absolute top-3 right-3">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                      theme === option.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground"
                    }`}
                  >
                    {option.icon}
                  </div>
                  <h3 className="font-medium text-foreground">{option.label}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Placeholder for future settings */}
          <section className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Model Configuration</h2>
              <p className="text-sm text-muted-foreground">
                Configure your local AI model settings
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <p className="text-sm text-muted-foreground">
                Model configuration options coming soon. You will be able to select your local model endpoint, adjust parameters, and more.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">About</h2>
              <p className="text-sm text-muted-foreground">
                Application information
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Version</span>
                <span className="text-sm text-foreground">0.0.1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">License</span>
                <span className="text-sm text-foreground">Apache License 2.0</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}