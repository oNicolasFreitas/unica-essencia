import { quemConduz, porQueEu } from '../data/copy'
import { Section, Button } from './ui'
import { cta } from '../data/copy'

/** Quem conduz: foto grande, a frase-chave da história da Liliany e as duas bios curtas. */
export function QuemConduz() {
  return (
    <Section id="quem-conduz" bg="blush">
      <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:items-center">
        <figure data-clip className="mx-auto w-full max-w-[420px] overflow-hidden rounded-[1.5rem] md:max-w-none">
          <img src="/img/liliany-2.webp" alt="Liliany, de crachá de staff, abraçando uma participante sentada à mesa" width={1000} height={1133} loading="lazy" className="aspect-[4/4.6] w-full object-cover" />
        </figure>
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h2 data-reveal className="max-w-[16ch]">{quemConduz.tituloSolo}</h2>
          <p data-reveal className="mt-6 max-w-[40ch] font-display text-lg font-light text-vinho md:text-xl">{porQueEu.destaque}</p>
          <div data-reveal className="mt-8 w-full max-w-[48ch] border-l-2 border-vinho/30 pl-5 text-left">
            {porQueEu.cena.map((p) => (
              <p key={p} className="text-sm italic text-cacau/80 [&+p]:mt-2">{p}</p>
            ))}
            <p className="script mt-4 text-2xl text-ameixa">{porQueEu.assinatura}</p>
          </div>
          <div data-reveal className="mt-10 w-full max-w-[52ch] text-center md:text-left">
            <p className="text-sm text-cacau/60">{quemConduz.liliany.papel}</p>
            <h3 className="mt-1 text-vinho">{quemConduz.liliany.nome}</h3>
            <p className="mt-3 text-sm text-cacau/80">{quemConduz.liliany.p[0]}</p>
            <p className="mt-3 text-sm text-cacau/80">{quemConduz.liliany.p[1]}</p>
          </div>
          <div data-reveal className="mt-10">
            <Button href="#ingressos" variant="vinho">{cta.vaga}</Button>
          </div>
        </div>
      </div>
    </Section>
  )
}
