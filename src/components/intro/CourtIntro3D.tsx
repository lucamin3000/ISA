/**
 * THE 3D INTERACTIVE INTRO — a minimal architectural squash court in
 * react-three-fiber: white volume, black edges, gold play-line geometry.
 * The gold lines draw themselves in sequence (this IS the loading
 * indicator), finishing at the T; the camera then glides down toward the
 * T and hands off to the interface. Pointer input orbits the camera a few
 * degrees. Lazy-loaded chunk — never part of first paint.
 * Palette in materials: white / black / #C6A15B only.
 */
import { useMemo, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

// court proportions (meters, WSF standard singles court)
const W = 6.4
const L = 9.75
const H = 4.57
const SHORT_Z = -L / 2 + 4.26 // the short line
const BOX = 1.6 // service box side
const T = new THREE.Vector3(0, 0.02, SHORT_Z)

const DRAW_SECONDS = 2.4
const GLIDE_SECONDS = 1.0

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

interface DrawnLine {
  object: THREE.Line
  count: number
  window: [number, number]
}

function makeLine(
  points: THREE.Vector3[],
  window: [number, number],
  color: string,
  segments = 48,
): DrawnLine {
  // resample the polyline so drawRange animates smoothly
  const curve = new THREE.CurvePath<THREE.Vector3>()
  for (let i = 0; i < points.length - 1; i++) {
    curve.add(new THREE.LineCurve3(points[i], points[i + 1]))
  }
  const sampled = curve.getSpacedPoints(segments)
  const geo = new THREE.BufferGeometry().setFromPoints(sampled)
  geo.setDrawRange(0, 0)
  const mat = new THREE.LineBasicMaterial({ color })
  return { object: new THREE.Line(geo, mat), count: sampled.length, window }
}

function Scene({ onDone }: { onDone: () => void }) {
  const { camera } = useThree()
  const pointer = useRef({ x: 0, y: 0 })
  const doneRef = useRef(false)
  const tGlow = useRef<THREE.Mesh>(null)

  const goldLines = useMemo<DrawnLine[]>(() => {
    const y = 0.02
    return [
      // 1 — the short line, wall to wall
      makeLine(
        [new THREE.Vector3(-W / 2, y, SHORT_Z), new THREE.Vector3(W / 2, y, SHORT_Z)],
        [0.0, 0.3],
        "#C6A15B",
      ),
      // 2 — service boxes, drawn symmetrically
      makeLine(
        [
          new THREE.Vector3(-W / 2, y, SHORT_Z),
          new THREE.Vector3(-W / 2, y, SHORT_Z + BOX),
          new THREE.Vector3(-W / 2 + BOX, y, SHORT_Z + BOX),
          new THREE.Vector3(-W / 2 + BOX, y, SHORT_Z),
        ],
        [0.3, 0.6],
        "#C6A15B",
      ),
      makeLine(
        [
          new THREE.Vector3(W / 2, y, SHORT_Z),
          new THREE.Vector3(W / 2, y, SHORT_Z + BOX),
          new THREE.Vector3(W / 2 - BOX, y, SHORT_Z + BOX),
          new THREE.Vector3(W / 2 - BOX, y, SHORT_Z),
        ],
        [0.3, 0.6],
        "#C6A15B",
      ),
      // 3 — the half-court line, arriving at the T last
      makeLine(
        [new THREE.Vector3(0, y, L / 2), new THREE.Vector3(0, y, SHORT_Z)],
        [0.6, 1.0],
        "#C6A15B",
      ),
    ]
  }, [])

  const blackEdges = useMemo(() => {
    const group = new THREE.Group()
    const mat = new THREE.LineBasicMaterial({ color: "#0B0A08" })
    const add = (geo: THREE.BufferGeometry, x = 0, y = 0, z = 0, rx = 0, ry = 0) => {
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo as never), mat)
      edges.position.set(x, y, z)
      edges.rotation.set(rx, ry, 0)
      group.add(edges)
      geo.dispose()
    }
    add(new THREE.PlaneGeometry(W, L), 0, 0, 0, -Math.PI / 2) // floor
    add(new THREE.PlaneGeometry(W, H), 0, H / 2, -L / 2) // front wall
    add(new THREE.PlaneGeometry(L, H), -W / 2, H / 2, 0, 0, Math.PI / 2) // left
    add(new THREE.PlaneGeometry(L, H), W / 2, H / 2, 0, 0, -Math.PI / 2) // right
    return group
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const p = Math.min(t / DRAW_SECONDS, 1)

    // loading IS the line drawing
    for (const l of goldLines) {
      const [a, b] = l.window
      const f = Math.min(Math.max((p - a) / (b - a), 0), 1)
      l.object.geometry.setDrawRange(0, Math.max(0, Math.floor(f * l.count)))
    }
    // the T marker breathes in at the very end of the draw
    if (tGlow.current) {
      const f = Math.min(Math.max((p - 0.92) / 0.08, 0), 1)
      tGlow.current.scale.setScalar(f)
    }

    // camera: gentle pointer orbit, then the glide down to the T
    const g =
      p < 1 ? 0 : Math.min((t - DRAW_SECONDS) / GLIDE_SECONDS, 1)
    const eg = easeInOut(g)
    const base = new THREE.Vector3(
      THREE.MathUtils.lerp(0, 0, eg),
      THREE.MathUtils.lerp(5.4, 2.1, eg),
      THREE.MathUtils.lerp(9.2, SHORT_Z + 4.4, eg),
    )
    const orbit = 1 - eg
    camera.position.set(
      base.x + pointer.current.x * 0.55 * orbit,
      base.y + pointer.current.y * 0.3 * orbit,
      base.z,
    )
    camera.lookAt(T)

    if (g >= 1 && !doneRef.current) {
      doneRef.current = true
      setTimeout(onDone, 180)
    }
  })

  return (
    <group
      onPointerMove={(e) => {
        pointer.current.x = (e.pointer?.x ?? 0)
        pointer.current.y = (e.pointer?.y ?? 0)
      }}
    >
      <ambientLight intensity={1.25} />
      <directionalLight position={[3, 8, 5]} intensity={0.55} />
      {/* white volume */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[W, L]} />
        <meshStandardMaterial color="#ffffff" roughness={0.95} />
      </mesh>
      <mesh position={[0, H / 2, -L / 2]}>
        <planeGeometry args={[W, H]} />
        <meshStandardMaterial color="#ffffff" roughness={0.95} />
      </mesh>
      <mesh position={[-W / 2, H / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[L, H]} />
        <meshStandardMaterial color="#ffffff" roughness={0.95} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[W / 2, H / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[L, H]} />
        <meshStandardMaterial color="#ffffff" roughness={0.95} side={THREE.DoubleSide} />
      </mesh>
      {/* black edges */}
      <primitive object={blackEdges} />
      {/* gold play lines */}
      {goldLines.map((l, i) => (
        <primitive key={i} object={l.object} />
      ))}
      {/* the T */}
      <mesh ref={tGlow} position={T} rotation={[-Math.PI / 2, 0, 0]} scale={0}>
        <circleGeometry args={[0.14, 32]} />
        <meshBasicMaterial color="#C6A15B" />
      </mesh>
    </group>
  )
}

export default function CourtIntro3D({ onDone }: { onDone: () => void }) {
  return (
    <Canvas
      className="h-full w-full"
      camera={{ fov: 42, position: [0, 5.4, 9.2], near: 0.1, far: 60 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.NoToneMapping // keep the volume truly white
        gl.setClearColor("#ffffff", 1)
      }}
    >
      <Scene onDone={onDone} />
    </Canvas>
  )
}
