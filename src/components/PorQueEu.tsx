import { useRef, useState } from 'react'
import { Play, Pause } from 'lucide-react'
import { porQueEu } from '../data/copy'
import { Section, Header } from './ui'
import { useParallax } from '../hooks/useReveal'

function VideoPalestra() {
  const v = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const toggle = () => {
    const el = v.current
    if (!el) return
    if (el.paused) { el.play(); setPlaying(true) } else { el.pause(); setPlaying(false) }
  }
  return (
    <div className="liquid-glass liquid-glass--gold rounded-[2rem] p-2">
      <div className="relative aspect-[9/16] overflow-hidden rounded-[1.6rem] bg-vinho">
        <video
          ref={v}
          className="h-full w-full object-cover"
          src="/video/palestra.mp4"
          poster="/video/palestra.jpg"
          playsInline
          preload="metadata"
          onEnded={() => setPlaying(false)}
          aria-label="Liliany Gonçalves palestrando para uma turma de mulheres"
        />
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? 'Pausar vídeo' : 'Assistir vídeo'}
          className={`pressable absolute inset-0 grid place-items-center transition-colors duration-300 ${playing ? 'bg-transparent' : 'bg-cacau/30'}`}
        >
          <span
            className={`liquid-glass liquid-glass--dark grid h-16 w-16 place-items-center rounded-full text-marfim transition-[transform,opacity] duration-300 ease-out ${playing ? 'scale-75 opacity-0 hover:opacity-100' : 'scale-100 opacity-100'}`}
          >
            {playing ? <Pause strokeWidth={1.5} className="relative z-glass h-6 w-6" /> : <Play strokeWidth={1.5} className="relative z-glass ml-1 h-6 w-6" />}
          </span>
        </button>
        <span className="pointer-events-none absolute bottom-4 right-5 rounded-full bg-cacau/50 px-2.5 py-1 text-xs text-marfim/85">
          0:13
        </span>
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

          <div data-reveal className="my-10 border-l border-dourado/60 pl-6 md:pl-8">
            {porQueEu.cena.map((p) => (
              <p key={p} className="font-display text-lg font-light italic text-nude first:mt-0 [&+p]:mt-3">
                {p}
              </p>
            ))}
          </div>

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
