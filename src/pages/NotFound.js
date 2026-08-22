import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// หน้าสำรองเวลา URL ไม่ตรงกับ route ไหนเลย
// ก่อนหน้านี้โปรเจกต์ไม่มีหน้านี้ พิมพ์ URL ผิดหรือลิงก์เสียจะเจอหน้าขาวเปล่า ๆ
// โดยไม่มีอะไรบอกว่าเกิดอะไรขึ้น ทำให้หาสาเหตุยากมาก

const linkStyle = {
  padding: '10px 20px',
  border: '1px solid var(--border-strong)',
  borderRadius: 'var(--radius-sm)',
  backgroundColor: 'var(--surface-2)',
  color: 'var(--text)',
  fontWeight: 600,
  textDecoration: 'none',
};

function NotFound() {
  const location = useLocation();

  // location.pathname เก็บค่าที่ถูกเข้ารหัสแบบ percent-encoding มา
  // ภาษาไทยจึงกลายเป็น %E0%B8%A1%E0%B8%81... ยาวเหยียดและอ่านไม่ออกเลย
  // ถอดรหัสกลับก่อนแสดง ส่วน try/catch กันกรณีที่ URL เข้ารหัสมาไม่สมบูรณ์
  // ซึ่ง decodeURIComponent จะโยน error ออกมา
  let shownPath = location.pathname;
  try {
    shownPath = decodeURIComponent(location.pathname);
  } catch {
    // ถอดไม่ได้ก็แสดงของเดิมไป ดีกว่าทำให้ทั้งหน้าพัง
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        padding: '2rem',
        textAlign: 'center',
        background: 'var(--bg)',
        color: 'var(--text)',
      }}
    >
      <h1 style={{ fontSize: '4rem', margin: 0, color: 'var(--accent)' }}>404</h1>
      <h2 style={{ margin: 0, fontSize: '1.4rem' }}>ไม่พบหน้าที่คุณเรียก</h2>
      <p style={{ margin: 0, color: 'var(--text-dim)', maxWidth: '90vw', wordBreak: 'break-all' }}>
        ไม่มีหน้าไหนตรงกับ <code style={{ color: 'var(--text)' }}>{shownPath}</code>
      </p>
      <div style={{ display: 'flex', gap: '12px', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/Home" style={linkStyle}>กลับหน้าแรก</Link>
        <Link to="/game" style={linkStyle}>เลือกเกม</Link>
        <Link to="/" style={linkStyle}>เข้าสู่ระบบ</Link>
      </div>
    </div>
  );
}

export default NotFound;
