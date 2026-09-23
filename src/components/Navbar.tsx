import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { nav, cta, evento } from '../data/copy'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [rolou, setRolou] = useState(false)

  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 24)
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
    <>
      <header className={`fixed inset-x-0 top-0 ${open ? 'z-topo' : 'z-nav'} enter enter-1 px-3 transition-[padding] duration-500 ease-out sm:px-5 ${rolou ? 'pt-0 sm:pt-2' : 'pt-3'}`}>
        <nav
          aria-label="Principal"
          className={`glass mx-auto flex max-w-6xl items-center justify-between rounded-full pl-4 pr-2 transition-[height,box-shadow] duration-500 ease-out sm:pl-5 ${rolou ? 'h-14 shadow-[0_10px_30px_-18px_rgba(90,39,49,0.5)]' : 'h-16'}`}
        >
          <a href="#top" className="pressable flex items-center gap-3" aria-label="Única Essência, início">
            <img src="/img/logo.png" alt="" width={36} height={36} className="h-9 w-9 object-contain" />
            <span className="whitespace-nowrap font-display text-sm uppercase tracking-[0.2em] text-vinho pt-[3px]">Única Essência</span>
          </a>
          <ul className="hidden items-center gap-7 lg:flex">
            {nav.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="inline-flex min-h-[44px] items-center text-sm text-cacau/70 transition-colors duration-150 ease hover:text-vinho">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <a href="#ingressos" className="pressable hidden sm:inline-flex min-h-[44px] items-center rounded-full bg-vinho px-5 text-sm font-medium text-marfim transition-colors duration-300 hover:bg-ameixa">
              <span className="pt-[1px]">{cta.vaga}</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={open}
              aria-controls="menu-mobile"
              className="pressable relative z-topo grid h-11 w-11 place-items-center rounded-full text-vinho lg:hidden"
            >
              <Menu strokeWidth={1.5} className={`absolute h-5 w-5 transition-[transform,opacity] duration-300 ease-out ${open ? 'rotate-90 scale-50 opacity-0' : ''}`} aria-hidden />
              <X strokeWidth={1.5} className={`absolute h-5 w-5 transition-[transform,opacity] duration-300 ease-out ${open ? '' : '-rotate-90 scale-50 opacity-0'}`} aria-hidden />
            </button>
          </div>
        </nav>
      </header>

      <div id="menu-mobile" inert={!open} className={`fixed inset-0 z-drawer lg:hidden ${open ? '' : 'pointer-events-none'}`}>
        <button type="button" aria-label="Fechar menu" tabIndex={-1} onClick={() => setOpen(false)} className={`absolute inset-0 bg-cacau/40 backdrop-blur-sm transition-opacity duration-500 ease-out ${open ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute inset-y-0 right-0 flex w-[84%] max-w-sm flex-col justify-between bg-marfim px-8 pb-10 pt-28 shadow-2xl transition-transform duration-500 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`} style={{ overscrollBehavior: 'contain' }}>
          <ul className="flex flex-col gap-5">
            {nav.map((l, i) => (
              <li key={l.href} className={`transition-[transform,opacity] duration-500 ease-out ${open ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'}`} style={{ transitionDelay: open ? `${150 + i * 70}ms` : '0ms' }}>
                <a href={l.href} onClick={() => setOpen(false)} className="font-display text-2xl font-light text-vinho transition-colors duration-150 hover:text-ameixa">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className={`transition-[transform,opacity] duration-500 ease-out ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: open ? '480ms' : '0ms' }}>
            <a href="#ingressos" onClick={() => setOpen(false)} className="pressable flex min-h-[52px] items-center justify-center rounded-full bg-vinho px-6 font-medium text-marfim transition-colors duration-300 hover:bg-ameixa">
              {cta.vaga}
            </a>
            <p className="mt-4 text-center text-sm text-cacau/70">{evento.data} · {evento.cidade}</p>
          </div>
        </div>
      </div>
    </>
  )
}
