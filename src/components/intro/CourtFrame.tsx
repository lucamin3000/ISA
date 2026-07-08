/**
 * Pre-rendered frame of the court — the intro's fallback for
 * prefers-reduced-motion, WebGL-less devices, and the instant the 3D chunk
 * is still arriving. A vector recreation of the resolved scene in real
 * court colors: plaster walls, maple floor, painted red lines, the ink
 * wordmark. Resolution-independent and instant to paint.
 */
export function CourtFrame() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#E5E1DA]">
      <svg
        viewBox="0 0 640 460"
        className="w-[min(40rem,92vw)]"
        role="img"
        aria-label="A squash court with ISA Academy on the front wall, its red service lines meeting at the T"
      >
        <defs>
          <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FBFAF7" />
            <stop offset="1" stopColor="#EFECE5" />
          </linearGradient>
          <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#DCC79E" />
            <stop offset="1" stopColor="#C9B287" />
          </linearGradient>
        </defs>

        {/* plaster volume, maple floor */}
        <rect x="200" y="90" width="240" height="150" fill="url(#wall)" />
        <path d="M200 240 L60 420 L580 420 L440 240 Z" fill="url(#floor)" />
        <path d="M60 40 L200 90 L200 240 L60 420 Z" fill="#F3F0EA" />
        <path d="M580 40 L440 90 L440 240 L580 420 Z" fill="#F3F0EA" />
        <g stroke="#C9C4B9" strokeWidth="1.5" fill="none">
          <path d="M60 40 L200 90" />
          <path d="M580 40 L440 90" />
          <path d="M200 90 L440 90" />
        </g>

        {/* the Inspire Squash Academy logo on the front wall */}
        <image href="/img/isa-logo.png" x="248" y="108" width="144" height="87" preserveAspectRatio="xMidYMid meet" />

        {/* painted red play lines */}
        <g stroke="#C8102E" strokeWidth="2.5" fill="none">
          <path d="M200 226 L440 226" />
          <path d="M200 182 L440 182" />
          <path d="M116 348 L524 348" strokeWidth="3" />
          <path d="M320 348 L320 420" strokeWidth="3" />
          <path d="M116 348 L150 393 L230 393 L204 348" />
          <path d="M524 348 L490 393 L410 393 L436 348" />
        </g>
        {/* the T */}
        <circle cx="320" cy="348" r="6" fill="#C8102E" stroke="none" />
      </svg>
    </div>
  )
}
