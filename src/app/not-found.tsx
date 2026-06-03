import Link from "next/link"
import { ArrowLeft, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Glitch-style 404 */}
        <div className="relative mb-8">
          <h1 className="text-[10rem] sm:text-[12rem] font-bold leading-none text-primary/10 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg sm:text-xl font-mono text-primary/60 tracking-[0.3em] uppercase">
              Page not found
            </span>
          </div>
        </div>

        {/* Message */}
        <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
          La página que buscas no existe o ha sido movida.
          <br />
          <span className="text-sm">
            Quizás quieras volver al inicio o explorar otras secciones.
          </span>
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl px-6 h-11 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Home className="w-4 h-4" />
            Volver al inicio
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-xl px-6 h-11 text-sm border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Ver proyectos
          </Link>
        </div>
      </div>
    </div>
  )
}
