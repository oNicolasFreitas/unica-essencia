import { useEffect, useRef } from 'react'
import { reduced } from '../hooks/useReveal'

/**
 * Borboleta do logo em 3D, atrás do texto do hero.
 * Bate as asas devagar e inclina seguindo o mouse.
 * Só desktop (≥1024px) e só sem prefers-reduced-motion. three.js entra por
 * import dinâmico, fora do bundle inicial. Some quando o hero sai da tela.
 */
export function Borboleta() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = ref.current
    if (!host || reduced() || window.innerWidth < 1024) return
    let disposed = false
    let cleanup = () => {}

    import('three').then((THREE) => {
      if (disposed) return
      const w = host.clientWidth
      const h = host.clientHeight
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5))
      renderer.setSize(w, h)
      host.appendChild(renderer.domElement)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(32, w / h, 0.1, 100)
      camera.position.set(0, 0, 9)

      /* Asas inspiradas no logo: superior alongada apontando para cima e fora,
         inferior menor e separada, como duas pétalas. */
      const sup = new THREE.Shape()
      sup.moveTo(0, 0)
      sup.bezierCurveTo(0.3, 0.9, 1.3, 2.3, 2.6, 2.1)
      sup.bezierCurveTo(3.3, 1.9, 3.0, 0.9, 2.0, 0.5)
      sup.bezierCurveTo(1.3, 0.2, 0.5, 0.05, 0, 0)
      const inf = new THREE.Shape()
      inf.moveTo(0, -0.15)
      inf.bezierCurveTo(0.6, -0.2, 1.7, -0.5, 1.9, -1.4)
      inf.bezierCurveTo(2.0, -2.0, 1.2, -2.1, 0.7, -1.6)
      inf.bezierCurveTo(0.3, -1.1, 0.1, -0.6, 0, -0.15)
      const geoSup = new THREE.ShapeGeometry(sup, 24)
      const geoInf = new THREE.ShapeGeometry(inf, 24)

      const mat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#A97578'),
        transparent: true,
        opacity: 0.34,
        side: THREE.DoubleSide,
        roughness: 0.7,
        metalness: 0.05,
        emissive: new THREE.Color('#7E4652'),
        emissiveIntensity: 0.4,
        depthWrite: false,
      })
      const veia = new THREE.LineBasicMaterial({ color: new THREE.Color('#C9A46A'), transparent: true, opacity: 0.6 })
      const linha = (sh: InstanceType<typeof THREE.Shape>) => new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(sh.getPoints(64)), veia)

      const asa = (flip: boolean) => {
        const g = new THREE.Group()
        g.add(new THREE.Mesh(geoSup, mat), new THREE.Mesh(geoInf, mat), linha(sup), linha(inf))
        if (flip) g.scale.x = -1
        return g
      }
      const corpo = new THREE.Group()
      const esq = asa(false)
      const dir = asa(true)
      corpo.add(esq, dir)

      /* Tórax: fio dourado fino. */
      const torax = new THREE.Mesh(
        new THREE.CylinderGeometry(0.018, 0.028, 2.4, 6),
        new THREE.MeshBasicMaterial({ color: new THREE.Color('#C9A46A'), transparent: true, opacity: 0.7 }),
      )
      torax.position.y = 0.1
      corpo.add(torax)
      const geo = geoSup
      void geoInf

      corpo.rotation.x = 0.45
      corpo.rotation.z = -0.18
      corpo.scale.setScalar(0.78)
      corpo.position.set(-2.3, 1.15, 0)
      scene.add(corpo)

      scene.add(new THREE.AmbientLight('#F7F1E9', 0.9))
      const luz = new THREE.PointLight('#C9A46A', 18, 30)
      luz.position.set(3, 4, 5)
      scene.add(luz)

      const alvo = { x: 0, y: 0 }
      const onMove = (e: MouseEvent) => {
        alvo.x = (e.clientX / innerWidth - 0.5) * 2
        alvo.y = (e.clientY / innerHeight - 0.5) * 2
      }
      window.addEventListener('mousemove', onMove, { passive: true })

      let raf = 0
      let visivel = true
      const io = new IntersectionObserver(([en]) => { visivel = en.isIntersecting }, { threshold: 0 })
      io.observe(host)

      const t0 = performance.now()
      const tick = (now: number) => {
        raf = requestAnimationFrame(tick)
        if (!visivel) return
        const t = (now - t0) / 1000
        const bat = Math.sin(t * 1.6) * 0.55 + 0.25
        esq.rotation.y = -bat
        dir.rotation.y = bat
        corpo.rotation.y += ((alvo.x * 0.45 + Math.sin(t * 0.3) * 0.15) - corpo.rotation.y) * 0.04
        corpo.rotation.x += ((0.45 + alvo.y * 0.25) - corpo.rotation.x) * 0.04
        corpo.position.y = 1.15 + Math.sin(t * 0.8) * 0.14
        renderer.render(scene, camera)
      }
      raf = requestAnimationFrame(tick)

      const onResize = () => {
        const nw = host.clientWidth
        const nh = host.clientHeight
        renderer.setSize(nw, nh)
        camera.aspect = nw / nh
        camera.updateProjectionMatrix()
      }
      window.addEventListener('resize', onResize)

      cleanup = () => {
        cancelAnimationFrame(raf)
        io.disconnect()
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('resize', onResize)
        geo.dispose()
        geoInf.dispose()
        mat.dispose()
        veia.dispose()
        renderer.dispose()
        renderer.domElement.remove()
      }
    })

    return () => {
      disposed = true
      cleanup()
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-glass hidden h-[100dvh] w-full lg:block"
      style={{ maskImage: 'linear-gradient(to bottom, black 70%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent)' }}
    />
  )
}
