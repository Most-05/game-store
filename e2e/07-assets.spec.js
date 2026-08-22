const { test, expect } = require('@playwright/test');
const { captureDialogs, settle, visit } = require('./helpers');

// รูปทุกใบต้องมาจากโปรเจกต์เราเอง ไม่ใช่ลิงก์ตรงไปเซิร์ฟเวอร์ของคนอื่น
//
// เดิมหน้า ROV กับหน้าเลือกเกมดึงรูป 19 ใบจากเว็บข่าวเกมเจ็ดเจ้า รวมกว่า 8 MB
// ซึ่งเป็นของคนอื่นทั้งหมด เขาย้ายหรือลบเมื่อไรรูปเราหายทันทีโดยไม่รู้ตัว
// และมันเกิดขึ้นแล้วจริงกับสามใบที่ปลายทางตอบ 504 มาตลอด
//
// เทสนี้กันไม่ให้มีใครเผลอเอาลิงก์นอกกลับเข้ามาอีก
const routes = ['/', '/signup', '/Home', '/game', '/add-funds', '/ARKHome', '/dino-pack',
  '/blueprint', '/equipment', '/artifacts', '/cave', '/structures',
  '/ROVHome', '/ROVShop', '/FortniteHome'];

test('รูปทุกใบต้องอยู่ในโปรเจกต์ ไม่ใช่ลิงก์ไปเว็บคนอื่น', async ({ page }) => {
  captureDialogs(page);
  const outside = [];

  for (const route of routes) {
    await visit(page, route);
    await settle(page);

    const urls = await page.evaluate(() => {
      const found = [];
      for (const img of document.querySelectorAll('img[src]')) {
        found.push(img.getAttribute('src'));
      }
      // รูปพื้นหลังที่ตั้งผ่าน CSS ก็ต้องนับด้วย ไม่ใช่ดูแค่แท็ก img
      for (const el of document.querySelectorAll('*')) {
        const bg = getComputedStyle(el).backgroundImage;
        if (bg && bg !== 'none') {
          for (const m of bg.matchAll(/url\(["']?([^"')]+)["']?\)/g)) found.push(m[1]);
        }
      }
      return found;
    });

    for (const url of [...new Set(urls)]) {
      if (!/^https?:\/\//i.test(url)) continue;
      if (url.startsWith(window_origin())) continue;
      outside.push(`${route} -> ${url}`);
    }
  }

  expect(outside, `ยังมีรูปที่ดึงจากเว็บนอกอยู่:\n${outside.join('\n')}`).toEqual([]);
});

// ที่อยู่ของเว็บเราเอง ทุกอย่างที่ขึ้นต้นด้วยอันนี้ถือว่าเป็นของในโปรเจกต์
function window_origin() {
  return 'http://localhost:3000';
}
