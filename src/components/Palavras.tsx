import { Fragment, type ReactNode } from 'react'

/**
 * Quebra um título em palavras marcadas com [data-word], para o reveal
 * palavra-a-palavra do useReveal. Trechos em ReactNode (ex.: script)
 * entram como uma "palavra" só.
 */
export function Palavras({ partes }: { partes: (string | ReactNode)[] }) {
  return (
    <>
      {partes.map((p, i) => {
        if (typeof p !== 'string') {
          return (
            <span key={i} data-word className="inline-block">
              {p}
            </span>
          )
        }
        return (
          <Fragment key={i}>
            {p.split(' ').filter(Boolean).map((w, k) => (
              <Fragment key={k}>
                <span data-word className="inline-block">
                  {w}
                </span>{' '}
              </Fragment>
            ))}
          </Fragment>
        )
      })}
    </>
  )
}
