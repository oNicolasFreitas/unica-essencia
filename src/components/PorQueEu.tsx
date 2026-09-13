import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { Dobravel } from './Dobravel'
import { porQueEu } from '../data/copy'
import { Section, Header } from './ui'
import { useParallax, reduced } from '../hooks/useReveal'

function VideoPalestra() {
  const v = useRef<HTMLVideoElement>(null)
  const [som, setSom] = useState(false)
  const autoPlay = !reduced()

  /* Roda mudo em loop só enquanto está na tela; o mp4 baixa quando se aproxima. */
  useEffect(() => {
    const el = v.current
    if (!el || !autoPlay) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!el.getAttribute('src')) el.src = '/video/palestra.mp4'
          el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { rootMargin: '200px 0px', threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [autoPlay])

  const toggleSom = () => {
    const el = v.current
    if (!el) return
    if (!el.getAttribute('src')) el.src = '/video/palestra.mp4'
    el.muted = som
    if (el.paused) el.play().catch(() => {})
    setSom(!som)
  }

  return (
    <div className="liquid-glass liquid-glass--gold rounded-[2rem] p-2">
      <div className="relative aspect-[9/16] overflow-hidden rounded-[1.6rem] bg-vinho">
        <video
          ref={v}
          className="h-full w-full object-cover"
          poster="/video/palestra.jpg"
          muted
          loop
          playsInline
          preload="none"
          aria-label="Liliany Gonçalves palestrando para uma turma de mulheres"
        />
        <button
          type="button"
          onClick={toggleSom}
          aria-label={som ? 'Silenciar vídeo' : 'Ouvir o vídeo'}
          aria-pressed={som}
          className="pressable liquid-glass liquid-glass--dark absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full text-marfim transition-colors duration-300 hover:bg-marfim/10"
        >
          {som ? <Volume2 strokeWidth={1.5} className="relative z-glass h-5 w-5" /> : <VolumeX strokeWidth={1.5} className="relative z-glass h-5 w-5" />}
        </button>
      </div>
    </div>
  )
}

export function PorQueEu() {
  const fig = useRef<HTMLDivElement>(null)
  useParallax(fig, 28)
  return (
    <Section tone="vinho">
      <Header titulo={porQueEu.titulo} max="18ch" />

      <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-[1.1fr_0.9fr] md:gap-16 lg:gap-24">
        <div className="prosa text-marfim/85">
          {porQueEu.paragrafos.map((p) => (
            <p key={p} data-reveal>{p}</p>
          ))}
          <p data-reveal className="mt-6 font-display text-xl font-light text-marfim">
            {porQueEu.destaque}
          </p>
          <p data-reveal className="mt-6">{porQueEu.depois}</p>

          <Dobravel rotulo="O dia em que ela conheceu o auditório" className="my-10">
            <div data-reveal className="border-l border-dourado/60 pl-6 md:pl-8">
              {porQueEu.cena.map((p) => (
                <p key={p} className="font-display text-lg font-light italic text-nude first:mt-0 [&+p]:mt-3">
                  {p}
                </p>
              ))}
            </div>
          </Dobravel>

          <p data-reveal>
            <strong className="font-medium text-marfim">{porQueEu.fechoForte}</strong>
            {porQueEu.fecho}
          </p>
          <p data-reveal className="script mt-8 text-3xl text-dourado">
            {porQueEu.assinatura}
          </p>
        </div>

        <div className="flex flex-col gap-10">
          <div data-reveal className="mx-auto w-full max-w-[340px] md:mx-0">
            <VideoPalestra />
          </div>
          <figure ref={fig} className="hidden md:block">
            <img
              src="/img/liliany-1.webp"
              alt="Liliany abraçando uma mulher durante uma imersão"
              width={1000}
              height={1330}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-[2rem] object-cover"
            />
          </figure>
        </div>
      </div>
    </Section>
  )
}
