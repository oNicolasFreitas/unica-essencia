import type { ReactNode, AnchorHTMLAttributes } from 'react'
import { ArrowUpRight } from 'lucide-react'

type Tone = 'cacau' | 'vinho' | 'ameixa' | 'marfim'

const toneClass: Record<Tone, string> = {
  cacau: 'bg-cacau text-marfim',
  vinho: 'bg-vinho text-marfim',
  ameixa: 'bg-ameixa text-marfim',
  marfim: 'bg-marfim text-cacau',
}

export function Section({
  id,
  tone = 'cacau',
  className = '',
  children,
  tight = false,
}: {
  id?: string
  tone?: Tone
  className?: string
  children: ReactNode
  tight?: boolean
}) {
  return (
    <section
      id={id}
      data-tone={tone}
      className={`relative scroll-mt-20 ${toneClass[tone]} ${tight ? 'py-16 md:py-24' : 'py-20 md:py-32'} px-5 sm:px-8 lg:px-12 ${className}`}
    >
      <div className="relative mx-auto w-full max-w-6xl">{children}</div>
    </section>
  )
}

/** Cabeçalho de seção: H2 e, opcionalmente, um lead abaixo. Sem eyebrow. */
export function Header({
  titulo,
  lead,
  center = false,
  max = '20ch',
}: {
  titulo: ReactNode
  lead?: ReactNode
  center?: boolean
  max?: string
}) {
  return (
    <div className={`flex flex-col gap-5 md:gap-6 ${center ? 'items-center text-center' : ''}`}>
      <h2 data-reveal style={{ maxWidth: max }}>
        {titulo}
      </h2>
      {lead && (
        <div data-reveal className="prosa opacity-85" style={{ maxWidth: '58ch' }}>
          {lead}
        </div>
      )}
    </div>
  )
}

type BtnProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'glass' | 'solid' | 'ghost' | 'ghostInk' | 'gold' | 'vinho'
  children: ReactNode
  arrow?: boolean
}

export function Button({ variant = 'glass', children, className = '', arrow = true, ...rest }: BtnProps) {
  const base =
    'group pressable inline-flex items-center justify-center gap-2 rounded-full px-7 py-[1.05rem] min-h-[48px] font-body text-sm font-medium tracking-wide transition-colors duration-300 ease-out'
  const styles: Record<NonNullable<BtnProps['variant']>, string> = {
    glass: 'liquid-glass text-marfim hover:bg-marfim/10',
    solid: 'bg-marfim text-vinho hover:bg-nude',
    gold: 'bg-dourado text-cacau hover:bg-dourado/85',
    vinho: 'bg-vinho text-marfim hover:bg-ameixa',
    ghost: 'border border-marfim/30 text-marfim hover:border-marfim/60 hover:bg-marfim/5',
    ghostInk: 'border border-vinho/40 text-vinho hover:border-vinho/80 hover:bg-vinho/5',
  }
  return (
    <a className={`${base} ${styles[variant]} ${className}`} {...rest}>
      <span className="relative z-glass leading-none pt-[2px]">{children}</span>
      {arrow && (
        <ArrowUpRight
          strokeWidth={1.5}
          className="relative z-glass h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      )}
    </a>
  )
}

/** Marca d'água do anel dourado do logo. */
export function Anel({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden className={`pointer-events-none absolute ${className}`}>
      <circle cx="100" cy="100" r="96" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.5" opacity=".5" />
    </svg>
  )
}

/** Numeral em selo circular. */
export function Selo({ n, tone = 'gold' }: { n: ReactNode; tone?: 'gold' | 'ink' }) {
  const c = tone === 'gold' ? 'border-dourado/60 text-dourado' : 'border-vinho/40 text-vinho'
  return (
    <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${c} font-display text-sm tracking-[0.1em] pt-[2px]`}>
      {n}
    </span>
  )
}
