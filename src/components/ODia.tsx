import { oDia } from '../data/copy'
import { Section, Header, Selo, Anel } from './ui'
import { Dobravel } from './Dobravel'
import { Palavras } from './Palavras'

/** O Dia: absorveu "O que é" (o deck vira lead) e "O que fica" (dois itens no fecho). */
export function ODia() {
  return (
    <Section id="o-dia" tone="cacau" className="overflow-hidden">
      <Anel className="-left-52 top-10 h-[40rem] w-[40rem] text-dourado/10" />
      <Header
        titulo={<Palavras partes={[oDia.titulo]} />}
        max="16ch"
        lead={
          <>
            <p className="deck text-nude">{oDia.deck}</p>
            <p className="mt-5">{oDia.intro}</p>
          </>
        }
      />

      {/* Zigzag: cada objeto ocupa uma linha, alternando o lado do nome. */}
      <ol className="mt-16 flex flex-col divide-y divide-marfim/15 md:mt-24">
        {oDia.objetos.map((o, i) => (
          <li key={o.nome} data-reveal className="grid gap-6 py-10 first:pt-0 md:grid-cols-[1fr_1fr] md:gap-16 md:py-14">
            <div className={`flex items-start gap-5 ${i % 2 ? 'md:order-2 md:justify-end md:text-right' : ''}`}>
              {i % 2 ? null : <Selo n={o.n} />}
              <div>
                <h3 className="font-display text-3xl font-light">{o.nome}</h3>
                <p className="mt-3 max-w-[30ch] font-display text-lg font-light italic text-nude">{o.olho}</p>
              </div>
              {i % 2 ? <Selo n={o.n} /> : null}
            </div>
            <div className={`prosa text-marfim/85 ${i % 2 ? 'md:order-1' : ''}`}>
              <p>{o.corpo}</p>
              <p className="mt-4 text-dourado">{o.fecho}</p>
            </div>
          </li>
        ))}
      </ol>

      <Dobravel rotulo="O que fica depois do dia 10" className="mt-10 md:mt-14 md:border-t md:border-dourado/40 md:pt-10">
        <div data-reveal className="grid gap-8 md:grid-cols-2 md:gap-16">
          {oDia.fica.map((it) => (
            <div key={it.t}>
              <p className="font-display text-xl font-normal">{it.t}</p>
              <p className="mt-2 text-marfim/85">{it.d}</p>
            </div>
          ))}
        </div>
      </Dobravel>
    </Section>
  )
}
