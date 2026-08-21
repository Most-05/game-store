const { test, expect } = require('@playwright/test');
const { API, visibleText, captureDialogs, createUser } = require('./helpers');

const unique = () => 'e2e' + Date.now() + Math.floor(Math.random() * 1000);

test('backend ต้องรันอยู่ ไม่งั้นสมัคร/ล็อกอินพังทั้งหมด', async ({ request }) => {
  const res = await request.get(`${API}/users`).catch(() => null);
  expect(res, `ต่อ ${API} ไม่ได้ — ต้องรัน backend ก่อน`).not.toBeNull();
  expect(res.ok()).toBeTruthy();
});

test('สมัครสมาชิกใหม่ผ่านหน้าเว็บได้ แล้วเด้งกลับหน้า login', async ({ page }) => {
  const dialogs = captureDialogs(page);
  const name = unique();

  await page.goto('/signup');
  await page.fill('#username', name);
  await page.fill('#password', '1234');
  await page.fill('#firstname', 'Test');
  await page.fill('#lastname', 'User');
  await page.fill('#email', `${name}@test.com`);
  await page.click('button[type="submit"]');

  await expect
    .poll(() => dialogs.join(' '), { timeout: 10000 })
    .toContain('Sign Up successful');
  await page.waitForURL(/localhost:3000\/$/, { timeout: 5000 });
});

test('สมัครด้วยชื่อซ้ำต้องขึ้นข้อความบอก ไม่ใช่สมัครผ่าน', async ({ page, request }) => {
  const dialogs = captureDialogs(page);
  const name = unique();
  await createUser(request, {
    user_name: name, user_pwd: '1234', first_name: 'A', last_name: 'B', email: 'a@b.com',
  });

  await page.goto('/signup');
  await page.fill('#username', name);
  await page.fill('#password', '1234');
  await page.fill('#firstname', 'A');
  await page.fill('#lastname', 'B');
  await page.fill('#email', 'a@b.com');
  await page.click('button[type="submit"]');

  await expect.poll(() => dialogs.join(' '), { timeout: 10000 }).toContain('already exists');
});

test('ล็อกอินด้วยรหัสถูกต้องแล้วต้องเข้าหน้า Home ได้', async ({ page, request }) => {
  captureDialogs(page);
  const name = unique();
  await createUser(request, {
    user_name: name, user_pwd: 'pass1234', first_name: 'Mos', last_name: 'H', email: 'm@h.com',
  });

  await page.goto('/');
  await page.fill('#username', name);
  await page.fill('#password', 'pass1234');
  await page.click('button[type="submit"]');

  await page.waitForURL(/\/home/i, { timeout: 10000 });
  const text = await visibleText(page);
  expect(text).toContain('Game Store');
});

test('ล็อกอินสำเร็จแล้วต้องเห็น Header แถบเมนูด้านบน', async ({ page, request }) => {
  captureDialogs(page);
  const name = unique();
  await createUser(request, {
    user_name: name, user_pwd: 'pass1234', first_name: 'Mos', last_name: 'H', email: 'm@h.com',
  });

  await page.goto('/');
  await page.fill('#username', name);
  await page.fill('#password', 'pass1234');
  await page.click('button[type="submit"]');
  await page.waitForURL(/\/home/i, { timeout: 10000 });

  await expect(page.locator('header.header'), 'ล็อกอินเสร็จแล้วแต่ Header ไม่โผล่').toBeVisible();
});

test('ล็อกอินรหัสผิดต้องขึ้นข้อความ error ไม่ใช่ปล่อยผ่าน', async ({ page, request }) => {
  captureDialogs(page);
  const name = unique();
  await createUser(request, {
    user_name: name, user_pwd: 'correct', first_name: 'A', last_name: 'B', email: 'a@b.com',
  });

  await page.goto('/');
  await page.fill('#username', name);
  await page.fill('#password', 'wrong-password');
  await page.click('button[type="submit"]');

  await expect(page.locator('.alert-danger')).toBeVisible({ timeout: 10000 });
  expect(page.url()).not.toMatch(/\/home/i);
});
