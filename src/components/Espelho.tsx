import { espelho } from '../data/copy'
import { Section } from './ui'

/** O espelho: uma citação grande e as duas listas curtas, lado a lado. */
export function Espelho() {
  return (
    <Section bg="nude">
      <blockquote data-reveal className="mx-auto max-w-[30ch] text-center font-display text-xl font-light text-vinho md:text-2xl">
        {espelho.citacao}
      </blockquote>
      <div className="mx-auto mt-12 grid max-w-4xl gap-10 text-center md:mt-16 md:grid-cols-2 md:gap-12 md:text-left">
        <div data-reveal>
          <p className="text-sm text-cacau/60">{espelho.visivel.titulo}</p>
          <ul className="mt-3 flex flex-col gap-2 font-display text-lg font-light text-cacau">
            {espelho.visivel.itens.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>
        <div data-reveal>
          <p className="text-sm text-cacau/60">{espelho.interno.titulo}</p>
          <ul className="mt-3 flex flex-col gap-2 font-display text-lg font-normal text-vinho">
            {espelho.interno.itens.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>
      </div>
    </Section>
  )
}
