import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { nav } from '../data/copy'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`absolute md:fixed inset-x-0 top-0 z-50 enter enter-1 transition-colors duration-300 ${scrolled ? 'bg-cacau/90 backdrop-blur-md' : ''}`}>
      <nav
        aria-label="Principal"
        className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-5 sm:px-8 lg:px-12"
      >
        <a href="#top" className="pressable flex items-center gap-3" aria-label="Única Essência — início">
          <img src="/img/logo.png" alt="" width={44} height={44} className="h-11 w-11 object-contain" />
          <span className="whitespace-nowrap font-display text-[0.95rem] tracking-[0.22em] uppercase pt-[3px] text-marfim">
            Única Essência
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {nav.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="inline-flex min-h-[44px] items-center font-body text-sm text-marfim/70 transition-colors duration-150 ease hover:text-marfim"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#ingressos"
            className={`pressable hidden sm:inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 ease-out ${
              scrolled ? 'liquid-glass liquid-glass--dark text-marfim' : 'liquid-glass text-marfim hover:bg-marfim/10'
            }`}
          >
            <span className="relative z-[1] pt-[1px]">Garantir vaga</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className="pressable relative z-[60] grid h-11 w-11 place-items-center rounded-full liquid-glass liquid-glass--dark text-marfim lg:hidden"
          >
            <Menu
              strokeWidth={1.5}
              className={`absolute h-5 w-5 transition-[transform,opacity] duration-300 ease-out ${open ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}
              aria-hidden
            />
            <X
              strokeWidth={1.5}
              className={`absolute h-5 w-5 transition-[transform,opacity] duration-300 ease-out ${open ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'}`}
              aria-hidden
            />
          </button>
        </div>
      </nav>

      {/* Menu mobile: drawer da direita */}
      <div
        id="menu-mobile"
        inert={!open}
        className={`fixed inset-0 z-[55] lg:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <button
          type="button"
          aria-label="Fechar menu"
          tabIndex={-1}
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-cacau/60 backdrop-blur-sm transition-opacity duration-500 ease-out ${open ? 'opacity-100' : 'opacity-0'}`}
        />
        <div
          className={`absolute inset-y-0 right-0 flex w-[84%] max-w-sm flex-col justify-between bg-vinho px-8 pb-10 pt-28 shadow-2xl transition-transform duration-500 ease-out ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ overscrollBehavior: 'contain' }}
        >
          <ul className="flex flex-col gap-6">
            {nav.map((l, i) => (
              <li
                key={l.href}
                className={`transition-[transform,opacity] duration-500 ease-out ${open ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'}`}
                style={{ transitionDelay: open ? `${150 + i * 70}ms` : '0ms' }}
              >
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-3xl font-light text-marfim transition-colors duration-150 hover:text-dourado"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div
            className={`transition-[transform,opacity] duration-500 ease-out ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            style={{ transitionDelay: open ? '480ms' : '0ms' }}
          >
            <a
              href="#ingressos"
              onClick={() => setOpen(false)}
              className="pressable flex min-h-[52px] items-center justify-center rounded-full bg-marfim px-6 font-medium text-vinho transition-colors duration-300 hover:bg-nude"
            >
              Garantir minha vaga
            </a>
            <p className="mt-4 text-center text-sm text-marfim/60">Sábado, 10 de outubro · Balneário Camboriú</p>
          </div>
        </div>
      </div>
    </header>
  )
}
