"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { PageTransition } from "@/components/fade-in"
import FadeIn from "@/components/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/stagger"
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
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(blinkInterval)
  }, [])

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + text[index])
        setIndex(index + 1)
      }, 35)
      return () => clearTimeout(timeout)
    }
  }, [index, text])

  return (
    <span className="relative">
      {displayed}
      <span
        className={`inline-block w-[3px] h-[0.85em] bg-primary ml-1 align-middle rounded-full transition-opacity duration-100 ${
          showCursor ? "opacity-100" : "opacity-20"
        }`}
        style={{ marginTop: "-0.1em" }}
      />
    </span>
  )
}

function HeroParallaxBlobs() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll({
    target: containerRef,
  })

  const blob1Y = useTransform(scrollY, [0, 500], [0, -80])
  const blob1X = useTransform(scrollY, [0, 500], [0, 40])
  const blob1Scale = useTransform(scrollY, [0, 500], [1, 0.8])
  const blob1Opacity = useTransform(scrollY, [0, 500], [0.6, 0.15])

  const blob2Y = useTransform(scrollY, [0, 500], [0, 60])
  const blob2X = useTransform(scrollY, [0, 500], [0, -30])
  const blob2Scale = useTransform(scrollY, [0, 500], [1, 0.75])
  const blob2Opacity = useTransform(scrollY, [0, 500], [0.45, 0.1])

  const blob3Y = useTransform(scrollY, [0, 500], [0, 100])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Taste-style ambient orbs — larger, more visible */}
      <motion.div
        className="orb top-[-20%] -left-40 w-[40rem] h-[40rem] bg-primary/[0.04] blur-[140px]"
        style={{ y: blob1Y, x: blob1X, scale: blob1Scale, opacity: blob1Opacity }}
      />
      <motion.div
        className="orb top-[30%] -right-40 w-[35rem] h-[35rem] bg-primary/[0.03] blur-[130px]"
        style={{ y: blob2Y, x: blob2X, scale: blob2Scale, opacity: blob2Opacity }}
      />
      <motion.div
        className="orb -bottom-20 left-1/2 -translate-x-1/2 w-[50rem] h-[20rem] bg-primary/[0.02] blur-[120px]"
        style={{ y: blob3Y }}
      />
    </div>
  )
}

export default function Home() {
  const allSkills = skillCategories.flatMap((cat) => cat.skills)
  const aboutPreview = aboutText.split("\n\n")[0]

  return (
    <PageTransition>
      {/* Hero — asymmetric, left-aligned (DESIGN_VARIANCE=7) */}
      <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-dot-grid">
        <HeroParallaxBlobs />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 py-20 md:py-0">
          <div className="md:max-w-[65%]">
            {/* Availability badge */}
            <FadeIn delay={0.1} direction="up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border text-muted-foreground text-sm mb-8">
                <Terminal className="w-3.5 h-3.5 text-primary" />
                <span>disponible para proyectos</span>
              </div>
            </FadeIn>

            {/* Typing title */}
            <FadeIn delay={0.3} direction="up">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-5 font-heading heading-balanced">
                <TypingTitle text={personalInfo.title} />
              </h1>
            </FadeIn>

            {/* Subtitle */}
            <FadeIn delay={0.6} direction="up">
              <p className="text-base sm:text-lg text-muted-foreground max-w-xl mb-10">
                {personalInfo.subtitle}
              </p>
            </FadeIn>

            {/* CTA Buttons — emil-design-eng: active scale, taste sheen on primary */}
            <FadeIn delay={0.8} direction="up">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/projects"
                  className="sheen inline-flex items-center gap-2 rounded-xl px-7 h-12 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 ease-out active:scale-[0.97] shadow-[0_8px_24px_-12px_rgba(0,0,0,0.4)] hover:shadow-[0_14px_32px_-12px_rgba(0,0,0,0.55)]"
                >
                  <ChevronRight className="w-4 h-4" />
                  Ver Proyectos
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg px-6 h-11 text-sm border border-primary/30 text-primary transition-colors duration-200 hover:border-primary/50 active:scale-[0.97]"
                >
                  <Download className="w-4 h-4" />
                  Solicitar CV
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg px-6 h-11 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 active:scale-[0.97]"
                >
                  <Send className="w-4 h-4" />
                  Contacto
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right-side accent — subtle geometric hint (empty space = breathing room) */}
        </div>
      </section>

      {/* About Preview — clean, no eye-brow overuse */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn delay={0.1} direction="up">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              <h2 className="text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground whitespace-nowrap">
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
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
              >
                Leer más sobre mí
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Tech Stack — staggered pill badges */}
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
          </FadeIn>

          <StaggerContainer staggerDelay={0.04}>
            <div className="flex flex-wrap justify-center gap-3">
              {allSkills.map((skill) => (
                <StaggerItem key={skill}>
                  <Badge
                    variant="secondary"
                    className="px-4 py-2 text-sm rounded-lg border-primary/10 hover:border-primary/30 hover:bg-primary/5 transition-colors duration-200 active:scale-[0.97] cursor-default"
                  >
                    {skill}
                  </Badge>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>
    </PageTransition>
  )
}
