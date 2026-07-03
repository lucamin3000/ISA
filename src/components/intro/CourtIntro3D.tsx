/**
 * THE 3D INTRO — an architectural squash court in real court colors:
 * maple floor, plaster-white walls, standard red painted lines, the ISA
 * ACADEMY wordmark on the front wall — and a deliberately abstract,
 * faceless player figure mid-lunge at the T. The T marker stays gold:
 * the one brand mark in the scene.
 *
 * The player is an ink pictogram, NOT a likeness. A faithful 3D model of
 * the founder requires confirmed identity, rights-cleared reference
 * imagery and consent (see the truth registry in src/content/site.ts);
 * when the client supplies an authorized scan/GLB it replaces the
 * pictogram here.
 *
 * Lines draw in sequence — tin, front-wall service line, side out lines,
 * floor — the figure rises, the camera glides to the T. Lazy chunk.
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

// real court colors + the single brand mark
const FLOOR_MAPLE = "#DCC29B"
const WALL_WHITE = "#FCFBF8"
const LINE_RED = "#C8102E"
const GOLD = "#C6A15B"
const INK = "#141210"
const EDGE_INK = "#0B0A08"

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
  geo.translate(length / 2, 0, 0)
  const mesh = new THREE.Mesh(geo, material)
  mesh.scale.x = 0.0001
  mesh.visible = false
  return mesh
}

/** The wall wordmark — ISA ACADEMY in Anton on the front wall. */
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
    ctx.fillStyle = EDGE_INK
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
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(4.8, 1.2), material)
  mesh.position.set(0, 3.0, -L / 2 + 0.02)
  return { mesh, redraw: draw }
}

/**
 * The player at the T — an abstract ink pictogram in a squash lunge:
 * capsule limbs, faceless head, racquet reaching low to the forehand.
 * Explicitly not a likeness of any person.
 */
function makePlayer(): { group: THREE.Group; material: THREE.MeshBasicMaterial } {
  const material = new THREE.MeshBasicMaterial({
    color: INK,
    transparent: true,
    opacity: 0,
  })
  const group = new THREE.Group()

  const limb = (from: THREE.Vector3, to: THREE.Vector3, r: number) => {
    const dir = new THREE.Vector3().subVectors(to, from)
    const len = dir.length()
    const geo = new THREE.CapsuleGeometry(r, len, 6, 12)
    const mesh = new THREE.Mesh(geo, material)
    mesh.position.copy(from).addScaledVector(dir, 0.5)
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize())
    group.add(mesh)
    return mesh
  }
  const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z)

  // lunge toward the front wall (−Z)
  const hips = v(0, 0.88, 0.12)
  const neck = v(0, 1.44, -0.06)
  // torso + head
  limb(hips, neck, 0.13)
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.115, 20, 16), material)
  head.position.set(0, 1.6, -0.1)
  group.add(head)
  // right leg — deep forward lunge
  limb(v(-0.06, 0.84, 0.08), v(-0.1, 0.48, -0.34), 0.075) // thigh
  limb(v(-0.1, 0.48, -0.34), v(-0.12, 0.06, -0.52), 0.06) // shin
  // left leg — trailing, extended
  limb(v(0.1, 0.84, 0.16), v(0.16, 0.48, 0.5), 0.075)
  limb(v(0.16, 0.48, 0.5), v(0.2, 0.07, 0.78), 0.06)
  // right arm — reaching low with the racquet
  limb(v(-0.17, 1.36, -0.02), v(-0.33, 1.08, -0.26), 0.055)
  limb(v(-0.33, 1.08, -0.26), v(-0.42, 0.82, -0.52), 0.048)
  // left arm — back for balance
  limb(v(0.17, 1.36, 0.0), v(0.36, 1.22, 0.2), 0.055)
  limb(v(0.36, 1.22, 0.2), v(0.5, 1.04, 0.36), 0.048)
  // racquet: handle + head
  limb(v(-0.42, 0.82, -0.52), v(-0.47, 0.68, -0.7), 0.02)
  const rHead = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.018, 10, 28), material)
  rHead.position.set(-0.5, 0.56, -0.84)
  rHead.rotation.set(Math.PI / 2.4, 0.25, 0)
  group.add(rHead)

  group.position.set(0, 0, SHORT_Z + 0.18)
  group.rotation.y = -0.3
  return { group, material }
}

