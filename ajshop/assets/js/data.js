/* ============================================================
   AJ SHOP — catalog data
   Prices in INR (₹). Content is original marketing copy written
   for AJ SHOP; no third-party product descriptions are reproduced.
   ============================================================ */
window.AJ_CATEGORIES = [
  { id: 'kids-garments',    name: "Kids' Garments",        emoji: '🧒', tagline: 'Age 1–12', groups: ['Boys', 'Girls'] },
  { id: 'adult-garments',   name: 'Adult Garments',        emoji: '👗', tagline: 'Age 13+',  groups: ['Gents', 'Ladies'] },
  { id: 'electronics',      name: 'Electronics Accessories', emoji: '🎧', tagline: 'Audio & wearables' },
  { id: 'mobiles',          name: 'Mobiles',               emoji: '📱', tagline: 'Latest smartphones' },
  { id: 'beauty',           name: 'Beauty Products',       emoji: '💄', tagline: 'Skin & fragrance' },
  { id: 'stationery',       name: 'Stationery',            emoji: '📓', tagline: 'Work & study' },
  { id: 'computer',         name: 'Computer Accessories',  emoji: '⌨️', tagline: 'Desk essentials' },
  { id: 'handicraft',       name: 'Handicraft Items',      emoji: '🏺', tagline: 'Handmade in India' },
  { id: 'home-decor',       name: 'Home Decor',            emoji: '🪔', tagline: 'Style your space' },
  { id: 'footwear',         name: 'Footwear',              emoji: '👟', tagline: 'Walk in comfort' }
];

/* helper to build a product */
let _id = 0;
const P = (o) => ({ id: 'AJ' + String(++_id).padStart(4, '0'), rating: 4.3, reviews: 120, badge: '', ...o });

