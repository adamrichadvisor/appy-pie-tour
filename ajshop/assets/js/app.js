/* ============================================================
   AJ SHOP — shared application logic
   Cart & wishlist persist in localStorage. No backend required
   for browsing; checkout hands off to CCAvenue (see server/).
   ============================================================ */
(function () {
  const LOGO = 'assets/img/logo.svg';
  const CART_KEY = 'aj_cart';
  const WISH_KEY = 'aj_wish';
  const LOC_KEY = 'aj_location';
  const money = (n) => '₹' + Number(n).toLocaleString('en-IN');

  /* ---------- product media (real photo + illustration fallback) ---------- */
  function productImgURL(p) {
    const kw = (window.AJ_IMG_KW && window.AJ_IMG_KW[p.art]) || 'product';
    const lock = parseInt(String(p.id).replace(/\D/g, ''), 10) || 1;
    return (window.AJ_IMG_BASE || 'https://loremflickr.com/600/600/') + encodeURIComponent(kw) + '?lock=' + lock;
  }
  // Renders a real <img>; if it fails to load it swaps to the built-in SVG illustration.
  function media(p) {
    return `<img class="pmedia" src="${productImgURL(p)}" alt="${p.name}" loading="lazy" data-fb="${AJArt.dataURI(p.art, p.color)}">`;
  }

  /* ---------- delivery location ---------- */
  const getLocation = () => readJSON(LOC_KEY, null);
  const setLocation = (loc) => { writeJSON(LOC_KEY, loc); syncLocation(); };
  // Simple, illustrative city lookup by PIN prefix (dummy serviceability data).
  function cityForPin(pin) {
    const map = { '11':'Delhi','12':'Haryana','14':'Punjab','30':'Rajasthan','36':'Gujarat','38':'Gujarat',
      '40':'Maharashtra','41':'Maharashtra','50':'Telangana','56':'Karnataka','60':'Tamil Nadu','68':'Kerala','70':'West Bengal' };
    return map[String(pin).slice(0, 2)] || 'India';
  }
  function syncLocation() {
    const loc = getLocation();
    document.querySelectorAll('#locText').forEach((el) => {
      el.innerHTML = loc
        ? `<small>Deliver to ${loc.city}</small><strong>${loc.pin} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></strong>`
        : `<small>Deliver to</small><strong>Select location <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></strong>`;
    });
  }

  /* ---------- storage ---------- */
  const readJSON = (k, def) => { try { return JSON.parse(localStorage.getItem(k)) || def; } catch { return def; } };
  const writeJSON = (k, v) => localStorage.setItem(k, JSON.stringify(v));
  const getCart = () => readJSON(CART_KEY, []);
  const setCart = (c) => { writeJSON(CART_KEY, c); syncCount(); };
  const getWish = () => readJSON(WISH_KEY, []);
  const setWish = (w) => { writeJSON(WISH_KEY, w); syncCount(); };

  const findProduct = (id) => (window.AJ_PRODUCTS || []).find((p) => p.id === id);
  const catName = (id) => (window.AJ_CATEGORIES.find((c) => c.id === id) || {}).name || id;

  /* ---------- cart ops ---------- */
  function addToCart(id, opts = {}) {
    const p = findProduct(id); if (!p) return;
    const qty = opts.qty || 1;
    const variant = opts.variant || (p.sizes ? p.sizes[0] : '');
    const cart = getCart();
    const key = id + '|' + variant;
    const line = cart.find((l) => l.key === key);
    if (line) line.qty += qty;
    else cart.push({ key, id, variant, qty });
    setCart(cart);
    toast(`Added to cart · ${p.name}`);
    renderDrawer();
  }
  function updateQty(key, delta) {
    const cart = getCart();
    const line = cart.find((l) => l.key === key); if (!line) return;
    line.qty += delta;
    const next = cart.filter((l) => l.qty > 0);
    setCart(next);
    renderDrawer();
    if (typeof window.renderCartPage === 'function') window.renderCartPage();
  }
  function removeLine(key) {
    setCart(getCart().filter((l) => l.key !== key));
    renderDrawer();
    if (typeof window.renderCartPage === 'function') window.renderCartPage();
  }
  function cartCount() { return getCart().reduce((s, l) => s + l.qty, 0); }
  function cartDetailed() {
    return getCart().map((l) => { const p = findProduct(l.id); return p ? { ...l, product: p, lineTotal: p.price * l.qty } : null; }).filter(Boolean);
  }
  function cartTotals(coupon) {
    const items = cartDetailed();
    const subtotal = items.reduce((s, i) => s + i.lineTotal, 0);
    const mrpTotal = items.reduce((s, i) => s + i.product.mrp * i.qty, 0);
    const shipping = subtotal === 0 || subtotal >= 999 ? 0 : 79;
    let discount = 0;
    if (coupon === 'AJ10') discount = Math.round(subtotal * 0.10);
    if (coupon === 'WELCOME200' && subtotal >= 999) discount = 200;
    const total = Math.max(0, subtotal + shipping - discount);
    return { items, subtotal, mrpTotal, saved: mrpTotal - subtotal, shipping, discount, total };
  }

  /* ---------- wishlist ---------- */
  function toggleWish(id) {
    const w = getWish();
    const i = w.indexOf(id);
    if (i >= 0) w.splice(i, 1); else { w.push(id); toast('Saved to wishlist ❤'); }
    setWish(w);
    document.querySelectorAll(`.wish[data-id="${id}"]`).forEach((el) => el.classList.toggle('on', w.includes(id)));
  }
  const isWished = (id) => getWish().includes(id);

  /* ---------- product card ---------- */
  function productCard(p) {
    const off = Math.round((1 - p.price / p.mrp) * 100);
    const stars = '★★★★★'.slice(0, Math.round(p.rating)) + '☆☆☆☆☆'.slice(0, 5 - Math.round(p.rating));
    const tag = p.badge === 'sale' ? `<span class="card-tag sale">${off}% OFF</span>`
      : p.badge === 'new' ? `<span class="card-tag new">NEW</span>` : '';
    return `<article class="card">
      <div class="card-img">
        <a href="product.html?id=${p.id}">${media(p)}</a>
        ${tag}
        <button class="wish ${isWished(p.id) ? 'on' : ''}" data-id="${p.id}" data-act="wish" aria-label="Save to wishlist">
          <svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
        </button>
      </div>
      <div class="card-body">
        <div class="card-cat">${catName(p.cat)}${p.group ? ' · ' + p.group : ''}</div>
        <a href="product.html?id=${p.id}"><h3 class="card-title">${p.name}</h3></a>
        <div class="rating"><span class="stars">${stars}</span> ${p.rating} · ${p.reviews}</div>
        <div class="price-row">
          <span class="price">${money(p.price)}</span>
          <span class="mrp">${money(p.mrp)}</span>
          <span class="off">${off}% off</span>
        </div>
        <button class="add-btn" data-id="${p.id}" data-act="add">
          <svg viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
          Add to Cart
        </button>
      </div>
    </article>`;
  }
  function renderGrid(el, list) {
    el.innerHTML = list.length ? list.map(productCard).join('')
      : `<div class="empty" style="grid-column:1/-1"><h3>No products found</h3><p>Try a different filter or search term.</p></div>`;
  }

  /* ---------- header / footer ---------- */
  function buildHeader(active) {
    const cats = window.AJ_CATEGORIES.map((c) =>
      `<a href="category.html?cat=${c.id}" class="${active === c.id ? 'active' : ''}"><span class="emo">${c.emoji}</span>${c.name}</a>`).join('');
    return `
    <div class="topbar"><div class="wrap">
      <span>🚚 Free shipping on orders over ₹999 · Pan-India delivery</span>
      <div class="tb-links"><a href="page.html?topic=track">Track Order</a><a href="page.html?topic=help">Help</a><a href="page.html?topic=sell">Sell on AJ</a></div>
    </div></div>
    <header class="site-header"><div class="wrap header-main">
      <a class="brand" href="index.html"><img src="${LOGO}" alt="AJ SHOP"></a>
      <button class="loc-btn" data-act="open-location" aria-label="Set delivery location">
        <svg viewBox="0 0 24 24"><path d="M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>
        <span class="loc-txt" id="locText"></span>
      </button>
      <label class="search">
        <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.7" y2="16.7"/></svg>
        <input type="search" id="globalSearch" placeholder="Search for products, brands and categories…" aria-label="Search">
      </label>
      <div class="header-actions">
        <a class="btn-signin" href="page.html?topic=account"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg><span>Sign in</span></a>
        <a class="icon-btn" href="wishlist.html" aria-label="Wishlist">
          <svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
          <span class="badge" id="wishBadge" hidden>0</span>
        </a>
        <button class="icon-btn" data-act="open-cart" aria-label="Cart">
          <svg viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
          <span class="badge" id="cartBadge" hidden>0</span>
        </button>
      </div>
    </div></header>
    <nav class="catnav"><div class="wrap">
      <a href="index.html" class="${active === 'home' ? 'active' : ''}">🏠 Home</a>${cats}
    </div></nav>`;
  }

  function buildFooter() {
    const y = 2026;
    return `<footer class="site-footer"><div class="wrap">
      <div class="footer-grid">
        <div class="footer-brand">
          <span class="footer-logo"><img src="${LOGO}" alt="AJ SHOP"></span>
          <p>AJ SHOP is your everyday online marketplace across fashion, electronics, home and more — quality picks at fair prices, delivered across India.</p>
          <div class="pay-badges"><span>Visa</span><span>Mastercard</span><span>RuPay</span><span>UPI</span><span>Net Banking</span><span>CCAvenue</span></div>
        </div>
        <div><h4>Shop</h4>
          <a href="category.html?cat=adult-garments">Fashion</a>
          <a href="category.html?cat=mobiles">Mobiles</a>
          <a href="category.html?cat=electronics">Electronics</a>
          <a href="category.html?cat=home-decor">Home Decor</a>
          <a href="category.html?cat=footwear">Footwear</a>
        </div>
        <div><h4>Company</h4>
          <a href="page.html?topic=about">About AJ SHOP</a><a href="page.html?topic=careers">Careers</a><a href="page.html?topic=sell">Sell with us</a><a href="page.html?topic=contact">Contact</a>
        </div>
        <div><h4>Help & Policies</h4>
          <a href="page.html?topic=shipping">Shipping &amp; Delivery</a><a href="page.html?topic=returns">Returns &amp; Refunds</a><a href="page.html?topic=privacy">Privacy Policy</a><a href="page.html?topic=terms">Terms of Use</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${y} AJ SHOP. All rights reserved. All product illustrations and copy are original works of AJ SHOP.</span>
        <span>Payments secured by CCAvenue · GST-compliant invoicing</span>
      </div>
    </div></footer>
    <!-- cart drawer -->
    <div class="drawer-overlay" data-act="close-cart"></div>
    <aside class="drawer" id="cartDrawer" aria-label="Shopping cart">
      <div class="drawer-head"><h3>Your Cart</h3><button class="icon-btn" data-act="close-cart" aria-label="Close">✕</button></div>
      <div class="drawer-body" id="drawerBody"></div>
      <div class="drawer-foot" id="drawerFoot"></div>
    </aside>
    <!-- location modal -->
    <div class="modal-overlay" id="locModal">
      <div class="modal" role="dialog" aria-label="Choose delivery location">
        <button class="close-x" data-act="close-location" aria-label="Close">✕</button>
        <h3>Choose your delivery location</h3>
        <p>Enter your PIN code so we can show delivery options and confirm we ship to you.</p>
        <div class="field"><input id="pinInput" inputmode="numeric" maxlength="6" placeholder="6-digit PIN code (e.g. 110001)"></div>
        <div class="loc-msg" id="locMsg"></div>
        <div class="modal-actions">
          <button class="btn btn-primary btn-block" data-act="save-location">Apply Location</button>
        </div>
      </div>
    </div>
    <div class="toast" id="toast"></div>`;
  }

  /* ---------- drawer ---------- */
  function renderDrawer() {
    const body = document.getElementById('drawerBody');
    const foot = document.getElementById('drawerFoot');
    if (!body) return;
    const t = cartTotals();
    if (!t.items.length) {
      body.innerHTML = `<div class="empty"><svg viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg><h3>Cart is empty</h3><p>Add products to get started.</p></div>`;
      foot.innerHTML = `<a class="btn btn-dark btn-block" href="index.html">Continue Shopping</a>`;
      return;
    }
    body.innerHTML = t.items.map((i) => `
      <div class="drawer-item">
        <div class="di-img">${media(i.product)}</div>
        <div>
          <div class="di-title">${i.product.name}</div>
          <div class="di-meta">${i.variant ? i.variant + ' · ' : ''}${money(i.product.price)}</div>
          <div class="qty" style="margin-top:6px;transform:scale(.82);transform-origin:left">
            <button data-act="dec" data-key="${i.key}">−</button><span>${i.qty}</span><button data-act="inc" data-key="${i.key}">+</button>
          </div>
        </div>
        <div style="text-align:right">
          <div class="di-price">${money(i.lineTotal)}</div>
          <button class="di-close" data-act="rm" data-key="${i.key}" aria-label="Remove">🗑</button>
        </div>
      </div>`).join('');
    foot.innerHTML = `
      <div class="sum-row total"><span>Subtotal</span><span>${money(t.subtotal)}</span></div>
      <a class="btn btn-primary btn-block" href="cart.html" style="margin-top:12px">View Cart &amp; Checkout</a>`;
  }
  const openCart = () => { document.querySelector('.drawer-overlay').classList.add('open'); document.getElementById('cartDrawer').classList.add('open'); renderDrawer(); };
  const closeCart = () => { document.querySelector('.drawer-overlay').classList.remove('open'); document.getElementById('cartDrawer').classList.remove('open'); };

  /* ---------- badges ---------- */
  function syncCount() {
    const cb = document.getElementById('cartBadge');
    const wb = document.getElementById('wishBadge');
    if (cb) { const n = cartCount(); cb.textContent = n; cb.hidden = n === 0; }
    if (wb) { const n = getWish().length; wb.textContent = n; wb.hidden = n === 0; }
  }

  /* ---------- toast ---------- */
  let toastTimer;
  function toast(msg) {
    const el = document.getElementById('toast'); if (!el) return;
    el.innerHTML = `<svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>${msg}`;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
  }

  /* ---------- location modal ---------- */
  let locAfterSave = null; // optional callback after a location is set (used to gate checkout)
  function openLocation(after) {
    locAfterSave = typeof after === 'function' ? after : null;
    const m = document.getElementById('locModal'); if (!m) return;
    const loc = getLocation();
    const input = document.getElementById('pinInput');
    input.value = loc ? loc.pin : '';
    document.getElementById('locMsg').textContent = '';
    m.classList.add('open');
    setTimeout(() => input.focus(), 50);
  }
  function closeLocation() { const m = document.getElementById('locModal'); if (m) m.classList.remove('open'); }
  function saveLocation() {
    const input = document.getElementById('pinInput');
    const msg = document.getElementById('locMsg');
    const pin = (input.value || '').trim();
    if (!/^\d{6}$/.test(pin)) { msg.className = 'loc-msg bad'; msg.textContent = 'Please enter a valid 6-digit PIN code.'; return; }
    const city = cityForPin(pin);
    setLocation({ pin, city });
    msg.className = 'loc-msg ok'; msg.textContent = `✓ Delivering to ${city} (${pin})`;
    toast(`📍 Delivery location set · ${city} ${pin}`);
    const cb = locAfterSave; locAfterSave = null;
    setTimeout(() => { closeLocation(); if (cb) cb(); }, 500);
  }
  // Gate an action behind having a delivery location set.
  function requireLocation(next) {
    if (getLocation()) { next(); return true; }
    toast('Please select your delivery location first');
    openLocation(next);
    return false;
  }

  /* ---------- global click handling ---------- */
  function wireEvents() {
    document.addEventListener('click', (e) => {
      const t = e.target.closest('[data-act]'); if (!t) return;
      const act = t.dataset.act;
      if (act === 'add') { addToCart(t.dataset.id); }
      else if (act === 'wish') { toggleWish(t.dataset.id); }
      else if (act === 'open-cart') { openCart(); }
      else if (act === 'close-cart') { closeCart(); }
      else if (act === 'inc') { updateQty(t.dataset.key, 1); }
      else if (act === 'dec') { updateQty(t.dataset.key, -1); }
      else if (act === 'rm') { removeLine(t.dataset.key); }
      else if (act === 'open-location') { openLocation(); }
      else if (act === 'close-location') { closeLocation(); }
      else if (act === 'save-location') { saveLocation(); }
    });
    // close location modal on overlay click
    const lm = document.getElementById('locModal');
    if (lm) lm.addEventListener('click', (e) => { if (e.target === lm) closeLocation(); });
    // Enter key inside PIN input
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.target && e.target.id === 'pinInput') { e.preventDefault(); saveLocation(); }
    });
    // Real-photo error → swap to built-in illustration (capture phase; error doesn't bubble)
    document.addEventListener('error', (e) => {
      const el = e.target;
      if (el && el.tagName === 'IMG' && el.dataset && el.dataset.fb) { el.src = el.dataset.fb; el.removeAttribute('data-fb'); }
    }, true);
    const s = document.getElementById('globalSearch');
    if (s) s.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && s.value.trim()) location.href = 'search.html?q=' + encodeURIComponent(s.value.trim());
    });
  }

  /* ---------- mount ---------- */
  function mount(active) {
    const h = document.getElementById('site-header');
    const f = document.getElementById('site-footer');
    if (h) h.innerHTML = buildHeader(active);
    if (f) f.innerHTML = buildFooter();
    wireEvents();
    syncCount();
    syncLocation();
  }

  window.AJ = {
    mount, money, productCard, renderGrid, addToCart, cartTotals, cartDetailed,
    updateQty, removeLine, toggleWish, isWished, findProduct, catName, toast, openCart,
    media, getLocation, openLocation, requireLocation
  };
})();
