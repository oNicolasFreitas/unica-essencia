import { useRef } from 'react'
import { Check } from 'lucide-react'
import { ingressos, oEncontro, evento, cta } from '../data/copy'
import { Section, Header, Button } from './ui'
import { checkoutHref, externalProps } from '../config'
import { useCounter } from '../hooks/useReveal'

/** O Encontro: ficha técnica + urgência (absorveu "Prazo"), imediatamente antes de Ingressos. */
export function OEncontro() {
  const n = useRef<HTMLSpanElement>(null)
  useCounter(n, evento.lugares)
  return (
    <Section tone="vinho">
      <div className="grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <div data-reveal className="flex flex-col">
          <span ref={n} className="font-display text-numero font-extralight tracking-tight text-dourado">
            0
          </span>
          <span className="mt-2 font-display text-xl font-light text-marfim/85 md:text-2xl">{oEncontro.legenda}</span>
        </div>
        <div className="prosa text-marfim/85">
          <h2 data-reveal>{oEncontro.titulo}</h2>
          <p data-reveal className="mt-8 font-display text-xl font-light text-nude">{oEncontro.p1}</p>
          <p data-reveal>{oEncontro.p3}</p>
        </div>
      </div>

      <div className="mt-14 grid gap-10 border-t border-marfim/20 pt-10 md:mt-20 md:grid-cols-[1.2fr_auto] md:items-end md:gap-16">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-4 md:gap-x-6">
          {oEncontro.fatos.map((f) => (
            <div key={f.k} data-reveal>
              <dt className="text-sm text-nude">{f.k}</dt>
              <dd className="mt-2 font-display text-lg font-light md:text-xl">{f.v}</dd>
            </div>
          ))}
        </dl>
        <div data-reveal>
          <Button href="#ingressos" variant="solid">
            {cta.vaga}
          </Button>
        </div>
      </div>
    </Section>
  )
}

export function Ingressos() {
  const u = ingressos.unica
  const e = ingressos.essencial
  const hu = checkoutHref('unica')
  const he = checkoutHref('essencial')
  return (
    <Section id="ingressos" tone="marfim">
      <Header titulo={ingressos.titulo} center max="16ch" />

      <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-[1.1fr_0.9fr] md:items-start">
        <article data-reveal className="relative flex flex-col gap-6 overflow-hidden rounded-[2rem] bg-vinho p-7 text-marfim md:p-10">
          <span className="w-fit rounded-full border border-dourado/60 px-3 py-1 text-xs text-dourado">{u.selo}</span>
          <div>
            <h3 className="font-display text-3xl font-light">{u.nome}</h3>
            <p className="mt-2 font-display text-lg font-light italic text-nude">{u.frase}</p>
          </div>
          <p className="font-display text-3xl font-extralight">
            {u.valor}
            <span className="mt-2 block font-body text-sm font-normal text-marfim/85">{u.parcela}</span>
          </p>
          <ul className="flex flex-col gap-3">
            {u.itens.map((t) => (
              <li key={t} className="flex gap-3 text-marfim/90">
                <Check strokeWidth={1.5} className="mt-1.5 h-4 w-4 shrink-0 text-dourado" aria-hidden />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          {/* AVISO: placeholder — substituir por dado real (Fase 0.7: quantas vagas Única existem) */}
          <Button href={hu} variant="solid" className="mt-2 w-full sm:w-auto" data-checkout="unica" {...externalProps(hu)}>
            {u.cta}
          </Button>
        </article>

        <article data-reveal className="flex flex-col gap-6 rounded-[2rem] border border-vinho/20 p-7 text-cacau md:p-10">
          <div>
            <h3 className="font-display text-3xl font-light text-vinho">{e.nome}</h3>
            <p className="mt-2 font-display text-lg font-light italic text-ameixa">{e.frase}</p>
          </div>
          <p className="font-display text-3xl font-extralight text-vinho">
            {e.valor}
            <span className="mt-2 block font-body text-sm font-normal text-cacau/75">{e.parcela}</span>
          </p>
          <ul className="flex flex-col gap-3">
            {e.itens.map((t) => (
              <li key={t} className="flex gap-3 text-cacau/85">
                <Check strokeWidth={1.5} className="mt-1.5 h-4 w-4 shrink-0 text-ameixa" aria-hidden />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <Button href={he} variant="ghostInk" className="mt-2 w-full sm:w-auto" data-checkout="essencial" {...externalProps(he)}>
            {e.cta}
          </Button>
        </article>
      </div>

      <div data-reveal className="mx-auto mt-12 max-w-2xl text-center text-cacau/75 md:mt-16">
        <p>
          <strong className="font-medium text-vinho">{ingressos.igualdadeForte}</strong>
          {ingressos.igualdade}
        </p>
      </div>

      {/* AVISO: placeholder — substituir por dado real. Faixa de segurança abaixo dos cards
          (Fase 0.4 política de reembolso, 0.5 nome do auditório, 0.8 almoço). Sem os dados
          da Liliany não há o que renderizar aqui. */}
    </Section>
  )
}
