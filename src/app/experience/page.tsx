"use client"

import { motion } from "framer-motion"
import { Calendar, CheckCircle2, Briefcase } from "lucide-react"
import { PageTransition } from "@/components/fade-in"
import FadeIn from "@/components/fade-in"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { experience } from "@/lib/data"
import { cn } from "@/lib/utils"

const easeOut: [number, number, number, number] = [0.23, 1, 0.32, 1]

function TimelineDot() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Subtle pulse ring */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: easeOut,
        }}
        className="absolute w-7 h-7 rounded-full bg-primary/15"
      />
      {/* Outer ring */}
      <div className="relative w-5 h-5 rounded-full bg-background ring-2 ring-primary/50 flex items-center justify-center">
        {/* Inner dot */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: easeOut,
          }}
          className="w-2 h-2 rounded-full bg-primary"
        />
      </div>
    </div>
  )
}

export default function ExperiencePage() {
  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header */}
        <div className="mb-16 text-center">
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-3 mb-4">
              <Briefcase className="w-8 h-8 text-primary" />
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight heading-balanced">
                Experiencia
              </h1>
            </div>
            <Separator className="mx-auto my-6 w-24 bg-primary/50" />
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Dónde he trabajado y qué resultados he conseguido.
            </p>
          </FadeIn>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline line - visible on md+ */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-border hidden md:block" />

          {/* Timeline line - left side on mobile */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-border md:hidden" />

          <div className="space-y-16 md:space-y-20">
            {experience.map((exp, index) => {
              const isEven = index % 2 === 0
              return (
                <FadeIn key={index} delay={0.15 * index} direction="up">
                  <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-start gap-4 md:gap-8">
                    {/* Content column (alternates sides on desktop) */}
                    <div
                      className={cn(
                        "relative",
                        isEven
                          ? "md:col-start-3 md:col-end-4"
                          : "md:col-start-1 md:col-end-2 md:text-right"
                      )}
                    >
                      {/* Card */}
                      <div
                        className={cn(
                          "ml-12 md:ml-0 relative group",
                          "p-6 rounded-xl bg-card border border-border/50",
                          "transition-colors duration-300 transition-shadow duration-300",
                          "hover:border-primary/30 hover:shadow-md"
                        )}
                      >
                        {/* Current badge */}
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <h3 className="text-lg font-semibold text-foreground">
                            {exp.role}
                          </h3>
                          {exp.current && (
                            <Badge
                              variant="default"
                              className="bg-primary/20 text-primary border-primary/40 text-[0.65rem] px-2 py-0"
                            >
                              Actual
                            </Badge>
                          )}
                        </div>

                        <p className="text-sm font-medium text-primary mb-2">
                          {exp.company}
                        </p>

                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
                          <Calendar className="w-3.5 h-3.5 shrink-0" />
                          <span>{exp.period}</span>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                          {exp.description}
                        </p>

                        {/* Highlights */}
                        <ul className="space-y-2">
                          {exp.highlights.map((highlight, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Timeline node (center column) - only on md+ */}
                    <div className="hidden md:flex md:col-start-2 md:col-end-3 items-start justify-center pt-2">
                      <TimelineDot />
                    </div>

                    {/* Timeline node - mobile (positioned absolutely at left) */}
                    <div className="absolute left-0 top-2 md:hidden">
                      <TimelineDot />
                    </div>
                  </div>
                </FadeIn>
              )
            })}
          </div>

          {/* Timeline endpoint */}
          <div className="flex justify-center mt-8">
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.55, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: easeOut,
              }}
              className="w-2.5 h-2.5 rounded-full bg-primary/35"
            />
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
