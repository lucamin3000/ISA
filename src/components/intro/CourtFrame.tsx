/**
 * Pre-rendered frame of the night arena — the intro's fallback for
 * prefers-reduced-motion, WebGL-less devices, and the instant the 3D chunk
 * is still arriving. A vector recreation of the resolved 3D scene: dark
 * surround, dim glass-lit walls, wood floor, the gold lines and wordmark
 * glowing. Resolution-independent and instant to paint.
 */
export function CourtFrame() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-ink">
      <svg
        viewBox="0 0 640 460"
        className="w-[min(40rem,92vw)]"
        role="img"
        aria-label="A glass squash court at night, its gold lines glowing and ISA Academy shining on the front wall"
      >
        <defs>
          <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2E2A22" />
            <stop offset="1" stopColor="#1B1813" />
          </linearGradient>
          <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4A3F2C" />
            <stop offset="1" stopColor="#2E2718" />
          </linearGradient>
        </defs>

        {/* dim glass-lit volume */}
        <rect x="200" y="90" width="240" height="150" fill="url(#wall)" />
        <path d="M200 240 L60 420 L580 420 L440 240 Z" fill="url(#floor)" />
        <path d="M60 40 L200 90 L200 240 L60 420 Z" fill="#16130E" />
        <path d="M580 40 L440 90 L440 240 L580 420 Z" fill="#16130E" />
        <g stroke="#3A342A" strokeWidth="1.5" fill="none">
          <path d="M60 40 L200 90" />
          <path d="M580 40 L440 90" />
          <path d="M200 90 L440 90" />
        </g>

        {/* the wordmark, glowing on the front glass */}
        <text
          x="320"
          y="140"
          textAnchor="middle"
          fill="#E9CF9A"
          filter="url(#glow)"
          style={{
            font: '400 30px Anton, "Arial Narrow", Impact, sans-serif',
            letterSpacing: "0.06em",
          }}
        >
          ISA ACADEMY
        </text>

        {/* emissive gold play lines */}
        <g stroke="#C6A15B" strokeWidth="2.5" fill="none" filter="url(#glow)">
          <path d="M200 226 L440 226" />
          <path d="M200 182 L440 182" />
          <path d="M116 348 L524 348" strokeWidth="3" />
          <path d="M320 348 L320 420" strokeWidth="3" />
          <path d="M116 348 L150 393 L230 393 L204 348" />
          <path d="M524 348 L490 393 L410 393 L436 348" />
        </g>
        {/* the T */}
        <circle cx="320" cy="348" r="6" fill="#C6A15B" filter="url(#glow)" stroke="none" />
      </svg>
    </div>
  )
}
