"use client"

import { Monitor, Server, Activity, Cpu, Terminal, Sparkles } from "lucide-react"
import { PageTransition } from "@/components/fade-in"
import FadeIn from "@/components/fade-in"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { skillCategories } from "@/lib/data"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  monitor: Monitor,
  server: Server,
  activity: Activity,
  cpu: Cpu,
  terminal: Terminal,
  sparkles: Sparkles,
}

export default function SkillsPage() {
  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header */}
        <div className="mb-16 text-center">
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Skills
              </h1>
            </div>
            <Separator className="mx-auto my-6 w-24 bg-primary/50" />
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Tecnologías y herramientas con las que trabajo día a día para
              construir soluciones modernas e integradas.
            </p>
          </FadeIn>
        </div>

        {/* Skill category cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const IconComponent = iconMap[category.icon] || Terminal
            return (
              <FadeIn key={category.name} delay={0.1 * (index + 1)} direction="up">
                <div
                  className="group relative rounded-xl bg-card ring-1 ring-foreground/10 p-6
                    hover:ring-primary/20 transition-all duration-300
                    hover:shadow-lg hover:shadow-primary/[0.05]
                    hover:-translate-y-1"
                >
                  {/* Subtle gradient hover overlay */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-primary/[0.05] via-transparent to-transparent" />

                  {/* Gradient border accent on hover */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
                    bg-gradient-to-br from-primary/20 via-transparent to-accent/20"
                    style={{
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      maskComposite: "exclude",
                      WebkitMaskComposite: "destination-out",
                      padding: "1px",
                    }}
                  />

                  <div className="relative">
                    {/* Icon + Title */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center
                        group-hover:bg-primary/15 transition-colors duration-300">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {category.name}
                      </h3>
                    </div>

                    {/* Skill badges */}
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <div
                          key={skill}
                          className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium
                            bg-secondary/60 text-secondary-foreground border border-border/50
                            hover:scale-105 hover:border-primary/40 hover:bg-primary/10 hover:text-primary
                            hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]
                            transition-all duration-200 cursor-default"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            )
          })}
        </div>

        {/* Bottom decorative element */}
        <div className="flex justify-center mt-16">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px w-8 bg-border" />
            <span>tech stack</span>
            <span className="h-px w-8 bg-border" />
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
