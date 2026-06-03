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
  title: "Full Stack Developer | AI Automation & AI Video Generation | n8n · Odoo 19 · Cursor",
  subtitle: "React · FastAPI · n8n · Odoo 19 · Cursor · AI Video Generation",
  email: "andreacruz_30@hotmail.com",
  github: "https://github.com/AndreaC30",
  linkedin: "https://www.linkedin.com/in/andreacruzhernandez/",
  location: "Spain",
}

export const aboutText = `Full Stack Developer con enfoque en automatización inteligente, generación de video con IA e integración de sistemas empresariales. Mi trabajo combina desarrollo web moderno con flujos de automatización avanzados usando n8n, personalización de ERP con Odoo 19, y creación de contenido multimedia automatizado mediante IA.

Mi filosofía: automatizar todo lo automatizable, integrar sistemas sin fricción, y aprovechar la IA generativa para crear contenido visual y video a escala.

Domino el stack React + Python (FastAPI/Django), plataformas de automatización como n8n, Odoo 19 y MCPs, y herramientas de generación de video con IA. Desarrollo asistido por IA con Cursor IDE para maximizar productividad y calidad de código.`

export const experience: Experience[] = [
  {
    company: "CIVIR",
    role: "Full Stack Developer",
    period: "2024 - Actualidad",
    current: true,
    description: "Desarrollo full stack con enfoque en automatización inteligente, generación de video con IA y gestión empresarial con Odoo 19.",
    highlights: [
      "Automatización de flujos de trabajo con n8n y MCPs para procesos empresariales",
      "Generación de contenido de video mediante IA (Runway, HeyGen, Synthesia)",
      "Personalización y desarrollo de módulos para Odoo 19",
      "Desarrollo asistido por IA con Cursor IDE para acelerar entregas",
      "React + Tailwind para dashboards y aplicaciones web interactivas",
      "APIs con FastAPI y Django para integración de sistemas",
      "Despliegue y orquestación de infraestructura con Docker",
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
    skills: ["Python", "FastAPI", "Django"],
  },
  {
    name: "Automation & Integration",
    icon: "workflow",
    skills: ["n8n", "Odoo 19", "Node-RED", "MCPs", "REST APIs"],
  },
  {
    name: "AI & Video Generation",
    icon: "video",
    skills: ["Runway", "HeyGen", "Synthesia", "Hermes Agent", "Cursor"],
  },
  {
    name: "DevOps & Infrastructure",
    icon: "terminal",
    skills: ["Docker", "Git", "GitHub", "VS Code", "Linux"],
  },
]

export const projects: Project[] = [
  {
    title: "AI Video Generation Pipeline",
    description: "Pipeline automatizado de generación de video con IA: desde guion hasta edición final con herramientas como Runway, HeyGen y Synthesia.",
    stack: ["Runway", "HeyGen", "Python", "FastAPI", "React"],
    problem: "Automatizar la producción de contenido de video empresarial reduciendo tiempo y costes de producción tradicional.",
    github: "https://github.com/AndreaC30",
  },
  {
    title: "n8n Automation Workflows",
    description: "Flujos de automatización empresarial con n8n: integración de APIs, procesamiento de datos, notificaciones y agentes IA.",
    stack: ["n8n", "Python", "FastAPI", "Docker", "MCPs"],
    problem: "Automatizar procesos de negocio repetitivos y conectar sistemas dispares sin código complejo, usando n8n como orquestador central.",
    github: "https://github.com/AndreaC30",
  },
  {
    title: "Odoo 19 Custom Modules",
    description: "Desarrollo de módulos personalizados para Odoo 19: automatización de procesos, dashboards e integración con sistemas externos vía API.",
    stack: ["Python", "Odoo 19", "PostgreSQL", "Docker", "n8n"],
    problem: "Extender Odoo 19 para cubrir flujos de trabajo específicos no disponibles en los módulos estándar, integrando todo con n8n para automatización end-to-end.",
    github: "https://github.com/AndreaC30",
  },
  {
    title: "FastAPI REST API",
    description: "Backend moderno con FastAPI, autenticación JWT, documentación OpenAPI automática y testing completo. Desarrollado con Cursor IDE.",
    stack: ["FastAPI", "Python", "PostgreSQL", "Docker", "Cursor"],
    problem: "Crear una API REST rápida, documentada y testeable para servir datos a aplicaciones frontend y flujos de automatización.",
    github: "https://github.com/AndreaC30",
  },
]

export const keywords = [
  "Full Stack Developer",
  "React Developer",
  "FastAPI Developer",
  "AI Automation Engineer",
  "AI Video Generation",
  "n8n Automation",
  "Odoo 19 Developer",
  "Cursor IDE",
  "Python Developer",
  "Next.js Developer",
]
