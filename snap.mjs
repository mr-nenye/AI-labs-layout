import { chromium } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1024 } });
const page = await ctx.newPage();
await page.goto('http://127.0.0.1:5179/', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/app_landing.png' });
// Click the Slides method card
await page.getByRole('button', { name: 'Slides' }).first().click();
await page.waitForTimeout(400);
await page.screenshot({ path: '/tmp/app_slides.png' });
// Toggle sidebar
await page.locator('.brand-divider').click();
await page.waitForTimeout(400);
await page.screenshot({ path: '/tmp/app_slides_collapsed.png' });
await browser.close();
console.log('OK');
