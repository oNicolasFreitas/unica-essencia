import { useReveal } from './hooks/useReveal'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { FioDourado } from './components/FioDourado'
import { BarraFixa } from './components/BarraFixa'
import { Espelho } from './components/Espelho'
import { ResumoIngressos } from './components/ResumoIngressos'
import { PorQueEu } from './components/PorQueEu'
import { ODia } from './components/ODia'
import { ParaQuem } from './components/ParaQuem'
import { QuemConduz } from './components/QuemConduz'
import { Ingressos, OEncontro } from './components/Ingressos'
import { FAQ, Fechamento, Footer } from './components/FAQ'
import { FaixaTese } from './components/FaixaTese'

/* Fundos em blocos: cacau (hero) → vinho ×2 → cacau ×2 → vinho ×2 → marfim → cacau ×3. */
export default function App() {
  useReveal()
  return (
    <>
      <Navbar />
      <FioDourado />
      <main className="pb-24 md:pb-0">
        <Hero />
        <Espelho />
        <ResumoIngressos />
        <PorQueEu />
        <ODia />
        <ParaQuem />
        <QuemConduz />
        <OEncontro />
        <Ingressos />
        <FAQ />
        <FaixaTese />
        <Fechamento />
      </main>
      <Footer />
      <BarraFixa />
    </>
  )
}
