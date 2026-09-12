import { useEffect, useState } from 'react'
import { evento } from '../data/copy'

/** Barra de CTA que só entra depois que o hero sai de cena. */
export function BarraFixa() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('top')
    const fim = document.getElementById('fechamento')
    if (!hero || !('IntersectionObserver' in window)) { setShow(true); return }
    let heroOut = false
    let fimIn = false
    const update = () => setShow(heroOut && !fimIn)
    const io1 = new IntersectionObserver(([e]) => { heroOut = !e.isIntersecting; update() }, { threshold: 0 })
    io1.observe(hero)
    let io2: IntersectionObserver | undefined
    if (fim) {
      io2 = new IntersectionObserver(([e]) => { fimIn = e.isIntersecting; update() }, { threshold: 0.2 })
      io2.observe(fim)
    }
    return () => { io1.disconnect(); io2?.disconnect() }
  }, [])

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] transition-[transform,opacity] duration-500 ease-out ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      <div className="liquid-glass liquid-glass--dark mx-auto flex max-w-2xl items-center justify-between gap-4 rounded-full py-2 pl-6 pr-2 text-marfim">
        <p className="relative z-[1] min-w-0 truncate text-sm">
          <strong className="font-medium">{evento.data}</strong>
          <span className="hidden sm:inline text-marfim/70"> · {evento.lugares} lugares · a partir de {evento.parcelaMin}</span>
        </p>
        <a
          href="#ingressos"
          className="pressable relative z-[1] inline-flex shrink-0 items-center rounded-full bg-marfim px-5 py-3 text-sm font-medium text-vinho transition-colors duration-300 hover:bg-nude"
        >
          Garantir vaga
        </a>
      </div>
    </div>
  )
}
