# 🛍️ AJ SHOP — E‑commerce Shopping Cart Website

A complete, responsive online store built with plain HTML, CSS and JavaScript.
Browse **10 departments**, filter products, add to cart/wishlist, and check out
with **CCAvenue** (Card / Net Banking / UPI) or Cash on Delivery.

> **Copyright note:** every image is an **original SVG illustration generated
> in code** (`assets/js/art.js`) and every product description is **original
> marketing copy** written for AJ SHOP. No third‑party photos, brand assets or
> copyrighted text are used, so the storefront is copyright‑safe to publish.

---

## 🚀 Quick start

**Just browsing / demo (no payments):**
Open `index.html` in a browser — the whole storefront works client‑side.
Checkout falls back to a simulated confirmation when no payment server is running.

**Full flow with live CCAvenue payments:**
```bash
cd ajshop/server
cp .env.example .env      # add your CCAvenue merchant credentials
npm install
npm start                 # serves the storefront + payment API on :3000
```
Then open <http://localhost:3000>.

---

## 🗂️ Categories

| # | Category | Sub‑filters |
|---|----------|-------------|
| 1 | Ready‑made Garments — **Kids** (age 1–12) | Boys · Girls |
| 2 | Ready‑made Garments — **Adults** (age 13+) | Gents · Ladies |
| 3 | Electronics Accessories | — |
| 4 | Mobiles | — |
| 5 | Beauty Products | — |
| 6 | Stationery | — |
| 7 | Computer Accessories | — |
| 8 | Handicraft Items | — |
| 9 | Home Decor | — |
| 10 | Footwear | — |

Kids' and Adult garments support the requested sub‑category filters
(Boys/Girls and Gents/Ladies) via pills on the category page and the sidebar.

---

## 📄 Pages

| File | Purpose |
|------|---------|
| `index.html` | Home — hero, category grid, deals, trending, trust badges |
| `category.html?cat=<id>&group=<sub>` | Category listing with filters & sort |
| `product.html?id=<id>` | Product detail with size/qty, add‑to‑cart, buy‑now |
| `cart.html` | Cart with quantity controls, coupons, order summary |
| `checkout.html` | Address form + CCAvenue payment selection |
| `order-success.html` | Order confirmation |
| `wishlist.html` | Saved items |
| `search.html?q=<term>` | Search results |

## 🧩 Assets

| File | Purpose |
|------|---------|
| `assets/css/style.css` | Full responsive design system |
| `assets/img/logo.svg` | **AJ SHOP** logo (original SVG) |
| `assets/js/art.js` | Original SVG illustration generator (all imagery) |
| `assets/js/data.js` | Catalog (categories + ~44 products, INR pricing) |
| `assets/js/app.js` | Header/footer, cart & wishlist (localStorage), drawer, toast |
| `assets/js/checkout.js` | Validation + CCAvenue hand‑off |
| `server/ccavenue-server.js` | Node/Express CCAvenue integration |

---

## 💳 CCAvenue payment gateway

CCAvenue's non‑seamless integration **must** encrypt the order server‑side —
the AES **working key** can never be exposed to the browser. Flow:

1. Checkout POSTs the order to `POST /ccavenue/initiate`.
2. The server AES‑128‑CBC encrypts it with the merchant working key and returns
   an auto‑submitting form that redirects the shopper to CCAvenue.
3. The shopper pays via **Card / Net Banking / UPI**.
4. CCAvenue POSTs an encrypted response to `POST /ccavenue/response`, which the
   server decrypts, verifies, and then redirects to the confirmation page.

Configure via env vars (see `server/.env.example`): `CCA_MERCHANT_ID`,
`CCA_ACCESS_CODE`, `CCA_WORKING_KEY`, `CCA_MODE` (`test`/`prod`), `BASE_URL`.

**Cash on Delivery** skips the gateway entirely.

---

## 🎟️ Demo coupons

- `AJ10` — 10% off the cart
- `WELCOME200` — ₹200 off orders over ₹999

Free shipping applies automatically on orders over ₹999.
