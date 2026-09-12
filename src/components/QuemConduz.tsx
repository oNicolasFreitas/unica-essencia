import { useRef } from 'react'
import { quemConduz } from '../data/copy'
import { Section, Header } from './ui'
import { useParallax } from '../hooks/useReveal'

/* Dimensões reais dos arquivos em public/img (altura 520), para evitar CLS. */
const fotos = [
  [305, 520], [292, 520], [390, 520], [390, 520], [390, 520], [349, 520], [346, 520], [791, 520],
].map(([w, h], i) => ({ src: `/img/servindo-${i + 1}.webp`, w, h }))

export function QuemConduz() {
  const fig = useRef<HTMLDivElement>(null)
  useParallax(fig, 24)
  return (
    <Section id="quem-conduz" tone="vinho" className="overflow-hidden">
      <Header titulo={quemConduz.titulo} max="18ch" />

      <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-[1fr_0.85fr] md:gap-16 lg:gap-24">
        <div className="flex flex-col gap-12">
          <article data-reveal className="prosa">
            <p className="text-sm text-nude">{quemConduz.liliany.papel}</p>
            <h3 className="mt-2 font-display text-2xl font-light">{quemConduz.liliany.nome}</h3>
            <div className="mt-5 text-marfim/85">
              {quemConduz.liliany.p.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p>
                <strong className="font-medium text-marfim">{quemConduz.liliany.forte}</strong>
                {quemConduz.liliany.fecho}
              </p>
            </div>
          </article>
          <article data-reveal className="prosa border-t border-marfim/15 pt-10">
            <p className="text-sm text-nude">{quemConduz.duda.papel}</p>
            <h3 className="mt-2 font-display text-2xl font-light">{quemConduz.duda.nome}</h3>
            <div className="mt-5 text-marfim/85">
              {quemConduz.duda.p.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </article>
        </div>

        <figure ref={fig}>
          <img
            src="/img/liliany-2.webp"
            alt="Liliany, de crachá de staff, abraçando uma participante sentada à mesa"
            width={1000}
            height={1133}
            loading="lazy"
            className="aspect-[4/4.4] w-full rounded-[2rem] object-cover"
          />
          <figcaption className="mt-3 text-sm text-marfim/85">{quemConduz.legendaRetrato}</figcaption>
        </figure>
      </div>

      {/* Bastidores: marquee único da página, sem cabeçalho. */}
      <div className="marquee relative mt-16 -mx-5 sm:-mx-8 md:mt-24 lg:-mx-12">
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-glass w-16 bg-gradient-to-r from-vinho to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-glass w-16 bg-gradient-to-l from-vinho to-transparent" />
        <div className="marquee-track gap-4 px-4">
          {[...fotos, ...fotos].map((f, i) => (
            <img
              key={i}
              src={f.src}
              alt={i < fotos.length ? 'Liliany servindo como staff em uma imersão' : ''}
              aria-hidden={i >= fotos.length}
              width={f.w}
              height={f.h}
              loading="lazy"
              className="h-[220px] w-auto rounded-2xl object-cover md:h-[260px]"
            />
          ))}
        </div>
      </div>
    </Section>
  )
}
