# mock-server — backend จำลองสำหรับ GameStore

หน้าเว็บฝั่ง React เรียก API ที่ `http://localhost:8082` แต่ backend ตัวจริง
(`my-app-server/server.js` ที่ใช้ express + mysql) **หายไปจากเครื่องแล้ว**
เหลือแค่ `package.json` กับไฟล์ SQL ของตาราง `users`

โฟลเดอร์นี้คือ backend จำลองที่เขียนขึ้นมาแทน เพื่อให้เว็บกลับมาใช้งานได้ครบ

## จุดเด่น

- ใช้ `http` ของ Node ล้วน **ไม่ต้อง `npm install` และไม่ต้องติดตั้ง MySQL**
- เก็บผู้ใช้ลงไฟล์ `users.json` ข้าง ๆ กัน (สร้างเองอัตโนมัติครั้งแรกที่รัน)
- แฮชรหัสผ่านด้วย MD5 ให้ตรงกับของเดิมที่ใช้ `MD5()` ใน SQL

## วิธีรัน

```bash
node mock-server/server.js
```

หรือ `npm run server` จากรากโปรเจกต์

## API ที่มี

| Method | Path | ใครเรียก | คืนอะไร |
|---|---|---|---|
| POST | `/add_user` | `src/pages/Signup.js` | `{ message: "User added successfully" }` |
| POST | `/api/authen_request` | `src/pages/login.js` | `{ data: { auth_token } }` |
| POST | `/api/access_request` | `src/pages/login.js` | `{ data: { access_token, account_info } }` |
| GET | `/users` | ไว้ดูข้อมูลตอน debug | รายชื่อผู้ใช้ (ไม่มีรหัสผ่าน) |

## บัญชีตั้งต้น

| Username | Password |
|---|---|
| `mos` | `1234` |
| `preecha` | `12345` |

`preecha` มาจากไฟล์ SQL เดิมของโปรเจกต์

## ข้อควรรู้

นี่เป็นของจำลองสำหรับพัฒนาและเทสเท่านั้น ไม่ได้ออกแบบมาให้ปลอดภัยพอใช้งานจริง
MD5 ไม่เหมาะกับการเก็บรหัสผ่านในระบบจริง และ token ที่ออกให้ไม่ได้ถูกตรวจซ้ำในฝั่ง API
