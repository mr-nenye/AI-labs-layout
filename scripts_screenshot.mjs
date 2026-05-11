import { chromium } from "playwright";
const URL = process.argv[2] || "http://127.0.0.1:5179/";
const OUT = process.argv[3] || "/tmp/app.png";
const CLICK = process.argv[4] || "";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1024 } });
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(400);
if (CLICK) {
  await page.click(CLICK);
  await page.waitForTimeout(400);
}
await page.screenshot({ path: OUT, fullPage: false });
await browser.close();
console.log("OK", OUT);
