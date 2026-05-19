"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { PageTransition } from "@/components/fade-in"
import FadeIn from "@/components/fade-in"
import { Badge } from "@/components/ui/badge"
import { personalInfo, skillCategories, aboutText } from "@/lib/data"
import {
  ArrowRight,
  ChevronRight,
  Terminal,
  Download,
  Send,
} from "lucide-react"

function TypingTitle({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("")
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + text[index])
        setIndex(index + 1)
      }, 40)
      return () => clearTimeout(timeout)
    }
  }, [index, text])

  return (
    <span>
      {displayed}
      <span className="inline-block w-[3px] h-[1em] bg-primary ml-1 animate-pulse align-middle" />
    </span>
  )
}

export default function Home() {
  const allSkills = skillCategories.flatMap((cat) => cat.skills)
  // First paragraph of aboutText for the preview
  const aboutPreview = aboutText.split("\n\n")[0]

  return (
    <PageTransition>
      {/* ─── Hero Section ─── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-grid">
        {/* Blue glow blobs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-20 text-center">
          {/* Terminal badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/50 text-muted-foreground text-sm mb-10">
            <Terminal className="w-3.5 h-3.5 text-primary" />
            <span>disponible para proyectos</span>
          </div>

          {/* Typing title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6 font-heading">
            <TypingTitle text={personalInfo.title} />
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-mono">
            {personalInfo.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 glow-blue rounded-xl px-8 h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
              Ver Proyectos
            </Link>
            <span className="inline-flex items-center gap-2 rounded-xl px-8 h-12 text-base border border-primary/30 text-primary cursor-default">
              <Download className="w-4 h-4" />
              Ver CV
            </span>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl px-8 h-12 text-base text-muted-foreground hover:text-foreground transition-colors"
            >
              <Send className="w-4 h-4" />
              Contacto
            </Link>
          </div>
        </div>
      </section>

      {/* ─── About Preview Section ─── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn delay={0.1} direction="up">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap">
                Sobre mí
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>

            <p className="text-lg leading-relaxed text-muted-foreground max-w-3xl mx-auto text-center mb-8">
              {aboutPreview}
            </p>

            <div className="text-center">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                Leer más sobre mí
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Tech Stack Section ─── */}
      <section className="py-24 px-6 border-t border-border/50">
        <div className="max-w-4xl mx-auto">
          <FadeIn delay={0.1} direction="up">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 font-heading">
                Tech Stack
              </h2>
              <p className="text-muted-foreground">
                Tecnologías con las que trabajo habitualmente
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {allSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="px-4 py-2 text-sm rounded-lg border-primary/10 hover:border-primary/30 hover:bg-primary/5 transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  )
}
