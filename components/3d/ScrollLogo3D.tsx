'use client'

import { Component, Suspense, useRef, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader, DoubleSide } from 'three'
import type { Mesh } from 'three'

// ── Scroll state (module-level, no re-renders) ───────────────────────
const scroll = { progress: 0, smooth: 0 }

// ── Error boundary — silently swallows WebGL failures ────────────────
class CanvasErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

// ── 3D Logo mesh ─────────────────────────────────────────────────────
function LogoMesh() {
  const mesh = useRef<Mesh>(null)
  const texture = useLoader(TextureLoader, '/images/icon.webp')

  useFrame((state, delta) => {
    if (!mesh.current) return

    const t = state.clock.elapsedTime
    const p = scroll.progress

    // Smooth interpolation (frame-rate independent)
    const lf = 1 - Math.exp(-2.8 * delta)
    scroll.smooth += (p - scroll.smooth) * lf

    const sp = scroll.smooth

    // Y: drift down with scroll
    const targetY = 1.8 - sp * 4.5
    mesh.current.position.y += (targetY - mesh.current.position.y) * lf

    // Rotation Y: ~1.5 full rotations over page
    const targetRotY = sp * Math.PI * 3
    mesh.current.rotation.y += (targetRotY - mesh.current.rotation.y) * lf

    // Rotation X: forward arc at mid-scroll
    mesh.current.rotation.x = Math.sin(sp * Math.PI) * 0.28

    // Idle micro-animations
    mesh.current.rotation.z = Math.sin(t * 0.45) * 0.035
    mesh.current.position.x = 2.4 + Math.sin(t * 0.32) * 0.07
  })

  return (
    <mesh ref={mesh} position={[2.4, 1.8, 0]} scale={1.3}>
      <planeGeometry args={[1.5, 2]} />
      <meshStandardMaterial
        map={texture}
        transparent
        opacity={0.18}
        alphaTest={0.02}
        side={DoubleSide}
        color="#D4B896"
        roughness={0.78}
        metalness={0.12}
        toneMapped={false}
      />
    </mesh>
  )
}

// ── Public wrapper ───────────────────────────────────────────────────
export function ScrollLogo3D() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Desktop only
    const mq = window.matchMedia('(min-width: 768px)')
    setVisible(mq.matches)
    const onMq = (e: MediaQueryListEvent) => setVisible(e.matches)
    mq.addEventListener('change', onMq)

    // Scroll progress
    const onScroll = () => {
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      scroll.progress = max > 0 ? el.scrollTop / max : 0
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      mq.removeEventListener('change', onMq)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  if (!visible) return null

  return (
    <CanvasErrorBoundary>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 5 }}
        aria-hidden="true"
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.5} color="#FFF5E6" />
          <directionalLight position={[-3, 4, 5]} intensity={0.7} />
          <directionalLight position={[2, -1, 3]} intensity={0.25} color="#E8D5C0" />
          <Suspense fallback={null}>
            <LogoMesh />
          </Suspense>
        </Canvas>
      </div>
    </CanvasErrorBoundary>
  )
}
