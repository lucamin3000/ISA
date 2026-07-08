/**
 * THE 3D INTRO — a real squash court in real court colors: plaster-white
 * walls, maple floor, standard painted red lines, the ISA ACADEMY wordmark
 * in ink on the front wall. (The site's gold/white/black system does not
 * apply inside the intro, by design.)
 * The lines draw themselves per-segment (eased) — this IS the loading —
 * then one continuous eased camera move resolves down toward the T and
 * hands off to the hero. Pointer input drifts the camera with inertia.
 *
 * Rendering: RoomEnvironment HDRI (procedural, no network), one arena key
 * light with soft 2048 shadows + dim fill, ACES filmic tone mapping,
 * bloom thresholded so only the emissive gold glows, subtle vignette.
 * Adaptive: low-power devices drop shadow resolution and bloom.
 * Lazy chunk — never part of first paint. ?capture freezes the final
 * frame (used to pre-render the no-WebGL / reduced-motion fallback).
 */
import { useEffect, useMemo, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js"
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"

// WSF standard singles court, 1 unit = 1 m
const W = 6.4
const L = 9.75
const H = 4.57 // front-wall out line
const BACK_OUT = 2.13 // out line at the back
const TIN = 0.48
const FW_SERVICE = 1.78
const SHORT_Z = -L / 2 + 5.44 // the short line: 5.44 m from the front wall
const BOX = 1.6
const LW = 0.055
const GLASS_T = 0.06
const T_POINT = new THREE.Vector3(0, 0.02, SHORT_Z)

const DRAW_SECONDS = 3.4
const GLIDE_SECONDS = 1.2

const LINE = "#C8102E" // standard painted red
const WOOD = "#D3BD93" // maple
const PLASTER = "#F7F5F1"
const HALL = "#E5E1DA" // bright hall beyond the court

const LOW_POWER =
  typeof navigator !== "undefined" && (navigator.hardwareConcurrency ?? 8) <= 4

function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

interface Stripe {
  mesh: THREE.Mesh
  window: [number, number]
}

/** Emissive painted line: a thin quad that grows, eased, from its start. */
function stripeMesh(length: number, material: THREE.Material): THREE.Mesh {
  const geo = new THREE.PlaneGeometry(length, LW)
  geo.translate(length / 2, 0, 0)
  const mesh = new THREE.Mesh(geo, material)
  mesh.scale.x = 0.0001
  mesh.visible = false
  return mesh
}

/** The Inspire Squash Academy logo, sitting on the front wall like a
 *  printed sponsor decal. The source PNG is on white, so we key the
 *  near-white pixels to transparent and paint only the gold mark. */
function makeWallText(): { mesh: THREE.Mesh; redraw: () => void } {
  const canvas = document.createElement("canvas")
  canvas.width = 1179
  canvas.height = 712
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 4

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 0,
  })
  // logo aspect ≈ 1.656:1
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(3, 3 / 1.656), material)
  mesh.position.set(0, 3.0, -L / 2 + 0.08)

  const img = new Image()
  img.onload = () => {
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const px = data.data
    for (let i = 0; i < px.length; i += 4) {
      // drop near-white background to transparent; feather the edge
      const min = Math.min(px[i], px[i + 1], px[i + 2])
      if (min > 236) px[i + 3] = 0
      else if (min > 205) px[i + 3] = Math.round(((236 - min) / 31) * 255)
    }
    ctx.putImageData(data, 0, 0)
    texture.needsUpdate = true
  }
  img.src = "/img/isa-logo.png"

  return { mesh, redraw: () => {} }
}

