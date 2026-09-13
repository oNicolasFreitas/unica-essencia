import { useEffect, useState } from 'react'
import { evento, cta } from '../data/copy'

/** Barra de CTA do mobile: entra depois do hero, sai no fechamento. Acima de md a navbar já tem o pill. */
export function BarraFixa() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('top')
    const fim = document.getElementById('fechamento')
    const ing = document.getElementById('ingressos')
    if (!hero || !('IntersectionObserver' in window)) { setShow(true); return }
    let heroOut = false
    let fimIn = false
    let ingIn = false
    const update = () => setShow(heroOut && !fimIn && !ingIn)
    const io1 = new IntersectionObserver(([e]) => { heroOut = !e.isIntersecting; update() }, { threshold: 0 })
    io1.observe(hero)
    let io2: IntersectionObserver | undefined
    if (fim) {
      io2 = new IntersectionObserver(([e]) => { fimIn = e.isIntersecting; update() }, { threshold: 0.2 })
      io2.observe(fim)
    }
    let io3: IntersectionObserver | undefined
    if (ing) {
      io3 = new IntersectionObserver(([e]) => { ingIn = e.isIntersecting; update() }, { threshold: 0.05 })
      io3.observe(ing)
    }
    return () => { io1.disconnect(); io2?.disconnect(); io3?.disconnect() }
  }, [])

  return (
    <div
      inert={!show}
      className={`fixed inset-x-0 bottom-0 z-overlay px-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden transition-[transform,opacity] duration-500 ease-out ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      <div className="liquid-glass liquid-glass--dark mx-auto flex max-w-2xl items-center justify-between gap-4 rounded-full py-1.5 pl-6 pr-2 text-marfim">
        <p className="relative z-glass min-w-0 truncate text-sm">
          <strong className="font-medium">{evento.data}</strong>
          <span className="hidden sm:inline text-marfim/70"> · {evento.lugares} lugares · a partir de {evento.parcelaMin}</span>
        </p>
        <a
          href="#ingressos"
          className="pressable relative z-glass inline-flex shrink-0 items-center rounded-full bg-marfim px-5 py-2.5 text-sm font-medium text-vinho transition-colors duration-300 hover:bg-nude"
        >
          {cta.vaga}
        </a>
      </div>
    </div>
  )
}
