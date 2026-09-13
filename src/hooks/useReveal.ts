import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Reveal em lote: [data-reveal] e [data-clip] entram uma vez ao cruzar 88% da tela. */
export function useReveal() {
  useEffect(() => {
    const all = '[data-reveal], [data-clip]'
    if (reduced()) {
      document.querySelectorAll(all).forEach((el) => el.classList.add('is-in'))
      return
    }
    ScrollTrigger.batch(all, {
      start: 'top 88%',
      once: true,
      onEnter: (batch) => batch.forEach((el, i) => window.setTimeout(() => el.classList.add('is-in'), Math.min(i, 5) * 80)),
    })
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => {
      cancelAnimationFrame(raf)
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])
}

/** Contador: anima de 0 até `to` quando entra na tela. */
export function useCounter(ref: React.RefObject<HTMLElement | null>, to: number) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduced()) { el.textContent = String(to); return }
    const obj = { v: 0 }
    const tween = gsap.to(obj, {
      v: to, duration: 1.4, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onUpdate: () => { el.textContent = String(Math.round(obj.v)) },
    })
    return () => { tween.scrollTrigger?.kill(); tween.kill() }
  }, [ref, to])
}
