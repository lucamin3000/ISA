/**
 * THE 3D INTRO — a minimal architectural squash court in react-three-fiber:
 * white volume, black edges, the court's painted lines as real 5cm gold
 * stripes, and the ISA ACADEMY wordmark painted on the front wall (canvas
 * texture, Anton). The lines draw themselves in sequence — tin, front-wall
 * service line, side-wall out lines, then the floor — finishing at the T;
 * the camera then glides down toward the T and hands off to the interface.
 * Pointer input orbits the camera a few degrees. Lazy-loaded chunk.
 * Palette in materials: white / black / #C6A15B only.
 *
 * (A vendored "ethereal" shader-hero was evaluated for this task; its
 * bloom/grain/letterbox post pipeline and GSAP scroll rig don't fit a
 * 3-second paper-white intro. Its canvas-texture technique informs the
 * wall wordmark below. No new dependencies.)
 */
import { useEffect, useMemo, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

// court proportions (meters, WSF standard singles court)
const W = 6.4
const L = 9.75
const H = 4.57 // front-wall out line height
const BACK_OUT = 2.13 // out line height at the back wall
const TIN = 0.48 // tin (board) line
const FW_SERVICE = 1.78 // front-wall service line
const SHORT_Z = -L / 2 + 4.26 // the short line
const BOX = 1.6 // service box side
const LW = 0.055 // painted line width
const T = new THREE.Vector3(0, 0.02, SHORT_Z)

const DRAW_SECONDS = 3.2
const GLIDE_SECONDS = 1.0
const GOLD = "#C6A15B"
const INK = "#0B0A08"

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

interface Stripe {
  mesh: THREE.Mesh
  window: [number, number]
}

/** Painted line: a thin quad that grows from its start point. */
function stripeMesh(length: number, material: THREE.Material): THREE.Mesh {
  const geo = new THREE.PlaneGeometry(length, LW)
  geo.translate(length / 2, 0, 0) // origin at the line's start
  const mesh = new THREE.Mesh(geo, material)
  mesh.scale.x = 0.0001
  mesh.visible = false
  return mesh
}

/** The wall wordmark — ISA ACADEMY in Anton, painted on the front wall. */
function makeWallText(): { mesh: THREE.Mesh; redraw: () => void } {
  const canvas = document.createElement("canvas")
  canvas.width = 2048
  canvas.height = 512
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 4

  const draw = () => {
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = INK
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.font = '400 300px Anton, "Arial Narrow", Impact, sans-serif'
    ctx.fillText("ISA ACADEMY", canvas.width / 2, canvas.height / 2 + 14)
    texture.needsUpdate = true
  }
  draw()

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 0,
  })
  // 4:1 plane between the front-wall service line and the out line
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(4.8, 1.2), material)
  mesh.position.set(0, 3.0, -L / 2 + 0.02)
  return { mesh, redraw: draw }
}

