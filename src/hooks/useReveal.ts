import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Reveal em lote: todo elemento com [data-reveal] entra uma única vez
 * quando cruza 88% do viewport. Stagger com teto de 6 passos.
 */
export function useReveal() {
  useEffect(() => {
    if (reduced()) {
      document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'))
      return
    }
    ScrollTrigger.batch('[data-reveal]', {
      start: 'top 88%',
      once: true,
      onEnter: (batch) => {
        batch.forEach((el, i) => {
          window.setTimeout(() => el.classList.add('is-in'), Math.min(i, 6) * 90)
        })
      },
    })
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => {
      cancelAnimationFrame(raf)
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])
}

/** Parallax sutil. O elemento NÃO deve ter data-reveal (a transição de transform colidiria com o scrub). */
export function useParallax(ref: React.RefObject<HTMLElement | null>, amount = 40) {
  useEffect(() => {
    const el = ref.current
    if (!el || reduced() || window.innerWidth < 768) return
    const tween = gsap.fromTo(
      el,
      { y: amount },
      { y: -amount, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } },
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [ref, amount])
}

/** Contador: anima de 0 até `to` quando entra na tela. */
export function useCounter(ref: React.RefObject<HTMLElement | null>, to: number) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduced()) { el.textContent = String(to); return }
    const obj = { v: 0 }
    const tween = gsap.to(obj, {
      v: to,
      duration: 1.6,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onUpdate: () => { el.textContent = String(Math.round(obj.v)) },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [ref, to])
}
