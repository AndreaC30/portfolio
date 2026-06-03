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
  solution: string
  implementation: string
  result: string
  image?: string
  github?: string
  demo?: string
}

export const personalInfo = {
  name: "Andrea Guadalupe Cruz Hernández",
  title: "Full Stack Developer. Construyo aplicaciones web y automatizaciones",
  subtitle: "Desarrollo web completo, automatización de procesos e infraestructura self-hosted",
  email: "andreacruz_30@hotmail.com",
  github: "https://github.com/AndreaC30",
  linkedin: "https://www.linkedin.com/in/andreacruzhernandez/",
  location: "Spain",
}

export const aboutText = `Construyo aplicaciones web completas y automatizaciones que ahorran horas de trabajo manual. Tomo proyectos desde la idea inicial hasta producción: analizo el problema, defino la solución, desarrollo el backend con Python y FastAPI, diseño el frontend con React y Next.js, despliego con Docker y monitorizo que todo funcione correctamente.

Divido cada proyecto en tareas pequeñas con entregas claras. Uso tableros Kanban para mantener el foco y valido cada fase antes de avanzar. Esto me permite entregar rápido, con calidad y sin perder el control cuando los proyectos crecen.`

export const experience: Experience[] = [
  {
    company: "CIVIR",
    role: "Full Stack Developer",
    period: "2024 - Actualidad",
    current: true,
    description: "Desarrollo full stack con enfoque en automatización, infraestructura self-hosted y ERP con Odoo 19.",
    highlights: [
      "Automatización de procesos empresariales con n8n self-hosted y APIs REST",
      "Desarrollo de aplicaciones web completas con Python (FastAPI) y React",
      "Gestión de infraestructura Linux: VPS, Docker, Nginx, SSL y dominios",
      "Módulos personalizados para Odoo 19 e integración con sistemas externos",
    ],
  },
  {
    company: "Teleperformance",
    role: "Técnico de Soporte",
    period: "2023 - 2024",
    current: false,
    description: "Soporte técnico especializado en redes y resolución de incidencias para clientes empresariales.",
    highlights: [
      "Diagnóstico y resolución de incidencias de red para clientes empresariales",
      "Soporte técnico con altos niveles de satisfacción del cliente",
      "Documentación técnica y mejora de procedimientos internos",
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
    name: "Infraestructura",
    icon: "terminal",
    skills: ["Docker", "Nginx", "Linux VPS", "SSL", "Git"],
  },
  {
    name: "Automatización",
    icon: "workflow",
    skills: ["n8n", "Odoo 19", "APIs REST", "Webhooks"],
  },
]

export const projects: Project[] = [
  {
    title: "Hermes Agent. Automatización con IA",
    description: "Agentes de IA autónomos que ejecutan tareas de desarrollo, code review y monitorización.",
    stack: ["Hermes Agent", "Python", "Docker", "Linux"],
    problem: "Tareas repetitivas de desarrollo, revisión de código y despliegue consumían horas de trabajo manual cada semana.",
    solution: "Configuré agentes de IA autónomos con Hermes Agent que ejecutan tareas multi-paso usando skills personalizadas y herramientas MCP.",
    implementation: "Hermes Agent con skills y MCPs personalizados, Python, Docker para despliegue aislado.",
    result: "Reducción del tiempo dedicado a tareas repetitivas y despliegues más rápidos con menos intervención manual.",
    github: "https://github.com/AndreaC30",
  },
  {
    title: "Infraestructura Self-Hosted",
    description: "Gestión de servidores Linux con múltiples aplicaciones web en una sola VPS.",
    stack: ["Linux", "Nginx", "Docker", "SSL"],
    problem: "Varias aplicaciones web necesitaban ejecutarse en un solo servidor sin conflictos, con HTTPS y alta disponibilidad.",
    solution: "Configuré un servidor Linux completo con Nginx como reverse proxy, Docker Compose para aislamiento y SSL automático con Let's Encrypt.",
    implementation: "Linux VPS, Nginx reverse proxy, Docker Compose, Let's Encrypt, systemd para servicios.",
    result: "Múltiples aplicaciones corriendo en un solo servidor, aisladas, con HTTPS y monitorización continua.",
    github: "https://github.com/AndreaC30",
  },
  {
    title: "n8n Workflows de Automatización",
    description: "Flujos de automatización empresarial que conectan sistemas y procesan datos sin intervención manual.",
    stack: ["n8n", "Python", "FastAPI", "Docker"],
    problem: "Procesos de negocio manuales requerían intervención constante para mover datos entre sistemas y generar notificaciones.",
    solution: "Creé flujos de automatización con n8n self-hosted que conectan APIs, procesan datos y notifican por Telegram automáticamente.",
    implementation: "n8n self-hosted en Docker, Python y FastAPI para webhooks personalizados.",
    result: "Procesos que antes tomaban horas ahora se ejecutan automáticamente, con notificaciones en tiempo real.",
    github: "https://github.com/AndreaC30",
  },
  {
    title: "Odoo 19. Módulos Personalizados",
    description: "Módulos a medida para Odoo 19 que extienden funcionalidades estándar del ERP.",
    stack: ["Python", "Odoo 19", "PostgreSQL", "n8n"],
    problem: "Odoo 19 no cubría flujos de trabajo específicos del negocio y necesitaba integrarse con sistemas externos.",
    solution: "Desarrollé módulos personalizados que extienden Odoo 19 con funcionalidades a medida e integración vía API REST.",
    implementation: "Python, framework de Odoo 19, PostgreSQL, integración con n8n para automatización end-to-end.",
    result: "Flujos de trabajo completos automatizados dentro de Odoo, conectados con sistemas externos sin intervención manual.",
    github: "https://github.com/AndreaC30",
  },
]

export const keywords = [
  "Full Stack Developer",
  "Python",
  "React",
  "FastAPI",
  "Docker",
  "n8n",
  "Odoo",
  "Linux",
]
