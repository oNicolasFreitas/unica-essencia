import { useState } from 'react'
import { Plus } from 'lucide-react'
import { faq, fechamento, rodape, evento, cta } from '../data/copy'
import { Section, Header, Button, Anel } from './ui'
import { whatsappHref, externalProps } from '../config'

function Item({ q, a, open, onToggle, i }: { q: string; a: string[]; open: boolean; onToggle: () => void; i: number }) {
  const id = `faq-${i}`
  return (
    <div data-reveal className="border-t border-marfim/15">
      <h3 className="m-0 text-base">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={id}
          className="pressable group flex w-full items-center justify-between gap-6 py-6 text-left font-display text-lg font-light text-marfim transition-colors duration-150 hover:text-dourado md:text-xl"
        >
          <span>{q}</span>
          <Plus
            strokeWidth={1.5}
            className={`h-5 w-5 shrink-0 text-dourado transition-transform duration-300 ease-out ${open ? 'rotate-45' : 'rotate-0'}`}
            aria-hidden
          />
        </button>
      </h3>
      <div id={id} className="grid transition-[grid-template-rows] duration-500 ease-out" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
        <div className="overflow-hidden">
          <div className="prosa pb-7 text-marfim/85">
            {a.map((p, k) => (
              <p key={k} className={k === a.length - 1 && a.length > 1 ? 'font-medium text-marfim' : ''}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/** Perguntas: absorveu "Ainda não é hora?" como uma linha + botão no rodapé da lista. */
export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  const wa = whatsappHref()
  return (
    <Section id="perguntas" tone="cacau">
      <div className="grid gap-12 md:grid-cols-[0.75fr_1.25fr] md:gap-16">
        <Header titulo={faq.titulo} max="14ch" />
        <div>
          <div className="border-b border-marfim/15">
            {faq.itens.map((it, i) => (
              <Item key={it.q} i={i} q={it.q} a={it.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
            ))}
          </div>
          <div id="duvida" data-reveal className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 scroll-mt-20">
            <p className="font-display text-xl font-light">{faq.duvida}</p>
            <Button href={wa} variant="ghost" data-whatsapp {...externalProps(wa)}>
              {cta.whatsapp}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}

export function Fechamento() {
  return (
    <Section id="fechamento" tone="cacau" className="overflow-hidden">
      <Anel className="left-1/2 top-1/2 h-[60rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 text-marfim/[0.07]" />
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-7 text-center">
        <h2 data-reveal className="max-w-[14ch]">
          Você já adiou <span className="script whitespace-nowrap">esse dia</span> outras vezes.
        </h2>
        <p data-reveal className="max-w-[44ch] text-marfim/85">{fechamento.texto}</p>
        <div data-reveal>
          <Button href="#ingressos" variant="gold">
            {cta.vaga}
          </Button>
        </div>
        <p data-reveal className="deck mt-6 max-w-[32ch] text-nude">{fechamento.tese}</p>
      </div>
    </Section>
  )
}

export function Footer() {
  return (
    <footer className="bg-cacau px-5 py-12 text-marfim/70 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 border-t border-marfim/10 pt-10 text-sm md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <img src="/img/logo.png" alt="" width={36} height={36} className="h-9 w-9 object-contain" />
          <span className="font-display uppercase tracking-[0.22em] text-marfim pt-[3px]">{evento.nome}</span>
        </div>
        <div className="flex flex-col gap-1 md:text-right">
          <p>{rodape.linha1}</p>
          <p>{rodape.linha2}</p>
        </div>
      </div>
    </footer>
  )
}
