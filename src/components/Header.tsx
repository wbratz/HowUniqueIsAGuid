import { Github } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 rounded-2xl backdrop-blur-card">
          <div className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <a href="#" className="text-white/90 hover:text-white font-semibold tracking-tight">
              <span className="text-accent">GUID</span> Uniqueness
            </a>
            <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/70">
              <a href="#compare" className="hover:text-white">
                The Numbers
              </a>
              <a href="#calc" className="hover:text-white">
                Calculator
              </a>
              <a href="#witness" className="hover:text-white">
                Your Odds
              </a>
              <a href="#generator" className="hover:text-white">
                Generator
              </a>
              <a
                className="inline-flex items-center gap-2 hover:text-white"
                href="https://github.com/wbratz/HowUniqueIsAGuid"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
