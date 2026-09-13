import { useEffect, useId, useState, type ReactNode } from 'react'
import { Plus } from 'lucide-react'

/**
 * No mobile, um bloco longo vira acordeão fechado (rótulo + botão).
 * A partir de md, renderiza o conteúdo aberto e sem controle.
 */
export function Dobravel({ rotulo, children, className = '' }: { rotulo: string; children: ReactNode; className?: string }) {
  const [desktop, setDesktop] = useState(() => window.matchMedia('(min-width: 768px)').matches)
  const [open, setOpen] = useState(false)
  const id = useId()

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const on = () => setDesktop(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  if (desktop) return <div className={className}>{children}</div>

  return (
    <div className={`border-y border-current/15 ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className="pressable flex w-full items-center justify-between gap-6 py-5 text-left font-display text-lg font-light transition-colors duration-150 hover:text-dourado"
      >
        <span>{rotulo}</span>
        <Plus strokeWidth={1.5} className={`h-5 w-5 shrink-0 text-dourado transition-transform duration-300 ease-out ${open ? 'rotate-45' : ''}`} aria-hidden />
      </button>
      <div id={id} className="grid transition-[grid-template-rows] duration-500 ease-out" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
        <div className="overflow-hidden">
          <div className="pb-6">{children}</div>
        </div>
      </div>
    </div>
  )
}
