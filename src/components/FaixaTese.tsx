import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduced } from '../hooks/useReveal'

gsap.registerPlugin(ScrollTrigger)

/**
 * A frase-tese da Liliany em display gigante, deslizando na horizontal
 * conforme o scroll avança (scrub). Não é marquee: só se move com a página.
 */
export function FaixaTese() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || reduced()) return
    const track = el.querySelector<HTMLElement>('[data-track]')
    if (!track) return
    const dist = track.scrollWidth - el.clientWidth
    const tween = gsap.fromTo(
      track,
      { x: 0 },
      { x: -dist, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.8 } },
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <div ref={ref} aria-hidden className="overflow-hidden bg-cacau py-10 md:py-16">
      <p
        data-track
        className="whitespace-nowrap px-5 font-display font-extralight text-marfim/90 will-change-transform"
        style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', lineHeight: 1 }}
      >
        Uma mulher não precisa deixar de ser forte para viver a sua <span className="script">essência</span>. Precisa
        aprender a direcionar a sua <span className="script">força</span>.
      </p>
    </div>
  )
}
