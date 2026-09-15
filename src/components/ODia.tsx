import { oDia } from '../data/copy'
import { Section, Button } from './ui'
import { cta } from '../data/copy'

/** O dia: deck + os três objetos em lista editorial numerada. Sem cards. */
export function ODia() {
  return (
    <Section id="o-dia">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h2 data-reveal className="max-w-[14ch]">{oDia.titulo}</h2>
          <p data-reveal className="mt-6 max-w-[30ch] font-display text-lg font-light italic text-ameixa">{oDia.deck}</p>
          <p data-reveal className="prosa mt-6 text-cacau/75">{oDia.intro}</p>
        </div>
        <ol className="flex flex-col divide-y divide-vinho/15 border-y border-vinho/15">
          {oDia.objetos.map((o) => (
            <li key={o.nome} data-reveal className="grid gap-3 py-7 sm:grid-cols-[3rem_1fr] sm:gap-6">
              <span className="hidden font-display text-sm text-ameixa pt-2 sm:block">{o.n}</span>
              <div>
                <h3 className="font-display text-2xl font-light text-vinho"><span className="mr-3 text-sm text-ameixa sm:hidden">{o.n}</span>{o.nome}</h3>
                <p className="mt-2 font-display text-lg font-light italic text-ameixa">{o.olho}</p>
                <p className="mt-3 text-cacau/80">{o.corpo}</p>
                <p className="mt-3 text-sm font-medium text-vinho">{o.fecho}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-14 border-t border-vinho/15 pt-10 md:mt-20">
        <p data-reveal className="text-center text-sm text-cacau/60 md:text-left">O que fica depois do dia 10</p>
        <div className="mt-6 grid gap-8 md:grid-cols-3 md:gap-10">
          {oDia.fica.map((it) => (
            <div key={it.t} data-reveal className="text-center md:text-left">
              <p className="font-display text-lg font-normal text-vinho">{it.t}</p>
              <p className="mt-2 text-sm text-cacau/75">{it.d}</p>
            </div>
          ))}
          <div data-reveal className="flex items-center justify-center md:justify-start">
            <Button href="#ingressos" variant="ghost">{cta.vaga}</Button>
          </div>
        </div>
      </div>
    </Section>
  )
}
