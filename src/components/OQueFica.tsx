import { Check, X } from 'lucide-react'
import { oQueFica, paraQuem } from '../data/copy'
import { Section, Header, Selo } from './ui'

export function OQueFica() {
  return (
    <Section tone="ameixa">
      <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <Header rotulo={oQueFica.rotulo} titulo={oQueFica.titulo} max="14ch" />
        <ol className="flex flex-col divide-y divide-marfim/15">
          {oQueFica.itens.map((it, i) => (
            <li key={it.t} data-reveal className="flex gap-5 py-7 first:pt-0 md:gap-7">
              <Selo n={i + 1} />
              <div>
                <p className="font-display text-xl font-normal leading-snug md:text-2xl">{it.t}</p>
                <p className="mt-2 text-marfim/75">{it.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}

export function ParaQuem() {
  return (
    <Section tone="cacau">
      <Header rotulo={paraQuem.rotulo} titulo={paraQuem.titulo} max="18ch" />
      <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2">
        <div data-reveal className="rounded-[2rem] border border-dourado/40 p-7 md:p-9">
          <h3 className="text-dourado">{paraQuem.sim.titulo}</h3>
          <ul className="mt-6 flex flex-col gap-4">
            {paraQuem.sim.itens.map((t) => (
              <li key={t} className="flex gap-3">
                <Check strokeWidth={1.5} className="mt-1.5 h-4 w-4 shrink-0 text-dourado" aria-hidden />
                <span className="text-marfim/85">{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal className="rounded-[2rem] border border-marfim/15 p-7 md:p-9">
          <h3 className="text-marfim/70">{paraQuem.nao.titulo}</h3>
          <ul className="mt-6 flex flex-col gap-4">
            {paraQuem.nao.itens.map((t) => (
              <li key={t} className="flex gap-3">
                <X strokeWidth={1.5} className="mt-1.5 h-4 w-4 shrink-0 text-marfim/40" aria-hidden />
                <span className="text-marfim/65">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
