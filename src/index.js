import React from 'react';
import ReactDOM from 'react-dom/client';

// ลำดับการ import สองบรรทัดนี้สำคัญ ห้ามสลับ
//
// bootstrap.min.css ตั้งสีตัวอักษรกับสีพื้นของ body ไว้เป็นธีมสว่าง
// (#212529 บนพื้นขาว) ส่วน index.css ตั้งเป็นธีมมืดของเว็บเรา
// ทั้งสองกฎมีน้ำหนักเท่ากันเพราะเป็นตัวเลือกระดับแท็กเหมือนกัน
// ตัวที่โหลดทีหลังจึงชนะ
//
// เดิม bootstrap ถูก import อยู่ในไฟล์ src/pages/login.js ซึ่งอยู่ลึกกว่า
// ในสายการ import จึงถูกโหลดทีหลัง index.css และไปทับ body ของเว็บ
// ผลคือพื้นหลังจริงของ body เป็นสีขาวมาตลอด ที่ไม่มีใครเห็นเพราะทุกหน้า
// ทาสีพื้นของตัวเองทับไว้หมด แต่หน้าไหนที่ไม่ได้ทา เช่นหน้าชำระเงิน
// จะเห็นพื้นขาวโผล่รอบกล่องเนื้อหา และตัวอักษรที่ไม่ได้ตั้งสีจะเป็นเทาเข้ม
// บนพื้นเข้มจนอ่านแทบไม่ออก
//
// ย้ายมา import ที่นี่ให้อยู่ก่อน index.css ธีมมืดของเราจึงเป็นตัวที่ชนะ
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
