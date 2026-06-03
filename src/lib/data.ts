export interface Experience {
  company: string
  role: string
  period: string
  current: boolean
  description: string
  highlights: string[]
}

export interface SkillCategory {
  name: string
  icon: string
  skills: string[]
}

export interface Project {
  title: string
  description: string
  stack: string[]
  problem: string
  image?: string
  github?: string
}

export const personalInfo = {
  name: "Andrea Guadalupe Cruz Hernández",
  title: "Full Stack Developer | Agentes IA · Automatización · Infraestructura Self-Hosted",
  subtitle: "Python · React · FastAPI · n8n · Odoo 19 · Hermes Agent · Docker · Linux",
  email: "andreacruz_30@hotmail.com",
  github: "https://github.com/AndreaC30",
  linkedin: "https://www.linkedin.com/in/andreacruzhernandez/",
  location: "Spain",
}

export const aboutText = `Full Stack Developer especializada en automatización, agentes de IA y gestión de infraestructura self-hosted. Trabajo con Python y React para construir aplicaciones web completas, desde el backend con FastAPI hasta el frontend con Next.js y Tailwind.

Gestiono mis propios servidores Linux (VPS): configuro Nginx como reverse proxy, administro dominios y subdominios, despliego con Docker Compose, y aseguro todo con SSL mediante Let's Encrypt. Cada proyecto que construyo pasa por un ciclo completo: desarrollo local, despliegue en producción y monitorización continua.

Mi stack de agentes IA incluye Hermes Agent (Nous Research) con skills personalizadas, herramientas MCP, y modelos como DeepSeek V4 y OpenCode. Utilizo estos agentes para automatizar flujos de trabajo complejos, desde code review hasta despliegues y monitorización.

Automatizo procesos empresariales con n8n (self-hosted), desarrollo módulos personalizados para Odoo 19, y acelero mi productividad con Cursor IDE.`

export const experience: Experience[] = [
  {
    company: "CIVIR",
    role: "Full Stack Developer",
    period: "2024 - Actualidad",
    current: true,
    description: "Desarrollo full stack con enfoque en automatización con agentes IA, gestión de infraestructura y ERP con Odoo 19.",
    highlights: [
      "Automatización de procesos con n8n self-hosted, webhooks y APIs REST",
      "Desarrollo y despliegue de aplicaciones web con Python (FastAPI) + React",
      "Personalización de módulos para Odoo 19 e integración con sistemas externos",
      "Gestión de infraestructura Linux: VPS, Nginx, Docker, SSL, dominios y subdominios",
      "Orquestación de agentes IA con Hermes Agent, skills, MCPs y modelos OpenCode",
      "Desarrollo asistido por IA con Cursor IDE para acelerar entregas",
      "React + Tailwind + Next.js para dashboards y aplicaciones web modernas",
    ],
  },
  {
    company: "Teleperformance",
    role: "Técnico de Soporte",
    period: "2023 - 2024",
    current: false,
    description: "Soporte técnico especializado en redes y resolución de incidencias para clientes empresariales.",
    highlights: [
      "Diagnóstico y resolución de incidencias de red",
      "Soporte técnico a clientes empresariales",
      "Documentación técnica y procedimientos",
    ],
  },
]

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    icon: "monitor",
    skills: ["React", "Next.js", "TypeScript", "TailwindCSS"],
  },
  {
    name: "Backend",
    icon: "server",
    skills: ["Python", "FastAPI", "Django", "PostgreSQL"],
  },
  {
    name: "Infra & DevOps",
    icon: "terminal",
    skills: ["Docker", "Nginx", "Linux VPS", "SSL", "Dominios", "Git", "GitHub"],
  },
  {
    name: "AI Agents & LLMs",
    icon: "sparkles",
    skills: ["Hermes Agent", "OpenCode", "DeepSeek V4", "MCPs", "Skills", "Cursor"],
  },
  {
    name: "Automation & ERP",
    icon: "workflow",
    skills: ["n8n", "Odoo 19", "Node-RED", "REST APIs", "Webhooks"],
  },
]

export const projects: Project[] = [
  {
    title: "Hermes Agent — Automatización con IA",
    description: "Configuración y uso de Hermes Agent (Nous Research) con skills personalizadas, herramientas MCP, cron jobs y despliegue de agentes autónomos para tareas de desarrollo, monitorización y automatización.",
    stack: ["Hermes Agent", "Python", "MCPs", "Docker", "Linux"],
    problem: "Automatizar flujos de trabajo complejos usando agentes IA con razonamiento, tool-calling y ejecución multi-step, reduciendo intervención manual en tareas repetitivas.",
    github: "https://github.com/AndreaC30",
  },
  {
    title: "Infraestructura Self-Hosted",
    description: "Gestión completa de servidores Linux con Nginx como reverse proxy, múltiples dominios y subdominios, Docker Compose para despliegues, SSL con Let's Encrypt y monitorización de servicios.",
    stack: ["Linux", "Nginx", "Docker", "SSL", "Systemd", "Python"],
    problem: "Centralizar el despliegue de múltiples aplicaciones web en una sola VPS con aislamiento, seguridad y alta disponibilidad, sin depender de plataformas cloud gestionadas.",
    github: "https://github.com/AndreaC30",
  },
  {
    title: "n8n Automation Workflows",
    description: "Flujos de automatización empresarial con n8n self-hosted: integración de APIs, procesamiento de datos, notificaciones por Telegram y agentes IA conectados mediante webhooks.",
    stack: ["n8n", "Python", "FastAPI", "Docker", "Webhooks"],
    problem: "Automatizar procesos de negocio repetitivos y conectar sistemas dispares sin código complejo, usando n8n como orquestador central con agentes IA integrados.",
    github: "https://github.com/AndreaC30",
  },
  {
    title: "Odoo 19 Custom Modules",
    description: "Desarrollo de módulos personalizados para Odoo 19: automatización de procesos, dashboards e integración con sistemas externos vía API REST.",
    stack: ["Python", "Odoo 19", "PostgreSQL", "Docker", "n8n"],
    problem: "Extender Odoo 19 para cubrir flujos de trabajo específicos no disponibles en los módulos estándar, integrando con n8n para automatización end-to-end.",
    github: "https://github.com/AndreaC30",
  },
]

export const keywords = [
  "Full Stack Developer",
  "Python Developer",
  "React Developer",
  "FastAPI Developer",
  "Next.js Developer",
  "AI Agents Engineer",
  "Hermes Agent",
  "OpenCode",
  "n8n Automation",
  "Odoo 19 Developer",
  "Docker",
  "Linux Administrator",
  "Self-Hosted Infrastructure",
]
