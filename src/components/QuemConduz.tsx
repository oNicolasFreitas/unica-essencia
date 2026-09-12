import { useRef } from 'react'
import { quemConduz } from '../data/copy'
import { Section, Header, Rotulo } from './ui'
import { useParallax } from '../hooks/useReveal'

const fotos = [1, 2, 3, 4, 5, 6, 7, 8].map((i) => `/img/servindo-${i}.webp`)

export function QuemConduz() {
  const fig = useRef<HTMLDivElement>(null)
  useParallax(fig, 24)
  return (
    <Section id="quem-conduz" tone="vinho" className="overflow-hidden">
      <Header rotulo={quemConduz.rotulo} titulo={quemConduz.titulo} max="18ch" />

      <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-[1fr_0.85fr] md:gap-16 lg:gap-24">
        <div className="flex flex-col gap-12">
          <article data-reveal className="prosa">
            <p className="text-xs uppercase tracking-[0.3em] text-dourado">{quemConduz.liliany.papel}</p>
            <h3 className="mt-2 font-display text-3xl font-light">{quemConduz.liliany.nome}</h3>
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
            <p className="text-xs uppercase tracking-[0.3em] text-dourado">{quemConduz.duda.papel}</p>
            <h3 className="mt-2 font-display text-3xl font-light">{quemConduz.duda.nome}</h3>
            <div className="mt-5 text-marfim/85">
              {quemConduz.duda.p.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </article>
        </div>

        <div className="flex flex-col gap-6">
          <figure data-reveal ref={fig}>
            <img
              src="/img/liliany-2.webp"
              alt="Liliany, de crachá de staff, abraçando uma participante sentada à mesa"
              width={1000}
              height={1133}
              loading="lazy"
              className="aspect-[4/4.4] w-full rounded-[2rem] object-cover"
            />
            <figcaption className="mt-3 text-sm text-marfim/60">{quemConduz.legendaRetrato}</figcaption>
          </figure>
          <figure data-reveal>
            <img
              src="/img/pv.webp"
              alt="Liliany, com crachá de staff, ao lado de Paulo Vieira nos bastidores de uma imersão"
              width={1200}
              height={1600}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-[2rem] object-cover object-top"
            />
            <figcaption className="mt-3 text-sm text-marfim/60">Nos bastidores da Febracis, ao lado de Paulo Vieira.</figcaption>
          </figure>
        </div>
      </div>

      {/* Bastidores — marquee único da página */}
      <div className="mt-20 md:mt-28">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <Rotulo>
              <span data-reveal className="inline-block">{quemConduz.bastidores.rotulo}</span>
            </Rotulo>
            <h3 data-reveal className="mt-3 font-display text-2xl font-light md:text-3xl">{quemConduz.bastidores.titulo}</h3>
          </div>
          <p data-reveal className="max-w-[44ch] text-sm text-marfim/65">{quemConduz.bastidores.texto}</p>
        </div>
      </div>
      <div className="marquee relative mt-8 -mx-5 sm:-mx-8 lg:-mx-12" data-reveal>
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-16 bg-gradient-to-r from-vinho to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-16 bg-gradient-to-l from-vinho to-transparent" />
        <div className="marquee-track gap-4 px-4">
          {[...fotos, ...fotos].map((src, i) => (
            <img
              key={i}
              src={src}
              alt={i < fotos.length ? 'Liliany servindo como staff em uma imersão' : ''}
              aria-hidden={i >= fotos.length}
              height={260}
              loading="lazy"
              className="h-[220px] w-auto rounded-2xl object-cover md:h-[260px]"
            />
          ))}
        </div>
      </div>
    </Section>
  )
}
