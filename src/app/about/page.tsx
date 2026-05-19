"use client"

import { PageTransition } from "@/components/fade-in"
import FadeIn from "@/components/fade-in"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { aboutText, skillCategories } from "@/lib/data"
import { Monitor, Server, Cpu, Terminal, Sparkles, Code2 } from "lucide-react"

const iconMap: Record<string, React.ReactNode> = {
  monitor: <Monitor className="w-5 h-5" />,
  server: <Server className="w-5 h-5" />,
  activity: <Monitor className="w-5 h-5" />,
  cpu: <Cpu className="w-5 h-5" />,
  terminal: <Terminal className="w-5 h-5" />,
  sparkles: <Sparkles className="w-5 h-5" />,
}

export default function AboutPage() {
  const paragraphs = aboutText.split("\n\n")

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-6 py-16 sm:py-24">
        {/* Page header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 font-heading">
            Sobre mí
          </h1>
          <Separator className="mx-auto w-20 bg-primary/40 h-0.5" />
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Full Stack Developer apasionada por la intersección entre el
            desarrollo web y la industria
          </p>
        </div>

        {/* ─── Perfil profesional ─── */}
        <FadeIn delay={0.1} direction="up">
          <section className="mb-12 p-8 sm:p-10 rounded-2xl bg-card border border-border/50 gradient-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
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
        </FadeIn>

        {/* ─── Enfoque técnico ─── */}
        <FadeIn delay={0.2} direction="up">
          <section className="mb-12 p-8 sm:p-10 rounded-2xl bg-card border border-border/50 gradient-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Terminal className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-semibold font-heading">
                Enfoque técnico
              </h2>
            </div>

            <p className="text-lg leading-relaxed text-muted-foreground mb-8">
              {paragraphs[2]}
            </p>

            {/* Skill categories as cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {skillCategories.map((cat) => (
                <div
                  key={cat.name}
                  className="p-4 rounded-xl bg-secondary/50 border border-border/30"
                >
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
                        className="text-xs border-primary/10 bg-transparent"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* ─── Filosofía de trabajo ─── */}
        <FadeIn delay={0.3} direction="up">
          <section className="p-8 sm:p-10 rounded-2xl bg-card border border-border/50 gradient-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
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
        </FadeIn>
      </div>
    </PageTransition>
  )
}
