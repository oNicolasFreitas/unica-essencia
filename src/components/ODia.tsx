import { oDia } from '../data/copy'
import { Section } from './ui'

/** O dia: deck + os três objetos em lista editorial numerada. Sem cards. */
export function ODia() {
  return (
    <Section id="o-dia">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <div>
          <h2 data-reveal className="max-w-[14ch]">{oDia.titulo}</h2>
          <p data-reveal className="mt-6 max-w-[30ch] font-display text-lg font-light italic text-ameixa">{oDia.deck}</p>
          <p data-reveal className="prosa mt-6 text-cacau/75">{oDia.intro}</p>
        </div>
        <ol className="flex flex-col divide-y divide-vinho/15 border-y border-vinho/15">
          {oDia.objetos.map((o) => (
            <li key={o.nome} data-reveal className="grid gap-3 py-7 sm:grid-cols-[3rem_1fr] sm:gap-6">
              <span className="font-display text-sm text-ameixa pt-2">{o.n}</span>
              <div>
                <h3 className="font-display text-2xl font-light text-vinho">{o.nome}</h3>
                <p className="mt-2 font-display text-lg font-light italic text-ameixa">{o.olho}</p>
                <p className="mt-3 text-cacau/80">{o.corpo}</p>
                <p className="mt-3 text-sm font-medium text-vinho">{o.fecho}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
