import { Check } from 'lucide-react'
import { ingressos, oEncontro } from '../data/copy'
import { Section, Header, Button } from './ui'
import { checkoutHref, externalProps } from '../config'

export function Ingressos() {
  const u = ingressos.unica
  const e = ingressos.essencial
  const hu = checkoutHref('unica')
  const he = checkoutHref('essencial')
  return (
    <Section id="ingressos" tone="marfim">
      <Header rotulo={ingressos.rotulo} titulo={ingressos.titulo} center max="16ch" />

      <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-[1.1fr_0.9fr] md:items-start">
        <article
          data-reveal
          className="relative flex flex-col gap-6 overflow-hidden rounded-[2rem] bg-vinho p-7 text-marfim md:p-10"
        >
          <span className="w-fit rounded-full border border-dourado/60 px-3 py-1 text-[0.68rem] uppercase tracking-[0.25em] text-dourado">
            {u.selo}
          </span>
          <div>
            <h3 className="font-display text-4xl font-light">{u.nome}</h3>
            <p className="mt-2 font-display text-lg font-light italic text-nude">{u.frase}</p>
          </div>
          <p className="font-display text-5xl font-extralight leading-none">
            {u.valor}
            <span className="mt-2 block font-body text-sm font-normal text-marfim/70">{u.parcela}</span>
          </p>
          <ul className="flex flex-col gap-3">
            {u.itens.map((t) => (
              <li key={t} className="flex gap-3 text-marfim/90">
                <Check strokeWidth={1.5} className="mt-1.5 h-4 w-4 shrink-0 text-dourado" aria-hidden />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <Button href={hu} variant="solid" className="mt-2 w-full sm:w-auto" data-checkout="unica" {...externalProps(hu)}>
            {u.cta}
          </Button>
        </article>

        <article data-reveal className="flex flex-col gap-6 rounded-[2rem] border border-vinho/20 p-7 text-cacau md:p-10">
          <div>
            <h3 className="font-display text-4xl font-light text-vinho">{e.nome}</h3>
            <p className="mt-2 font-display text-lg font-light italic text-ameixa">{e.frase}</p>
          </div>
          <p className="font-display text-5xl font-extralight leading-none text-vinho">
            {e.valor}
            <span className="mt-2 block font-body text-sm font-normal text-cacau/60">{e.parcela}</span>
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
        <p className="mt-3">{ingressos.igualdade2}</p>
      </div>
    </Section>
  )
}

export function OEncontro() {
  return (
    <Section tone="ameixa" tight>
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <Header rotulo={oEncontro.rotulo} titulo={oEncontro.titulo} max="12ch" />
        <div>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-4 md:gap-x-6">
            {oEncontro.fatos.map((f) => (
              <div key={f.k} data-reveal className="border-t border-marfim/25 pt-4">
                <dt className="text-[0.68rem] uppercase tracking-[0.28em] text-dourado">{f.k}</dt>
                <dd className="mt-2 font-display text-xl font-light leading-snug md:text-2xl">{f.v}</dd>
              </div>
            ))}
          </dl>
          <p data-reveal className="mt-8 max-w-[52ch] text-sm text-marfim/70">{oEncontro.nota}</p>
        </div>
      </div>
    </Section>
  )
}
