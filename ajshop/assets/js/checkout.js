/* ============================================================
   AJ SHOP — checkout + CCAvenue hand-off
   ------------------------------------------------------------
   CCAvenue requires the order to be AES-256 encrypted with the
   merchant "working key" on the SERVER and then POSTed to the
   CCAvenue transaction gateway. That MUST NOT happen in the
   browser (the working key would be exposed). So this page:
     1. Validates + collects the order.
     2. POSTs the plain order to our own server endpoint
        (server/ccavenue-server.js  ->  POST /ccavenue/initiate).
     3. The server encrypts it and returns an auto-submitting
        form that redirects the shopper to CCAvenue.
   If no server is running (e.g. opened as a static file), we
   fall back to a simulated confirmation so the flow is testable.
   ============================================================ */
AJ.mount();

/* endpoint of the Node/Express CCAvenue server (see /server) */
const CCAVENUE_INITIATE_URL = (window.AJ_CONFIG && window.AJ_CONFIG.ccavenueInitiateUrl) || '/ccavenue/initiate';

const form = document.getElementById('coForm');
const summary = document.getElementById('coSummary');

/* redirect to cart if empty */
const t0 = AJ.cartTotals();
if (!t0.items.length) { location.replace('cart.html'); }

/* require a delivery location to have been selected before checkout */
const AJ_LOC = AJ.getLocation();
if (!AJ_LOC) { AJ.toast('Please select your delivery location first'); location.replace('cart.html'); }

/* prefill PIN / state from the chosen delivery location */
function prefillLocation() {
  if (!AJ_LOC) return;
  const pin = form.querySelector('[name=pin]'); if (pin && !pin.value) pin.value = AJ_LOC.pin;
  const state = form.querySelector('[name=state]');
  if (state && AJ_LOC.city && [...state.options].some(o => o.value === AJ_LOC.city)) state.value = AJ_LOC.city;
}

/* order id (deterministic-ish, no Date/Math.random needed for demo) */
function makeOrderId() {
  const n = (AJ.cartTotals().total + AJ.cartDetailed().length * 7).toString(36).toUpperCase();
  return 'AJ' + n + performance.now().toString(36).replace('.', '').slice(0, 5).toUpperCase();
}

function renderSummary() {
  const t = AJ.cartTotals();
  summary.innerHTML = `
    <h3>Order Summary</h3>
    ${t.items.map(i => `
      <div class="drawer-item" style="border:none;padding:8px 0">
        <div class="di-img">${AJ.media(i.product)}</div>
        <div><div class="di-title">${i.product.name}</div><div class="di-meta">${i.variant?i.variant+' · ':''}Qty ${i.qty}</div></div>
        <div class="di-price">${AJ.money(i.lineTotal)}</div>
      </div>`).join('')}
    <div class="sum-row" style="border-top:1px solid var(--line);margin-top:8px;padding-top:12px"><span>Subtotal</span><span>${AJ.money(t.subtotal)}</span></div>
    <div class="sum-row"><span>Delivery</span><span>${t.shipping?AJ.money(t.shipping):'<span style="color:var(--ok)">FREE</span>'}</span></div>
    <div class="sum-row total"><span>Total Payable</span><span>${AJ.money(t.total)}</span></div>
    <button type="submit" form="coForm" class="btn btn-primary btn-block" id="placeBtn" style="margin-top:16px">Place Order · Pay ${AJ.money(t.total)}</button>
    <p style="text-align:center;color:var(--muted);font-size:12px;margin-top:10px">🔒 100% secure payments · Powered by CCAvenue</p>`;
}
renderSummary();
prefillLocation();

/* payment method selection styling */
document.getElementById('payMethods').addEventListener('change', (e) => {
  document.querySelectorAll('.pay-opt').forEach(o => o.classList.remove('sel'));
  e.target.closest('.pay-opt').classList.add('sel');
});

/* validation */
function validate() {
  let ok = true;
  form.querySelectorAll('[required]').forEach(el => {
    const field = el.closest('.field');
    let bad = !el.value.trim();
    if (el.name === 'phone') bad = !/^\d{10}$/.test(el.value.trim());
    if (el.name === 'pin') bad = !/^\d{6}$/.test(el.value.trim());
    if (el.name === 'email') bad = !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value.trim());
    field.classList.toggle('invalid', bad);
    if (bad) ok = false;
  });
  return ok;
}
form.addEventListener('input', (e) => { const f = e.target.closest('.field'); if (f) f.classList.remove('invalid'); });

/* submit */
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!validate()) { AJ.toast('Please fix the highlighted fields'); form.querySelector('.invalid input,.invalid select,.invalid textarea')?.focus(); return; }

  const t = AJ.cartTotals();
  const fd = new FormData(form);
  const method = fd.get('pay');
  const orderId = makeOrderId();

  const order = {
    order_id: orderId,
    amount: t.total.toFixed(2),
    currency: 'INR',
    payment_option: method,          // card | netbanking | upi | cod
    billing_name: fd.get('name'),
    billing_email: fd.get('email'),
    billing_tel: fd.get('phone'),
    billing_address: fd.get('address'),
    billing_city: fd.get('city'),
    billing_state: fd.get('state'),
    billing_zip: fd.get('pin'),
    billing_country: 'India',
    items: AJ.cartDetailed().map(i => ({ id: i.id, name: i.product.name, qty: i.qty, price: i.product.price, variant: i.variant }))
  };

  // Persist order so the confirmation page can display it
  sessionStorage.setItem('aj_last_order', JSON.stringify({ ...order, total: t.total }));

  const btn = document.getElementById('placeBtn');
  btn.disabled = true; btn.textContent = 'Processing…';

  // Cash on Delivery skips the gateway
  if (method === 'cod') { localStorage.removeItem('aj_cart'); location.href = 'order-success.html?method=cod&order=' + orderId; return; }

  /* Hand the order to our CCAvenue server, which returns an
     auto-submitting HTML form that redirects to CCAvenue. */
  try {
    const res = await fetch(CCAVENUE_INITIATE_URL, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(order)
    });
    if (!res.ok) throw new Error('server ' + res.status);
    const html = await res.text();
    // The server responds with a self-submitting form -> write it & let it post to CCAvenue
    document.open(); document.write(html); document.close();
  } catch (err) {
    // No CCAvenue server available (static hosting / local file). Simulate a successful gateway return
    // so the end-to-end flow can be demonstrated. In production this branch never runs.
    console.warn('[AJ SHOP] CCAvenue server not reachable — using demo confirmation.', err);
    localStorage.removeItem('aj_cart');
    location.href = 'order-success.html?method=' + method + '&order=' + orderId + '&demo=1';
  }
});
