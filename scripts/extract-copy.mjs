/**
 * Extract visible text from msquash.com (homepage + main-nav pages) into
 * ./reference/msquash-copy.txt. FOR REGISTER STUDY ONLY — the rewrite uses
 * original wording; none of this text is reproduced on the ISA site.
 */
import { chromium } from "playwright"
import { mkdirSync, writeFileSync } from "node:fs"

const BASE = "https://www.msquash.com"
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await ctx.newPage()

await page.goto(BASE + "/", { waitUntil: "domcontentloaded", timeout: 60000 })
await page.waitForTimeout(4000)
const routes = await page.evaluate(() => {
  const links = [...document.querySelectorAll("nav a[href], header a[href]")]
    .map((a) => new URL(a.href, location.origin))
    .filter((u) => u.origin === location.origin)
    .map((u) => u.pathname)
    .filter((p) => !/login|account|signin|cart|product/i.test(p))
  return [...new Set(["/", ...links])]
})

mkdirSync("reference", { recursive: true })
let out = ""
for (const route of routes) {
  try {
    await page.goto(BASE + route, { waitUntil: "domcontentloaded", timeout: 60000 })
    await page.waitForTimeout(3500)
    const text = await page.evaluate(() => {
      const t = document.body.innerText || ""
      return t.replace(/\n{3,}/g, "\n\n").trim()
    })
    out += `\n\n===================== ${route} =====================\n${text}\n`
    console.log("ok", route, `(${text.length} chars)`)
  } catch (e) {
    console.log("FAIL", route, e.message.split("\n")[0])
  }
}
writeFileSync("reference/msquash-copy.txt", out)
await browser.close()
console.log("written reference/msquash-copy.txt")