function Scene({ onDone }: { onDone: () => void }) {
  const { camera } = useThree()
  const pointer = useRef({ x: 0, y: 0 })
  const doneRef = useRef(false)
  const tGlow = useRef<THREE.Mesh>(null)

  const redLine = useMemo(
    () => new THREE.MeshBasicMaterial({ color: LINE_RED, side: THREE.DoubleSide }),
    [],
  )

  /** Painted-line choreography — walls first, floor after, the T last. */
  const stripes = useMemo<Stripe[]>(() => {
    const list: Stripe[] = []
    const add = (mesh: THREE.Mesh, window: [number, number]) => {
      list.push({ mesh, window })
    }

    const frontLine = (y: number, window: [number, number]) => {
      const m = stripeMesh(W, redLine)
      m.position.set(-W / 2, y, -L / 2 + 0.012)
      add(m, window)
    }
    frontLine(TIN, [0.0, 0.14])
    frontLine(FW_SERVICE, [0.1, 0.24])

    const sideOut = (side: 1 | -1, window: [number, number]) => {
      const len = Math.hypot(L, H - BACK_OUT)
      const m = stripeMesh(len, redLine)
      m.position.set(side * (W / 2 - 0.012), H, -L / 2)
      m.rotation.y = -Math.PI / 2
      m.rotateZ(Math.atan2(BACK_OUT - H, L))
      add(m, window)
    }
    sideOut(-1, [0.2, 0.38])
    sideOut(1, [0.2, 0.38])

    const floorLine = (
      x1: number,
      z1: number,
      x2: number,
      z2: number,
      window: [number, number],
    ) => {
      const m = stripeMesh(Math.hypot(x2 - x1, z2 - z1), redLine)
      m.position.set(x1, 0.012, z1)
      m.rotation.x = -Math.PI / 2
      m.rotateZ(Math.atan2(-(z2 - z1), x2 - x1))
      add(m, window)
    }
    floorLine(-W / 2, SHORT_Z, W / 2, SHORT_Z, [0.36, 0.52])
    floorLine(0, L / 2, 0, SHORT_Z, [0.5, 0.68])
    floorLine(-W / 2 + BOX, SHORT_Z, -W / 2 + BOX, SHORT_Z + BOX, [0.66, 0.78])
    floorLine(-W / 2 + BOX, SHORT_Z + BOX, -W / 2, SHORT_Z + BOX, [0.76, 0.86])
    floorLine(W / 2 - BOX, SHORT_Z, W / 2 - BOX, SHORT_Z + BOX, [0.66, 0.78])
    floorLine(W / 2 - BOX, SHORT_Z + BOX, W / 2, SHORT_Z + BOX, [0.76, 0.86])

    return list
  }, [redLine])

  const wallText = useMemo(() => makeWallText(), [])
  const player = useMemo(() => makePlayer(), [])

  useEffect(() => {
    let alive = true
    document.fonts
      ?.load("400 300px Anton")
      .then(() => alive && wallText.redraw())
      .catch(() => {})
    document.fonts?.ready.then(() => alive && wallText.redraw()).catch(() => {})
    return () => {
      alive = false
    }
  }, [wallText])

  const blackEdges = useMemo(() => {
    const group = new THREE.Group()
    const mat = new THREE.LineBasicMaterial({ color: EDGE_INK })
    const add = (geo: THREE.BufferGeometry, x = 0, y = 0, z = 0, rx = 0, ry = 0) => {
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo as never), mat)
      edges.position.set(x, y, z)
      edges.rotation.set(rx, ry, 0)
      group.add(edges)
      geo.dispose()
    }
    add(new THREE.PlaneGeometry(W, L), 0, 0, 0, -Math.PI / 2)
    add(new THREE.PlaneGeometry(W, H), 0, H / 2, -L / 2)
    add(new THREE.PlaneGeometry(L, H), -W / 2, H / 2, 0, 0, Math.PI / 2)
    add(new THREE.PlaneGeometry(L, H), W / 2, H / 2, 0, 0, -Math.PI / 2)
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
    // the player rises at the T
    const pf = easeInOut(Math.min(Math.max((p - 0.68) / 0.24, 0), 1))
    player.material.opacity = pf
    player.group.visible = pf > 0
    player.group.scale.setScalar(0.9 + 0.1 * pf)
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
      THREE.MathUtils.lerp(5.4, 2.0, eg),
      THREE.MathUtils.lerp(9.2, SHORT_Z + 4.9, eg),
    )
    const orbit = 1 - eg
    camera.position.set(
      base.x + pointer.current.x * 0.55 * orbit,
      base.y + pointer.current.y * 0.3 * orbit,
      base.z,
    )
    // the gaze settles on the player between the T and the wordmark
    camera.lookAt(0, THREE.MathUtils.lerp(0.02, 1.05, eg), SHORT_Z)

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
      {/* maple floor, plaster walls */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[W, L]} />
        <meshBasicMaterial color={FLOOR_MAPLE} />
      </mesh>
      <mesh position={[0, H / 2, -L / 2]}>
        <planeGeometry args={[W, H]} />
        <meshBasicMaterial color={WALL_WHITE} />
      </mesh>
      <mesh position={[-W / 2, H / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[L, H]} />
        <meshBasicMaterial color={WALL_WHITE} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[W / 2, H / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[L, H]} />
        <meshBasicMaterial color={WALL_WHITE} side={THREE.DoubleSide} />
      </mesh>
      {/* black edges */}
      <primitive object={blackEdges} />
      {/* the wordmark on the front wall */}
      <primitive object={wallText.mesh} />
      {/* painted red lines */}
      {stripes.map((s, i) => (
        <primitive key={i} object={s.mesh} />
      ))}
      {/* the player at the T — abstract pictogram, not a likeness */}
      <primitive object={player.group} />
      {/* the T — the one gold brand mark in the scene */}
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
