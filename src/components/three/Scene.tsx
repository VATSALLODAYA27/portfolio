import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { input, useSceneInput } from './input'

/** How far (world units) the camera travels from the hero to the footer. */
const TRAVEL = 15
const INK = '#06070b'
const ULTRA = '#6f8cff'
const CHAMPAGNE = '#d8c7b0'

type Flags = { reduced: boolean; mobile: boolean }

/* ------------------------------------------------------------ camera rig */

function Rig({ reduced, mobile }: Flags) {
  useFrame((state, dt) => {
    if (reduced) return
    const cam = state.camera
    const tx = mobile ? 0 : input.mx * 0.6
    const ty = -input.scroll * TRAVEL + (mobile ? 0 : input.my * 0.35)
    const tz = 8 - Math.sin(input.scroll * Math.PI) * 1.2
    cam.position.x = THREE.MathUtils.damp(cam.position.x, tx, 2.2, dt)
    cam.position.y = THREE.MathUtils.damp(cam.position.y, ty, 3.2, dt)
    cam.position.z = THREE.MathUtils.damp(cam.position.z, tz, 2, dt)
    if (!mobile) {
      cam.rotation.y = THREE.MathUtils.damp(cam.rotation.y, -input.mx * 0.04, 2.2, dt)
      cam.rotation.x = THREE.MathUtils.damp(cam.rotation.x, input.my * 0.025, 2.2, dt)
    }
  })
  return null
}

/* -------------------------------------------------------- blueprint grid */

const gridVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const gridFragment = /* glsl */ `
  uniform vec3 uColor;
  varying vec2 vUv;
  float line(float v, float w) {
    float d = abs(fract(v) - 0.5);
    return smoothstep(0.5 - w, 0.5, d);
  }
  void main() {
    vec2 p = (vUv - 0.5) * vec2(70.0, 46.0);
    vec2 cell = p / 1.4;
    float g = max(line(cell.x, 0.02), line(cell.y, 0.02));
    float fade = smoothstep(1.2, 0.1, length(p / vec2(15.0, 8.5)));
    gl_FragColor = vec4(uColor, g * fade * 0.13);
    #include <colorspace_fragment>
  }
`

/** A faint grid wall behind everything that follows the camera and fades toward its edges. */
function BlueprintGrid() {
  const ref = useRef<THREE.Mesh>(null)
  const uniforms = useMemo(() => ({ uColor: { value: new THREE.Color(ULTRA) } }), [])
  useFrame(({ camera }) => {
    if (ref.current) ref.current.position.y = camera.position.y
  })
  return (
    <mesh ref={ref} position={[0, 0, -11]}>
      <planeGeometry args={[70, 46]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={gridVertex}
        fragmentShader={gridFragment}
      />
    </mesh>
  )
}

/* ------------------------------------------------------------ glow orbs */

function useGlowTexture() {
  return useMemo(() => {
    const c = document.createElement('canvas')
    c.width = c.height = 128
    const g = c.getContext('2d')!
    const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64)
    grad.addColorStop(0, 'rgba(255,255,255,1)')
    grad.addColorStop(0.35, 'rgba(255,255,255,0.35)')
    grad.addColorStop(1, 'rgba(255,255,255,0)')
    g.fillStyle = grad
    g.fillRect(0, 0, 128, 128)
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    return t
  }, [])
}

const glows: { pos: [number, number, number]; size: number; color: string; opacity: number }[] = [
  { pos: [3.4, 0.3, -4], size: 11, color: '#3b5bff', opacity: 0.55 },
  { pos: [-5, -0.8, -6], size: 9, color: CHAMPAGNE, opacity: 0.16 },
  { pos: [-3.6, -5.2, -5], size: 10, color: '#3b5bff', opacity: 0.32 },
  { pos: [4, -10, -5], size: 10, color: CHAMPAGNE, opacity: 0.14 },
  { pos: [-3, -14, -5], size: 11, color: '#3b5bff', opacity: 0.35 },
]

