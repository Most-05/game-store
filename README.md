# GameStore — ARK · ROV · Fortnite

A React storefront for in-game items, bringing three game shops together in one
app with a shared account, wallet and checkout flow.

Built as a personal portfolio project (Feb–Mar 2025).

---

## Features

**Three game stores, one app**

| Store | Pages |
|---|---|
| **ARK: Survival Evolved** | Home + six category pages — Dino Packs, Blueprints, Equipment, Structures, Artifacts, Caves |
| **RoV (Arena of Valor)** | Home + skin shop |
| **Fortnite** | Home + cart + item cards |

**Shared across all three**

- Login and signup screens — the app opens on the login page
- A wallet balance held in React Context, shared by every page
- Add Funds page to top the balance up
- Cart and checkout, with the balance checked before a purchase goes through

## Built with

- React 19
- React Router 7
- React Bootstrap
- `react-use-cart` for cart state
- Create React App

## Running locally

```bash
npm install
npm start
```

The app starts at http://localhost:3000 and opens on the login screen.

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
    └── Gamestore.js    # game picker
```

`src/pages/ARK/`, `src/pages/ROV/` and `src/pages/Fortnite/` hold earlier drafts
that are no longer wired up — the live versions are the files directly under
`src/pages/`, as the imports in `App.js` show.

## Notes

This is a front-end project with no back end: accounts, balances and purchases
live in React state and reset on reload. Item artwork belongs to the respective
game publishers and is used here for a non-commercial student project.

---

## เกี่ยวกับโปรเจกต์นี้ (ภาษาไทย)

เว็บร้านขายไอเทมเกม เขียนด้วย React รวม 3 ร้านไว้ในเว็บเดียว — **ARK, RoV และ Fortnite**
ใช้ระบบล็อกอิน ยอดเงิน ตะกร้า และหน้าชำระเงินร่วมกัน

ทำเป็นโปรเจกต์ส่วนตัวช่วง กุมภาพันธ์–มีนาคม 2568

**วิธีรัน:** `npm install` แล้ว `npm start` เปิดที่ http://localhost:3000

**หมายเหตุ:** เป็นงานฝั่งหน้าบ้านอย่างเดียว ยังไม่มีหลังบ้าน ข้อมูลบัญชีและยอดเงิน
เก็บใน state ของ React รีเฟรชแล้วค่าจะกลับไปเริ่มใหม่
