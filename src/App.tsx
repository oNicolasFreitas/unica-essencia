import { useReveal } from './hooks/useReveal'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Espelho } from './components/Espelho'
import { ODia } from './components/ODia'
import { QuemConduz } from './components/QuemConduz'
import { Ingressos } from './components/Ingressos'
import { FAQ, Fechamento, Footer } from './components/FAQ'
import { BarraFixa } from './components/BarraFixa'

/* v5 · Editorial light rosé. Sete blocos: hero, espelho, o dia, quem conduz,
   ingressos (com prazo e para quem), perguntas, fechamento. */
export default function App() {
  useReveal()
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Espelho />
        <ODia />
        <QuemConduz />
        <Ingressos />
        <FAQ />
        <Fechamento />
      </main>
      <Footer />
      <BarraFixa />
    </>
  )
}
