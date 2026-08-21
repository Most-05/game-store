import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// หน้าสำรองเวลา URL ไม่ตรงกับ route ไหนเลย
// ก่อนหน้านี้โปรเจกต์ไม่มีหน้านี้ พิมพ์ URL ผิดหรือลิงก์เสียจะเจอหน้าขาวเปล่า ๆ
// โดยไม่มีอะไรบอกว่าเกิดอะไรขึ้น ทำให้หาสาเหตุยากมาก
function NotFound() {
  const location = useLocation();

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
        fontFamily: 'sans-serif',
        background: '#111',
        color: '#eee',
      }}
    >
      <h1 style={{ fontSize: '4rem', margin: 0 }}>404</h1>
      <h2 style={{ margin: 0 }}>ไม่พบหน้าที่คุณเรียก</h2>
      <p style={{ opacity: 0.7, margin: 0 }}>
        ไม่มี route ไหนตรงกับ <code>{location.pathname}</code>
      </p>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/Home" style={{ color: '#4da3ff' }}>กลับหน้าแรก</Link>
        <Link to="/game" style={{ color: '#4da3ff' }}>เลือกเกม</Link>
        <Link to="/" style={{ color: '#4da3ff' }}>เข้าสู่ระบบ</Link>
      </div>
    </div>
  );
}

export default NotFound;
