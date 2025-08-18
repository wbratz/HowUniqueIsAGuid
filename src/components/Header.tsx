import { Github } from 'lucide-react'

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 rounded-2xl backdrop-blur-card">
          <div className="flex items-center justify-between px-4 py-3">
            <a href="#" className="text-white/90 hover:text-white font-semibold tracking-tight">
              <span className="text-accent">GUID</span> Uniqueness
            </a>
            <nav className="flex items-center gap-4 text-sm text-white/70">
              <a href="#math" className="hover:text-white">Math</a>
              <a href="#compare" className="hover:text-white">Comparisons</a>
              <a href="#calc" className="hover:text-white">Calculator</a>
              <a href="#generator" className="hover:text-white">Generator</a>
              <a href="#witness" className="hover:text-white">Witness</a>
              <a className="inline-flex items-center gap-2 hover:text-white" href="https://www.rfc-editor.org/rfc/rfc4122" target="_blank" rel="noreferrer">
                RFC 4122
              </a>
              <a className="inline-flex items-center gap-2 hover:text-white" href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
