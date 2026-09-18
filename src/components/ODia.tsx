import { oDia, cta } from '../data/copy'
import { Section, Button } from './ui'

/**
 * O que você vai viver. A pedido da Liliany (18/09/2026), as três dinâmicas
 * (batom, menina, presente) NÃO aparecem: são surpresa. Fica o que ela leva.
 */
export function ODia() {
  return (
    <Section id="o-dia">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h2 data-reveal className="max-w-[14ch]">{oDia.titulo}</h2>
          <p data-reveal className="mt-6 max-w-[30ch] font-display text-lg font-light italic text-ameixa">{oDia.deck}</p>
          <p data-reveal className="prosa mt-6 text-cacau/75">{oDia.intro}</p>
        </div>
        <div className="flex flex-col divide-y divide-vinho/15 border-y border-vinho/15">
          {oDia.fica.map((it) => (
            <div key={it.t} data-reveal className="py-7 text-center md:text-left">
              <h3 className="font-display text-xl font-normal text-vinho">{it.t}</h3>
              <p className="mt-2 text-cacau/80">{it.d}</p>
            </div>
          ))}
          <div data-reveal className="flex justify-center py-7 md:justify-start">
            <Button href="#ingressos" variant="ghost">{cta.vaga}</Button>
          </div>
        </div>
      </div>
    </Section>
  )
}
