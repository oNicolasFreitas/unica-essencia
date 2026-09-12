import { Check, X } from 'lucide-react'
import { paraQuem } from '../data/copy'
import { Section, Header } from './ui'

export function ParaQuem() {
  return (
    <Section tone="cacau" tight>
      <Header titulo={paraQuem.titulo} max="18ch" />
      <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-2 md:gap-16">
        <div data-reveal>
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
        <div data-reveal>
          <h3 className="text-marfim/85">{paraQuem.nao.titulo}</h3>
          <ul className="mt-6 flex flex-col gap-4">
            {paraQuem.nao.itens.map((t) => (
              <li key={t} className="flex gap-3">
                <X strokeWidth={1.5} className="mt-1.5 h-4 w-4 shrink-0 text-marfim/50" aria-hidden />
                <span className="text-marfim/85">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
