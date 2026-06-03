"use client"

import { motion } from "framer-motion"
import { PageTransition } from "@/components/fade-in"
import FadeIn, { ScaleFadeIn } from "@/components/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/stagger"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { aboutText, skillCategories } from "@/lib/data"
import { Monitor, Server, Terminal, Workflow } from "lucide-react"

const iconMap: Record<string, React.ReactNode> = {
  monitor: <Monitor className="w-5 h-5" />,
  server: <Server className="w-5 h-5" />,
  terminal: <Terminal className="w-5 h-5" />,
  workflow: <Workflow className="w-5 h-5" />,
}

export default function AboutPage() {
  const paragraphs = aboutText.split("\n\n")

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-6 py-16 sm:py-24">
        {/* Page header */}
        <FadeIn delay={0}>
          <div className="mb-16 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 font-heading heading-balanced">
              Sobre mí
            </h1>
            <Separator className="mx-auto w-20 bg-primary/40 h-0.5" />
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Construyo aplicaciones web y automatizaciones que resuelven problemas reales
            </p>
          </div>
        </FadeIn>

        {/* About text */}
        <ScaleFadeIn delay={0.1}>
          <section className="mb-12 p-8 sm:p-10 rounded-xl bg-card border border-border/50">
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        </ScaleFadeIn>

        {/* Skills */}
        <ScaleFadeIn delay={0.2}>
          <section className="p-8 sm:p-10 rounded-xl bg-card border border-border/50">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Terminal className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-semibold font-heading">Tecnologías</h2>
            </div>

            <StaggerContainer staggerDelay={0.05}>
              <div className="grid gap-4 sm:grid-cols-2">
                {skillCategories.map((cat) => (
                  <StaggerItem key={cat.name}>
                    <div className="p-4 rounded-xl bg-secondary/50 border border-border/30 transition-colors duration-300 hover:border-primary/20">
                      <div className="flex items-center gap-2 mb-3 text-foreground font-medium">
                        <span className="text-primary">
                          {iconMap[cat.icon] || <Terminal className="w-4 h-4" />}
                        </span>
                        {cat.name}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="text-xs border-primary/10 bg-transparent transition-colors duration-200 hover:bg-primary/5 hover:border-primary/30"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </section>
        </ScaleFadeIn>
      </div>
    </PageTransition>
  )
}
