import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Efeito-assinatura: o fio dourado.
 * Uma linha vertical fixa à esquerda (lg+) que se desenha conforme
 * o scroll avança pela página, ecoando o anel dourado do logo.
 */
export function FioDourado() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 1024) return
    const line = el.querySelector<HTMLElement>('[data-line]')
    const dot = el.querySelector<HTMLElement>('[data-dot]')
    if (!line || !dot) return
    const tl = gsap.timeline({
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
    })
    tl.fromTo(line, { scaleY: 0 }, { scaleY: 1, ease: 'none' }, 0).fromTo(
      dot,
      { top: '0%' },
      { top: '100%', ease: 'none' },
      0,
    )
    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-y-0 left-6 z-40 hidden lg:block xl:left-10"
    >
      <div className="relative mx-auto h-[calc(100dvh-8rem)] w-px translate-y-16 bg-marfim/10">
        <div data-line className="absolute inset-0 origin-top bg-gradient-to-b from-dourado/30 via-dourado to-dourado/30" style={{ transform: 'scaleY(0)' }} />
        <div data-dot className="absolute left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-dourado shadow-[0_0_12px_2px_rgba(201,164,106,.5)]" />
      </div>
    </div>
  )
}
