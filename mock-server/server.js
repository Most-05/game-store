// Mock backend สำหรับ GameStore (ARK + ROV + Fortnite)
// แทน my-app-server/server.js ตัวเดิมที่หายไป (ของเดิมใช้ express + mysql)
// ตัวนี้ใช้ Node http ล้วน ไม่ต้อง npm install และไม่ต้องมี MySQL
// เก็บผู้ใช้ลงไฟล์ users.json ข้าง ๆ ไฟล์นี้
//
// รัน: node server.js     (ฟังที่ http://localhost:8082)

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = 8082;
const DB_FILE = path.join(__dirname, 'users.json');

const md5 = (s) => crypto.createHash('md5').update(String(s)).digest('hex');

function loadUsers() {
    try {
        return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    } catch {
        // ผู้ใช้ตั้งต้น ตามข้อมูลที่เจอในไฟล์ SQL เดิมของโปรเจกต์
        const seed = [
            {
                user_id: 1,
                user_name: 'preecha',
                user_pwd: md5('12345'),
                first_name: 'preecha',
                last_name: 'vonghirandecha',
                email: 'preecha.v@psu.ac.th',
                role_id: 1,
                role_name: 'admin',
            },
            {
                user_id: 2,
                user_name: 'mos',
                user_pwd: md5('1234'),
                first_name: 'Sidtisak',
                last_name: 'Hanthongchai',
                email: '6610210776@psu.ac.th',
                role_id: 2,
                role_name: 'user',
            },
        ];
        saveUsers(seed);
        return seed;
    }
}

function saveUsers(users) {
    fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2), 'utf8');
}

// auth_token ที่ออกให้ตอน authen_request แล้วรอ access_request มาแลก
const pendingTokens = new Map();

function send(res, status, payload) {
    const body = JSON.stringify(payload);
    res.writeHead(status, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Content-Length': Buffer.byteLength(body),
    });
    res.end(body);
}

function readBody(req) {
    return new Promise((resolve) => {
        let raw = '';
        req.on('data', (c) => (raw += c));
        req.on('end', () => {
            try {
                resolve(JSON.parse(raw || '{}'));
            } catch {
                resolve({});
            }
        });
    });
}

// ตัวจัดการคำขอทั้งหมด แยกออกมาเป็นฟังก์ชันเพื่อให้เอาไปใช้ซ้ำได้สองทาง
// คือเปิดเป็นเซิร์ฟเวอร์เดี่ยวที่พอร์ต 8082 กับเสียบเข้า dev server ผ่าน src/setupProxy.js
async function handler(req, res) {
    // preflight ของ CORS — เบราว์เซอร์ยิงมาก่อนทุก POST ที่เป็น application/json
    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        });
        return res.end();
    }

    const url = req.url.split('?')[0];
    const users = loadUsers();
    console.log(`${req.method} ${url}`);

    // ---- สมัครสมาชิก : Signup.js เรียกอันนี้ ----
    if (req.method === 'POST' && url === '/add_user') {
        const b = await readBody(req);
        if (!b.user_name || !b.user_pwd) {
            return send(res, 200, { message: 'Username and password are required' });
        }
        if (users.some((u) => u.user_name === b.user_name)) {
            return send(res, 200, { message: 'Username already exists' });
        }
        users.push({
            user_id: users.length ? Math.max(...users.map((u) => u.user_id)) + 1 : 1,
            user_name: b.user_name,
            user_pwd: md5(b.user_pwd),
            first_name: b.first_name || '',
            last_name: b.last_name || '',
            email: b.email || '',
            role_id: 2,
            role_name: 'user',
        });
        saveUsers(users);
        // ข้อความนี้ต้องตรงเป๊ะ — Signup.js เช็ค string นี้
        return send(res, 200, { message: 'User added successfully' });
    }

    // ---- ล็อกอินขั้นที่ 1 : ขอ auth_token ----
    if (req.method === 'POST' && url === '/api/authen_request') {
        const b = await readBody(req);
        const user = users.find((u) => u.user_name === b.username);
        if (!user) return send(res, 401, { message: 'User not found' });
        const authToken = crypto.randomBytes(16).toString('hex');
        pendingTokens.set(authToken, {
            user_name: user.user_name,
            expires: Date.now() + 5 * 60 * 1000,
        });
        return send(res, 200, { data: { auth_token: authToken } });
    }

    // ---- ล็อกอินขั้นที่ 2 : เอา auth_token + "user&pass" มาแลก access_token ----
    if (req.method === 'POST' && url === '/api/access_request') {
        const b = await readBody(req);
        const pending = pendingTokens.get(b.auth_token);
        if (!pending || pending.expires < Date.now()) {
            pendingTokens.delete(b.auth_token);
            return send(res, 401, { message: 'Invalid or expired auth token' });
        }
        // login.js ส่งมาเป็น username + "&" + password
        const [username, ...rest] = String(b.auth_signature || '').split('&');
        const password = rest.join('&');
        const user = users.find((u) => u.user_name === username);
        if (!user || user.user_name !== pending.user_name || user.user_pwd !== md5(password)) {
            return send(res, 401, { message: 'Invalid username or password' });
        }
        pendingTokens.delete(b.auth_token);
        return send(res, 200, {
            data: {
                access_token: crypto.randomBytes(24).toString('hex'),
                account_info: {
                    user_id: user.user_id,
                    user_name: user.user_name,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    role_id: user.role_id,
                    role_name: user.role_name,
                },
            },
        });
    }

    // ---- endpoint ช่วยดูข้อมูล (มีใน test.http เดิม) ----
    if (req.method === 'GET' && url === '/users') {
        return send(res, 200, { data: users.map(({ user_pwd, ...u }) => u) });
    }

    send(res, 404, { message: 'Not found' });
}

// export ให้ src/setupProxy.js เอา handler ไปเสียบกับ dev server ของ CRA ได้
// จะได้ไม่ต้องเปิดเซิร์ฟเวอร์แยกอีกหน้าต่าง
module.exports = { handler, PORT };

// เปิดเป็นเซิร์ฟเวอร์เดี่ยวเฉพาะตอนถูกสั่งรันตรง ๆ ด้วย node server.js เท่านั้น
// ถ้าถูก require เข้าไปจากที่อื่นจะไม่ยึดพอร์ต
if (require.main === module) {
    http.createServer(handler).listen(PORT, () => {
        console.log(`Mock backend ready at http://localhost:${PORT}`);
        console.log(`ฐานข้อมูลผู้ใช้: ${DB_FILE}`);
    });
}
