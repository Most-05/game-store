// ตัวช่วยที่ใช้ร่วมกันในทุกไฟล์เทส

const API = 'http://localhost:8082';

/** ข้อความที่มองเห็นจริงบนหน้า ใช้ตรวจว่าหน้า "ว่างเปล่า" หรือไม่ */
async function visibleText(page) {
  return (await page.evaluate(() => document.body.innerText || '')).trim();
}

/** เก็บ alert/confirm ทุกอันที่หน้าเว็บเรียก แล้วกด OK ให้ */
function captureDialogs(page) {
  const messages = [];
  page.on('dialog', async (d) => {
    messages.push(d.message());
    await d.accept();
  });
  return messages;
}

/** เก็บ error ที่หลุดออกมาทาง console กับ uncaught exception */
function captureErrors(page) {
  const errors = [];
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  page.on('pageerror', (e) => errors.push(String(e)));
  return errors;
}

/** ตั้งยอดเงินใน localStorage ก่อนหน้าเว็บจะโหลด */
async function seedBalance(page, amount) {
  await page.addInitScript((v) => {
    window.localStorage.setItem('balance', String(v));
  }, amount);
}

/** สมัครผู้ใช้ใหม่ผ่าน API ตรง ๆ เพื่อเตรียมข้อมูลให้เทส login */
async function createUser(request, user) {
  return request.post(`${API}/add_user`, { data: user });
}

module.exports = { API, visibleText, captureDialogs, captureErrors, seedBalance, createUser };
