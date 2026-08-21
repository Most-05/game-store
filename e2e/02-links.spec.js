const { test, expect } = require('@playwright/test');
const { visibleText, captureDialogs, settle } = require('./helpers');

// หน้าที่มีเมนู/ลิงก์ให้กด — เทสว่าลิงก์ทุกอันพาไปหน้าที่มีเนื้อหาจริง
const pagesWithLinks = ['/Home', '/game', '/ARKHome', '/dino-pack', '/ROVHome', '/ROVShop', '/FortniteHome'];

test.describe('ลิงก์ทุกอันต้องไม่พาไปหน้าว่าง', () => {
  for (const from of pagesWithLinks) {
    test(`ลิงก์ในหน้า ${from}`, async ({ page }) => {
      captureDialogs(page);
      await page.goto(from);
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
        await page.goto(href);
        await settle(page);
        const text = await visibleText(page);
        if (text.length <= 10) broken.push(href);
        await page.goto(from);
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
    await page.goto('/game');
    await settle(page);
    await page.locator('.game-item').nth(g.index).click();
    await page.waitForURL(g.url, { timeout: 5000 });
    const text = await visibleText(page);
    expect(text, `กดการ์ดเกมใบที่ ${g.index + 1} แล้วหน้าไม่ขึ้นเนื้อหา`).toContain(g.mustSee);
  }
});
