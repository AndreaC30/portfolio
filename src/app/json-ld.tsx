import { personalInfo } from "@/lib/data"

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Andrea Guadalupe Cruz Hernández",
    alternateName: "Andrea Cruz",
    jobTitle: "Full Stack Developer | Agentes IA, Automatización & Infraestructura Self-Hosted",
    description:
      "Full Stack Developer especializada en agentes IA (Hermes, OpenCode), automatización con n8n, Odoo 19, y gestión de infraestructura self-hosted (Linux, Docker, Nginx, SSL). Python, React, FastAPI.",
    url: "https://resume.andreacruz.es",
    sameAs: [
      personalInfo.github,
      personalInfo.linkedin,
    ],
    email: personalInfo.email,
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "Python",
      "FastAPI",
      "Django",
      "Hermes Agent",
      "OpenCode",
      "DeepSeek",
      "n8n",
      "Odoo 19",
      "Cursor IDE",
      "MCPs",
      "Docker",
      "Nginx",
      "Linux",
      "SSL",
      "Self-Hosted Infrastructure",
      "Process Automation",
    ],
    worksFor: {
      "@type": "Organization",
      name: "CIVIR",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
