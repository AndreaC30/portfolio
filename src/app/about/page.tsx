"use client"

import { motion } from "framer-motion"
import { PageTransition } from "@/components/fade-in"
import FadeIn, { ScaleFadeIn } from "@/components/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/stagger"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { aboutText, skillCategories } from "@/lib/data"
import { Monitor, Server, Cpu, Terminal, Sparkles, Code2, Workflow, Video, ListTodo } from "lucide-react"

const iconMap: Record<string, React.ReactNode> = {
  monitor: <Monitor className="w-5 h-5" />,
  server: <Server className="w-5 h-5" />,
  activity: <Monitor className="w-5 h-5" />,
  cpu: <Cpu className="w-5 h-5" />,
  terminal: <Terminal className="w-5 h-5" />,
  sparkles: <Sparkles className="w-5 h-5" />,
  workflow: <Workflow className="w-5 h-5" />,
  video: <Video className="w-5 h-5" />,
  trello: <ListTodo className="w-5 h-5" />,
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
              Full Stack Developer apasionada por la intersección entre el
              desarrollo web y la automatización inteligente
            </p>
          </div>
        </FadeIn>

        {/* ─── Perfil profesional ─── */}
        <ScaleFadeIn delay={0.1}>
          <section className="mb-12 p-8 sm:p-10 rounded-xl bg-card border border-border/50 group">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/15">
                <Code2 className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-semibold font-heading">
                Perfil profesional
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {paragraphs[0]}
            </p>
          </section>
        </ScaleFadeIn>

        {/* ─── Enfoque técnico ─── */}
        <ScaleFadeIn delay={0.2}>
          <section className="mb-12 p-8 sm:p-10 rounded-xl bg-card border border-border/50 group">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/15">
                <Terminal className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-semibold font-heading">
                Enfoque técnico
              </h2>
            </div>

            <p className="text-lg leading-relaxed text-muted-foreground mb-8">
              {paragraphs[2]}
            </p>

            {/* Skill categories as cards — staggered */}
            <StaggerContainer staggerDelay={0.05}>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {skillCategories.map((cat) => (
                  <StaggerItem key={cat.name}>
                    <div className="p-4 rounded-xl bg-secondary/50 border border-border/30 transition-colors duration-300 cursor-default hover:border-primary/20">
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

        {/* ─── Filosofía de trabajo ─── */}
        <ScaleFadeIn delay={0.3}>
          <section className="p-8 sm:p-10 rounded-xl bg-card border border-border/50 group">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/15">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-semibold font-heading">
                Filosofía de trabajo
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {paragraphs[1]}
            </p>
          </section>
        </ScaleFadeIn>
      </div>
    </PageTransition>
  )
}
