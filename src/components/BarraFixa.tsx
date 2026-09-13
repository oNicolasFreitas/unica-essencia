import { useEffect, useState } from 'react'
import { evento, cta } from '../data/copy'

/** Barra de CTA do mobile: aparece depois do hero, some sobre os ingressos e no fim. */
export function BarraFixa() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const hero = document.getElementById('top')
    const ing = document.getElementById('ingressos')
    const fim = document.getElementById('fechamento')
    if (!hero || !('IntersectionObserver' in window)) return
    const st = { hero: true, ing: false, fim: false }
    const update = () => setShow(!st.hero && !st.ing && !st.fim)
    const obs = (el: Element | null, key: keyof typeof st, threshold = 0) => {
      if (!el) return null
      const io = new IntersectionObserver(([e]) => { st[key] = e.isIntersecting; update() }, { threshold })
      io.observe(el)
      return io
    }
    const ios = [obs(hero, 'hero'), obs(ing, 'ing', 0.05), obs(fim, 'fim', 0.2)]
    return () => ios.forEach((io) => io?.disconnect())
  }, [])

  return (
    <div inert={!show} className={`fixed inset-x-0 bottom-0 z-raised px-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden transition-[transform,opacity] duration-500 ease-out ${show ? '' : 'pointer-events-none translate-y-6 opacity-0'}`}>
      <div className="glass mx-auto flex items-center justify-between gap-3 rounded-full py-1.5 pl-5 pr-1.5">
        <p className="min-w-0 truncate text-sm text-cacau/80"><strong className="font-medium text-vinho">{evento.dataCurta}</strong> · a partir de {evento.precoMin}</p>
        <a href="#ingressos" className="pressable inline-flex min-h-[44px] shrink-0 items-center rounded-full bg-vinho px-5 text-sm font-medium text-marfim transition-colors duration-300 hover:bg-ameixa">{cta.vaga}</a>
      </div>
    </div>
  )
}
