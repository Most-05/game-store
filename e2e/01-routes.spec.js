const { test, expect } = require('@playwright/test');
const { visibleText, captureErrors, captureDialogs, settle, visit } = require('./helpers');

// ทุก route ที่ประกาศไว้ใน src/App.js พร้อมข้อความที่ต้องเจอบนหน้านั้น
const routes = [
  { path: '/', mustSee: 'Username' },
  { path: '/signup', mustSee: 'Sign Up' },
  { path: '/Home', mustSee: 'Game Store' },
  { path: '/game', mustSee: 'Trending Games' },
  { path: '/add-funds', mustSee: 'เติมเงิน' },
  { path: '/ARKHome', mustSee: 'ARK Survival Evolved' },
  { path: '/dino-pack', mustSee: 'DinoPack' },
  { path: '/blueprint', mustSee: 'ARK Survival Evolved' },
  { path: '/equipment', mustSee: 'ARK Survival Evolved' },
  { path: '/artifacts', mustSee: 'ARK Survival Evolved' },
  { path: '/cave', mustSee: 'ARK Survival Evolved' },
  { path: '/structures', mustSee: 'ARK Survival Evolved' },
  { path: '/ROVHome', mustSee: 'Legendary ROV Shop' },
  { path: '/ROVShop', mustSee: 'สกินทั้งหมด' },
  { path: '/FortniteHome', mustSee: 'Emmy Gift Shop' },
  { path: '/Cart', mustSee: 'ตะกร้า' },
];

test.describe('ทุกหน้าต้องเรนเดอร์เนื้อหาออกมาจริง', () => {
  for (const { path, mustSee } of routes) {
    test(`${path} ต้องไม่ใช่หน้าว่าง และต้องมีข้อความ "${mustSee}"`, async ({ page }) => {
      captureDialogs(page);
      await visit(page, path);
      await settle(page);
      const text = await visibleText(page);
      expect(text.length, `หน้า ${path} ว่างเปล่า ไม่มีข้อความเลย`).toBeGreaterThan(10);
      expect(text).toContain(mustSee);
    });
  }
});

test('URL ที่ไม่มี route ต้องบอกผู้ใช้ ไม่ใช่ปล่อยหน้าขาว', async ({ page }) => {
  captureDialogs(page);
  await visit(page, '/route-ที่ไม่มีอยู่จริง-12345');
  await settle(page);
  const text = await visibleText(page);
  expect(text.length, 'ไม่มี catch-all route ผู้ใช้เลยเจอหน้าขาวโดยไม่รู้สาเหตุ').toBeGreaterThan(0);

  // หน้า 404 เคยเอา location.pathname มาแสดงดิบ ๆ ซึ่งเป็นค่าที่ถูกเข้ารหัส
  // แบบ percent-encoding ไว้ ภาษาไทยจึงกลายเป็น %E0%B8%A1%E0%B8%81... ยาวเหยียด
  // อ่านไม่ออกเลยว่าตัวเองพิมพ์ URL อะไรผิด
  expect(text, 'หน้า 404 แสดง URL เป็นรหัส %E0%B8... แทนที่จะเป็นภาษาไทย').not.toContain('%E0%B8');
  expect(text, 'หน้า 404 ไม่ได้บอกว่า URL ไหนที่หาไม่เจอ').toContain('route-ที่ไม่มีอยู่จริง-12345');
});

test('หน้าแรกต้องโหลดได้โดยไม่มี error หลุดออกมาที่ console', async ({ page }) => {
  const errors = captureErrors(page);
  captureDialogs(page);
  await visit(page, '/Home');
  await settle(page);
  const real = errors.filter((e) => !/favicon|ERR_/.test(e));
  expect(real, `เจอ error: ${real.join(' | ')}`).toHaveLength(0);
});
