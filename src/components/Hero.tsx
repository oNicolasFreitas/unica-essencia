import { evento, hero, cta } from '../data/copy'
import { Button } from './ui'

/**
 * Hero editorial light: título em vinho sobre marfim à esquerda,
 * vídeo vertical da Liliany em moldura à direita. No mobile o vídeo
 * vem primeiro, em 4:5, e o texto abaixo.
 */
export function Hero() {
  return (
    <section id="top" className="relative bg-marfim px-5 pb-12 pt-24 sm:px-8 md:pb-24 md:pt-32 lg:px-12">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 md:grid-cols-[1.1fr_0.9fr] md:gap-14 lg:gap-20">
        <div className="enter enter-2 order-first md:order-last">
          <div className="relative mx-auto aspect-[4/5] max-w-[420px] overflow-hidden rounded-[1.5rem] bg-nude md:mx-0 md:aspect-[4/5] md:max-w-none">
            <img
              src="/img/hero.webp"
              alt="Retrato de Liliany Gonçalves"
              width={1200}
              height={1500}
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full md:left-5 md:translate-x-0 bg-marfim/85 px-3 py-1 text-xs text-vinho backdrop-blur">{hero.legendaFoto}</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 text-center md:items-start md:gap-8 md:text-left">
          <h1 className="enter enter-2 max-w-[20ch]">
            Você é a mulher que resolve. E quem segura <span className="script">você?</span>
          </h1>
          <p className="enter enter-3 max-w-[44ch] text-base text-cacau/80 md:text-lg">{hero.promessa}</p>
          <div className="enter enter-4 flex w-full flex-col items-center gap-3 md:w-auto md:flex-row md:flex-wrap md:gap-x-6 md:gap-y-4">
            <Button href="#ingressos" variant="vinho" className="w-full max-w-[420px] md:w-auto">{cta.vaga}</Button>
            <p className="text-sm text-cacau/70">
              A partir de <strong className="font-medium text-vinho">{evento.precoMin}</strong> · {evento.parcelaMin}
            </p>
          </div>
          <dl className="enter enter-4 grid w-full grid-cols-2 gap-x-4 gap-y-4 border-t border-vinho/15 pt-6 text-sm sm:grid-cols-4 md:text-left">
            {[['Data', evento.data], ['Horário', evento.horario], ['Cidade', `${evento.cidade} · ${evento.uf}`], ['Turma', `${evento.lugares} mulheres`]].map(([k, v]) => (
              <div key={k}>
                <dt className="text-cacau/70">{k}</dt>
                <dd className="mt-0.5 font-medium text-vinho">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