/** Post pipeline: bloom for the emissive gold only, subtle vignette. */
const VignetteShader = {
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    uStrength: { value: 0.28 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
  `,
  fragmentShader: /* glsl */ `
    varying vec2 vUv;
    uniform sampler2D tDiffuse;
    uniform float uStrength;
    void main(){
      vec4 col = texture2D(tDiffuse, vUv);
      float d = distance(vUv, vec2(0.5));
      col.rgb *= 1.0 - uStrength * smoothstep(0.45, 0.95, d);
      gl_FragColor = col;
    }
  `,
}

function Effects() {
  const { gl, scene, camera, size } = useThree()
  const composer = useMemo(() => {
    const c = new EffectComposer(gl)
    c.addPass(new RenderPass(scene, camera))
    if (!LOW_POWER) {
      // threshold 1.0: only HDR emissive (lines, wordmark, T) blooms
      c.addPass(
        new UnrealBloomPass(new THREE.Vector2(size.width, size.height), 0.85, 0.55, 1.0),
      )
    }
    c.addPass(new ShaderPass(VignetteShader))
    c.addPass(new OutputPass())
    return c
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl, scene, camera])

  useEffect(() => {
    composer.setSize(size.width, size.height)
  }, [composer, size])

  useEffect(() => () => composer.dispose(), [composer])

  useFrame(() => composer.render(), 1)
  return null
}

function Env() {
  const { gl, scene } = useThree()
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04)
    scene.environment = env.texture
    scene.environmentIntensity = 0.55 // even club light
    return () => {
      env.texture.dispose()
      pmrem.dispose()
    }
  }, [gl, scene])
  return null
}

function Scene({ onDone }: { onDone: () => void }) {
  const { camera } = useThree()
  const pointerTarget = useRef({ x: 0, y: 0 })
  const pointerSmooth = useRef({ x: 0, y: 0 })
  const doneRef = useRef(false)
  const startRef = useRef<number | null>(null)
  const tGlow = useRef<THREE.Mesh>(null)

  const lineMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: LINE,
        emissive: new THREE.Color(LINE),
        emissiveIntensity: 0.3, // painted, not glowing
        side: THREE.DoubleSide,
      }),
    [],
  )

  const wallMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: PLASTER,
        roughness: 0.92,
        metalness: 0,
      }),
    [],
  )

  const floorMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: WOOD,
        roughness: 0.48,
        metalness: 0,
        clearcoat: 0.4,
        clearcoatRoughness: 0.28,
        envMapIntensity: 0.6,
      }),
    [],
  )

  /** Painted-line choreography — walls first, floor after, the T last. */
  const stripes = useMemo<Stripe[]>(() => {
    const list: Stripe[] = []
    const add = (mesh: THREE.Mesh, window: [number, number]) => list.push({ mesh, window })

    const frontLine = (y: number, window: [number, number]) => {
      const m = stripeMesh(W, lineMat)
      m.position.set(-W / 2, y, -L / 2 + 0.02)
      add(m, window)
    }
    frontLine(TIN, [0.0, 0.14])
    frontLine(FW_SERVICE, [0.1, 0.24])

    const sideOut = (side: 1 | -1, window: [number, number]) => {
      const len = Math.hypot(L, H - BACK_OUT)
      const m = stripeMesh(len, lineMat)
      m.position.set(side * (W / 2 - 0.02), H, -L / 2)
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
      const m = stripeMesh(Math.hypot(x2 - x1, z2 - z1), lineMat)
      m.position.set(x1, 0.012, z1)
      m.rotation.x = -Math.PI / 2
      m.rotateZ(Math.atan2(-(z2 - z1), x2 - x1))
      add(m, window)
    }
    // short line — 5.44 m from the front wall
    floorLine(-W / 2, SHORT_Z, W / 2, SHORT_Z, [0.36, 0.52])
    // half-court line, arriving at the T
    floorLine(0, L / 2, 0, SHORT_Z, [0.5, 0.68])
    // service boxes, behind the short line
    floorLine(-W / 2 + BOX, SHORT_Z, -W / 2 + BOX, SHORT_Z + BOX, [0.66, 0.78])
    floorLine(-W / 2 + BOX, SHORT_Z + BOX, -W / 2, SHORT_Z + BOX, [0.76, 0.86])
    floorLine(W / 2 - BOX, SHORT_Z, W / 2 - BOX, SHORT_Z + BOX, [0.66, 0.78])
    floorLine(W / 2 - BOX, SHORT_Z + BOX, W / 2, SHORT_Z + BOX, [0.76, 0.86])

    return list
  }, [lineMat])

  const wallText = useMemo(() => makeWallText(), [])
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

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointerTarget.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointerTarget.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener("pointermove", onMove)
    return () => window.removeEventListener("pointermove", onMove)
  }, [])

  useFrame(({ clock }) => {
    // measure from the first rendered frame — the shared clock's origin
    // can predate the mount (preloaded chunk), which would fast-forward
    // the whole sequence
    if (startRef.current === null) startRef.current = clock.getElapsedTime()
    const t = clock.getElapsedTime() - startRef.current
    const p = Math.min(t / DRAW_SECONDS, 1)

    // loading IS the line painting — each segment eased
    for (const s of stripes) {
      const [a, b] = s.window
      const f = easeInOut(Math.min(Math.max((p - a) / (b - a), 0), 1))
      s.mesh.visible = f > 0
      s.mesh.scale.x = Math.max(f, 0.0001)
    }
    const textMat = wallText.mesh.material as THREE.MeshStandardMaterial
    textMat.opacity = easeInOut(Math.min(Math.max((p - 0.74) / 0.22, 0), 1))
    if (tGlow.current) {
      const f = easeInOut(Math.min(Math.max((p - 0.88) / 0.12, 0), 1))
      tGlow.current.scale.setScalar(f)
    }

    // camera: damped pointer drift, then one continuous eased resolve
    pointerSmooth.current.x += (pointerTarget.current.x - pointerSmooth.current.x) * 0.045
    pointerSmooth.current.y += (pointerTarget.current.y - pointerSmooth.current.y) * 0.045

    const g = p < 1 ? 0 : Math.min((t - DRAW_SECONDS) / GLIDE_SECONDS, 1)
    const eg = easeInOut(g)
    const drift = 1 - eg
    camera.position.set(
      pointerSmooth.current.x * 0.7 * drift,
      THREE.MathUtils.lerp(5.8, 1.9, eg) + pointerSmooth.current.y * 0.35 * drift,
      THREE.MathUtils.lerp(10.2, SHORT_Z + 5.4, eg),
    )
    camera.lookAt(0, THREE.MathUtils.lerp(0.4, 1.3, eg), SHORT_Z - 1.2)

    if (g >= 1 && !doneRef.current) {
      doneRef.current = true
      setTimeout(onDone, 200)
    }
  })

  return (
    <group>
      {/* pale wood floor, clearcoat catching the glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[W, L]} />
        <primitive object={floorMat} attach="material" />
      </mesh>
      {/* physical glass walls with visible thickness */}
      <mesh position={[0, H / 2, -L / 2 - GLASS_T / 2]}>
        <boxGeometry args={[W + GLASS_T * 2, H, GLASS_T]} />
        <primitive object={wallMat} attach="material" />
      </mesh>
      <mesh position={[-W / 2 - GLASS_T / 2, H / 2, 0]}>
        <boxGeometry args={[GLASS_T, H, L]} />
        <primitive object={wallMat} attach="material" />
      </mesh>
      <mesh position={[W / 2 + GLASS_T / 2, H / 2, 0]}>
        <boxGeometry args={[GLASS_T, H, L]} />
        <primitive object={wallMat} attach="material" />
      </mesh>
      {/* the wordmark, glowing on the front glass */}
      <primitive object={wallText.mesh} />
      {/* emissive gold play lines */}
      {stripes.map((s, i) => (
        <primitive key={i} object={s.mesh} />
      ))}
      {/* the T */}
      <mesh ref={tGlow} position={T_POINT} rotation={[-Math.PI / 2, 0, 0]} scale={0}>
        <circleGeometry args={[0.16, 32]} />
        <meshStandardMaterial color={LINE} emissive={LINE} emissiveIntensity={0.3} />
      </mesh>
      {/* arena lighting: one angled key with soft shadows + dim fill */}
      <directionalLight
        position={[5, 11, 1.5]}
        intensity={0.85}
        castShadow
        shadow-mapSize={[LOW_POWER ? 1024 : 2048, LOW_POWER ? 1024 : 2048]}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-radius={6}
      />
      <directionalLight position={[-6, 4, -4]} intensity={0.3} />
    </group>
  )
}

export default function CourtIntro3D({ onDone }: { onDone: () => void }) {
  return (
    <Canvas
      className="h-full w-full"
      camera={{ fov: 40, position: [0, 5.8, 10.2], near: 0.1, far: 80 }}
      dpr={[1, 2]}
      shadows="soft"
      gl={{ antialias: true }}
      onCreated={({ gl }) => {
        gl.setClearColor(HALL, 1)
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 0.9
      }}
    >
      <Env />
      <Scene onDone={onDone} />
      <Effects />
    </Canvas>
  )
}
