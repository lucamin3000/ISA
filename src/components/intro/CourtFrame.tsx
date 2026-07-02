/**
 * Static rendered frame of the court — the intro's fallback for
 * prefers-reduced-motion, WebGL-less devices, and the instant the 3D
 * chunk is still arriving. Front-on axial wireframe: white volume,
 * black edges, gold play lines converging on the T.
 */
export function CourtFrame() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 bg-white">
      <svg
        viewBox="0 0 640 460"
        className="w-[min(34rem,86vw)]"
        role="img"
        aria-label="Line drawing of a squash court, its service lines meeting at the T"
      >
        {/* court volume in one-point perspective, black edges */}
        <g stroke="#0B0A08" strokeWidth="2" fill="none">
          {/* front wall */}
          <rect x="200" y="90" width="240" height="150" />
          {/* floor */}
          <path d="M200 240 L60 420 L580 420 L440 240 Z" fill="#FFFFFF" />
          {/* side walls */}
          <path d="M60 40 L200 90 L200 240 L60 420 Z" />
          <path d="M580 40 L440 90 L440 240 L580 420 Z" />
          <path d="M60 40 L200 90" />
          <path d="M580 40 L440 90" />
        </g>
        {/* gold play lines, meeting at the T */}
        <g stroke="#C6A15B" strokeWidth="3" fill="none">
          {/* short line */}
          <path d="M116 348 L524 348" />
          {/* half-court line: from the short line back toward the viewer */}
          <path d="M320 348 L320 420" />
          {/* service boxes */}
          <path d="M116 348 L150 393 L230 393 L204 348" />
          <path d="M524 348 L490 393 L410 393 L436 348" />
        </g>
        {/* the T */}
        <circle cx="320" cy="348" r="6" fill="#C6A15B" stroke="none" />
      </svg>
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
        Inspire Squash Academy
      </p>
    </div>
  )
}
