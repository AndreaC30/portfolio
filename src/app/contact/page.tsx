"use client"

import { useState, FormEvent } from "react"
import FadeIn, { PageTransition } from "@/components/fade-in"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
} from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle")

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus("sending")

    // Simulate submission delay
    setTimeout(() => {
      setStatus("sent")
      setFormState({ name: "", email: "", message: "" })
    }, 1000)
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
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Contacto
              </h1>
            </div>
            <Separator className="bg-primary/30 max-w-[200px]" />
            <p className="mt-6 text-muted-foreground text-lg max-w-2xl">
              ¿Tienes un proyecto en mente? Hablemos y hagámoslo realidad.
            </p>
          </div>
        </FadeIn>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-16">
          {/* Left: Contact Info */}
          <FadeIn delay={0.1} direction="left">
            <div className="md:col-span-2 space-y-8">
              <div className="space-y-6">
                {contactLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-lg border border-border/50",
                      "bg-card/80 backdrop-blur-sm",
                      "transition-all duration-300",
                      "hover:border-primary/30 hover:bg-primary/5 hover:-translate-y-0.5",
                      "group"
                    )}
                  >
                    <link.icon className="h-5 w-5 text-primary shrink-0 transition-transform group-hover:scale-110" />
                    <span className="text-sm font-medium text-foreground/90 group-hover:text-primary transition-colors">
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border/30 bg-muted/30">
                <MapPin className="h-4 w-4 text-chart-2" />
                <span className="text-sm text-muted-foreground">
                  {personalInfo.location}
                </span>
              </div>

              {/* Decorative terminal-style hint */}
              <div className="hidden md:block p-5 rounded-lg border border-border/40 bg-muted/20 font-mono text-xs text-muted-foreground space-y-1">
                <p>
                  <span className="text-chart-2">$</span> ssh contact@andreacruz.es
                </p>
                <p className="text-primary/60">
                  ▸ Conexión establecida...
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Right: Contact Form */}
          <FadeIn delay={0.2} direction="right">
            <div className="md:col-span-3">
              <div className="rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 sm:p-8">
                {status === "sent" ? (
                  /* Success State */
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="h-14 w-14 rounded-full bg-chart-2/20 flex items-center justify-center mb-6">
                      <CheckCircle2 className="h-7 w-7 text-chart-2" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      ¡Mensaje enviado!
                    </h3>
                    <p className="text-muted-foreground text-sm max-w-sm">
                      Gracias por contactarme. Te responderé lo antes posible.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-6"
                      onClick={() => setStatus("idle")}
                    >
                      Enviar otro mensaje
                    </Button>
                  </div>
                ) : (
                  /* Form */
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="text-sm font-medium text-foreground/80"
                        >
                          Nombre
                        </label>
                        <Input
                          id="name"
                          placeholder="Tu nombre"
                          value={formState.name}
                          onChange={(e) =>
                            setFormState((s) => ({ ...s, name: e.target.value }))
                          }
                          required
                          className="bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium text-foreground/80"
                        >
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="tu@email.com"
                          value={formState.email}
                          onChange={(e) =>
                            setFormState((s) => ({ ...s, email: e.target.value }))
                          }
                          required
                          className="bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium text-foreground/80"
                      >
                        Mensaje
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Cuéntame sobre tu proyecto..."
                        rows={5}
                        value={formState.message}
                        onChange={(e) =>
                          setFormState((s) => ({
                            ...s,
                            message: e.target.value,
                          }))
                        }
                        required
                        className="bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full sm:w-auto transition-all gap-2"
                      size="lg"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Enviar mensaje
                        </>
                      )}
                    </Button>
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
