const { test, expect } = require('@playwright/test');
const { visibleText, captureDialogs, seedBalance, settle, visit } = require('./helpers');

// เทสชุดนี้คุมสามเรื่องที่เพิ่งแก้ในร้าน ARK
// ทั้งสามเรื่องเป็นแบบที่เปิดหน้าดูเฉย ๆ แล้วดูปกติทุกอย่าง จับได้ยากด้วยตา

test.describe('ร้าน ARK', () => {
  // หน้า Structures เคยแสดงราคา 10000 แต่ส่งเลข 45000 ไปหักเงินจริง
  // เพราะราคาที่แสดงกับราคาที่หักเป็นเลขคนละตัวที่เขียนแยกกัน
  const categories = ['/dino-pack', '/blueprint', '/equipment', '/artifacts', '/cave', '/structures'];

  for (const path of categories) {
    test(`ราคาที่แสดงในหน้า ${path} ต้องตรงกับราคาที่หน้าชำระเงิน`, async ({ page }) => {
      captureDialogs(page);
      await seedBalance(page, 999999);
      await visit(page, path);
      await settle(page);

      const card = page.locator('[class*="Item"]').first();
      const shown = (await card.innerText()).match(/(\d[\d,]*)\s*Coins/i);
      expect(shown, `อ่านราคาบนการ์ดในหน้า ${path} ไม่ได้`).not.toBeNull();

      await card.click();
      await page.waitForURL(/checkout/i, { timeout: 5000 });
      await settle(page);

      const checkout = await visibleText(page);
      const charged = checkout.match(/Price:\s*(\d[\d,]*)\s*Coins/i);
      expect(charged, 'อ่านราคาในหน้าชำระเงินไม่ได้').not.toBeNull();

      expect(
        charged[1],
        `หน้า ${path} แสดงราคา ${shown[1]} แต่หน้าชำระเงินคิด ${charged[1]}`
      ).toBe(shown[1]);
    });
  }

  test('การ์ดสินค้าต้องกดด้วยคีย์บอร์ดได้ ไม่ใช่เมาส์อย่างเดียว', async ({ page }) => {
    captureDialogs(page);
    await visit(page, '/dino-pack');
    await settle(page);

    const card = page.locator('[class*="Item"]').first();
    await card.focus();
    await expect(card, 'การ์ดสินค้าไล่ด้วยปุ่ม Tab ไปไม่ถึง').toBeFocused();

    await page.keyboard.press('Enter');
    await page.waitForURL(/checkout/i, { timeout: 5000 });
    expect(page.url(), 'กด Enter ที่การ์ดแล้วไม่เข้าหน้าชำระเงิน').toMatch(/checkout/i);
  });

  // หน้า Artifacts เคยฝังเลข 10000 ไว้ตายตัว ส่วนหน้า Structures ไม่แสดงเลย
  for (const path of ['/artifacts', '/structures', '/dino-pack', '/cave']) {
    test(`หน้า ${path} ต้องแสดงยอดเงินจริงของผู้ใช้`, async ({ page }) => {
      captureDialogs(page);
      await seedBalance(page, 4321);
      await visit(page, path);
      await settle(page);

      const text = await visibleText(page);
      expect(text, `ป้ายยอดเงินในหน้า ${path} ไม่ตรงกับยอดจริง`).toContain('4321');
    });
  }
});
