import { oQueE, tresObjetos } from '../data/copy'
import { Section, Header, Selo, Anel } from './ui'

export function OQueE() {
  return (
    <Section tone="marfim" tight>
      <div className="mx-auto max-w-3xl">
        <Header rotulo={oQueE.rotulo} titulo={oQueE.titulo} max="22ch" />
        <p data-reveal className="deck mt-8 max-w-[30ch] text-vinho">
          {oQueE.deck}
        </p>
        <p data-reveal className="prosa mt-6 text-cacau/80">
          {oQueE.texto}
        </p>
      </div>
    </Section>
  )
}

export function TresObjetos() {
  const tons = ['bg-vinho text-marfim', 'bg-ameixa text-marfim', 'bg-nude text-cacau']
  return (
    <Section id="o-dia" tone="cacau" className="overflow-hidden">
      <Anel className="-left-52 top-10 h-[40rem] w-[40rem] text-dourado/10" />
      <Header rotulo={tresObjetos.rotulo} titulo={tresObjetos.titulo} lead={tresObjetos.intro} max="16ch" />

      <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3 md:gap-6">
        {tresObjetos.objetos.map((o, i) => (
          <article
            key={o.nome}
            data-reveal
            className={`group flex flex-col gap-5 rounded-[2rem] p-7 transition-transform duration-500 ease-out hover:-translate-y-1 md:p-9 ${tons[i]}`}
          >
            <Selo n={o.n} tone={i === 2 ? 'ink' : 'gold'} />
            <h3 className="font-display text-3xl font-light">{o.nome}</h3>
            <p className={`font-display text-lg font-light italic leading-snug ${i === 2 ? 'text-vinho' : 'text-nude'}`}>{o.olho}</p>
            <p className={`text-[0.98rem] ${i === 2 ? 'text-cacau/80' : 'text-marfim/80'}`}>{o.corpo}</p>
            <p className={`mt-auto border-t pt-5 text-sm ${i === 2 ? 'border-vinho/20 text-vinho' : 'border-marfim/15 text-dourado'}`}>{o.fecho}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
