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
import { AuroraText } from "@/components/effects/AuroraText"
import FadeIn from "@/components/fade-in"

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

function TerminalCard({ item }: { item: AIItem; index: number }) {
  const Icon = item.icon
  return (
    <div
      className="group relative rounded-xl bg-card border border-white/[0.06] p-6 sheen card-lift"
    >
      <div className="relative">
        {/* Terminal-style header bar */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/[0.06]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-primary/30" />
            <div className="w-2.5 h-2.5 rounded-full bg-primary/15" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#00E5FF]/20" />
          </div>
          <span className="text-[10px] font-mono text-muted-foreground ml-2 tracking-wider uppercase">
            {item.title.toLowerCase().replace(/\s+/g, "-")}
          </span>
        </div>

        {/* Icon + Title */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-primary/15">
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
            <span
              key={tag}
              className="inline-flex items-center rounded-full border border-transparent bg-secondary text-secondary-foreground text-xs font-mono px-2.5 py-0.5 font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
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
    <div className="relative">
      {/* Atmospheric background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="absolute top-[0] left-[30%] w-[600px] h-[400px] rounded-full bg-[#7C3AED]/[0.05] blur-[120px]" />
        <div className="absolute bottom-[15%] right-[0] w-[400px] h-[300px] rounded-full bg-[#00E5FF]/[0.04] blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header */}
        <FadeIn delay={0}>
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <Cpu className="w-8 h-8 text-primary" />
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight font-heading heading-balanced">
                <AuroraText speed="slow">AI Labs</AuroraText>
              </h1>
            </div>
            <div className="divider-fade my-6" />
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explorando el ecosistema de inteligencia artificial aplicada al
              desarrollo, la automatización y la productividad.
            </p>
          </div>
        </FadeIn>

        {/* Terminal-style decorative separator */}
        <FadeIn delay={0.05}>
          <div className="mb-16 flex justify-center">
            <div className="font-mono text-xs text-muted-foreground/60 flex items-center gap-3">
              <span className="text-primary/60">&gt;</span>
              <span>ls -la ~/ai-labs/</span>
              <span className="inline-block w-2 h-4 bg-primary/60 animate-pulse" />
            </div>
          </div>
        </FadeIn>

        {/* ─── Agentes Autónomos ─── */}
        <FadeIn delay={0.1}>
          <section className="mb-16">
            <SectionHeader
              icon={Bot}
              title="Agentes Autónomos"
              subtitle="IA con capacidad de razonamiento, tool-calling y ejecución autónoma de tareas complejas."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((item, index) => (
                <TerminalCard key={item.title} item={item} index={index} />
              ))}
            </div>
          </section>
        </FadeIn>

        {/* ─── Automatización ─── */}
        <FadeIn delay={0.15}>
          <section className="mb-16">
            <SectionHeader
              icon={Workflow}
              title="Automatización"
              subtitle="Flujos de trabajo inteligentes y protocolos de integración para conectar sistemas."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {automations.map((item, index) => (
                <TerminalCard key={item.title} item={item} index={index} />
              ))}
            </div>
          </section>
        </FadeIn>

        {/* ─── Herramientas IA ─── */}
        <FadeIn delay={0.2}>
          <section className="mb-16">
            <SectionHeader
              icon={Wrench}
              title="Herramientas IA"
              subtitle="Editores, scripts y pipelines potenciados por inteligencia artificial."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tools.map((item, index) => (
                <TerminalCard key={item.title} item={item} index={index} />
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Bottom terminal-style decorative element */}
        <FadeIn delay={0.25}>
          <div className="flex justify-center mt-16">
            <div className="font-mono text-xs text-muted-foreground/50 flex items-center gap-3">
              <span className="text-primary/40">&gt;</span>
              <span>exit</span>
              <div className="divider-fade w-12" />
              <span>0</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
