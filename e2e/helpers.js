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

/**
 * รอให้หน้าเรนเดอร์เสร็จแบบไม่ต้องรอรูปจากเว็บนอก
 *
 * ใช้ networkidle ไม่ได้กับหน้าร้าน ROV และ Fortnite เพราะสองหน้านี้ดึงรูปสินค้า
 * จากโดเมนภายนอกหลายสิบรูป (garenanow, isanook, 4gamers ฯลฯ)
 * ถ้ารูปไหนโหลดช้าหรือโหลดไม่ขึ้น networkidle จะไม่มีวันเกิดและเทสจะ timeout
 * รอแค่ DOM พร้อมก็พอ เพราะสิ่งที่เราตรวจคือข้อความบนหน้า ไม่ใช่รูป
 */
async function settle(page) {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(400);
}

/**
 * เปิดหน้าโดยไม่รอ event load
 *
 * page.goto ของ Playwright รอ event load เป็นค่าเริ่มต้น ซึ่งจะเกิดก็ต่อเมื่อ
 * ทรัพยากรทุกชิ้นบนหน้าโหลดเสร็จ รวมถึงรูปจากเว็บนอกด้วย
 * หน้าร้าน ROV มีรูปจากโดเมนภายนอกเกือบยี่สิบรูป ถ้ามีรูปไหนโหลดไม่ขึ้น
 * goto จะค้างจนหมดเวลา 30 วินาที ทั้งที่หน้าเว็บใช้งานได้ตั้งนานแล้ว
 *
 * รอแค่ domcontentloaded ก็พอสำหรับสิ่งที่เทสตรวจ
 */
async function visit(page, path) {
  await page.goto(path, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(400);
}

module.exports = { API, visibleText, captureDialogs, captureErrors, seedBalance, createUser, settle, visit };
