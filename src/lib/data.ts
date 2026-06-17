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
  aprendizajes?: string
  image?: string
  github?: string
  demo?: string
  professional?: boolean // true = proyecto profesional (código privado)
}

export interface JourneyStep {
  year: string
  title: string
  description: string
}

export const personalInfo = {
  name: "Andrea Guadalupe Cruz Hernandez",
  title: "Full Stack Developer Junior",
  subtitle:
    "Desarrollo web, automatizaciones e infraestructura. Aprendiendo y construyendo cada dia.",
  email: "andreacruz_30@hotmail.com",
  github: "https://github.com/AndreaC30",
  linkedin: "https://www.linkedin.com/in/andreacruzhernandez/",
  location: "Spain",
}

export const aboutText = `Empece a programar en un ciclo de Formacion Profesional, donde adquiri las bases del desarrollo de software. Al terminarlo, entre como becaria en CIVIR, mi primer trabajo como desarrolladora.

En poco mas de un ano he pasado de no saber que era un contenedor a gestionar un VPS con varias aplicaciones en produccion. He tenido la suerte de trabajar con companeros con mas experiencia que me han ayudado a crecer: me ensenaron Docker, a usar Git correctamente, a sacarle partido a herramientas como Cursor y a entender el potencial de los agentes de IA.

No vengo de un bootcamp ni de una carrera de ingenieria. Vengo de la FP, de la curiosidad y de aprender haciendo. Cada tecnologia que manejo la he aprendido porque habia un problema real que resolver: un servidor que configurar, una factura que automatizar, un ERP que montar desde cero.

Ahora compagino mi trabajo en CIVIR con proyectos personales donde sigo aprendiendo por mi cuenta: FastAPI, React, Docker, n8n y todo lo que me permita seguir mejorando como desarrolladora.`

export const journey: JourneyStep[] = [
  {
    year: "2023",
    title: "FP + Soporte Tecnico",
    description:
      "Estudie un ciclo de FP donde aprendi PHP y bases de la programacion. Trabaje en Teleperformance dando soporte tecnico de redes.",
  },
  {
    year: "2024",
    title: "Becaria en CIVIR",
    description:
      "Entre como becaria y descubri el desarrollo web profesional. Empece a trabajar con Python, React, Odoo y Docker. Aprendi de companeros con mas experiencia.",
  },
  {
    year: "2025",
    title: "Full Stack Developer Junior",
    description:
      "Me quede trabajando en CIVIR. Automatice procesos con n8n, monte Odoo para RRHH y CRM, y empece a gestionar infraestructura Linux con Docker y Nginx.",
  },
  {
    year: "Ahora",
    title: "Construyendo y explorando",
    description:
      "Sigo en CIVIR y ademas construyo proyectos personales: WorkShift, GastoDeHoy, este portfolio. Explorando IA con agentes autonomos y automatizaciones avanzadas.",
  },
]

