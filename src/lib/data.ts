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
  title: "Full Stack Developer | Industrial Observability | AI Automation",
  subtitle: "React · FastAPI · Odoo · Node-RED · Elasticsearch",
  email: "andreacruz_30@hotmail.com",
  github: "https://github.com/AndreaC30",
  linkedin: "https://linkedin.com/in/andreacruz",
  location: "Spain",
}

export const aboutText = `Full Stack Developer con enfoque en observabilidad industrial, automatización e integración de sistemas. Mi trabajo combina desarrollo web moderno con soluciones industriales, conectando sensores, PLCs y dashboards en tiempo real.

Mi filosofía: automatizar todo lo automatizable, medir todo lo medible, e integrar sistemas para que trabajen juntos sin fricción.

Domino el stack React + Python (FastAPI/Django), herramientas de observabilidad como Elasticsearch y Zabbix, y plataformas de automatización como n8n, Node-RED y MCPs. También desarrollo con Hermes Agent y Cursor para flujos de trabajo asistidos por IA.`

export const experience: Experience[] = [
  {
    company: "CIVIR",
    role: "Full Stack Developer",
    period: "2024 - Actualidad",
    current: true,
    description: "Desarrollo full stack con foco en observabilidad industrial, automatización de procesos y gestión de infraestructura IT/OT.",
    highlights: [
      "React + Tailwind para dashboards de monitoreo industrial",
      "APIs con FastAPI y Django para integración de datos",
      "Gestión de incidencias y activos con Odoo + GLPI",
      "Elasticsearch + Kibana para análisis de logs y métricas",
      "Node-RED + PLC + Raspberry Pi para automatización industrial",
      "Despliegue y monitoreo de infraestructura con Docker",
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
    name: "Data / Observability",
    icon: "activity",
    skills: ["Elasticsearch", "Zabbix", "Kibana"],
  },
  {
    name: "Industrial / IoT",
    icon: "cpu",
    skills: ["Node-RED", "PLC", "Raspberry Pi", "FUXA"],
  },
  {
    name: "DevOps / Tools",
    icon: "terminal",
    skills: ["Git", "GitHub", "Docker", "VS Code"],
  },
  {
    name: "AI & Automation",
    icon: "sparkles",
    skills: ["Hermes Agent", "Cursor", "n8n", "MCPs"],
  },
]

export const projects: Project[] = [
  {
    title: "Observabilidad Industrial",
    description: "Sistema de monitoreo en tiempo real para plantas industriales con dashboards, alertas y sensores IoT.",
    stack: ["React", "Elasticsearch", "Node-RED", "FastAPI"],
    problem: "Centralizar métricas de sensores industriales dispersos y generar alertas tempranas en un dashboard unificado.",
    github: "https://github.com/AndreaC30",
  },
  {
    title: "Integración PLC + Node-RED",
    description: "Flujo de datos industrial automatizado desde PLCs a dashboards web con procesamiento en tiempo real.",
    stack: ["Node-RED", "PLC", "Raspberry Pi", "React"],
    problem: "Automatizar la recolección y visualización de datos de PLCs industriales sin infraestructura compleja.",
    github: "https://github.com/AndreaC30",
  },
  {
    title: "Odoo Custom Development",
    description: "Módulos personalizados y automatizaciones para Odoo, integración con sistemas externos y APIs.",
    stack: ["Python", "Odoo", "PostgreSQL", "Docker"],
    problem: "Extender Odoo para cubrir procesos específicos de gestión industrial no contemplados en la versión estándar.",
    github: "https://github.com/AndreaC30",
  },
  {
    title: "FastAPI REST API",
    description: "Backend estructurado con FastAPI, autenticación JWT, documentación automática y pruebas.",
    stack: ["FastAPI", "Python", "PostgreSQL", "Docker"],
    problem: "Crear una API REST moderna, documentada y testeable para servir datos a dashboards y aplicaciones frontend.",
    github: "https://github.com/AndreaC30",
  },
]

export const keywords = [
  "Full Stack Developer",
  "React Developer",
  "FastAPI Developer",
  "Industrial Observability Engineer",
  "AI Automation Engineer",
  "Python Developer",
  "Next.js Developer",
]
