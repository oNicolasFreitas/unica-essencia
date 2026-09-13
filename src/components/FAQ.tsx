import { useState } from 'react'
import { Plus } from 'lucide-react'
import { faq, fechamento, rodape, evento, cta } from '../data/copy'
import { Section, Button } from './ui'
import { whatsappHref, externalProps } from '../config'

function Item({ q, a, open, onToggle, i }: { q: string; a: string[]; open: boolean; onToggle: () => void; i: number }) {
  const id = `faq-${i}`
  return (
    <div data-reveal className="border-t border-vinho/15">
      <h3 className="m-0 text-base">
        <button type="button" onClick={onToggle} aria-expanded={open} aria-controls={id} className="pressable flex w-full items-center justify-between gap-6 py-5 text-left font-display text-lg font-light text-vinho transition-colors duration-150 hover:text-ameixa">
          <span>{q}</span>
          <Plus strokeWidth={1.5} className={`h-5 w-5 shrink-0 text-dourado transition-transform duration-300 ease-out ${open ? 'rotate-45' : ''}`} aria-hidden />
        </button>
      </h3>
      <div id={id} className="grid transition-[grid-template-rows] duration-500 ease-out" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
        <div className="overflow-hidden">
          <div className="prosa pb-6 text-sm text-cacau/80">
            {a.map((p, k) => <p key={k}>{p}</p>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const wa = whatsappHref()
  return (
    <Section id="perguntas" bg="nude" tight>
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h2 data-reveal className="max-w-[12ch]">{faq.titulo}</h2>
          <div data-reveal id="duvida" className="mt-8 flex flex-col items-center scroll-mt-20 md:items-start">
            <p className="text-cacau/75">{faq.duvida}</p>
            <Button href={wa} variant="ghost" className="mt-4" data-whatsapp {...externalProps(wa)}>{cta.whatsapp}</Button>
          </div>
        </div>
        <div className="border-b border-vinho/15">
          {faq.itens.map((it, i) => <Item key={it.q} i={i} q={it.q} a={it.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />)}
        </div>
      </div>
    </Section>
  )
}

export function Fechamento() {
  return (
    <Section id="fechamento">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <h2 data-reveal className="max-w-[14ch]">
          Você já adiou <span className="script whitespace-nowrap">esse dia</span> outras vezes.
        </h2>
        <p data-reveal className="max-w-[44ch] text-cacau/80">{fechamento.texto}</p>
        <div data-reveal><Button href="#ingressos" variant="vinho">{cta.vaga}</Button></div>
      </div>
    </Section>
  )
}

export function Footer() {
  return (
    <footer className="bg-marfim px-5 pb-28 pt-8 text-sm text-cacau/60 sm:px-8 md:pb-10 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 border-t border-vinho/15 pt-8 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div className="flex items-center gap-3">
          <img src="/img/logo.png" alt="" width={32} height={32} className="h-8 w-8 object-contain" />
          <span className="font-display uppercase tracking-[0.2em] text-vinho pt-[3px]">{evento.nome}</span>
        </div>
        <div className="md:text-right">
          <p>{rodape.linha1}</p>
          <p>{rodape.linha2}</p>
        </div>
      </div>
    </footer>
  )
}
