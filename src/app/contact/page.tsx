"use client"

import { useState, FormEvent, useRef } from "react"
import emailjs from "@emailjs/browser"
import { personalInfo } from "@/lib/data"
import {
  Mail,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  FolderGit2,
  ExternalLink,
} from "lucide-react"

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  )

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!formRef.current) return

    setStatus("sending")

    try {
      const result = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )

      if (result.status === 200) {
        setStatus("sent")
        setFormState({ name: "", email: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section className="container mx-auto px-4 py-16 sm:py-24 max-w-5xl">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Contacto
        </h1>
        <p className="mt-3 text-muted-foreground text-lg">
          ¿Tienes un proyecto en mente? Hablemos y hagámoslo realidad.
        </p>
      </div>

      {/* Two-column layout: form (60%) left | info (40%) right */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        {/* ── Left: Contact Form (60%) ── */}
        <div className="lg:col-span-3">
          {status === "sent" ? (
            /* ── Success ── */
            <div className="flex flex-col items-center justify-center py-16 text-center rounded-xl border border-green-200 bg-green-50/50 dark:border-green-900/40 dark:bg-green-950/20 transition-colors">
              <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6">
                <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                ¡Mensaje enviado!
              </h3>
              <p className="text-muted-foreground text-sm max-w-sm">
                Gracias por contactarme. Te responderé lo antes posible.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 px-6 py-2.5 text-sm font-medium border border-border rounded-xl hover:border-primary/30 hover:text-primary transition-colors"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : status === "error" ? (
            /* ── Error ── */
            <div className="flex flex-col items-center justify-center py-16 text-center rounded-xl border border-red-200 bg-red-50/50 dark:border-red-900/40 dark:bg-red-950/20 transition-colors">
              <div className="h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-6">
                <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Error al enviar
              </h3>
              <p className="text-muted-foreground text-sm max-w-sm">
                No se pudo enviar el mensaje. Escríbeme directamente a{" "}
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-primary hover:underline"
                >
                  {personalInfo.email}
                </a>
                .
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 px-6 py-2.5 text-sm font-medium border border-border rounded-xl hover:border-primary/30 hover:text-primary transition-colors"
              >
                Intentar de nuevo
              </button>
            </div>
          ) : (
            /* ── Form ── */
            <form
              onSubmit={handleSubmit}
              ref={formRef}
              className="space-y-5"
            >
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-foreground/80"
                  >
                    Nombre
                  </label>
                  <input
                    id="name"
                    name="from_name"
                    type="text"
                    placeholder="Tu nombre"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, name: e.target.value }))
                    }
                    required
                    className="w-full h-12 px-4 rounded-xl border border-border bg-background text-base placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground/80"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="from_email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, email: e.target.value }))
                    }
                    required
                    className="w-full h-12 px-4 rounded-xl border border-border bg-background text-base placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-foreground/80"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Cuéntame sobre tu proyecto..."
                  rows={6}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, message: e.target.value }))
                  }
                  required
                  className="w-full min-h-[150px] px-4 py-3 rounded-xl border border-border bg-background text-base placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center justify-center gap-2 h-12 px-8 text-base font-semibold bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Enviar mensaje
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* ── Right: Contact Info (40%) ── */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold mb-5">
            Información de contacto
          </h2>

          <div className="space-y-4">
            {/* Email */}
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-3 group hover:text-primary transition-colors"
            >
              <Mail className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm break-all">
                {personalInfo.email}
              </span>
            </a>

            {/* GitHub */}
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group hover:text-primary transition-colors"
            >
              <FolderGit2 className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm">GitHub</span>
            </a>

            {/* LinkedIn */}
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group hover:text-primary transition-colors"
            >
              <ExternalLink className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm">LinkedIn</span>
            </a>

            {/* Location */}
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="h-5 w-5 shrink-0" />
              <span className="text-sm">{personalInfo.location}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
