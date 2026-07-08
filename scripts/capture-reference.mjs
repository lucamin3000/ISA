/**
 * Capture full-page reference screenshots of msquash.com (homepage + every
 * main-nav page) at desktop and mobile widths, into ./reference/.
 * LOCAL ANALYSIS ONLY — the folder is gitignored; these captures are used
 * to mirror layout structure, never to reuse their content or assets.
 *
 * Also works against the local ISA build for side-by-side comparison:
 *   node scripts/capture-reference.mjs --site http://localhost:5173 --out reference/isa --routes /,/annual-training,...
 */
import { chromium } from "playwright"
import { mkdirSync } from "node:fs"

const args = Object.fromEntries(
  process.argv.slice(2).map((a, i, all) => (a.startsWith("--") ? [a.slice(2), all[i + 1]] : [])).filter(Boolean),
)
const BASE = args.site ?? "https://www.msquash.com"
const OUT = args.out ?? "reference/msquash"
const WIDTHS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
]

const browser = await chromium.launch()

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0
      const step = () => {
        y += 700
        window.scrollTo(0, y)
        if (y >= document.body.scrollHeight + 1400) {
          window.scrollTo(0, 0)
          resolve()
        } else setTimeout(step, 180)
      }
      step()
    })
  })
  await page.waitForTimeout(800)
}

const ctx0 = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const probe = await ctx0.newPage()
await probe.goto(BASE + "/", { waitUntil: "domcontentloaded", timeout: 60000 })
await probe.waitForTimeout(4000)

let routes
if (args.routes) {
  routes = args.routes.split(",")
} else {
  // collect same-origin nav links (skip login/account/cart per instructions)
  routes = await probe.evaluate(() => {
    const links = [...document.querySelectorAll("nav a[href], header a[href]")]
      .map((a) => new URL(a.href, location.origin))
      .filter((u) => u.origin === location.origin)
      .map((u) => u.pathname)
      .filter((p) => !/login|account|signin|cart|product/i.test(p))
    return [...new Set(["/", ...links])]
  })
}
console.log("routes:", routes.join(" "))
await ctx0.close()

for (const vp of WIDTHS) {
  const dir = `${OUT}/${vp.name}`
  mkdirSync(dir, { recursive: true })
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    isMobile: vp.name === "mobile",
  })
  const page = await ctx.newPage()
  for (const route of routes) {
    const slug = route === "/" ? "home" : route.replaceAll("/", "-").replace(/^-|-$/g, "")
    try {
      await page.goto(BASE + route, { waitUntil: "domcontentloaded", timeout: 60000 })
      await page.waitForTimeout(3500)
      // skip intro overlays (ISA) / allow lazy content
      await page.keyboard.press("Escape").catch(() => {})
      await page.waitForTimeout(1200)
      await autoScroll(page)
      await page.screenshot({ path: `${dir}/${slug}.png`, fullPage: true })
      console.log(`ok ${vp.name}/${slug}`)
    } catch (e) {
      console.log(`FAIL ${vp.name}/${slug}: ${e.message.split("\n")[0]}`)
    }
  }
  await ctx.close()
}
await browser.close()
console.log("done")
