import { espelho } from '../data/copy'
import { Section, Anel } from './ui'

export function Espelho() {
  return (
    <Section tone="vinho" className="overflow-hidden">
      <Anel className="-right-40 -top-40 h-[34rem] w-[34rem] text-marfim/10" />
      <div className="flex flex-col items-center text-center">
        <h2 data-reveal className="max-w-[18ch]">
          O que todos veem. <span className="script md:whitespace-nowrap">E o que ninguém vê.</span>
        </h2>
      </div>

      <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-[1fr_1px_1fr] md:gap-14">
        <div data-reveal className="flex flex-col gap-5">
          <p className="text-sm text-nude">{espelho.visivel.titulo}</p>
          <ul className="flex flex-col gap-3 font-display text-xl font-light md:text-2xl">
            {espelho.visivel.itens.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <div aria-hidden className="hidden bg-gradient-to-b from-transparent via-dourado/60 to-transparent md:block" />
        <div data-reveal className="flex flex-col gap-5 border-t border-marfim/15 pt-8 md:border-0 md:pt-0">
          <p className="text-sm text-nude">{espelho.interno.titulo}</p>
          <ul className="flex flex-col gap-3 font-display text-xl font-normal text-nude md:text-2xl">
            {espelho.interno.itens.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>

      <blockquote data-reveal className="deck mx-auto mt-16 max-w-[34ch] text-center text-nude md:mt-24">
        {espelho.citacao}
      </blockquote>
      <p data-reveal className="mx-auto mt-8 max-w-[48ch] text-center text-marfim/85">
        {espelho.fecho}
      </p>
    </Section>
  )
}
