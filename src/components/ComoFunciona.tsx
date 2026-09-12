import { useRef } from 'react'
import { comoFunciona, prazo, evento } from '../data/copy'
import { Section, Header, Selo, Rotulo } from './ui'
import { useCounter } from '../hooks/useReveal'

export function ComoFunciona() {
  return (
    <Section id="como-funciona" tone="marfim" tight>
      <Header rotulo={comoFunciona.rotulo} titulo={comoFunciona.titulo} max="16ch" />
      <ol className="mt-12 grid gap-8 md:mt-16 md:grid-cols-3 md:gap-10">
        {comoFunciona.passos.map((p, i) => (
          <li key={p.t} data-reveal className="flex flex-col gap-4 border-t border-vinho/20 pt-6">
            <Selo n={i + 1} tone="ink" />
            <h3 className="text-vinho">{p.t}</h3>
            <p className="text-cacau/75">{p.d}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}

export function Prazo() {
  const n = useRef<HTMLSpanElement>(null)
  useCounter(n, evento.lugares)
  return (
    <Section tone="cacau">
      <div className="grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <div data-reveal className="flex flex-col">
          <span
            ref={n}
            className="font-display font-extralight leading-none tracking-tight text-dourado"
            style={{ fontSize: 'var(--t-numero)' }}
          >
            0
          </span>
          <span className="mt-2 font-display text-2xl font-light text-marfim/80 md:text-3xl">{prazo.legenda}</span>
        </div>
        <div className="prosa text-marfim/85">
          <Rotulo>
            <span data-reveal className="inline-block">{prazo.rotulo}</span>
          </Rotulo>
          <h2 data-reveal className="mt-4">
            {prazo.titulo}
          </h2>
          <p data-reveal className="mt-8 font-display text-xl font-light text-nude">{prazo.p1}</p>
          <p data-reveal>
            {prazo.p2}
            <strong className="font-medium text-marfim">{prazo.p2forte}</strong>
          </p>
          <p data-reveal>{prazo.p3}</p>
        </div>
      </div>
    </Section>
  )
}
