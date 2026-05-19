"use client"

import FadeIn, { PageTransition } from "@/components/fade-in"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { projects } from "@/lib/data"
import { cn } from "@/lib/utils"
import {
  Lightbulb,
  FolderGit2,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

export default function ProjectsPage() {
  return (
    <PageTransition>
      <section className="container mx-auto px-4 py-16 sm:py-24">
        {/* Header */}
        <FadeIn delay={0} direction="up">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-3">
              <FolderGit2 className="h-6 w-6 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Proyectos
              </h1>
            </div>
            <Separator className="bg-primary/30 max-w-[200px]" />
            <p className="mt-6 text-muted-foreground text-lg max-w-2xl">
              Soluciones técnicas que conectan el mundo industrial con el
              desarrollo web moderno.
            </p>
          </div>
        </FadeIn>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <FadeIn key={project.title} delay={0.1 + index * 0.1} direction="up">
              <Card
                className={cn(
                  "group h-full flex flex-col border-border/50 bg-card/80 backdrop-blur-sm",
                  "transition-all duration-300 ease-out",
                  "hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(59,130,246,0.12),0_0_60px_rgba(59,130,246,0.04)]",
                  "hover:border-primary/30"
                )}
              >
                <CardHeader>
                  <CardTitle className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed mt-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 space-y-4">
                  {/* Problem Section */}
                  <div className="rounded-lg bg-muted/50 border border-border/40 p-4">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-chart-2 mt-0.5 shrink-0" />
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-chart-2">
                          Problema que resuelve
                        </span>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                          {project.problem}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Stack Badges */}
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-xs font-mono"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter>
                  {project.github && (
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="group/btn border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all"
                      >
                        <FolderGit2 className="h-4 w-4 mr-2" />
                        Ver en GitHub
                        <ArrowRight className="h-3 w-3 ml-2 opacity-0 -translate-x-1 transition-all group-hover/btn:opacity-100 group-hover/btn:translate-x-0" />
                      </Button>
                    </Link>
                  )}
                </CardFooter>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>
    </PageTransition>
  )
}
