"use client"

import FadeIn, { PageTransition } from "@/components/fade-in"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Cpu,
  Sparkles,
  Bot,
  Workflow,
  Plug,
  Terminal,
  Zap,
  Braces,
  Wrench,
} from "lucide-react"

interface AIItem {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  tags: string[]
}

const agents: AIItem[] = [
  {
    title: "Hermes Agent",
    description:
      "Agente IA autónomo de Nous Research con capacidad de razonamiento, uso de herramientas y ejecución multi-step. Orquestación de tareas complejas con chain-of-thought y tool-calling avanzado.",
    icon: Bot,
    tags: ["Nous Research", "Tool Calling", "Chain-of-Thought", "CLI"],
  },
  {
    title: "OpenCode",
    description:
      "Asistente de codificación open-source con capacidades de edición, refactorización y generación de código en múltiples lenguajes. Integración directa en el flujo de desarrollo.",
    icon: Braces,
    tags: ["Open Source", "Multi-language", "Refactoring", "CLI"],
  },
  {
    title: "Claude Code",
    description:
      "Agente de Anthropic para desarrollo asistido por IA. Comprensión profunda de codebases, debugging inteligente y generación de código contextual con tool use avanzado.",
    icon: Zap,
    tags: ["Anthropic", "Tool Use", "Debugging", "Code Review"],
  },
]

const automations: AIItem[] = [
  {
    title: "n8n Workflows",
    description:
      "Automatización visual de flujos de trabajo con n8n. Integración de APIs, webhooks, procesamiento de datos y orquestación de servicios sin código. Self-hosted y escalable.",
    icon: Workflow,
    tags: ["Self-hosted", "Webhooks", "APIs", "No-code"],
  },
  {
    title: "MCP Integrations",
    description:
      "Model Context Protocol: integración estandarizada entre LLMs y herramientas externas. Conexión de agentes IA con bases de datos, APIs, sistemas de archivos y servicios.",
    icon: Plug,
    tags: ["Protocol", "LLM Tools", "Databases", "File Systems"],
  },
]

const tools: AIItem[] = [
  {
    title: "Cursor AI",
    description:
      "Editor de código potenciado por IA con autocompletado contextual, chat integrado, agent mode y comprensión profunda del codebase. Desarrollo acelerado con contexto completo del proyecto.",
    icon: Terminal,
    tags: ["VS Code Fork", "Agent Mode", "Tab Completion", "Chat"],
  },
  {
    title: "Automatizaciones IA",
    description:
      "Scripts y pipelines inteligentes para automatizar tareas repetitivas: generación de reportes, procesamiento de datos, integración continua y despliegues asistidos por IA.",
    icon: Wrench,
    tags: ["Scripts", "CI/CD", "Pipelines", "Reporting"],
  },
]

function TerminalCard({
  item,
  index,
}: {
  item: AIItem
  index: number
}) {
  const Icon = item.icon
  return (
    <FadeIn key={item.title} delay={0.1 * (index + 1)} direction="up">
      <div
        className="group relative rounded-xl bg-card border border-border/50 p-6
          transition-colors duration-300 transition-shadow duration-300
          hover:border-primary/25 hover:shadow-md"
      >
        <div className="relative">
          {/* Terminal-style header bar */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/30">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            </div>
            <span className="text-[10px] font-mono text-muted-foreground ml-2 tracking-wider uppercase">
              {item.title.toLowerCase().replace(/\s+/g, "-")}
            </span>
          </div>

          {/* Icon + Title */}
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center
                transition-colors duration-300 group-hover:bg-primary/15"
            >
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground font-heading">
              {item.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {item.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs font-mono"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
  )
}

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  subtitle: string
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <h2 className="text-xl font-semibold font-heading">{title}</h2>
      </div>
      <p className="text-sm text-muted-foreground ml-11">{subtitle}</p>
    </div>
  )
}

export default function AILabsPage() {
  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header */}
        <div className="mb-16 text-center">
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-3 mb-4">
              <Cpu className="w-8 h-8 text-primary" />
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight font-heading heading-balanced">
                AI Labs
              </h1>
            </div>
            <Separator className="mx-auto my-6 w-24 bg-primary/50" />
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explorando el ecosistema de inteligencia artificial aplicada al
              desarrollo, la automatización y la productividad.
            </p>
          </FadeIn>
        </div>

        {/* Terminal-style decorative separator */}
        <div className="mb-16 flex justify-center">
          <div className="font-mono text-xs text-muted-foreground/60 flex items-center gap-3">
            <span className="text-primary/60">&gt;</span>
            <span>ls -la ~/ai-labs/</span>
            <span className="inline-block w-2 h-4 bg-primary/60 animate-pulse" />
          </div>
        </div>

        {/* ─── Agentes Autónomos ─── */}
        <section className="mb-16">
          <FadeIn delay={0.2}>
            <SectionHeader
              icon={Bot}
              title="Agentes Autónomos"
              subtitle="IA con capacidad de razonamiento, tool-calling y ejecución autónoma de tareas complejas."
            />
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((item, index) => (
              <TerminalCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </section>

        {/* ─── Automatización ─── */}
        <section className="mb-16">
          <FadeIn delay={0.3}>
            <SectionHeader
              icon={Workflow}
              title="Automatización"
              subtitle="Flujos de trabajo inteligentes y protocolos de integración para conectar sistemas."
            />
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {automations.map((item, index) => (
              <TerminalCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </section>

        {/* ─── Herramientas IA ─── */}
        <section className="mb-16">
          <FadeIn delay={0.4}>
            <SectionHeader
              icon={Wrench}
              title="Herramientas IA"
              subtitle="Editores, scripts y pipelines potenciados por inteligencia artificial."
            />
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((item, index) => (
              <TerminalCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </section>

        {/* Bottom terminal-style decorative element */}
        <div className="flex justify-center mt-16">
          <div className="font-mono text-xs text-muted-foreground/50 flex items-center gap-3">
            <span className="text-primary/40">&gt;</span>
            <span>exit</span>
            <span className="h-px w-12 bg-border/50" />
            <span>0</span>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
