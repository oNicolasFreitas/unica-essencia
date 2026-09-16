import { Check } from 'lucide-react'
import { paraQuem } from '../data/copy'
import { Section } from './ui'

/** Para quem é: seção própria, logo depois da identificação (Espelho). */
export function ParaQuem() {
  return (
    <Section id="para-quem" tight>
      <h2 data-reveal className="mx-auto max-w-[18ch] text-center md:mx-0 md:text-left">{paraQuem.titulo}</h2>
      <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-12">
        <div data-reveal>
          <h3 className="text-vinho">{paraQuem.sim.titulo}</h3>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-cacau/85">
            {paraQuem.sim.itens.map((t) => <li key={t} className="flex gap-3"><Check strokeWidth={1.5} className="mt-1 h-4 w-4 shrink-0 text-dourado" aria-hidden /><span>{t}</span></li>)}
          </ul>
        </div>
        <div data-reveal>
          <h3 className="text-cacau/70">{paraQuem.nao.titulo}</h3>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-cacau/70">
            {paraQuem.nao.itens.map((t) => <li key={t} className="flex gap-3"><span className="mt-2 h-px w-4 shrink-0 bg-cacau/40" aria-hidden /><span>{t}</span></li>)}
          </ul>
        </div>
      </div>
    </Section>
  )
}
