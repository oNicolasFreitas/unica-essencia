import { ArrowDown } from 'lucide-react'
import { ingressos, evento, cta } from '../data/copy'

/**
 * Resumo dos dois ingressos logo depois do Espelho: a compradora apressada
 * vê os dois preços na segunda tela, sem precisar rolar até #ingressos.
 */
export function ResumoIngressos() {
  const u = ingressos.unica
  const e = ingressos.essencial
  return (
    <div className="bg-vinho px-5 pb-20 text-marfim sm:px-8 md:pb-32 lg:px-12">
      <div data-reveal className="mx-auto max-w-6xl border-t border-marfim/15 pt-10 md:pt-14">
        <div className="grid gap-8 md:grid-cols-[1fr_1fr_auto] md:items-end md:gap-12">
          <div>
            <p className="text-sm text-nude">{e.nome}</p>
            <p className="mt-1 font-display text-2xl font-extralight">
              {e.valor} <span className="font-body text-sm font-normal text-marfim/70">{e.parcela}</span>
            </p>
            <p className="mt-2 text-sm text-marfim/85">{e.frase}</p>
          </div>
          <div>
            <p className="text-sm text-nude">{u.nome} · {u.selo.toLowerCase()}</p>
            <p className="mt-1 font-display text-2xl font-extralight">
              {u.valor} <span className="font-body text-sm font-normal text-marfim/70">{u.parcela}</span>
            </p>
            <p className="mt-2 text-sm text-marfim/85">{u.frase}</p>
          </div>
          <div className="flex flex-col items-start gap-2 md:items-end">
            <a
              href="#ingressos"
              className="group pressable inline-flex min-h-[48px] items-center gap-2 rounded-full bg-dourado px-7 text-sm font-medium text-cacau transition-colors duration-300 hover:bg-dourado/85"
            >
              <span className="pt-[2px]">{cta.vaga}</span>
              <ArrowDown strokeWidth={1.5} className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-y-0.5" aria-hidden />
            </a>
            <p className="text-sm text-marfim/70">Inscrições até {evento.prazo}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