export const experience: Experience[] = [
  {
    company: "CIVIR",
    role: "Full Stack Developer Junior",
    period: "2024 - Actualidad",
    current: true,
    description:
      "Mi primer trabajo como desarrolladora. Empece de becaria y me quedE. He aprendido todo sobre la marcha: Python, React, Odoo 19, Docker, n8n y gestion de servidores Linux.",
    highlights: [
      "Automatizacion de facturas con n8n para Ledec: flujos que procesan documentos sin intervencion manual",
      "Montaje y personalizacion de Odoo 19 para RRHH, CRM y gestion de procesos internos",
      "Gestion de infraestructura Linux: VPS con Docker, Nginx como reverse proxy y SSL con Let's Encrypt",
      "Desarrollo de aplicaciones web con FastAPI + React y despliegue en produccion",
    ],
  },
  {
    company: "Teleperformance",
    role: "Tecnico de Soporte",
    period: "2023 - 2024",
    current: false,
    description:
      "Soporte tecnico de redes y resolucion de incidencias. Mi primer contacto con el mundo IT profesional.",
    highlights: [
      "Diagnostico y resolucion de incidencias de red para clientes empresariales",
      "Documentacion tecnica y mejora de procedimientos internos",
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
    skills: ["Python", "FastAPI", "PostgreSQL", "PHP"],
  },
  {
    name: "Infraestructura",
    icon: "terminal",
    skills: ["Docker", "Nginx", "Linux VPS", "SSL", "Git"],
  },
  {
    name: "Automatizacion",
    icon: "workflow",
    skills: ["n8n", "Odoo 19", "APIs REST", "Webhooks"],
  },
]

export const projects: Project[] = [
  {
    title: "WorkShift. App de fichaje laboral",
    description:
      "Aplicacion para registrar jornadas, calcular salarios automaticamente y gestionar clientes. La construi para aprender FastAPI y React en profundidad.",
    stack: ["FastAPI", "React", "PostgreSQL", "Docker"],
    problem:
      "Necesitaba un proyecto real donde practicar FastAPI con React. Queria algo que yo misma pudiera usar.",
    solution:
      "Construi una app completa con backend en FastAPI, frontend en React con Vite, base de datos PostgreSQL y despliegue con Docker.",
    implementation:
      "FastAPI con SQLAlchemy, React + Tailwind CSS + Vite, PostgreSQL, Docker Compose, Nginx como proxy inverso.",
    result:
      "La app funciona en produccion en mi VPS. La uso para registrar mis propias jornadas y calcular mi salario estimado.",
    aprendizajes:
      "Aprendi a disenar una API REST desde cero, a manejar autenticacion JWT, y a desplegar una app completa en un VPS con Docker.",
    image: "/projects/workshift.png",
    github: "https://github.com/AndreaC30/horario-pro",
  },
  {
    title: "GastoDeHoy. Presupuesto personal",
    description:
      "App para controlar gastos diarios con analytics semanal automatizado. La hice para aprender a integrar n8n con una aplicacion web.",
    stack: ["FastAPI", "React", "PostgreSQL", "Docker", "n8n"],
    problem:
      "Queria practicar integraciones entre una app web y n8n. Un control de gastos era el proyecto perfecto: datos reales, notificaciones utiles.",
    solution:
      "App web con backend en FastAPI y frontend en React. n8n se conecta via API para generar analytics semanales y enviarlos por email.",
    implementation:
      "FastAPI + React + PostgreSQL. n8n self-hosted con workflow programado que consulta la API de GastoDeHoy cada lunes.",
    result:
      "Cada lunes recibo un resumen automatico de mis gastos de la semana. La app tiene 103 tests y esta verificada en Google Search Console.",
    aprendizajes:
      "Entendi como conectar n8n con una API externa, como programar webhooks y como estructurar tests para un backend real.",
    image: "/projects/gastodehoy.png",
    github: "https://github.com/AndreaC30/gastodehoy",
    demo: "https://gastodehoy.es",
  },
  {
    title: "Automatizacion de facturas con n8n",
    description:
      "Flujo de automatizacion profesional para procesar facturas de Ledec. De manual a automatico.",
    stack: ["n8n", "Python", "APIs REST"],
    problem:
      "En CIVIR, las facturas de Ledec se procesaban manualmente. Habia que revisar documentos uno a uno, extraer datos y registrarlos en el sistema.",
    solution:
      "Disene un flujo en n8n self-hosted que recibe las facturas, extrae los datos relevantes via API y los registra automaticamente en Odoo.",
    implementation:
      "n8n con webhooks y nodos HTTP Request. Scripts en Python para transformar datos cuando el formato no encajaba directamente.",
    result:
      "El proceso que antes requeria intervencion manual constante ahora se ejecuta solo. Solo hay que intervenir si se detecta alguna excepcion.",
    aprendizajes:
      "Aprendi a disenar flujos de automatizacion para procesos reales de negocio, a manejar APIs externas y a pensar en edge cases.",
    professional: true,
  },
  {
    title: "Odoo 19 para RRHH y CRM",
    description:
      "Montaje y personalizacion de Odoo 19 para Recursos Humanos y CRM en CIVIR. Desde cero a produccion.",
    stack: ["Python", "Odoo 19", "PostgreSQL"],
    problem:
      "CIVIR necesitaba un ERP para gestionar empleados y clientes. Odoo 19 era la solucion, pero habia que montarlo, configurarlo y adaptarlo.",
    solution:
      "Monte Odoo 19 desde cero en el servidor de la empresa. Configure los modulos de RRHH y CRM, y desarrolle personalizaciones en Python para adaptarlos a los procesos internos.",
    implementation:
      "Odoo 19 community edition, Python para modulos personalizados, PostgreSQL como base de datos. Despliegue en servidor Linux.",
    result:
      "Odoo funcionando en produccion para gestion de empleados, clientes y procesos internos. Los modulos personalizados cubren necesidades que el estandar no contemplaba.",
    aprendizajes:
      "Aprendi la arquitectura de Odoo, su ORM, como crear modulos personalizados y como integrar un ERP en los procesos reales de una empresa.",
    professional: true,
  },
]

export const keywords = [
  "Full Stack Developer Junior",
  "Python",
  "React",
  "FastAPI",
  "Docker",
  "n8n",
  "Odoo",
  "Linux",
]
