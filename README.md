# Inspire Squash Academy (ISA)

Single-page marketing site. **v3 "Rally Lines" build** — React 19 + TypeScript +
Tailwind CSS v4 + shadcn project structure (Vite).

## Stack

- `src/components/ui/hero-video-dialog.tsx` — 21st.dev / Magic UI component,
  vendored **verbatim**; its play disc takes the ISA gold through the shadcn
  `--primary` token, untouched.
- `src/components/isa/*` — the eleven art-directed page sections.
- `src/content/site.ts` — all copy constants, the image manifest with licenses,
  the truth-token registry, and the sourced founder-bio candidate profile.
- Tailwind v4 (CSS-first config in `src/index.css`), `framer-motion`,
  `lucide-react`, `clsx` + `tailwind-merge` (`cn()` in `src/lib/utils.ts`).

## Run

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production bundle in dist/
```

## Truth policy

Zero fabricated information. Every factual element is verified (sources cited in
`src/content/site.ts`), client-supplied premise, or a visible
`[PLACEHOLDER — … — client to supply]` token. The founder bio is withheld
pending identity confirmation; a fully-sourced candidate profile sits in
`src/content/site.ts`, ready to restore once confirmed.

## Go-live checklist

1. Set `ISA_FILM_EMBED_URL` in `src/content/site.ts` to a license-cleared embed —
   the verbatim HeroVideoDialog takes over from the flagged placeholder dialog.
2. Search the codebase for `PLACEHOLDER` and supply each item (dates, address,
   contact, roster, stats, portrait).
3. Confirm the founder's identity; restore the sourced bio.
4. Replace the layout stand-in photography (visibly captioned on-page,
   credited in the footer).
5. Wire the newsletter form to an email provider.
