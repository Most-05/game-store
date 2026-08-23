const { test, expect } = require('@playwright/test');
const { visibleText, captureDialogs, seedBalance, settle, visit } = require('./helpers');

// เทสชุดนี้คุมร้าน ROV โดยเฉพาะ
// เรื่องที่คุมไว้เป็นสิ่งที่เปิดหน้าดูเฉย ๆ แล้วดูปกติ แต่พังได้ง่ายถ้าไปแก้ทีหลัง

test.describe('ร้าน ROV', () => {
  // เดิมราคาเก็บเป็นข้อความที่เขียนรูปแบบไม่เหมือนกันทั้งรายการ
  // หน้าเว็บจึงแสดง ฿9,900 ปนกับ ฿7900 และ ฿2000 ซึ่งดูเหมือนพิมพ์ผิด
  test('ราคาบนการ์ดทุกใบต้องเป็นรูปแบบเดียวกัน', async ({ page }) => {
    captureDialogs(page);
    await visit(page, '/ROVShop');
    await settle(page);

    const prices = await page.$$eval('[class*="product-price"]', (els) =>
      els.map((e) => e.textContent.trim())
    );
    expect(prices.length, 'ไม่เจอราคาบนหน้าร้านเลย').toBeGreaterThan(0);

    // ต้องขึ้นต้นด้วย ฿ แล้วตามด้วยตัวเลขที่คั่นหลักพันด้วยลูกน้ำ
    const wrong = prices.filter((p) => !/^฿\d{1,3}(,\d{3})*$/.test(p));
    expect(wrong, `ราคาที่รูปแบบไม่ตรงกับใบอื่น: ${wrong.join(' , ')}`).toEqual([]);
  });

  test('ราคาในป๊อปอัพต้องตรงกับราคาบนการ์ด', async ({ page }) => {
    captureDialogs(page);
    await visit(page, '/ROVShop');
    await settle(page);

    const card = page.locator('[class*="product-card"]').first();
    const onCard = (await card.locator('[class*="product-price"]').innerText()).trim();

    await card.click();
    await expect(page.locator('[class*="popup-box"]')).toBeVisible();
    const popup = await page.locator('[class*="popup-box"]').innerText();
    expect(popup, `การ์ดบอกราคา ${onCard} แต่ป๊อปอัพบอกคนละราคา`).toContain(onCard);
  });

  // การ์ดสกินเป็น div ที่มีแค่ onClick มาก่อน กดได้ด้วยเมาส์อย่างเดียว
  test('การ์ดสกินต้องกดด้วยคีย์บอร์ดได้', async ({ page }) => {
    captureDialogs(page);
    await visit(page, '/ROVShop');
    await settle(page);

    const card = page.locator('[class*="product-card"]').first();
    await card.focus();
    await expect(card, 'การ์ดสกินไล่ด้วยปุ่ม Tab ไปไม่ถึง').toBeFocused();

    await page.keyboard.press('Enter');
    await expect(
      page.locator('[class*="popup-box"]'),
      'กด Enter ที่การ์ดแล้วป๊อปอัพยืนยันไม่เปิด'
    ).toBeVisible();
  });

  test('กด Esc แล้วป๊อปอัพต้องปิด และต้องไม่หัก Coins', async ({ page }) => {
    captureDialogs(page);
    await seedBalance(page, 50000);
    await visit(page, '/ROVShop');
    await settle(page);

    const before = await visibleText(page);
    await page.locator('[class*="product-card"]').first().click();
    await expect(page.locator('[class*="popup-box"]')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(
      page.locator('[class*="popup-box"]'),
      'กด Esc แล้วป๊อปอัพไม่ปิด'
    ).toHaveCount(0);

    const after = await visibleText(page);
    expect(after, 'กด Esc ปิดป๊อปอัพแล้วแต่เงินถูกหัก').toBe(before);
  });

  test('กด Esc แล้วเมนูสไลด์ต้องปิด', async ({ page }) => {
    captureDialogs(page);
    await visit(page, '/ROVShop');
    await settle(page);

    const homeLink = page.locator('[class*="sidebar"]').first().getByText('Home', { exact: true });
    await page.locator('[class*="menuicon"]').first().click();
    await expect(homeLink).toBeInViewport({ timeout: 5000 });

    await page.keyboard.press('Escape');
    await expect(homeLink, 'กด Esc แล้วเมนูสไลด์ไม่ยอมปิด').not.toBeInViewport({ timeout: 5000 });
  });

  test('กดพื้นหลังนอกกล่องแล้วป๊อปอัพต้องปิด', async ({ page }) => {
    captureDialogs(page);
    await visit(page, '/ROVShop');
    await settle(page);

    await page.locator('[class*="product-card"]').first().click();
    await expect(page.locator('[class*="popup-box"]')).toBeVisible();

    // กดที่มุมบนซ้ายของฉากคลุม ซึ่งอยู่นอกกล่องเนื้อหาแน่นอน
    await page.locator('[class*="popup-overlay"]').click({ position: { x: 5, y: 5 } });
    await expect(
      page.locator('[class*="popup-box"]'),
      'กดพื้นหลังแล้วป๊อปอัพไม่ปิด'
    ).toHaveCount(0);
  });
});
