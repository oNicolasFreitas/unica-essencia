import { useEffect, useState } from 'react'
import { evento, hero } from '../data/copy'
import { Button } from './ui'

function useIsDesktop() {
  const [d, setD] = useState(() => window.matchMedia('(min-width: 768px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const on = () => setD(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return d
}

/**
 * Hero cinematográfico com vídeo VERTICAL (9:16).
 * Mobile: o vídeo preenche a tela (object-cover casa com o formato).
 * Desktop: painel retrato nítido à direita sobre fundo ambiente
 * (o mesmo frame, desfocado e tingido de vinho).
 */
export function Hero() {
  const desktop = useIsDesktop()
  return (
    <section id="top" className="relative isolate flex min-h-[100dvh] items-end overflow-hidden bg-cacau text-marfim">
      {/* Fundo ambiente (desktop) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 hidden md:block bg-cover bg-center scale-110 opacity-60 blur-2xl"
        style={{ backgroundImage: 'url(/video/hero.jpg)' }}
      />
      <div aria-hidden className="absolute inset-0 -z-10 hidden md:block bg-gradient-to-r from-cacau via-cacau/85 to-vinho/40" />

      {/* Vídeo fullscreen (mobile) — só é montado abaixo de md */}
      {!desktop && (
        <video
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          src="/video/hero.mp4"
          poster="/video/hero.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        />
      )}
      {/* Legibilidade mobile: blur mascarado + tinta */}
      <div
        aria-hidden
        className="absolute inset-0 -z-[5] md:hidden backdrop-blur-xl pointer-events-none"
        style={{
          WebkitMaskImage: 'linear-gradient(to top, black 0%, black 30%, transparent 70%)',
          maskImage: 'linear-gradient(to top, black 0%, black 30%, transparent 70%)',
        }}
      />
      <div aria-hidden className="absolute inset-0 -z-[4] md:hidden bg-gradient-to-t from-cacau via-cacau/60 to-cacau/20" />

      <div className="relative mx-auto grid w-full max-w-6xl items-end gap-10 px-5 pb-12 pt-28 sm:px-8 md:grid-cols-[1.15fr_0.85fr] md:gap-12 md:pb-20 lg:px-12">
        {/* Texto */}
        <div className="flex flex-col gap-6 md:gap-8">
          <p className="rotulo enter enter-2">
            {hero.eyebrow} · {evento.dataCurta} · {evento.cidade}
          </p>
          <h1 className="enter enter-3 max-w-[15ch]">
            Você é a mulher que resolve.{' '}
            <span className="opacity-80">E quem segura </span>
            <span className="script">você?</span>
          </h1>
          <p className="enter enter-4 max-w-[46ch] text-[1.05rem] leading-relaxed text-marfim/80 md:text-lg">
            {hero.promessa}
          </p>
          <div className="enter enter-5 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button href="#ingressos" variant="glass">
              {hero.cta}
            </Button>
            <p className="text-sm text-marfim/70">
              A partir de <strong className="font-medium text-marfim">{evento.precoMin}</strong> · {evento.parcelaMin}
            </p>
          </div>
        </div>

        {/* Painel retrato (desktop) */}
        {desktop && (
        <div className="enter enter-4 relative justify-self-end">
          <div className="liquid-glass liquid-glass--gold rounded-[2rem] p-2">
            <div className="relative aspect-[9/16] h-[min(68dvh,700px)] overflow-hidden rounded-[1.6rem] bg-cacau">
              <video
                className="h-full w-full object-cover"
                src="/video/hero.mp4"
                poster="/video/hero.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Liliany Gonçalves conduzindo uma turma de mulheres"
              />
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-cacau/70 to-transparent" />
              <p className="absolute bottom-5 left-6 right-6 text-xs uppercase tracking-[0.28em] text-marfim/80">
                Liliany em sala
              </p>
            </div>
          </div>
        </div>
        )}
      </div>
    </section>
  )
}
