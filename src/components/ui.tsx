import type { ReactNode, AnchorHTMLAttributes } from 'react'
import { ArrowUpRight } from 'lucide-react'

type Tone = 'marfim' | 'nude' | 'blush'
const tone: Record<Tone, string> = {
  marfim: 'bg-marfim',
  nude: 'bg-nude/45',
  blush: 'bg-blush/30',
}

export function Section({ id, bg = 'marfim', className = '', children, tight = false }: { id?: string; bg?: Tone; className?: string; children: ReactNode; tight?: boolean }) {
  return (
    <section id={id} className={`relative scroll-mt-20 ${tone[bg]} ${tight ? 'py-14 md:py-20' : 'py-16 md:py-28'} px-5 sm:px-8 lg:px-12 ${className}`}>
      <div className="relative mx-auto w-full max-w-6xl">{children}</div>
    </section>
  )
}

type BtnProps = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: 'vinho' | 'gold' | 'ghost' | 'marfim'; children: ReactNode; arrow?: boolean }

export function Button({ variant = 'vinho', children, className = '', arrow = true, ...rest }: BtnProps) {
  const base = 'group pressable inline-flex items-center justify-center gap-2 rounded-full px-7 min-h-[50px] font-body text-sm font-medium transition-colors duration-300 ease-out'
  const styles: Record<NonNullable<BtnProps['variant']>, string> = {
    vinho: 'bg-vinho text-marfim hover:bg-ameixa',
    gold: 'bg-dourado text-cacau hover:bg-dourado/85',
    ghost: 'border border-vinho/35 text-vinho hover:border-vinho hover:bg-vinho/5',
    marfim: 'bg-marfim text-vinho hover:bg-nude',
  }
  return (
    <a className={`${base} ${styles[variant]} ${className}`} {...rest}>
      <span className="pt-[2px] leading-none">{children}</span>
      {arrow && <ArrowUpRight strokeWidth={1.5} className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />}
    </a>
  )
}
