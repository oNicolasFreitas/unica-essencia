import { useReveal } from './hooks/useReveal'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { FioDourado } from './components/FioDourado'
import { BarraFixa } from './components/BarraFixa'
import { Espelho } from './components/Espelho'
import { PorQueEu } from './components/PorQueEu'
import { OQueE, TresObjetos } from './components/OQueE'
import { OQueFica, ParaQuem } from './components/OQueFica'
import { QuemConduz } from './components/QuemConduz'
import { ComoFunciona, Prazo } from './components/ComoFunciona'
import { Ingressos, OEncontro } from './components/Ingressos'
import { FAQ, Duvida, Fechamento, Footer } from './components/FAQ'

export default function App() {
  useReveal()
  return (
    <>
      <Navbar />
      <FioDourado />
      <main>
        <Hero />
        <Espelho />
        <PorQueEu />
        <OQueE />
        <TresObjetos />
        <OQueFica />
        <ParaQuem />
        <QuemConduz />
        <ComoFunciona />
        <Prazo />
        <Ingressos />
        <OEncontro />
        <FAQ />
        <Duvida />
        <Fechamento />
      </main>
      <Footer />
      <BarraFixa />
    </>
  )
}
