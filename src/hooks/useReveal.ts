import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Reveal em lote de [data-reveal], [data-clip], [data-stagger] e [.risco],
 * mais o scroll suave (Lenis) sincronizado com o ScrollTrigger.
 */
export function useReveal() {
  useEffect(() => {
    const all = '[data-reveal], [data-clip], [data-stagger], .risco'

    if (reduced()) {
      document.querySelectorAll(all).forEach((el) => el.classList.add('is-in'))
      return
    }

    /* Scroll com inércia curta. Nada de hijack: a roda continua mandando. */
    const lenis = new Lenis({ duration: 0.9, smoothWheel: true, touchMultiplier: 1.6 })
    lenis.on('scroll', ScrollTrigger.update)
    const onRaf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(onRaf)
    gsap.ticker.lagSmoothing(0)

    /* Âncoras do menu passam a usar o Lenis, para o mesmo easing. */
    const onAnchor = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="#"]') as HTMLAnchorElement | null
      if (!a) return
      const id = a.getAttribute('href')
      if (!id || id === '#') return
      const alvo = document.querySelector(id)
      if (!alvo) return
      e.preventDefault()
      lenis.scrollTo(alvo as HTMLElement)
    }
    document.addEventListener('click', onAnchor)

    ScrollTrigger.batch(all, {
      start: 'top 88%',
      once: true,
      onEnter: (batch) => batch.forEach((el, i) => window.setTimeout(() => el.classList.add('is-in'), Math.min(i, 5) * 80)),
    })

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('click', onAnchor)
      gsap.ticker.remove(onRaf)
      lenis.destroy()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])
}

/** Parallax sutil: o elemento desliza contra o scroll. Só md+ e sem reduced-motion. */
export function useParallax(ref: React.RefObject<HTMLElement | null>, amount = 26) {
  useEffect(() => {
    const el = ref.current
    if (!el || reduced() || window.innerWidth < 768) return
    const tween = gsap.fromTo(
      el,
      { y: amount },
      { y: -amount, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.8 } },
    )
    return () => { tween.scrollTrigger?.kill(); tween.kill() }
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
      v: to, duration: 1.6, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onUpdate: () => { el.textContent = String(Math.round(obj.v)) },
    })
    return () => { tween.scrollTrigger?.kill(); tween.kill() }
  }, [ref, to])
}