function Scene({ onDone }: { onDone: () => void }) {
  const { camera } = useThree()
  const pointer = useRef({ x: 0, y: 0 })
  const doneRef = useRef(false)
  const tGlow = useRef<THREE.Mesh>(null)

  const gold = useMemo(
    () => new THREE.MeshBasicMaterial({ color: GOLD, side: THREE.DoubleSide }),
    [],
  )

  /** The painted-line choreography — walls first, floor after, the T last. */
  const stripes = useMemo<Stripe[]>(() => {
    const list: Stripe[] = []
    const add = (mesh: THREE.Mesh, window: [number, number]) => {
      list.push({ mesh, window })
    }

    // -- front wall (facing +Z), drawn left to right --
    const frontLine = (y: number, window: [number, number]) => {
      const m = stripeMesh(W, gold)
      m.position.set(-W / 2, y, -L / 2 + 0.012)
      add(m, window)
    }
    frontLine(TIN, [0.0, 0.14]) // 1 — the tin
    frontLine(FW_SERVICE, [0.1, 0.24]) // 2 — front-wall service line

    // -- side-wall out lines: raking from front out line down to the back --
    const sideOut = (side: 1 | -1, window: [number, number]) => {
      const len = Math.hypot(L, H - BACK_OUT)
      const m = stripeMesh(len, gold)
      m.position.set(side * (W / 2 - 0.012), H, -L / 2)
      m.rotation.y = -Math.PI / 2 // local +X → world +Z (toward the back)
      m.rotateZ(Math.atan2(BACK_OUT - H, L)) // rake down within the wall
      add(m, window)
    }
    sideOut(-1, [0.2, 0.38]) // 3 — left
    sideOut(1, [0.2, 0.38]) // 4 — right

    // -- floor lines (plane rotated flat; local +Y → world −Z) --
    const floorLine = (
      x1: number,
      z1: number,
      x2: number,
      z2: number,
      window: [number, number],
    ) => {
      const m = stripeMesh(Math.hypot(x2 - x1, z2 - z1), gold)
      m.position.set(x1, 0.012, z1)
      m.rotation.x = -Math.PI / 2
      m.rotateZ(Math.atan2(-(z2 - z1), x2 - x1))
      add(m, window)
    }
    // 5 — the short line, wall to wall
    floorLine(-W / 2, SHORT_Z, W / 2, SHORT_Z, [0.36, 0.52])
    // 6 — the half-court line, arriving at the T
    floorLine(0, L / 2, 0, SHORT_Z, [0.5, 0.68])
    // 7/8 — left service box (inner edge, then back edge)
    floorLine(-W / 2 + BOX, SHORT_Z, -W / 2 + BOX, SHORT_Z + BOX, [0.66, 0.78])
    floorLine(-W / 2 + BOX, SHORT_Z + BOX, -W / 2, SHORT_Z + BOX, [0.76, 0.86])
    // 9/10 — right service box
    floorLine(W / 2 - BOX, SHORT_Z, W / 2 - BOX, SHORT_Z + BOX, [0.66, 0.78])
    floorLine(W / 2 - BOX, SHORT_Z + BOX, W / 2, SHORT_Z + BOX, [0.76, 0.86])

    return list
  }, [gold])

  const wallText = useMemo(() => makeWallText(), [])
  useEffect(() => {
    // redraw once webfonts settle so the wordmark is true Anton
    let alive = true
    document.fonts
      ?.load('400 300px Anton')
      .then(() => alive && wallText.redraw())
      .catch(() => {})
    document.fonts?.ready.then(() => alive && wallText.redraw()).catch(() => {})
    return () => {
      alive = false
    }
  }, [wallText])

  const blackEdges = useMemo(() => {
    const group = new THREE.Group()
    const mat = new THREE.LineBasicMaterial({ color: INK })
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

    // loading IS the line painting
    for (const s of stripes) {
      const [a, b] = s.window
      const f = Math.min(Math.max((p - a) / (b - a), 0), 1)
      s.mesh.visible = f > 0
      s.mesh.scale.x = Math.max(f, 0.0001)
    }
    // the wordmark surfaces as the floor completes
    const textMat = wallText.mesh.material as THREE.MeshBasicMaterial
    textMat.opacity = Math.min(Math.max((p - 0.78) / 0.2, 0), 1)
    // the T marker breathes in at the very end
    if (tGlow.current) {
      const f = Math.min(Math.max((p - 0.88) / 0.12, 0), 1)
      tGlow.current.scale.setScalar(f)
    }

    // camera: gentle pointer orbit, then the glide down to the T
    const g = p < 1 ? 0 : Math.min((t - DRAW_SECONDS) / GLIDE_SECONDS, 1)
    const eg = easeInOut(g)
    const base = new THREE.Vector3(
      0,
      THREE.MathUtils.lerp(5.4, 2.1, eg),
      THREE.MathUtils.lerp(9.2, SHORT_Z + 4.4, eg),
    )
    const orbit = 1 - eg
    camera.position.set(
      base.x + pointer.current.x * 0.55 * orbit,
      base.y + pointer.current.y * 0.3 * orbit,
      base.z,
    )
    // the gaze settles between the T and the wall wordmark
    camera.lookAt(0, THREE.MathUtils.lerp(0.02, 0.9, eg), SHORT_Z)

    if (g >= 1 && !doneRef.current) {
      doneRef.current = true
      setTimeout(onDone, 180)
    }
  })

  return (
    <group
      onPointerMove={(e) => {
        pointer.current.x = e.pointer?.x ?? 0
        pointer.current.y = e.pointer?.y ?? 0
      }}
    >
      {/* white volume */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[W, L]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, H / 2, -L / 2]}>
        <planeGeometry args={[W, H]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-W / 2, H / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[L, H]} />
        <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[W / 2, H / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[L, H]} />
        <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
      </mesh>
      {/* black edges */}
      <primitive object={blackEdges} />
      {/* the wordmark on the front wall */}
      <primitive object={wallText.mesh} />
      {/* painted gold lines */}
      {stripes.map((s, i) => (
        <primitive key={i} object={s.mesh} />
      ))}
      {/* the T */}
      <mesh ref={tGlow} position={T} rotation={[-Math.PI / 2, 0, 0]} scale={0}>
        <circleGeometry args={[0.16, 32]} />
        <meshBasicMaterial color={GOLD} />
      </mesh>
    </group>
  )
}

export default function CourtIntro3D({ onDone }: { onDone: () => void }) {
  return (
    <Canvas
      className="h-full w-full"
      flat
      camera={{ fov: 42, position: [0, 5.4, 9.2], near: 0.1, far: 60 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
      onCreated={({ gl }) => gl.setClearColor("#ffffff", 1)}
    >
      <Scene onDone={onDone} />
    </Canvas>
  )
}
