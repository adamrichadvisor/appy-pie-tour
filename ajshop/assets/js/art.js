/* ============================================================
   AJ SHOP — original SVG illustration library
   All product/category imagery is generated in-code (flat vector
   illustrations). No third-party or copyrighted images are used,
   keeping the storefront fully copyright-safe.
   ============================================================ */
(function (global) {
  const bg = (a, b) =>
    `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
       <stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/>
     </linearGradient></defs>
     <rect width="400" height="400" fill="url(#g)"/>`;

  // Each builder returns inner SVG for a 400x400 canvas.
  const ART = {
    /* ---------------- Apparel ---------------- */
    'kids-tshirt': (c) => bg('#fff3e0', '#ffe0b2') + `
      <path d="M140 150 L120 175 L145 200 L160 185 V275 H240 V185 L255 200 L280 175 L260 150 L215 132 Q200 150 185 132 Z"
        fill="${c}" stroke="#00000018" stroke-width="3"/>
      <circle cx="200" cy="230" r="26" fill="#ffffff88"/>
      <path d="M188 230 l8 8 16-18" stroke="${c}" stroke-width="5" fill="none" stroke-linecap="round"/>`,
    'kids-dress': (c) => bg('#fce4ec', '#f8bbd0') + `
      <path d="M170 140 q30 -20 60 0 l14 30 -20 12 v10 l40 130 h-128 l40 -130 v-10 l-20 -12 z"
        fill="${c}" stroke="#00000018" stroke-width="3"/>
      <circle cx="200" cy="185" r="6" fill="#ffffffaa"/><circle cx="200" cy="215" r="6" fill="#ffffffaa"/>`,
    'kids-hoodie': (c) => bg('#e3f2fd', '#bbdefb') + `
      <path d="M150 145 q50 -30 100 0 l30 25 -22 30 -18 -12 v110 h-80 v-110 l-18 12 -22 -30 z"
        fill="${c}" stroke="#00000018" stroke-width="3"/>
      <path d="M175 150 q25 28 50 0 v22 q-25 20 -50 0z" fill="#ffffff55"/>
      <line x1="190" y1="185" x2="190" y2="235" stroke="#ffffffaa" stroke-width="4"/>
      <line x1="210" y1="185" x2="210" y2="235" stroke="#ffffffaa" stroke-width="4"/>`,
    'shirt': (c) => bg('#eceff1', '#cfd8dc') + `
      <path d="M150 130 L125 160 L150 185 L165 172 V290 H235 V172 L250 185 L275 160 L250 130 L215 120 L200 140 L185 120 Z"
        fill="${c}" stroke="#00000018" stroke-width="3"/>
      <line x1="200" y1="140" x2="200" y2="288" stroke="#00000022" stroke-width="3"/>
      <circle cx="200" cy="175" r="3.5" fill="#00000033"/><circle cx="200" cy="205" r="3.5" fill="#00000033"/>
      <circle cx="200" cy="235" r="3.5" fill="#00000033"/>`,
    'dress': (c) => bg('#f3e5f5', '#e1bee7') + `
      <path d="M165 130 q35 -22 70 0 l16 34 -24 14 v8 l48 148 h-150 l48 -148 v-8 l-24 -14 z"
        fill="${c}" stroke="#00000018" stroke-width="3"/>
      <path d="M176 178 h48" stroke="#ffffff88" stroke-width="4"/>`,
    'jacket': (c) => bg('#eceff1', '#b0bec5') + `
      <path d="M150 130 L125 160 L150 190 L165 178 V290 H198 V150 L200 145 L202 150 V290 H235 V178 L250 190 L275 160 L250 130 L200 152 Z"
        fill="${c}" stroke="#00000018" stroke-width="3"/>
      <rect x="182" y="205" width="12" height="34" rx="2" fill="#00000022"/>`,
    'kurta': (c) => bg('#fff8e1', '#ffecb3') + `
      <path d="M155 132 L132 158 L152 182 L168 170 V296 H232 V170 L248 182 L268 158 L245 132 L215 122 Q200 138 185 122 Z"
        fill="${c}" stroke="#00000018" stroke-width="3"/>
      <path d="M200 138 v150" stroke="#c8922a55" stroke-width="3"/>
      <path d="M186 150 q14 10 28 0" stroke="#c8922a" stroke-width="3" fill="none"/>
      <circle cx="200" cy="168" r="3" fill="#c8922a"/><circle cx="200" cy="188" r="3" fill="#c8922a"/>`,

    /* ---------------- Electronics ---------------- */
    'headphones': (c) => bg('#ede7f6', '#d1c4e9') + `
      <path d="M130 210 a70 70 0 0 1 140 0" fill="none" stroke="${c}" stroke-width="16" stroke-linecap="round"/>
      <rect x="118" y="200" width="34" height="72" rx="14" fill="${c}"/>
      <rect x="248" y="200" width="34" height="72" rx="14" fill="${c}"/>
      <rect x="126" y="212" width="18" height="48" rx="9" fill="#ffffff55"/>`,
    'earbuds': (c) => bg('#e0f7fa', '#b2ebf2') + `
      <rect x="150" y="150" width="100" height="70" rx="16" fill="#ffffff" stroke="#00000015" stroke-width="3"/>
      <circle cx="180" cy="185" r="16" fill="${c}"/><circle cx="220" cy="185" r="16" fill="${c}"/>
      <rect x="176" y="200" width="8" height="46" rx="4" fill="${c}"/>
      <rect x="216" y="200" width="8" height="46" rx="4" fill="${c}"/>`,
    'smartwatch': (c) => bg('#e8eaf6', '#c5cae9') + `
      <rect x="168" y="150" width="64" height="100" rx="20" fill="${c}"/>
      <rect x="180" y="168" width="40" height="64" rx="10" fill="#0e1f2f"/>
      <text x="200" y="205" text-anchor="middle" fill="#4fd1c5" font-size="15" font-family="monospace">10:24</text>
      <rect x="182" y="120" width="36" height="34" rx="8" fill="${c}" opacity=".7"/>
      <rect x="182" y="246" width="36" height="34" rx="8" fill="${c}" opacity=".7"/>`,
    'powerbank': (c) => bg('#eceff1', '#cfd8dc') + `
      <rect x="160" y="140" width="80" height="130" rx="14" fill="${c}" stroke="#00000015" stroke-width="3"/>
      <rect x="176" y="160" width="48" height="10" rx="5" fill="#ffffff88"/>
      <circle cx="185" cy="235" r="5" fill="#7bed9f"/><circle cx="200" cy="235" r="5" fill="#7bed9f"/>
      <circle cx="215" cy="235" r="5" fill="#ffffff55"/><circle cx="230" cy="235" r="5" fill="#ffffff55"/>`,
    'smartphone': (c) => bg('#e3f2fd', '#90caf9') + `
      <rect x="150" y="110" width="100" height="180" rx="20" fill="#0e1f2f"/>
      <rect x="158" y="122" width="84" height="156" rx="12" fill="${c}"/>
      <rect x="184" y="116" width="32" height="6" rx="3" fill="#0e1f2f"/>
      <circle cx="212" cy="150" r="9" fill="#ffffff33"/><circle cx="230" cy="150" r="9" fill="#ffffff33"/>
      <rect x="170" y="190" width="60" height="8" rx="4" fill="#ffffff55"/>
      <rect x="170" y="208" width="44" height="8" rx="4" fill="#ffffff44"/>`,

    /* ---------------- Beauty ---------------- */
    'lipstick': (c) => bg('#fce4ec', '#f48fb1') + `
      <rect x="182" y="200" width="36" height="80" rx="6" fill="#3a3a3a"/>
      <rect x="186" y="176" width="28" height="30" rx="4" fill="#c9a227"/>
      <path d="M188 176 h24 v-20 q0 -14 -12 -22 q-12 8 -12 22 z" fill="${c}"/>`,
    'serum': (c) => bg('#f1f8e9', '#dcedc8') + `
      <rect x="176" y="160" width="48" height="110" rx="12" fill="${c}" opacity=".85"/>
      <rect x="184" y="130" width="32" height="34" rx="6" fill="#37474f"/>
      <rect x="182" y="120" width="36" height="14" rx="5" fill="#546e7a"/>
      <rect x="188" y="185" width="24" height="60" rx="6" fill="#ffffff44"/>`,
    'perfume': (c) => bg('#f3e5f5', '#ce93d8') + `
      <rect x="168" y="170" width="64" height="100" rx="12" fill="${c}" opacity=".85"/>
      <rect x="188" y="140" width="24" height="34" fill="#d4af37"/>
      <rect x="182" y="126" width="36" height="18" rx="4" fill="#b8860b"/>
      <rect x="180" y="195" width="40" height="55" rx="8" fill="#ffffff33"/>`,

    /* ---------------- Stationery ---------------- */
    'notebook': (c) => bg('#fff8e1', '#ffe082') + `
      <rect x="150" y="130" width="100" height="140" rx="8" fill="${c}" stroke="#00000015" stroke-width="3"/>
      <rect x="150" y="130" width="22" height="140" rx="6" fill="#00000022"/>
      <line x1="185" y1="160" x2="232" y2="160" stroke="#ffffff99" stroke-width="4"/>
      <line x1="185" y1="185" x2="232" y2="185" stroke="#ffffff99" stroke-width="4"/>
      <line x1="185" y1="210" x2="220" y2="210" stroke="#ffffff99" stroke-width="4"/>`,
    'pen-set': (c) => bg('#e8f5e9', '#c8e6c9') + `
      <rect x="176" y="130" width="18" height="140" rx="9" fill="${c}"/>
      <path d="M176 130 l9 -22 9 22z" fill="#37474f"/>
      <rect x="206" y="140" width="18" height="130" rx="9" fill="#37474f"/>
      <path d="M206 140 l9 -20 9 20z" fill="${c}"/>
      <rect x="180" y="200" width="10" height="20" rx="3" fill="#ffffff77"/>`,
    'backpack': (c) => bg('#e0f2f1', '#b2dfdb') + `
      <rect x="150" y="150" width="100" height="120" rx="24" fill="${c}" stroke="#00000015" stroke-width="3"/>
      <path d="M170 155 q30 -30 60 0" fill="none" stroke="#00000030" stroke-width="8"/>
      <rect x="172" y="200" width="56" height="46" rx="10" fill="#ffffff44"/>
      <rect x="192" y="185" width="16" height="20" rx="4" fill="#00000022"/>`,

    /* ---------------- Computer accessories ---------------- */
    'keyboard': (c) => bg('#eceff1', '#cfd8dc') + `
      <rect x="120" y="170" width="160" height="70" rx="12" fill="${c}" stroke="#00000015" stroke-width="3"/>
      ${Array.from({length:5},(_,r)=>Array.from({length:8},(_,i)=>
        `<rect x="${132+i*17}" y="${180+r*11}" width="12" height="8" rx="2" fill="#ffffff77"/>`).join('')).join('')}`,
    'mouse': (c) => bg('#e8eaf6', '#c5cae9') + `
      <path d="M200 140 q40 0 40 55 v20 q0 45 -40 45 q-40 0 -40 -45 v-20 q0 -55 40 -55z"
        fill="${c}" stroke="#00000015" stroke-width="3"/>
      <line x1="200" y1="142" x2="200" y2="185" stroke="#00000025" stroke-width="3"/>
      <rect x="195" y="155" width="10" height="16" rx="5" fill="#ffffff88"/>`,
    'webcam': (c) => bg('#e0f7fa', '#b2ebf2') + `
      <circle cx="200" cy="200" r="52" fill="${c}"/>
      <circle cx="200" cy="200" r="34" fill="#0e1f2f"/>
      <circle cx="200" cy="200" r="18" fill="#1e88e5"/>
      <circle cx="190" cy="190" r="6" fill="#ffffffaa"/>
      <rect x="185" y="150" width="30" height="10" rx="5" fill="#37474f"/>`,
    'ssd': (c) => bg('#ede7f6', '#d1c4e9') + `
      <rect x="150" y="165" width="100" height="70" rx="10" fill="${c}" stroke="#00000015" stroke-width="3"/>
      <rect x="164" y="180" width="46" height="14" rx="3" fill="#ffffff88"/>
      <circle cx="230" cy="222" r="5" fill="#7bed9f"/>
      <text x="187" y="222" text-anchor="middle" fill="#ffffffcc" font-size="12" font-family="monospace">SSD</text>`,

    /* ---------------- Handicraft ---------------- */
    'vase-clay': (c) => bg('#efebe9', '#d7ccc8') + `
      <path d="M175 140 h50 l-6 22 q26 20 26 58 q0 50 -45 50 q-45 0 -45 -50 q0 -38 26 -58 z"
        fill="${c}" stroke="#00000018" stroke-width="3"/>
      <path d="M172 205 q28 14 56 0" stroke="#ffffff66" stroke-width="4" fill="none"/>
      <path d="M178 235 q22 12 44 0" stroke="#00000022" stroke-width="4" fill="none"/>`,
    'wall-art': (c) => bg('#fbe9e7', '#ffccbc') + `
      <rect x="140" y="140" width="120" height="120" rx="6" fill="#fff" stroke="#8d6e63" stroke-width="8"/>
      <circle cx="180" cy="185" r="18" fill="#f5a524"/>
      <path d="M150 250 l35 -45 25 25 20 -28 20 48z" fill="${c}"/>`,
    'wooden-elephant': (c) => bg('#efebe9', '#bcaaa4') + `
      <ellipse cx="200" cy="210" rx="56" ry="40" fill="${c}"/>
      <path d="M160 220 q-24 6 -20 40 h16 q-2 -24 12 -30z" fill="${c}"/>
      <circle cx="245" cy="195" r="26" fill="${c}"/>
      <path d="M262 210 q22 6 14 40 h-14z" fill="${c}"/>
      <circle cx="250" cy="188" r="4" fill="#3e2723"/>
      <rect x="176" y="244" width="12" height="22" rx="4" fill="${c}"/>
      <rect x="212" y="244" width="12" height="22" rx="4" fill="${c}"/>`,

    /* ---------------- Home decor ---------------- */
    'table-lamp': (c) => bg('#fff8e1', '#ffe0b2') + `
      <path d="M170 175 h60 l16 40 h-92z" fill="${c}"/>
      <rect x="196" y="215" width="8" height="55" fill="#8d6e63"/>
      <ellipse cx="200" cy="272" rx="34" ry="10" fill="#8d6e63"/>
      <circle cx="200" cy="200" r="30" fill="#fff59d" opacity=".5"/>`,
    'cushion': (c) => bg('#f9fbe7', '#e6ee9c') + `
      <path d="M150 155 q50 -14 100 0 q14 50 0 100 q-50 14 -100 0 q-14 -50 0 -100z"
        fill="${c}" stroke="#00000015" stroke-width="3"/>
      <path d="M175 180 h50 M175 205 h50 M175 230 h30" stroke="#ffffff77" stroke-width="4"/>`,
    'wall-clock': (c) => bg('#e0f2f1', '#b2dfdb') + `
      <circle cx="200" cy="205" r="64" fill="#fff" stroke="${c}" stroke-width="8"/>
      <line x1="200" y1="205" x2="200" y2="165" stroke="#37474f" stroke-width="5" stroke-linecap="round"/>
      <line x1="200" y1="205" x2="232" y2="205" stroke="${c}" stroke-width="5" stroke-linecap="round"/>
      <circle cx="200" cy="205" r="6" fill="#37474f"/>`,
    'plant': (c) => bg('#e8f5e9', '#c8e6c9') + `
      <path d="M175 240 h50 l-8 40 h-34z" fill="#a1887f"/>
      <path d="M200 240 q-40 -20 -30 -70 q30 10 30 50z" fill="${c}"/>
      <path d="M200 240 q40 -20 30 -70 q-30 10 -30 50z" fill="${c}" opacity=".85"/>
      <path d="M200 240 q0 -50 0 -80 q14 30 0 80z" fill="${c}"/>`,

    /* ---------------- Footwear ---------------- */
    'sneaker': (c) => bg('#e3f2fd', '#bbdefb') + `
      <path d="M130 235 q10 -70 60 -70 q10 20 40 26 q30 4 40 24 v20 q0 12 -14 12 h-118 q-14 0 -8 -12z"
        fill="${c}" stroke="#00000015" stroke-width="3"/>
      <rect x="122" y="247" width="152" height="14" rx="7" fill="#ffffff"/>
      <path d="M170 175 l14 16 M186 168 l14 18" stroke="#ffffff99" stroke-width="4"/>`,
    'heel': (c) => bg('#fce4ec', '#f8bbd0') + `
      <path d="M140 210 q60 -20 120 -6 q10 2 6 14 l-10 8 h-96 q-30 0 -20 -16z" fill="${c}"/>
      <path d="M250 226 l6 44 h-14 l-6 -40z" fill="${c}"/>
      <path d="M140 210 q40 -30 80 -20" fill="none" stroke="#ffffff77" stroke-width="4"/>`,
    'sandal': (c) => bg('#fff3e0', '#ffe0b2') + `
      <path d="M150 240 q0 -14 14 -14 h72 q14 0 14 14 q0 14 -14 14 h-72 q-14 0 -14 -14z" fill="${c}"/>
      <path d="M164 226 q36 -40 72 0" fill="none" stroke="${c}" stroke-width="10" stroke-linecap="round"/>
      <path d="M200 232 v-24" stroke="${c}" stroke-width="8" stroke-linecap="round"/>`,

    /* ---------------- Generic fallback ---------------- */
    'box': (c) => bg('#eceff1', '#cfd8dc') + `
      <path d="M200 140 l60 34 v66 l-60 34 -60 -34 v-66z" fill="${c}" stroke="#00000015" stroke-width="3"/>
      <path d="M200 140 l60 34 -60 34 -60 -34z" fill="#ffffff44"/>
      <path d="M200 208 v66" stroke="#00000022" stroke-width="3"/>`
  };

  function productSVG(art, color) {
    const inner = (ART[art] || ART.box)(color || '#e6482e');
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400" role="img" aria-label="product illustration">${inner}</svg>`;
  }
  function dataURI(art, color) {
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(productSVG(art, color));
  }

  global.AJArt = { productSVG, dataURI, keys: Object.keys(ART) };
})(window);
