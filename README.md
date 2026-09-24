# GameStore — ARK · ROV · Fortnite

A React storefront for in-game items, bringing three game shops together in one
app with a shared account, wallet and checkout flow.

Originally started as a **5-member team project** (Feb–Mar 2025) with primary ownership over the **RoV storefront**, later independently restored, refactored, and expanded in August–September 2026 — see [Restoration notes](#restoration-notes-august-2026).

---

## Features

**Three game stores, one app**

| Store | Pages |
|---|---|
| **ARK: Survival Evolved** | Home + six category pages — Dino Packs, Blueprints, Equipment, Structures, Artifacts, Caves |
| **RoV (Arena of Valor)** | Home + skin shop with a slide-out menu |
| **Fortnite** | Home + cart + item cards |

**Shared across all three**

- Login and signup screens — the app opens on the login page
- One wallet balance held in React Context and mirrored to `localStorage`,
  shared by all three stores
- Add Funds page to top the balance up
- Cart and checkout, with the balance checked before a purchase goes through
- A 404 page for any URL that matches no route

## Built with

- React 19
- React Router 7
- React Bootstrap
- `react-use-cart` for cart state
- Create React App
- Playwright for end-to-end tests

## Running locally

One command is enough. The mock backend is mounted onto the dev server
by `src/setupProxy.js`, which CRA loads automatically.

```bash
npm install
npm start          # React app + mock backend on :3000
```

`npm run server` still works if you want the backend standalone on :8082.

The app starts at http://localhost:3000 and opens on the login screen.
Sign up for a new account, or use a seeded one:

| Username | Password |
|---|---|
| `mos` | `1234` |
| `preecha` | `12345` |

Without the backend running, signup and login fail with
`Error during signup. Please try again.` — everything else still works.

## Testing

```bash
npm run test:e2e          # run the Playwright suite (81 tests)
npm run test:e2e:report   # open the HTML report
```

The suite covers every route, every internal link, the signup and login flows,
the wallet, and all three shops. Playwright starts the dev server itself if one
is not already running, but the **backend must be started separately**.

`e2e/helpers.js` holds the shared helpers. Two are worth knowing about: `visit`
and `settle` deliberately avoid waiting for the `load` event, because the ROV
and Fortnite pages hotlink dozens of images from external sites — if any of them
stalls, a normal `page.goto` hangs until it times out.

## Project layout

```
src/
├── App.js              # every route is declared here
├── BalanceContext.js   # wallet balance shared across pages
├── components/
│   └── Header.js
└── pages/
    ├── ARKHome.js  +  DinoPackPage / BlueprintPage / EquipmentPage
    │                  / StructuresPage / ArtifactsPage / CavePage
    ├── ROVHome.js  +  ROVShop.js
    ├── FortniteHome.js  +  FortniteCart.js  +  FortniteItemcard.js
    ├── login.js  +  Signup.js  +  AddFunds.js  +  CheckoutPage.js
    ├── NotFound.js     # 404
    └── Gamestore.js    # game picker

mock-server/            # stand-in backend, see mock-server/README.md
e2e/                    # Playwright tests
```

`src/pages/ARK/`, `src/pages/ROV/` and `src/pages/Fortnite/` hold earlier drafts
that are no longer wired up — the live versions are the files directly under
`src/pages/`, as the imports in `App.js` show.

## Restoration notes (August–September 2026)

The original backend (`my-app-server/server.js`, Express + MySQL) was lost; only its `package.json` and a users table dump survived. The project was revived as an independent solo effort to address major legacy challenges:
- **Backend reconstruction:** Created `mock-server/` with a lightweight, dependency-free Node server so authentication, wallet, and checkout flows run end to end again.
- **Cross-store bug fixes:** Resolved architectural defects across all three stores (ARK, RoV, Fortnite), including missing `CartProvider`, unstyled ROV slide-out menus, balance deduction errors, and route typos.
- **Comprehensive testing:** Implemented end-to-end tests (81 Playwright tests) and unit test suites (Jest) covering routing, context state, and critical UI components.

## Notes

Item artwork belongs to the respective game publishers and is used here for a
non-commercial student project. The mock backend is for local development only —
it stores passwords as MD5 hashes and does not verify the tokens it issues.

---

## เกี่ยวกับโปรเจกต์นี้ (ภาษาไทย)

เว็บร้านขายไอเทมเกม เขียนด้วย React รวม 3 ร้านไว้ในเว็บเดียว — **ARK, RoV และ Fortnite**
ใช้ระบบล็อกอิน ยอดเงิน ตะกร้า และหน้าชำระเงินร่วมกัน

เดิมทีโปรเจกต์นี้เริ่มต้นจากการทำงานร่วมกันใน **ทีม 5 คน (กุมภาพันธ์–มีนาคม 2568)** โดยผมรับหน้าที่พัฒนาในส่วนของหน้าร้าน **RoV**

ต่อมาเนื่องจากโค้ดเดิมบางส่วนสูญหายและระบบยังไม่สมบูรณ์ จึงได้นำโปรเจกต์กลับมากู้คืน (Restore), ซ่อมแซมบั๊กทั่วทั้งระบบ และพัฒนาต่อยอดคนเดียวอย่างเต็มรูปแบบ (สิงหาคม–กันยายน 2569) โดยเน้นแก้ปัญหาใหญ่:
- **กู้คืนโครงสร้างระบบและสร้าง Mock Backend:** จำลองเซิร์ฟเวอร์ Node.js ทดแทนโค้ดหลังบ้านเดิมที่สูญหาย ให้ระบบล็อกอินและซื้อขายทำงานได้ครบวงจร
- **ซ่อมแซมบั๊กของทั้ง 3 ร้าน (ARK, RoV, Fortnite):** แก้ปัญหาการแสดงผล CSS, แก้ไขรูปภาพสินค้า, ระบบตะกร้า และ Flow การชำระเงิน/หักยอดเงินจริง
- **เขียนชุดทดสอบครอบคลุม:** เพิ่มการทดสอบทั้ง E2E (Playwright 81 เทส) และ Unit Test (Jest) ครอบคลุมการทำงานทั้งระบบ

### วิธีรัน

สั่งคำสั่งเดียวจบ backend จำลองถูกเสียบเข้ากับ dev server ด้วย src/setupProxy.js
ซึ่ง CRA โหลดให้เองอัตโนมัติ

```bash
npm install
npm start          # เว็บพร้อม backend จำลอง ที่พอร์ต 3000
```

ถ้าอยากเปิด backend แยกต่างหากที่พอร์ต 8082 ยังสั่ง `npm run server` ได้เหมือนเดิม

เปิดที่ http://localhost:3000 จะเจอหน้าเข้าสู่ระบบก่อน
สมัครใหม่ได้ หรือใช้บัญชีตั้งต้น `mos` / `1234` และ `preecha` / `12345`

### วิธีรันเทส

```bash
npm run test:e2e          # รันเทส Playwright ทั้ง 81 ตัว
npm run test:e2e:report   # เปิดรายงานผลแบบ HTML
```

เทสครอบคลุมทุกหน้า ทุกลิงก์ภายในเว็บ ระบบสมัครและเข้าสู่ระบบ ระบบยอดเงิน
และร้านค้าทั้งสามร้าน

### เรื่องการกู้คืน

backend ตัวจริงหายไปจากเครื่อง เหลือแค่ `package.json` กับไฟล์ SQL ของตาราง users
จึงเขียน `mock-server/` ขึ้นมาแทนเพื่อให้เว็บกลับมาใช้งานได้ครบ

ตอนเขียนชุดเทสพบบั๊กหลายจุดแล้วไล่แก้ทีละตัว เช่น ขาด `CartProvider`
ทำให้ตะกร้า Fortnite พังทั้งระบบ หน้า Checkout ไม่เคยหักเงินจริง
เมนูร้าน ROV ไม่มี CSS เลยกดใช้ไม่ได้ และ route ของหน้า Fortnite สะกดผิด
จนเปิดหน้าไม่ขึ้น รายละเอียดของแต่ละจุดดูได้จากประวัติคอมมิต
