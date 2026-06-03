"use client"

import { Monitor, Server, Terminal, Workflow } from "lucide-react"
import { PageTransition } from "@/components/fade-in"
import FadeIn from "@/components/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/stagger"
import { Separator } from "@/components/ui/separator"
import { skillCategories } from "@/lib/data"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  monitor: Monitor,
  server: Server,
  terminal: Terminal,
  workflow: Workflow,
}

export default function SkillsPage() {
  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header */}
        <div className="mb-16 text-center">
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-3 mb-4">
              <Terminal className="w-8 h-8 text-primary" />
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight heading-balanced">
                Skills
              </h1>
            </div>
            <Separator className="mx-auto my-6 w-24 bg-primary/50" />
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Tecnologías organizadas por área de especialización.
            </p>
          </FadeIn>
        </div>

        {/* Skill category cards — staggered grid */}
        <StaggerContainer staggerDelay={0.05}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category) => {
              const IconComponent = iconMap[category.icon] || Terminal
              return (
                <StaggerItem key={category.name}>
                  <div
                    className="group relative rounded-xl bg-card border border-border/50 p-6
                      transition-colors duration-300 transition-shadow duration-300
                      hover:border-primary/25 hover:shadow-md"
                  >
                    <div className="relative">
                      {/* Icon + Title */}
                      <div className="flex items-center gap-3 mb-5">
                        <div
                          className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center
                            transition-colors duration-300 group-hover:bg-primary/15"
                        >
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {category.name}
                        </h3>
                      </div>

                      {/* Skill badges */}
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium
                              bg-secondary/60 text-secondary-foreground border border-border/50
                              transition-colors duration-200 cursor-default
                              hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              )
            })}
          </div>
        </StaggerContainer>

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
