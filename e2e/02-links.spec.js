const { test, expect } = require('@playwright/test');
const { visibleText, captureDialogs, settle, visit } = require('./helpers');

// หน้าที่มีเมนู/ลิงก์ให้กด — เทสว่าลิงก์ทุกอันพาไปหน้าที่มีเนื้อหาจริง
const pagesWithLinks = ['/Home', '/game', '/ARKHome', '/dino-pack', '/ROVHome', '/ROVShop', '/FortniteHome'];

test.describe('ลิงก์ทุกอันต้องไม่พาไปหน้าว่าง', () => {
  for (const from of pagesWithLinks) {
    test(`ลิงก์ในหน้า ${from}`, async ({ page }) => {
      captureDialogs(page);
      await visit(page, from);
      await settle(page);

      // เก็บ href ภายในเว็บทั้งหมด (ข้าม anchor #, ลิงก์นอก, และ href ว่าง)
      const hrefs = await page.$$eval('a[href]', (as) =>
        as
          .map((a) => a.getAttribute('href'))
          .filter((h) => h && !h.startsWith('#') && !h.startsWith('http') && h !== '')
      );
      const unique = [...new Set(hrefs)];
      const broken = [];

      for (const href of unique) {
        await visit(page, href);
        await settle(page);
        const text = await visibleText(page);
        // ลิงก์เสียมีสองแบบ คือพาไปหน้าว่าง กับพาไปตกที่หน้า 404
        // ต้องเช็คแบบที่สองด้วย ไม่งั้นพอเพิ่มหน้า 404 เข้ามาแล้วเทสจะผ่านทั้งที่ลิงก์ยังเสีย
        if (text.length <= 10 || text.includes('ไม่พบหน้าที่คุณเรียก')) broken.push(href);
        await visit(page, from);
        await settle(page);
      }

      expect(broken, `ลิงก์ในหน้า ${from} ที่กดแล้วเจอหน้าว่าง: ${broken.join(', ')}`).toHaveLength(0);
    });
  }
});

test('กดการ์ดเกมในหน้า /game ต้องเข้าหน้าเกมได้ทั้ง 3 เกม', async ({ page }) => {
  captureDialogs(page);
  const expected = [
    { index: 0, url: /FortniteHome/i, mustSee: 'Emmy Gift Shop' },
    { index: 1, url: /ARKHome/i, mustSee: 'ARK Survival Evolved' },
    { index: 2, url: /ROVHome/i, mustSee: 'Legendary ROV Shop' },
  ];

  for (const g of expected) {
    await visit(page, '/game');
    await settle(page);
    await page.locator('.game-item').nth(g.index).click();
    await page.waitForURL(g.url, { timeout: 5000 });
    // การ์ดหน่วงเวลา 300ms ก่อนเปลี่ยนหน้า ต้องรอให้หน้าปลายทางเรนเดอร์เสร็จก่อนค่อยอ่านข้อความ
    await expect(page.getByText(g.mustSee, { exact: false }).first()).toBeVisible({ timeout: 10000 });
    const text = await visibleText(page);
    expect(text, `กดการ์ดเกมใบที่ ${g.index + 1} แล้วหน้าไม่ขึ้นเนื้อหา`).toContain(g.mustSee);
  }
});

// ปุ่มกลับหน้าหลักในหน้าเกมแต่ละเกม ต้องพากลับไปหน้ารวมของเว็บ
// ไม่ใช่เตะผู้ใช้กลับไปหน้าเข้าสู่ระบบที่ route "/"
//
// ต้องตัดสินจาก URL ไม่ใช่จากข้อความบนหน้า เพราะคำว่า Enter password ในหน้า Login
// เป็น placeholder ของช่องกรอก ซึ่งไม่นับเป็น innerText เทสที่ดูข้อความจึงผ่านทั้งที่ยังบั๊ก
const homeButtons = [
  { page: '/ARKHome', label: 'HOME' },
  { page: '/ROVHome', label: 'Home' },
  { page: '/FortniteHome', label: 'หน้าหลัก' },
];

test.describe('ปุ่มกลับหน้าหลักต้องไม่เตะผู้ใช้ไปหน้า Login', () => {
  for (const { page: from, label } of homeButtons) {
    test(`ปุ่ม "${label}" ในหน้า ${from}`, async ({ page }) => {
      captureDialogs(page);
      await visit(page, from);
      await settle(page);

      await page.getByText(label, { exact: false }).first().click();
      await settle(page);

      expect(new URL(page.url()).pathname, `กดปุ่มกลับหน้าหลักในหน้า ${from} แล้วโดนพาไปหน้า Login`).not.toBe('/');
    });
  }
});