function Glows({ mobile }: { mobile: boolean }) {
  const map = useGlowTexture()
  return (
    <group>
      {glows.map((g, i) => (
        <sprite
          key={i}
          position={[g.pos[0] * (mobile ? 0.4 : 1), g.pos[1], g.pos[2]]}
          scale={[g.size * (mobile ? 0.85 : 1), g.size * (mobile ? 0.85 : 1), 1]}
        >
          <spriteMaterial
            map={map}
            color={g.color}
            transparent
            opacity={g.opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </sprite>
      ))}
    </group>
  )
}

/* ------------------------------------------------------- floating shapes */

type ShapeKind = 'ico' | 'oct' | 'torus' | 'knot' | 'box'
type ShapeDef = { kind: ShapeKind; pos: [number, number, number]; size: number; color: string; speed: number }

const shapes: ShapeDef[] = [
  // Spread down the page and pushed to the screen edges so they frame the content instead of sitting on it.
  { kind: 'ico', pos: [4.7, 0.6, -2], size: 1.2, color: ULTRA, speed: 0.25 },
  { kind: 'torus', pos: [-7.0, -4.4, -3], size: 1.0, color: CHAMPAGNE, speed: 0.2 },
  { kind: 'oct', pos: [6.6, -8.4, -2.5], size: 0.95, color: ULTRA, speed: 0.3 },
  { kind: 'knot', pos: [-7.0, -12.0, -3], size: 0.85, color: CHAMPAGNE, speed: 0.18 },
  { kind: 'ico', pos: [6.6, -15.4, -3], size: 1.0, color: ULTRA, speed: 0.22 },
]

function ShapeGeometry({ kind, size }: { kind: ShapeKind; size: number }) {
  switch (kind) {
    case 'ico':
      return <icosahedronGeometry args={[size, 1]} />
    case 'oct':
      return <octahedronGeometry args={[size, 0]} />
    case 'torus':
      return <torusGeometry args={[size, size * 0.28, 16, 48]} />
    case 'knot':
      return <torusKnotGeometry args={[size * 0.7, size * 0.2, 96, 12]} />
    case 'box':
      return <boxGeometry args={[size * 1.3, size * 1.3, size * 1.3]} />
  }
}

function Shape({ def, index, reduced, mobile }: { def: ShapeDef; index: number; reduced: boolean; mobile: boolean }) {
  const ref = useRef<THREE.Group>(null)
  const x = mobile ? Math.sign(def.pos[0]) * 1.9 : def.pos[0]
  const size = def.size * (mobile ? 0.75 : 1)
  useFrame(({ clock }) => {
    if (reduced || !ref.current) return
    const t = clock.elapsedTime
    ref.current.rotation.x = t * def.speed * 0.6
    ref.current.rotation.y = t * def.speed
    ref.current.position.y = def.pos[1] + Math.sin(t * 0.6 + index) * 0.18
  })
  return (
    <group ref={ref} position={[x, def.pos[1], def.pos[2]]}>
      <mesh>
        <ShapeGeometry kind={def.kind} size={size} />
        <meshBasicMaterial color={def.color} wireframe transparent opacity={0.26} />
      </mesh>
      <mesh scale={0.985}>
        <ShapeGeometry kind={def.kind} size={size} />
        <meshBasicMaterial color={def.color} transparent opacity={0.045} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
    </group>
  )
}

function Shapes({ reduced, mobile }: Flags) {
  const list = mobile ? shapes.filter((_, i) => i % 2 === 0) : shapes
  return (
    <group>
      {list.map((def, i) => (
        <Shape key={i} def={def} index={i} reduced={reduced} mobile={mobile} />
      ))}
    </group>
  )
}

/* -------------------------------------------------------------- particles */

function Particles({ count, reduced, mobile }: { count: number; reduced: boolean; mobile: boolean }) {
  const ref = useRef<THREE.Points>(null)
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const warm = new THREE.Color(CHAMPAGNE)
    const cool = new THREE.Color(ULTRA)
    const white = new THREE.Color('#ffffff')
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 32
      positions[i * 3 + 1] = 6 - Math.random() * (TRAVEL + 16)
      positions[i * 3 + 2] = -14 + Math.random() * 19
      const r = Math.random()
      const c = r < 0.68 ? warm : r < 0.88 ? white : cool
      colors.set([c.r, c.g, c.b], i * 3)
    }
    return { positions, colors }
  }, [count])

  useFrame((_, dt) => {
    if (!reduced && ref.current) ref.current.rotation.y += dt * 0.012
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={mobile ? 0.055 : 0.04}
        vertexColors
        transparent
        opacity={0.7}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

/* ------------------------------------------------------------------ scene */

export default function Scene({ reduced, mobile }: Flags) {
  useSceneInput(!reduced)
  const lowPower = mobile || (navigator.hardwareConcurrency ?? 8) <= 4
  return (
    <Canvas
      flat
      dpr={mobile ? 1 : [1, 1.75]}
      frameloop={reduced ? 'demand' : 'always'}
      camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 80 }}
      gl={{ antialias: !mobile, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <color attach="background" args={[INK]} />
      <Rig reduced={reduced} mobile={mobile} />
      <BlueprintGrid />
      <Glows mobile={mobile} />
      <Shapes reduced={reduced} mobile={mobile} />
      <Particles count={lowPower ? 320 : 900} reduced={reduced} mobile={mobile} />
    </Canvas>
  )
}
