"use client"

import { motion } from "framer-motion"
import { PageTransition } from "@/components/fade-in"
import FadeIn from "@/components/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/stagger"
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
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight heading-balanced">
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

        {/* Project Cards Grid — staggered */}
        <StaggerContainer staggerDelay={0.05}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <StaggerItem key={project.title}>
                <div className="h-full">
                  <Card
                    className={cn(
                      "group h-full flex flex-col border-border/50 bg-card card-lift",
                      "hover:border-primary/25"
                    )}
                  >
                    <CardHeader className="relative z-10">
                      <CardTitle className="text-xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-primary">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed mt-2">
                        {project.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="flex-1 space-y-4 relative z-10">
                      {/* Problem Section */}
                      <div className="rounded-lg bg-muted/50 border border-border/40 p-4 transition-colors duration-300 group-hover:border-primary/20">
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
                            className="text-xs font-mono transition-colors duration-200 hover:bg-primary/10 hover:text-primary hover:border-primary/30 cursor-default"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>

                    <CardFooter className="relative z-10">
                      {project.github && (
                        <Link
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="group/btn border-primary/30 transition-colors duration-200 transition-transform duration-150 active:scale-[0.97] hover:border-primary/60 hover:bg-primary/5"
                          >
                            <FolderGit2 className="h-4 w-4 mr-2" />
                            Ver en GitHub
                            <ArrowRight className="h-3 w-3 ml-2 opacity-0 -translate-x-1 transition-opacity duration-200 ease-[0.23,1,0.32,1] transition-transform duration-200 ease-[0.23,1,0.32,1] group-hover/btn:opacity-100 group-hover/btn:translate-x-0" />
                          </Button>
                        </Link>
                      )}
                    </CardFooter>
                  </Card>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </section>
    </PageTransition>
  )
}
