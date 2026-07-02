# Inspire Squash Academy (ISA)

Single-page marketing site for Inspire Squash Academy — head coach **Karim Ibrahim**.

- One self-contained `index.html` (inline CSS, minimal vanilla JS — no build step)
- Palette: white / black / metallic gold (`#C6A15B`)
- Type: Playfair Display (display) + Inter (body), loaded from Google Fonts with system fallbacks
- All photography is Creative Commons–licensed from Wikimedia Commons; per-image source + license documented in the manifest comment at the top of `index.html` and in the footer "Photography credits"

## Run locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

(or any static file server — no dependencies)

## Before launch

Search `index.html` for `[PLACEHOLDER]` — every spot the client must supply
(facility address, phone, portrait of Karim Ibrahim, ambassador photos/names,
program dates, verified academy stats, newsletter form backend, social links).
Ambassador card photos are layout stand-ins of real professional players and
**must** be replaced.
