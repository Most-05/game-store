// เสียบ mock backend เข้ากับ dev server ของ CRA
//
// เดิมต้องเปิดสองหน้าต่างคู่กันเสมอ คือ npm run server กับ npm start
// ถ้าลืมเปิดตัวแรก หน้าสมัครกับหน้าล็อกอินจะใช้ไม่ได้ แล้วขึ้นข้อความว่า
// "Error during signup. Please try again." ซึ่งไม่ได้บอกเลยว่าสาเหตุคืออะไร
// เป็นกับดักที่คนมารับงานต่อเจอแน่นอน
//
// CRA จะมองหาไฟล์ชื่อ src/setupProxy.js แล้วโหลดเข้า dev server ให้เองอัตโนมัติ
// โดยไม่ต้องลง dependency เพิ่ม และ backend จะดับตามตอนปิด dev server
//
// ไฟล์นี้ไม่ถูกรวมเข้าไปในโค้ดฝั่งเบราว์เซอร์ CRA ใช้เฉพาะตอน npm start
// เท่านั้น ตอน npm run build จะไม่ถูกแตะเลย
//
// npm run server ยังใช้ได้เหมือนเดิมถ้าอยากเปิด backend แยกที่พอร์ต 8082

const { handler } = require('../mock-server/server');

// รับเฉพาะเส้นทางที่ backend รู้จักจริงเท่านั้น
// ที่เหลือต้องปล่อยผ่านไปให้ dev server จัดการ ไม่งั้นจะไปกลืน route ของ React
const API_PATHS = ['/api/authen_request', '/api/access_request', '/add_user', '/users'];

module.exports = function (app) {
  app.use((req, res, next) => {
    const path = req.url.split('?')[0];
    if (!API_PATHS.includes(path)) {
      return next();
    }
    handler(req, res);
  });
};
