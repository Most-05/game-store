const { test, expect } = require('@playwright/test');
const { visibleText, captureDialogs, seedBalance, settle, visit } = require('./helpers');

test.describe('ร้าน Fortnite', () => {
  test('เพิ่มของลงตะกร้าแล้วปุ่มต้องเปลี่ยนเป็น "อยู่ในตะกร้าแล้ว"', async ({ page }) => {
    captureDialogs(page);
    await visit(page, '/FortniteHome');
    await settle(page);

    const addBtn = page.locator('button:has-text("เพิ่มลงตะกร้า")').first();
    await addBtn.click();
    await expect(page.locator('button:has-text("อยู่ในตะกร้าแล้ว")').first()).toBeVisible();
  });

  test('ของที่ใส่ตะกร้าต้องไปโผล่ในหน้า /Cart', async ({ page }) => {
    captureDialogs(page);
    await visit(page, '/FortniteHome');
    await settle(page);
    const title = await page.locator('.card-title').first().innerText();
    await page.locator('button:has-text("เพิ่มลงตะกร้า")').first().click();
    await expect(page.locator('button:has-text("อยู่ในตะกร้าแล้ว")').first()).toBeVisible();

    await visit(page, '/Cart');
    await settle(page);
    const text = await visibleText(page);
    expect(text, 'ของที่ใส่ตะกร้าไว้หายไปตอนเปิดหน้าตะกร้า').toContain(title);
  });

  test('ตะกร้า Fortnite ต้องใช้ยอดเงินก้อนเดียวกับทั้งเว็บ ไม่ใช่ 500 ตายตัว', async ({ page }) => {
    captureDialogs(page);
    await seedBalance(page, 99999);
    await visit(page, '/FortniteHome');
    await settle(page);
    await page.locator('button:has-text("เพิ่มลงตะกร้า")').first().click();

    await visit(page, '/Cart');
    await settle(page);
    await page.click('button:has-text("Check Out")');
    const text = await visibleText(page);
    expect(text, 'หน้าตะกร้าโชว์ "เงินคงเหลือ 500" ตายตัว ไม่ตรงกับยอดเงินจริงของผู้ใช้').not.toContain('เงินคงเหลือ: 500 บาท');
  });

  test('สั่งซื้อในตะกร้าแล้วยอดเงินต้องถูกหักจริง', async ({ page }) => {
    const dialogs = captureDialogs(page);
    await seedBalance(page, 99999);
    await visit(page, '/FortniteHome');
    await settle(page);
    await page.locator('button:has-text("เพิ่มลงตะกร้า")').first().click();

    await visit(page, '/Cart');
    await settle(page);
    await page.click('button:has-text("Check Out")');
    await page.click('button:has-text("สั่งซื้อ")');
    await expect.poll(() => dialogs.join(' '), { timeout: 10000 }).not.toBe('');

    const stored = await page.evaluate(() => localStorage.getItem('balance'));
    expect(Number(stored), 'สั่งซื้อของ Fortnite แล้วเงินในบัญชีไม่ถูกหัก').toBeLessThan(99999);
  });
});

test.describe('ร้าน ROV', () => {
  test('ซื้อสกินแล้ว Coins ที่แสดงต้องลดลง', async ({ page }) => {
    const dialogs = captureDialogs(page);
    // ต้องเติมเงินให้ก่อน เพราะร้าน ROV ใช้ยอดเงินจริงของผู้ใช้แล้ว
    // ไม่ได้แจก Coins ฟรี 50,000 ทุกครั้งที่เปิดหน้าเหมือนเดิม
    await seedBalance(page, 50000);
    await visit(page, '/ROVShop');
    await settle(page);

    const before = await visibleText(page);
    await page.locator('[class*="product-card"]').first().click();
    await page.click('button:has-text("ยืนยัน")');
    await expect.poll(() => dialogs.join(' '), { timeout: 10000 }).toContain('เรียบร้อยแล้ว');

    const after = await visibleText(page);
    expect(after, 'ซื้อสกินแล้วยอด Coins ไม่เปลี่ยน').not.toBe(before);
  });

  test('ยอด Coins ในร้าน ROV ต้องเป็นยอดเดียวกับทั้งเว็บ ไม่ใช่ 50,000 ตายตัว', async ({ page }) => {
    captureDialogs(page);
    await seedBalance(page, 123);
    await visit(page, '/ROVShop');
    await settle(page);

    const text = await visibleText(page);
    expect(text, 'ร้าน ROV แจก Coins 50,000 ให้ฟรีทุกครั้งที่เปิดหน้า ไม่เกี่ยวกับยอดเงินจริง').not.toContain('50,000');
  });

  test('ปุ่มยกเลิกใน popup ต้องไม่หัก Coins', async ({ page }) => {
    captureDialogs(page);
    await visit(page, '/ROVShop');
    await settle(page);
    const before = await visibleText(page);

    await page.locator('[class*="product-card"]').first().click();
    await page.click('button:has-text("ยกเลิก")');
    await page.waitForTimeout(300);

    const after = await visibleText(page);
    expect(after).toBe(before);
  });
});
