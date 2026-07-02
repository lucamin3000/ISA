# Inspire Squash Academy (ISA)

Single-page marketing site for Inspire Squash Academy. **v2 "Service Line" build.**

- One self-contained `index.html` (inline CSS, dependency-free vanilla JS — no build step)
- Palette: white / black / metallic gold (`#C6A15B`) — gold appears as one structural element: the service line
- Type: Playfair Display (display) + Inter (body), Google Fonts with system fallbacks
- Click-to-play video lightbox (backdrop blur, Escape / click-outside close, focus trap) —
  behavior modeled on the 21st.dev / Magic UI `hero-video-dialog` component, re-implemented without React
- All photography is CC-licensed from Wikimedia Commons, visibly captioned as layout
  stand-ins on-page, credited in the footer and in the manifest comment in `index.html`

## Truth policy

This build contains **zero fabricated information.** Every name, number, date and address
is either verified (sources cited in code comments) or rendered as a visible
`[PLACEHOLDER — … — client to supply]` token. The v1 "illustrative" statistics, sample
dates, invented street address and example email were removed in v2.

The founder bio is **withheld pending identity confirmation** — see the comment block at
the top of `index.html`, which holds a fully-sourced candidate profile ready to restore
once the client confirms identity.

## Run locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Go-live checklist

1. Search `index.html` for `[PLACEHOLDER` — every token lists exactly what to supply.
2. Set `data-video-src` on `#video-dialog` to a license-cleared embed URL to activate the film lightbox.
3. Confirm the founder's identity; restore the sourced bio from the manifest comment.
4. Replace all layout stand-in photography (marked with visible captions) with ISA's own.
5. Wire the newsletter form to an email provider.
