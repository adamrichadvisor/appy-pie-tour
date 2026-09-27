/* ============================================================
   AJ SHOP — CCAvenue payment server (Node + Express)
   ------------------------------------------------------------
   CCAvenue's non-seamless integration works like this:
     1. Browser POSTs the order to  POST /ccavenue/initiate
     2. We build the CCAvenue request string, AES-128-CBC encrypt
        it with the merchant WORKING KEY, and return a tiny HTML
        page that auto-submits an <form> to CCAvenue's gateway.
     3. Shopper pays on CCAvenue (card / net-banking / UPI).
     4. CCAvenue POSTs an encrypted response to our
        POST /ccavenue/response  — we decrypt & verify it, then
        redirect the shopper to the AJ SHOP confirmation page.

   The WORKING KEY and ACCESS CODE must be kept on the server and
   supplied via environment variables — never shipped to the
   browser.  Get them from the CCAvenue merchant dashboard.

   Run:
     cd server && npm install && npm start
   Env:
     CCA_MERCHANT_ID   your merchant id
     CCA_ACCESS_CODE   your access code
     CCA_WORKING_KEY   your 32-char working key
     CCA_MODE          "test" (default) or "prod"
     BASE_URL          public URL of this server (for callbacks)
     PORT              default 3000
   ============================================================ */
'use strict';
const express = require('express');
const crypto = require('crypto');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {
  CCA_MERCHANT_ID = 'YOUR_MERCHANT_ID',
  CCA_ACCESS_CODE = 'YOUR_ACCESS_CODE',
  CCA_WORKING_KEY = 'YOUR_32_CHAR_WORKING_KEY',
  CCA_MODE = 'test',
  BASE_URL = 'http://localhost:3000',
  PORT = 3000
} = process.env;

const GATEWAY = CCA_MODE === 'prod'
  ? 'https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction'
  : 'https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction';

/* ---- AES-128-CBC helpers (per CCAvenue integration kit) ---- */
const IV = Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
function keyFromWorkingKey(wk) { return crypto.createHash('md5').update(wk).digest(); }

function encrypt(plainText, workingKey) {
  const c = crypto.createCipheriv('aes-128-cbc', keyFromWorkingKey(workingKey), IV);
  return c.update(plainText, 'utf8', 'hex') + c.final('hex');
}
function decrypt(encText, workingKey) {
  const d = crypto.createDecipheriv('aes-128-cbc', keyFromWorkingKey(workingKey), IV);
  return d.update(encText, 'hex', 'utf8') + d.final('utf8');
}

/* map AJ SHOP payment choice -> CCAvenue payment_option/sub filter */
function ccavPaymentOption(method) {
  switch (method) {
    case 'card': return { payment_option: 'OPTCRDC', card_type: 'CRDC' };
    case 'netbanking': return { payment_option: 'OPTNBK', card_type: 'NB' };
    case 'upi': return { payment_option: 'OPTUPI', card_type: 'UPI' };
    default: return {};
  }
}

/* Serve the storefront statically (so the whole app runs from here) */
app.use(express.static(path.join(__dirname, '..')));

/* ---------------- 1) INITIATE ---------------- */
app.post('/ccavenue/initiate', (req, res) => {
  const o = req.body || {};
  const pay = ccavPaymentOption(o.payment_option);

  // Build the CCAvenue request parameter string
  const params = {
    merchant_id: CCA_MERCHANT_ID,
    order_id: o.order_id,
    amount: o.amount,
    currency: o.currency || 'INR',
    redirect_url: `${BASE_URL}/ccavenue/response`,
    cancel_url: `${BASE_URL}/ccavenue/response`,
    language: 'EN',
    billing_name: o.billing_name,
    billing_address: o.billing_address,
    billing_city: o.billing_city,
    billing_state: o.billing_state,
    billing_zip: o.billing_zip,
    billing_country: o.billing_country || 'India',
    billing_tel: o.billing_tel,
    billing_email: o.billing_email,
    merchant_param1: (o.items || []).map(i => `${i.name} x${i.qty}`).join('; ').slice(0, 250),
    ...pay
  };

  const requestString = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${k}=${v}`).join('&');

  const encRequest = encrypt(requestString, CCA_WORKING_KEY);

  // Auto-submitting redirect form
  res.send(`<!doctype html><html><head><meta charset="utf-8"><title>Redirecting to CCAvenue…</title>
    <style>body{font-family:system-ui;display:grid;place-items:center;height:100vh;margin:0;background:#f6f8fb;color:#33415c}</style></head>
    <body>
      <div style="text-align:center">
        <p style="font-size:18px;font-weight:600">Securely redirecting you to CCAvenue…</p>
        <p style="color:#7a869a">Please do not close or refresh this page.</p>
      </div>
      <form id="ccaForm" method="post" action="${GATEWAY}">
        <input type="hidden" name="encRequest" value="${encRequest}">
        <input type="hidden" name="access_code" value="${CCA_ACCESS_CODE}">
      </form>
      <script>document.getElementById('ccaForm').submit();</script>
    </body></html>`);
});

/* ---------------- 2) RESPONSE (callback) ---------------- */
app.post('/ccavenue/response', (req, res) => {
  const encResp = req.body.encResp;
  if (!encResp) return res.redirect('/order-success.html?status=unknown');

  let parsed = {};
  try {
    const decrypted = decrypt(encResp, CCA_WORKING_KEY);
    decrypted.split('&').forEach(kv => { const [k, v] = kv.split('='); parsed[k] = decodeURIComponent(v || ''); });
  } catch (e) {
    return res.redirect('/order-success.html?status=error');
  }

  const status = (parsed.order_status || '').toLowerCase(); // Success | Aborted | Failure
  const orderId = parsed.order_id || '';
  const method = (parsed.payment_mode || '').toLowerCase().includes('net') ? 'netbanking'
    : (parsed.payment_mode || '').toLowerCase().includes('upi') ? 'upi' : 'card';

  // TODO: persist the transaction to your DB here (order_id, tracking_id, amount, status…)

  if (status === 'success') {
    return res.redirect(`/order-success.html?order=${encodeURIComponent(orderId)}&method=${method}`);
  }
  return res.redirect(`/order-success.html?order=${encodeURIComponent(orderId)}&status=${status || 'failed'}`);
});

app.get('/health', (_req, res) => res.json({ ok: true, mode: CCA_MODE }));

app.listen(PORT, () => {
  console.log(`AJ SHOP + CCAvenue server running on ${BASE_URL} (mode: ${CCA_MODE})`);
  if (CCA_WORKING_KEY.startsWith('YOUR_')) {
    console.warn('⚠  Set CCA_MERCHANT_ID, CCA_ACCESS_CODE and CCA_WORKING_KEY env vars before going live.');
  }
});
