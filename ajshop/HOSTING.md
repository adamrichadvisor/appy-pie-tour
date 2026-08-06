# 🚀 How to Publish AJ SHOP on Hosting

This folder is your complete website. There are **two parts**:

1. **The storefront** — all the `.html` files + `assets/` (pure HTML/CSS/JS). This is what shoppers see.
2. **The payment server** — the `server/` folder (Node.js). Needed **only** for live CCAvenue card/UPI/net-banking payments.

You can host the storefront alone (payments run in demo mode), or host both (real payments).

---

## Option A — Simplest: static hosting (storefront only)

Best for: Netlify, Vercel, GitHub Pages, Hostinger, cPanel, Firebase Hosting, Cloudflare Pages, Amazon S3, or any shared web host.

### Netlify / Vercel / Cloudflare Pages (drag-and-drop, free)
1. Go to the host's dashboard.
2. Drag this whole folder (the one containing `index.html`) into their "deploy" / "drop files here" area.
3. Done — you get a live URL instantly. `index.html` is the entry page.

### cPanel / Hostinger / shared hosting (FTP)
1. Log into your hosting file manager (or use an FTP app like FileZilla).
2. Upload **everything in this folder** into the `public_html` (or `www`) directory.
3. Make sure `index.html` sits directly inside `public_html`.
4. Visit your domain — the site is live.

### GitHub Pages
1. Push this folder to a GitHub repo.
2. Repo → **Settings → Pages** → set branch to `main` and folder to `/root` (or `/docs` if you place files there).
3. Your site publishes at `https://<username>.github.io/<repo>/`.

> In static-only hosting, checkout shows a confirmation directly (demo). Card details are **not** collected — to take real money you need Option B.

---

## Option B — Full site with live CCAvenue payments

The `server/` folder runs the storefront **and** securely talks to CCAvenue. Use a host that runs **Node.js**: Render, Railway, Fly.io, Heroku, a VPS (DigitalOcean/AWS EC2), etc.

### Steps
1. Get your CCAvenue credentials from your **CCAvenue merchant dashboard**:
   - Merchant ID
   - Access Code
   - Working Key (32 characters)
2. On your Node host, set these environment variables (or copy `server/.env.example` to `server/.env` and fill them in):
   ```
   CCA_MERCHANT_ID=your_merchant_id
   CCA_ACCESS_CODE=your_access_code
   CCA_WORKING_KEY=your_32_char_working_key
   CCA_MODE=prod            # use "test" while testing
   BASE_URL=https://yourdomain.com
   PORT=3000
   ```
3. Install & start:
   ```bash
   cd server
   npm install
   npm start
   ```
4. In your CCAvenue dashboard, set the **response/redirect URL** to:
   ```
   https://yourdomain.com/ccavenue/response
   ```
5. Visit your domain — the server serves the full storefront AND processes real payments.

> ⚠️ **Never** put your Working Key in the HTML/JS files or share it publicly. It stays only in the server environment variables.

### Example: deploy to Render.com (free tier)
1. Push this folder to a GitHub repo.
2. Render → **New → Web Service** → connect the repo.
3. Root directory: `server` · Build: `npm install` · Start: `npm start`.
4. Add the environment variables from step 2 above.
5. Deploy → you get a live `https://...onrender.com` URL.

---

## After publishing — quick checklist
- [ ] Homepage loads at your domain
- [ ] All 10 categories open and show products
- [ ] Add to cart → cart → checkout works
- [ ] (Option B) A ₹1 test payment in CCAvenue **test mode** succeeds and returns to the confirmation page
- [ ] Switch `CCA_MODE=prod` only after test payments pass

## Want to customise before publishing?
- **Brand colour** → `assets/css/style.css` (change `--brand:#e6482e`)
- **Products / prices** → `assets/js/data.js`
- **Logo** → `assets/img/logo.svg`

Need a hand with any specific host? Tell me which one and I'll give exact steps.
