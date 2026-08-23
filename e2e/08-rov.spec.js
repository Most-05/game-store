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

    const prices = await page.$$eval('[class*="productPrice"]', (els) =>
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

    const card = page.locator('[class*="productCard"]').first();
    const onCard = (await card.locator('[class*="productPrice"]').innerText()).trim();

    await card.click();
    await expect(page.locator('[class*="popupBox"]')).toBeVisible();
    const popup = await page.locator('[class*="popupBox"]').innerText();
    expect(popup, `การ์ดบอกราคา ${onCard} แต่ป๊อปอัพบอกคนละราคา`).toContain(onCard);
  });

  // การ์ดสกินเป็น div ที่มีแค่ onClick มาก่อน กดได้ด้วยเมาส์อย่างเดียว
  test('การ์ดสกินต้องกดด้วยคีย์บอร์ดได้', async ({ page }) => {
    captureDialogs(page);
    await visit(page, '/ROVShop');
    await settle(page);

    const card = page.locator('[class*="productCard"]').first();
    await card.focus();
    await expect(card, 'การ์ดสกินไล่ด้วยปุ่ม Tab ไปไม่ถึง').toBeFocused();

    await page.keyboard.press('Enter');
    await expect(
      page.locator('[class*="popupBox"]'),
      'กด Enter ที่การ์ดแล้วป๊อปอัพยืนยันไม่เปิด'
    ).toBeVisible();
  });

  test('กด Esc แล้วป๊อปอัพต้องปิด และต้องไม่หัก Coins', async ({ page }) => {
    captureDialogs(page);
    await seedBalance(page, 50000);
    await visit(page, '/ROVShop');
    await settle(page);

    const before = await visibleText(page);
    await page.locator('[class*="productCard"]').first().click();
    await expect(page.locator('[class*="popupBox"]')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(
      page.locator('[class*="popupBox"]'),
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
    await page.locator('[class*="menuIcon"]').first().click();
    await expect(homeLink).toBeInViewport({ timeout: 5000 });

    await page.keyboard.press('Escape');
    await expect(homeLink, 'กด Esc แล้วเมนูสไลด์ไม่ยอมปิด').not.toBeInViewport({ timeout: 5000 });
  });

  test('กดพื้นหลังนอกกล่องแล้วป๊อปอัพต้องปิด', async ({ page }) => {
    captureDialogs(page);
    await visit(page, '/ROVShop');
    await settle(page);

    await page.locator('[class*="productCard"]').first().click();
    await expect(page.locator('[class*="popupBox"]')).toBeVisible();

    // กดที่มุมบนซ้ายของฉากคลุม ซึ่งอยู่นอกกล่องเนื้อหาแน่นอน
    await page.locator('[class*="popupOverlay"]').click({ position: { x: 5, y: 5 } });
    await expect(
      page.locator('[class*="popupBox"]'),
      'กดพื้นหลังแล้วป๊อปอัพไม่ปิด'
    ).toHaveCount(0);
  });

  // ---------- การจัดการโฟกัสของกล่องที่เด้งคลุมหน้าจอ ----------

  // เดิมกดเปิดกล่องแล้วโฟกัสยังค้างอยู่ที่การ์ดข้างหลัง คนที่ใช้คีย์บอร์ด
  // กด Tab ต่อจึงไล่ไปการ์ดใบอื่นที่อยู่หลังฉากคลุม แทนที่จะวนอยู่ในกล่อง
  test('เปิดกล่องยืนยันแล้วโฟกัสต้องย้ายเข้าไปในกล่อง', async ({ page }) => {
    captureDialogs(page);
    await visit(page, '/ROVShop');
    await settle(page);

    await page.locator('[class*="productCard"]').first().click();
    await expect(page.locator('[class*="popupBox"]')).toBeVisible();

    const insideDialog = await page.evaluate(() => {
      const box = document.querySelector('[class*="popupBox"]');
      return Boolean(box && document.activeElement && box.contains(document.activeElement));
    });
    expect(insideDialog, 'เปิดกล่องแล้วโฟกัสยังอยู่นอกกล่อง').toBe(true);
  });

  test('กด Tab ในกล่องต้องวนอยู่ในกล่อง ไม่หลุดไปการ์ดข้างหลัง', async ({ page }) => {
    captureDialogs(page);
    await visit(page, '/ROVShop');
    await settle(page);

    await page.locator('[class*="productCard"]').first().click();
    await expect(page.locator('[class*="popupBox"]')).toBeVisible();

    // กดวนหลายครั้งให้เกินจำนวนปุ่มในกล่อง ถ้าไม่มีการขังไว้จะหลุดออกไปแล้ว
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Tab');
    }

    const stillInside = await page.evaluate(() => {
      const box = document.querySelector('[class*="popupBox"]');
      return Boolean(box && document.activeElement && box.contains(document.activeElement));
    });
    expect(stillInside, 'กด Tab แล้วโฟกัสหลุดออกไปนอกกล่อง').toBe(true);
  });

  test('ปิดกล่องแล้วโฟกัสต้องกลับไปที่การ์ดที่กดมา', async ({ page }) => {
    captureDialogs(page);
    await visit(page, '/ROVShop');
    await settle(page);

    const card = page.locator('[class*="productCard"]').first();
    await card.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('[class*="popupBox"]')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.locator('[class*="popupBox"]')).toHaveCount(0);
    await expect(card, 'ปิดกล่องแล้วโฟกัสไม่กลับไปที่การ์ดเดิม').toBeFocused();
  });

  // ---------- แจ้งผลการซื้อในหน้าเว็บ ----------

  test('ซื้อสำเร็จต้องแจ้งผลในกล่อง ไม่ใช่ alert ของเบราว์เซอร์', async ({ page }) => {
    const dialogs = captureDialogs(page);
    await seedBalance(page, 50000);
    await visit(page, '/ROVShop');
    await settle(page);

    await page.locator('[class*="productCard"]').first().click();
    await page.click('button:has-text("ยืนยัน")');

    await expect(page.getByText('ซื้อสำเร็จ')).toBeVisible({ timeout: 10000 });
    expect(dialogs, `ยังเด้ง alert อยู่: ${dialogs.join(' | ')}`).toEqual([]);
  });

  test('เงินไม่พอต้องบอกในกล่องพร้อมทางไปเติมเงิน', async ({ page }) => {
    captureDialogs(page);
    await seedBalance(page, 10);
    await visit(page, '/ROVShop');
    await settle(page);

    await page.locator('[class*="productCard"]').first().click();
    await page.click('button:has-text("ยืนยัน")');

    await expect(page.getByText('Coins ไม่เพียงพอ')).toBeVisible({ timeout: 10000 });
    const topUp = page.locator('a[href="/add-funds"]');
    await expect(topUp, 'บอกว่าเงินไม่พอแต่ไม่มีทางไปเติมเงิน').toBeVisible();

    const stored = await page.evaluate(() => localStorage.getItem('balance'));
    expect(Number(stored), 'ซื้อไม่สำเร็จแต่เงินถูกหัก').toBe(10);
  });

  // ---------- เนื้อหาและชุดสี ----------

  test('ชื่อสกินต้องไม่ซ้ำกัน', async ({ page }) => {
    captureDialogs(page);
    await visit(page, '/ROVShop');
    await settle(page);

    const names = await page.$$eval('[class*="productName"]', (els) =>
      els.map((e) => e.textContent.trim())
    );
    const seen = new Set();
    const duplicated = names.filter((n) => (seen.has(n) ? true : (seen.add(n), false)));
    expect(duplicated, `ชื่อที่ซ้ำกัน: ${duplicated.join(' , ')}`).toEqual([]);
  });

  test('หัวข้อหน้าร้านต้องเป็นภาษาไทยเหมือนหน้าอื่นของเว็บ', async ({ page }) => {
    captureDialogs(page);
    await visit(page, '/ROVShop');
    await settle(page);

    const heading = await page.locator('h1').first().innerText();
    expect(heading, `หัวข้อยังเป็นภาษาอังกฤษ: ${heading}`).toMatch(/[\u0E00-\u0E7F]/);
  });

  // เมนูสไลด์เคยใช้ชุดสีของธีมเก่าที่ไม่อยู่ในชุดสีของเว็บเลย
  // คือน้ำเงินเทา #2c3e50 ตัวอักษร #ecf0f1 และไฮไลต์สีทอง #ffd700
  // เทียบกับค่าจริงของตัวแปรกลาง ไม่ได้เทียบกับเลขสีที่พิมพ์ไว้ในเทส
  // เพราะถ้าวันหลังเปลี่ยนสีของธีม เทสนี้จะยังถูกต้องอยู่
  test('เมนูสไลด์ต้องใช้สีจากชุดสีกลางของเว็บ', async ({ page }) => {
    captureDialogs(page);
    await visit(page, '/ROVShop');
    await settle(page);

    const result = await page.evaluate(() => {
      const toRgb = (value) => {
        const probe = document.createElement('span');
        probe.style.color = value.trim();
        document.body.appendChild(probe);
        const rgb = getComputedStyle(probe).color;
        probe.remove();
        return rgb;
      };
      const token = getComputedStyle(document.documentElement).getPropertyValue('--surface-2');
      const sidebar = document.querySelector('[class*="sidebar"]');
      return {
        expected: toRgb(token),
        actual: getComputedStyle(sidebar).backgroundColor,
      };
    });

    expect(result.actual, `เมนูสไลด์ใช้สี ${result.actual} แทนที่จะเป็น --surface-2 (${result.expected})`)
      .toBe(result.expected);
  });
});
