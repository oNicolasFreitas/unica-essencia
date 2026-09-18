import { useRef } from 'react'
import { Check, ShieldCheck, MapPin } from 'lucide-react'
import { ingressos, oEncontro, evento } from '../data/copy'
import { Section, Button } from './ui'
import { checkoutHref, externalProps } from '../config'
import { useCounter } from '../hooks/useReveal'

/** Ingressos: prazo + dois cards + para quem. Tudo numa seção só. */
export function Ingressos() {
  const n = useRef<HTMLSpanElement>(null)
  useCounter(n, evento.lugares)
  const u = ingressos.unica
  const e = ingressos.essencial
  const hu = checkoutHref('unica')
  const he = checkoutHref('essencial')
  return (
    <Section id="ingressos">
      <div className="grid items-end gap-6 text-center md:grid-cols-[auto_1fr] md:gap-14 md:text-left">
        <div data-reveal className="flex flex-col items-center md:block">
          <span ref={n} className="font-display text-numero font-extralight text-vinho">0</span>
          <span className="font-display text-lg font-light text-cacau/70 md:mt-1 md:block">{oEncontro.legenda}</span>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <h2 data-reveal className="max-w-[18ch]">{oEncontro.titulo}</h2>
          <p data-reveal className="mt-4 max-w-[52ch] text-cacau/75">{oEncontro.p1} {oEncontro.p3}</p>
        </div>
      </div>

      <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2">
        <article data-reveal className="flex flex-col gap-5 rounded-[1.5rem] bg-vinho p-7 text-marfim md:p-9">
          <p className="text-xs text-nude">{u.selo}</p>
          <div>
            <h3 className="font-display text-2xl font-light text-marfim">{u.nome}</h3>
            <p className="mt-1 text-sm text-nude">{u.frase}</p>
          </div>
          <p className="font-display text-2xl font-extralight text-marfim">
            {u.valor} <span className="font-body text-sm font-normal text-marfim/80">{u.parcela}</span>
          </p>
          <ul className="flex flex-col gap-2.5 text-sm">
            {u.itens.map((t) => (
              <li key={t} className="flex gap-3"><Check strokeWidth={1.5} className="mt-1 h-4 w-4 shrink-0 text-dourado" aria-hidden /><span>{t}</span></li>
            ))}
          </ul>
          <Button href={hu} variant="marfim" className="mt-auto w-full" data-checkout="unica" {...externalProps(hu)}>{u.cta}</Button>
        </article>

        <article data-reveal className="flex flex-col gap-5 rounded-[1.5rem] border border-vinho/20 bg-marfim p-7 md:p-9">
          <p className="text-xs text-cacau/60">Ingresso</p>
          <div>
            <h3 className="font-display text-2xl font-light text-vinho">{e.nome}</h3>
            <p className="mt-1 text-sm text-ameixa">{e.frase}</p>
          </div>
          <p className="font-display text-2xl font-extralight text-vinho">
            {e.valor} <span className="font-body text-sm font-normal text-cacau/70">{e.parcela}</span>
          </p>
          <ul className="flex flex-col gap-2.5 text-sm text-cacau/85">
            {e.itens.map((t) => (
              <li key={t} className="flex gap-3"><Check strokeWidth={1.5} className="mt-1 h-4 w-4 shrink-0 text-ameixa" aria-hidden /><span>{t}</span></li>
            ))}
          </ul>
          <Button href={he} variant="ghost" className="mt-auto w-full" data-checkout="essencial" {...externalProps(he)}>{e.cta}</Button>
        </article>
      </div>
      <p data-reveal className="mx-auto mt-8 max-w-2xl text-center text-sm text-cacau/75">
        <strong className="font-medium text-vinho">{ingressos.igualdadeForte}</strong>{ingressos.igualdade}
      </p>
      <div data-reveal className="mx-auto mt-8 grid max-w-3xl gap-4 rounded-[1.5rem] border border-vinho/15 p-6 text-sm text-cacau/80 sm:grid-cols-2 sm:gap-8">
        <div className="flex gap-3"><ShieldCheck strokeWidth={1.5} className="mt-0.5 h-5 w-5 shrink-0 text-vinho" aria-hidden /><p>{ingressos.garantia}</p></div>
        <div className="flex gap-3"><MapPin strokeWidth={1.5} className="mt-0.5 h-5 w-5 shrink-0 text-vinho" aria-hidden /><p><strong className="font-medium text-vinho">{evento.endereco}</strong>, {evento.cidade} · {evento.uf}. {evento.credenciamento}, das 9h às 19h, com coffee incluso. Estacionamento na região.</p></div>
      </div>

    </Section>
  )
}
