import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import Scroll3DScene from "@/components/effects/Scroll3DScene";

export default function Home() {
  return (
    <>
      {/* The main 3D scroll journey — everything is inside */}
      <Scroll3DScene />

      {/* Minimal post-scroll footer with quick links */}
      <footer className="relative bg-[#070B1E] border-t border-white/[0.04] px-6 py-10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} Andrea Cruz
          </p>
          <nav className="flex items-center gap-6">
            <Link
              href="/about"
              className="text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              Sobre mí
            </Link>
            <Link
              href="/experience"
              className="text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              Experiencia
            </Link>
            <Link
              href="/projects"
              className="text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              Proyectos
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 text-xs text-[#2563EB]/70 hover:text-[#2563EB] transition-colors"
            >
              Contactar
              <CaretRight className="w-3 h-3" />
            </Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
