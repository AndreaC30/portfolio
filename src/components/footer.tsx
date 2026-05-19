import { FolderGit2, ExternalLink, Mail, Terminal } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/80">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <Terminal className="h-4 w-4 text-primary transition-colors group-hover:text-primary/80" />
            <span className="font-mono text-xs text-muted-foreground">
              andrea<span className="text-primary">.dev</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <a
              href="mailto:andreacruz_30@hotmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/AndreaC30"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <FolderGit2 className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/in/andreacruz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <p className="text-xs text-muted-foreground font-mono">
            © {new Date().getFullYear()} Andrea Cruz. Built with Next.js
          </p>
        </div>
      </div>
    </footer>
  )
}
