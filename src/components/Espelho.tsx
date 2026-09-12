import { espelho } from '../data/copy'
import { Section, Rotulo, Anel } from './ui'

export function Espelho() {
  return (
    <Section tone="vinho" className="overflow-hidden">
      <Anel className="-right-40 -top-40 h-[34rem] w-[34rem] text-marfim/10" />
      <div className="flex flex-col items-center gap-4 text-center">
        <Rotulo>
          <span data-reveal className="inline-block">{espelho.rotulo}</span>
        </Rotulo>
        <h2 data-reveal className="max-w-[18ch]">
          O que todos veem. <span className="script md:whitespace-nowrap">E o que ninguém vê.</span>
        </h2>
      </div>

      <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-[1fr_1px_1fr] md:gap-14">
        <div data-reveal className="flex flex-col gap-5">
          <p className="font-display text-sm uppercase tracking-[0.28em] text-blush">{espelho.visivel.titulo}</p>
          <ul className="flex flex-col gap-3 font-display text-2xl font-light leading-snug md:text-3xl">
            {espelho.visivel.itens.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <div aria-hidden className="hidden bg-gradient-to-b from-transparent via-dourado/60 to-transparent md:block" />
        <div data-reveal className="flex flex-col gap-5 border-t border-marfim/15 pt-8 md:border-0 md:pt-0">
          <p className="font-display text-sm uppercase tracking-[0.28em] text-dourado">{espelho.interno.titulo}</p>
          <ul className="flex flex-col gap-3 font-display text-2xl font-light italic leading-snug text-nude md:text-3xl">
            {espelho.interno.itens.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>

      <blockquote data-reveal className="deck mx-auto mt-16 max-w-[34ch] text-center text-nude md:mt-24">
        {espelho.citacao}
      </blockquote>
      <p data-reveal className="mx-auto mt-8 max-w-[48ch] text-center text-marfim/70">
        {espelho.fecho}
      </p>
    </Section>
  )
}
