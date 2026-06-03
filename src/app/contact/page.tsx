"use client"

import { useState, FormEvent, useRef } from "react"
import { motion } from "framer-motion"
import emailjs from "@emailjs/browser"
import FadeIn, { PageTransition } from "@/components/fade-in"
import { StaggerContainer, StaggerItemRight } from "@/components/stagger"
import { Separator } from "@/components/ui/separator"
import { personalInfo } from "@/lib/data"
import { cn } from "@/lib/utils"
import {
  Mail,
  FolderGit2,
  ExternalLink,
  MapPin,
  Send,
  Loader2,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

const easeOut: [number, number, number, number] = [0.23, 1, 0.32, 1]

const inputClass =
  "w-full h-12 px-4 py-3 text-base bg-background/50 border border-border/50 rounded-xl outline-none transition-colors duration-200 placeholder:text-muted-foreground/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"

const btnPrimary =
  "inline-flex items-center justify-center gap-2 h-12 px-8 text-base font-semibold bg-primary text-primary-foreground rounded-xl transition-colors duration-200 hover:bg-primary/90 active:scale-[0.97]"

const btnOutline =
  "inline-flex items-center justify-center gap-2 h-10 px-5 text-sm font-medium border border-border rounded-xl transition-colors duration-200 hover:border-primary/30 hover:text-primary active:scale-[0.97]"

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

  const contactLinks = [
    {
      label: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      icon: Mail,
      external: false,
    },
    {
      label: "GitHub",
      href: personalInfo.github,
      icon: FolderGit2,
      external: true,
    },
    {
      label: "LinkedIn",
      href: personalInfo.linkedin,
      icon: ExternalLink,
      external: true,
    },
  ]

  return (
    <PageTransition>
      <section className="container mx-auto px-4 py-16 sm:py-24">
        {/* Header */}
        <FadeIn delay={0} direction="up">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-3">
              <MessageSquare className="h-6 w-6 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight heading-balanced">
                Contacto
              </h1>
            </div>
            <Separator className="bg-primary/30 max-w-[200px]" />
            <p className="mt-6 text-muted-foreground text-lg max-w-2xl">
              Tienes un proyecto en mente, hablemos y hagámoslo realidad.
            </p>
          </div>
        </FadeIn>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-16">
          {/* Left: Contact Info */}
          <FadeIn delay={0.1} direction="left">
            <div className="md:col-span-2 space-y-8">
              <StaggerContainer staggerDelay={0.05}>
                <div className="space-y-4">
                  {contactLinks.map((link) => (
                    <StaggerItemRight key={link.label}>
                      <Link
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-xl border border-border/50",
                          "bg-card min-w-0",
                          "transition-shadow duration-300",
                          "hover:border-primary/30 hover:bg-primary/5",
                          "hover:shadow-sm",
                          "group"
                        )}
                      >
                        <link.icon className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-sm font-medium text-foreground/90 truncate min-w-0">
                          {link.label}
                        </span>
                      </Link>
                    </StaggerItemRight>
                  ))}
                </div>
              </StaggerContainer>

              {/* Location */}
              <FadeIn delay={0.35} direction="left">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border/30 bg-muted/30">
                  <MapPin className="h-4 w-4 text-chart-2" />
                  <span className="text-sm text-muted-foreground">
                    {personalInfo.location}
                  </span>
                </div>
              </FadeIn>
            </div>
          </FadeIn>

          {/* Right: Contact Form */}
          <FadeIn delay={0.2} direction="right">
            <div className="md:col-span-3">
              <div className="rounded-xl border border-border/50 bg-card p-6 sm:p-8">
                {status === "sent" ? (
                  /* Success */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: easeOut }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="h-16 w-16 rounded-full bg-primary/15 flex items-center justify-center mb-6">
                      <CheckCircle2 className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      Mensaje enviado!
                    </h3>
                    <p className="text-muted-foreground text-sm max-w-sm">
                      Gracias por contactarme. Te responderé lo antes posible.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className={cn(btnOutline, "mt-6")}
                    >
                      Enviar otro mensaje
                    </button>
                  </motion.div>
                ) : status === "error" ? (
                  /* Error */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: easeOut }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="h-16 w-16 rounded-full bg-destructive/15 flex items-center justify-center mb-6">
                      <AlertCircle className="h-8 w-8 text-destructive" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      Error al enviar
                    </h3>
                    <p className="text-muted-foreground text-sm max-w-sm">
                      No se pudo enviar. Escríbeme a{" "}
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
                      className={cn(btnOutline, "mt-6")}
                    >
                      Intentar de nuevo
                    </button>
                  </motion.div>
                ) : (
                  /* Form */
                  <form onSubmit={handleSubmit} ref={formRef} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-foreground/80">
                          Nombre
                        </label>
                        <input
                          id="name"
                          name="from_name"
                          type="text"
                          placeholder="Tu nombre"
                          value={formState.name}
                          onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                          required
                          className={inputClass}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-foreground/80">
                          Email
                        </label>
                        <input
                          id="email"
                          name="from_email"
                          type="email"
                          placeholder="tu@email.com"
                          value={formState.email}
                          onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                          required
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-foreground/80">
                        Mensaje
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        placeholder="Cuéntame sobre tu proyecto..."
                        rows={6}
                        value={formState.message}
                        onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                        required
                        className={cn(inputClass, "min-h-[150px] resize-none")}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className={cn(btnPrimary, "w-full sm:w-auto")}
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
            </div>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  )
}