window.AJ_PRODUCTS = [
  /* ---------------- Kids' Garments ---------------- */
  P({ cat:'kids-garments', group:'Boys',  art:'kids-tshirt', color:'#3b82f6', name:'Boys Cotton Crew T-Shirt', mrp:699, price:449, rating:4.5, reviews:214, badge:'sale',
      desc:'Soft breathable cotton tee with a playful print — built for all-day play and easy machine wash.', sizes:['2-3Y','4-5Y','6-7Y','8-9Y','10-12Y'] }),
  P({ cat:'kids-garments', group:'Boys',  art:'kids-hoodie', color:'#0ea5e9', name:'Boys Fleece Zip Hoodie', mrp:1199, price:849, rating:4.6, reviews:98, badge:'new',
      desc:'Cosy brushed-fleece hoodie with a full zip and kangaroo pocket to keep little ones warm.', sizes:['2-3Y','4-5Y','6-7Y','8-9Y','10-12Y'] }),
  P({ cat:'kids-garments', group:'Girls', art:'kids-dress', color:'#ec4899', name:'Girls Floral Frock Dress', mrp:999, price:649, rating:4.7, reviews:301, badge:'sale',
      desc:'Twirl-worthy A-line frock in a soft floral weave with comfy elastic waist.', sizes:['2-3Y','4-5Y','6-7Y','8-9Y','10-12Y'] }),
  P({ cat:'kids-garments', group:'Girls', art:'kids-tshirt', color:'#f472b6', name:'Girls Printed Cotton Tee', mrp:599, price:399, rating:4.4, reviews:142,
      desc:'Everyday cotton tee with a cheerful print and tag-free neck for itch-free comfort.', sizes:['2-3Y','4-5Y','6-7Y','8-9Y','10-12Y'] }),
  P({ cat:'kids-garments', group:'Boys',  art:'shirt', color:'#22c55e', name:'Boys Checked Casual Shirt', mrp:1099, price:749, rating:4.3, reviews:76,
      desc:'Smart cotton check shirt for parties and outings — soft collar, wooden-tone buttons.', sizes:['2-3Y','4-5Y','6-7Y','8-9Y','10-12Y'] }),
  P({ cat:'kids-garments', group:'Girls', art:'kids-dress', color:'#a855f7', name:'Girls Party Layered Gown', mrp:1799, price:1249, rating:4.8, reviews:120, badge:'new',
      desc:'Festive layered gown with a satin bow — the showstopper for birthdays and functions.', sizes:['2-3Y','4-5Y','6-7Y','8-9Y','10-12Y'] }),

  /* ---------------- Adult Garments ---------------- */
  P({ cat:'adult-garments', group:'Gents', art:'shirt', color:'#1e3a8a', name:'Men Slim-Fit Formal Shirt', mrp:1499, price:999, rating:4.5, reviews:412, badge:'sale',
      desc:'Wrinkle-resistant cotton-blend formal shirt with a modern slim fit — office to evening.', sizes:['S','M','L','XL','XXL'] }),
  P({ cat:'adult-garments', group:'Gents', art:'kurta', color:'#f5deb3', name:'Men Cotton Ethnic Kurta', mrp:1699, price:1199, rating:4.6, reviews:188, badge:'new',
      desc:'Handloom-feel cotton kurta with subtle embroidery — festive comfort that breathes.', sizes:['S','M','L','XL','XXL'] }),
  P({ cat:'adult-garments', group:'Gents', art:'jacket', color:'#374151', name:'Men Bomber Jacket', mrp:2999, price:1999, rating:4.4, reviews:96,
      desc:'Water-repellent bomber with ribbed cuffs and a smooth zip — layer up in style.', sizes:['S','M','L','XL','XXL'] }),
  P({ cat:'adult-garments', group:'Ladies', art:'dress', color:'#be185d', name:'Women A-Line Midi Dress', mrp:2199, price:1499, rating:4.7, reviews:356, badge:'sale',
      desc:'Flattering A-line midi in a fluid crepe with hidden side zip — effortless elegance.', sizes:['XS','S','M','L','XL'] }),
  P({ cat:'adult-garments', group:'Ladies', art:'kurta', color:'#d97706', name:'Women Anarkali Kurta Set', mrp:2799, price:1899, rating:4.8, reviews:240, badge:'new',
      desc:'Flowy Anarkali with printed dupatta — a graceful pick for festive occasions.', sizes:['XS','S','M','L','XL'] }),
  P({ cat:'adult-garments', group:'Ladies', art:'shirt', color:'#0f766e', name:'Women Casual Linen Shirt', mrp:1399, price:949, rating:4.3, reviews:134,
      desc:'Breezy linen-blend shirt with a relaxed drape — perfect for warm-day comfort.', sizes:['XS','S','M','L','XL'] }),

  /* ---------------- Electronics Accessories ---------------- */
  P({ cat:'electronics', art:'headphones', color:'#7c3aed', name:'AJ Wireless Over-Ear Headphones', mrp:4999, price:2799, rating:4.6, reviews:820, badge:'sale',
      desc:'40mm drivers, active noise isolation and 40-hour battery — immersive sound, all day.' }),
  P({ cat:'electronics', art:'earbuds', color:'#0891b2', name:'AJ TWS Earbuds Pro', mrp:3499, price:1799, rating:4.5, reviews:1120, badge:'sale',
      desc:'True-wireless earbuds with ENC calls, low-latency game mode and a pocket charging case.' }),
  P({ cat:'electronics', art:'smartwatch', color:'#4f46e5', name:'AJ FitPulse Smartwatch', mrp:5999, price:2999, rating:4.4, reviews:640, badge:'new',
      desc:'1.8" AMOLED display, SpO2 & heart-rate tracking, 100+ sport modes and Bluetooth calling.' }),
  P({ cat:'electronics', art:'powerbank', color:'#334155', name:'AJ 20000mAh Fast Power Bank', mrp:2499, price:1499, rating:4.6, reviews:530,
      desc:'22.5W fast charging with dual USB-C — top up a phone up to four times on one charge.' }),

  /* ---------------- Mobiles ---------------- */
  P({ cat:'mobiles', art:'smartphone', color:'#111827', name:'AJ Nova 5G (8GB/128GB)', mrp:21999, price:17999, rating:4.5, reviews:980, badge:'sale',
      desc:'6.6" 120Hz AMOLED, 50MP triple camera, 5000mAh battery and 5G — flagship feel, mid-range price.', sizes:['128GB','256GB'] }),
  P({ cat:'mobiles', art:'smartphone', color:'#1d4ed8', name:'AJ Nova Pro 5G (12GB/256GB)', mrp:32999, price:27999, rating:4.7, reviews:412, badge:'new',
      desc:'Snapdragon-class performance, 108MP OIS camera and 67W fast charge in a slim glass build.', sizes:['256GB','512GB'] }),
  P({ cat:'mobiles', art:'smartphone', color:'#059669', name:'AJ Lite 4G (4GB/64GB)', mrp:9999, price:7499, rating:4.2, reviews:1340, badge:'sale',
      desc:'Big 6.5" display, 5000mAh battery and clean software — dependable everyday value.', sizes:['64GB','128GB'] }),
  P({ cat:'mobiles', art:'smartphone', color:'#b91c1c', name:'AJ Nova Max 5G (12GB/512GB)', mrp:44999, price:39999, rating:4.8, reviews:220,
      desc:'6.8" LTPO display, periscope zoom camera and titanium-tone frame — the top of the range.', sizes:['512GB','1TB'] }),

  /* ---------------- Beauty Products ---------------- */
  P({ cat:'beauty', art:'lipstick', color:'#dc2626', name:'AJ Velvet Matte Lipstick', mrp:599, price:399, rating:4.5, reviews:760, badge:'sale',
      desc:'Weightless matte colour with jojoba oil for an all-day, non-drying finish.' }),
  P({ cat:'beauty', art:'serum', color:'#84cc16', name:'AJ Vitamin-C Glow Serum', mrp:899, price:599, rating:4.6, reviews:920, badge:'new',
      desc:'10% Vitamin-C with hyaluronic acid to brighten dull skin and even out tone. 30ml.' }),
  P({ cat:'beauty', art:'perfume', color:'#9333ea', name:'AJ Amber Oud Eau de Parfum', mrp:1999, price:1299, rating:4.7, reviews:340,
      desc:'A warm amber-oud fragrance with long-lasting sillage. 100ml, alcohol-based.' }),
  P({ cat:'beauty', art:'serum', color:'#f59e0b', name:'AJ Hydra Day Cream SPF30', mrp:749, price:499, rating:4.4, reviews:410,
      desc:'Lightweight daily moisturiser with broad-spectrum SPF30 and niacinamide. 50g.' }),

  /* ---------------- Stationery ---------------- */
  P({ cat:'stationery', art:'notebook', color:'#0ea5e9', name:'AJ Premium A5 Hardbound Notebook', mrp:399, price:249, rating:4.6, reviews:530, badge:'sale',
      desc:'240 pages of 100gsm bleed-proof paper with a lay-flat binding and elastic band.' }),
  P({ cat:'stationery', art:'pen-set', color:'#16a34a', name:'AJ Gel Pen Set (Pack of 10)', mrp:299, price:179, rating:4.5, reviews:880,
      desc:'Quick-dry 0.5mm gel pens with a smooth, skip-free ink flow in ten vivid colours.' }),
  P({ cat:'stationery', art:'backpack', color:'#0d9488', name:'AJ Study Laptop Backpack 25L', mrp:1799, price:1099, rating:4.6, reviews:260, badge:'new',
      desc:'Water-resistant 25L backpack with a padded 15.6" laptop sleeve and USB charging port.' }),
  P({ cat:'stationery', art:'notebook', color:'#f59e0b', name:'AJ Undated Daily Planner', mrp:599, price:379, rating:4.5, reviews:190,
      desc:'Undated day-per-page planner with habit trackers and monthly goal spreads.' }),

  /* ---------------- Computer Accessories ---------------- */
  P({ cat:'computer', art:'keyboard', color:'#334155', name:'AJ Mechanical Keyboard (RGB)', mrp:3499, price:2199, rating:4.6, reviews:640, badge:'sale',
      desc:'Hot-swappable blue switches, per-key RGB and a detachable USB-C cable for crisp typing.' }),
  P({ cat:'computer', art:'mouse', color:'#4338ca', name:'AJ Silent Wireless Mouse', mrp:999, price:599, rating:4.5, reviews:1240,
      desc:'Silent-click 2.4GHz mouse with adjustable 1600 DPI and 18-month battery life.' }),
  P({ cat:'computer', art:'webcam', color:'#0891b2', name:'AJ 1080p HD Webcam', mrp:2299, price:1399, rating:4.4, reviews:310, badge:'new',
      desc:'Full-HD 1080p webcam with dual noise-cancelling mics and an auto low-light fix.' }),
  P({ cat:'computer', art:'ssd', color:'#7c3aed', name:'AJ Portable SSD 1TB', mrp:8999, price:6499, rating:4.7, reviews:280,
      desc:'USB 3.2 portable SSD with up to 1050MB/s reads in a shock-resistant metal shell.' }),

  /* ---------------- Handicraft Items ---------------- */
  P({ cat:'handicraft', art:'vase-clay', color:'#c2410c', name:'Hand-Painted Terracotta Vase', mrp:1299, price:899, rating:4.7, reviews:150, badge:'new',
      desc:'A hand-thrown terracotta vase, individually painted by artisans — each piece is unique.' }),
  P({ cat:'handicraft', art:'wooden-elephant', color:'#92400e', name:'Carved Wooden Elephant', mrp:1599, price:1099, rating:4.8, reviews:210,
      desc:'Sheesham-wood elephant carved and finished by hand — a warm, meaningful accent.' }),
  P({ cat:'handicraft', art:'wall-art', color:'#e11d48', name:'Madhubani Canvas Wall Art', mrp:2199, price:1499, rating:4.6, reviews:90, badge:'sale',
      desc:'Traditional Madhubani motifs hand-painted on canvas — folk art for a modern wall.' }),
  P({ cat:'handicraft', art:'vase-clay', color:'#0f766e', name:'Blue Pottery Decorative Bowl', mrp:1099, price:749, rating:4.5, reviews:70,
      desc:'Jaipur-style blue pottery bowl, glazed and kiln-fired by skilled craftspeople.' }),

  /* ---------------- Home Decor ---------------- */
  P({ cat:'home-decor', art:'table-lamp', color:'#f59e0b', name:'AJ Warm-Glow Table Lamp', mrp:1799, price:1149, rating:4.6, reviews:230, badge:'sale',
      desc:'Fabric-shade table lamp with a wooden base and warm dimmable LED — cosy ambient light.' }),
  P({ cat:'home-decor', art:'cushion', color:'#65a30d', name:'AJ Boho Cushion Cover (Set of 2)', mrp:899, price:549, rating:4.5, reviews:480,
      desc:'Textured cotton cushion covers with a hidden zip — refresh any sofa in seconds. 16x16".' }),
  P({ cat:'home-decor', art:'wall-clock', color:'#0d9488', name:'AJ Minimal Silent Wall Clock', mrp:1299, price:799, rating:4.6, reviews:390, badge:'new',
      desc:'12" silent sweep wall clock with a clean matte dial — keeps time without the tick.' }),
  P({ cat:'home-decor', art:'plant', color:'#16a34a', name:'AJ Faux Money Plant with Pot', mrp:999, price:649, rating:4.4, reviews:160,
      desc:'Lifelike low-maintenance faux money plant in a ceramic-look pot — evergreen, always.' }),

  /* ---------------- Footwear ---------------- */
  P({ cat:'footwear', art:'sneaker', color:'#2563eb', name:'AJ Everyday Running Sneakers', mrp:2999, price:1799, rating:4.6, reviews:1020, badge:'sale',
      desc:'Lightweight knit sneakers with a cushioned EVA sole and breathable mesh upper.', sizes:['6','7','8','9','10','11'] }),
  P({ cat:'footwear', art:'heel', color:'#be123c', name:'AJ Block-Heel Party Sandals', mrp:2499, price:1499, rating:4.5, reviews:340, badge:'new',
      desc:'Comfortable 2.5" block heels with a cushioned footbed — style that lasts the evening.', sizes:['4','5','6','7','8'] }),
  P({ cat:'footwear', art:'sandal', color:'#d97706', name:'AJ Everyday Comfort Sliders', mrp:1299, price:799, rating:4.4, reviews:610,
      desc:'Soft-strap contoured sliders with anti-slip grip — the go-anywhere daily pair.', sizes:['6','7','8','9','10'] }),
  P({ cat:'footwear', art:'sneaker', color:'#111827', name:'AJ Classic Canvas Shoes', mrp:1799, price:1099, rating:4.5, reviews:730,
      desc:'Timeless lace-up canvas shoes with a vulcanised rubber sole — pairs with everything.', sizes:['6','7','8','9','10','11'] })
];
