const { test, expect } = require('@playwright/test');
const { visibleText, captureDialogs, seedBalance, settle, visit } = require('./helpers');

test('เติมเงินแล้วยอดต้องเพิ่มขึ้นจริง', async ({ page }) => {
  const dialogs = captureDialogs(page);
  await seedBalance(page, 1000);

  await visit(page, '/add-funds');
  await page.fill('input[type="number"]', '500');
  await page.fill('input[type="text"]', '0812345678');
  await page.click('button:has-text("เติมเงิน")');

  await expect.poll(() => dialogs.join(' '), { timeout: 10000 }).toContain('เติมเงินสำเร็จ');
  const stored = await page.evaluate(() => localStorage.getItem('balance'));
  expect(Number(stored)).toBe(1500);
});

test('เติมเงินเสร็จต้องไม่เด้งกลับไปหน้า login', async ({ page }) => {
  const dialogs = captureDialogs(page);
  await seedBalance(page, 1000);

  await visit(page, '/add-funds');
  await page.fill('input[type="number"]', '500');
  await page.fill('input[type="text"]', '0812345678');
  await page.click('button:has-text("เติมเงิน")');
  await expect.poll(() => dialogs.join(' '), { timeout: 10000 }).toContain('เติมเงินสำเร็จ');

  await settle(page);
  const text = await visibleText(page);
  expect(text, 'เติมเงินเสร็จแล้วโดนเด้งไปหน้า Login ทั้งที่เพิ่งเติมเงินเสร็จ').not.toContain('Enter password');
});

test('เบอร์โทรไม่ครบ 10 หลักต้องเติมเงินไม่ได้', async ({ page }) => {
  const dialogs = captureDialogs(page);
  await seedBalance(page, 1000);

  await visit(page, '/add-funds');
  await page.fill('input[type="number"]', '500');
  await page.fill('input[type="text"]', '123');
  await page.click('button:has-text("เติมเงิน")');

  await expect.poll(() => dialogs.join(' '), { timeout: 10000 }).toContain('หมายเลขโทรศัพท์');
  const stored = await page.evaluate(() => localStorage.getItem('balance'));
  expect(Number(stored)).toBe(1000);
});

test('เติมเงินติดลบไม่ควรทำให้ยอดเงินลดลง', async ({ page }) => {
  const dialogs = captureDialogs(page);
  await seedBalance(page, 1000);

  await visit(page, '/add-funds');
  await page.fill('input[type="number"]', '-800');
  await page.fill('input[type="text"]', '0812345678');
  await page.click('button:has-text("เติมเงิน")');
  await expect.poll(() => dialogs.join(' '), { timeout: 10000 }).not.toBe('');

  const stored = await page.evaluate(() => localStorage.getItem('balance'));
  expect(Number(stored), 'กรอกจำนวนเงินติดลบแล้วเงินหายไปจากบัญชี').toBe(1000);
});

test('ซื้อไอเทม ARK แล้วยอดเงินต้องถูกหักจริง', async ({ page }) => {
  const dialogs = captureDialogs(page);
  await seedBalance(page, 10000);

  await visit(page, '/dino-pack');
  await settle(page);
  await page.locator('text=Giga').first().click();          // Giga ราคา 5000
  await page.waitForURL(/checkout/i, { timeout: 5000 });
  await page.click('button:has-text("BUY NOW")');
  await expect.poll(() => dialogs.join(' '), { timeout: 10000 }).toContain('เรียบร้อยแล้ว');

  const stored = await page.evaluate(() => localStorage.getItem('balance'));
  expect(Number(stored), 'ซื้อของแล้วเงินไม่ถูกหัก = ได้ของฟรี').toBe(5000);
});

test('เงินไม่พอต้องซื้อไม่ได้', async ({ page }) => {
  const dialogs = captureDialogs(page);
  await seedBalance(page, 100);

  await visit(page, '/dino-pack');
  await settle(page);
  await page.locator('text=Giga').first().click();          // Giga ราคา 5000 แต่มีอยู่ 100
  await page.waitForURL(/checkout/i, { timeout: 5000 });
  await page.click('button:has-text("BUY NOW")');
  await expect.poll(() => dialogs.join(' '), { timeout: 10000 }).not.toBe('');

  const stored = await page.evaluate(() => localStorage.getItem('balance'));
  expect(Number(stored), 'เงินติดลบหลังซื้อของที่ซื้อไม่ไหว').toBeGreaterThanOrEqual(0);
  expect(dialogs.join(' '), 'เงินแค่ 100 แต่ซื้อของ 5000 ได้').toContain('ไม่เพียงพอ');
});

test('ซื้อของจากหมวด Blueprint แล้วต้องไม่โดนเด้งไปหน้า DinoPack', async ({ page }) => {
  const dialogs = captureDialogs(page);
  await seedBalance(page, 100000);

  await visit(page, '/blueprint');
  await settle(page);
  await page.locator('[class*="Item"]').first().click();
  await page.waitForURL(/checkout/i, { timeout: 5000 });
  await page.click('button:has-text("BUY NOW")');
  await expect.poll(() => dialogs.join(' '), { timeout: 10000 }).toContain('เรียบร้อยแล้ว');

  await settle(page);
  expect(page.url(), 'ซื้อของจากหมวด Blueprint แต่ระบบเด้งไปหน้า dino-pack').not.toContain('dino-pack');
});
