/* ============================================================
   BHARATH WEIGHING SYSTEM — Shared Components
   components.js  (with Admin icon + Service Available + Live Settings)
   ============================================================ */

/* ── LOAD LIVE SETTINGS (from admin localStorage or defaults) ── */
function getLiveSettings() {
  const stored = localStorage.getItem('bws_settings');
  if (stored) return JSON.parse(stored);
  return {
    gst: '33AVXPS3237R1ZI',
    phone: '917358863516',
    phone_display: '+91-73588-63516',
    email: 'bharathweightingsystem@gmail.com',
    address: '4, Thendral Nagar Main Rd, Ambedkar Nagar, Thirumullaivoyal, Chennai, Tamil Nadu 600062, India',
    whatsapp_available: true
  };
}

/* ── TOAST ── */
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

/* ── HEADER HTML ── */
function buildHeader(activePage) {
  const s = getLiveSettings();
  const waLink = `https://wa.me/${s.phone}?text=Hello%20Bharath%20Weighing%20System%2C%0A%0AI%20am%20interested%20in%20your%20weighing%20products.%20Please%20share%20the%20price%20list%2C%20product%20details%2C%20and%20availability.%0A%0AThank%20you.`;
  const waAvailBtn = s.whatsapp_available ? `
    <a class="wa-avail-btn" href="${waLink}" target="_blank">
      <span class="wa-avail-dot"></span>
      ${waIcon()} <span>Service Available</span>
    </a>` : '';
  return `
  <div class="topbar">
    <div class="inner">
      <span class="topbar-addr">📍 ${s.address}</span>
      <div class="right">
        <a href="mailto:${s.email}">✉ ${s.email}</a>
        <a href="tel:+${s.phone}">📞 ${s.phone_display}</a>
        <a href="admin.html" class="adm-icon-btn" title="Admin Panel">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
          </svg>
          <span>Admin</span>
        </a>
      </div>
    </div>
  </div>
  <header>
    <div class="header-inner">
      <a href="index.html" class="logo" style="text-decoration:none">
        <img src="logo.png" alt="Bharath Weighing System" style="height:56px;width:auto;object-fit:contain;display:block;">
      </a>
      <div class="header-right">
        ${waAvailBtn}
        <a class="call-btn" href="tel:+${s.phone}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.77 19.79 19.79 0 01.14 1.18 2 2 0 012.11.01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
          </svg>
          <span>Call Us</span>
        </a>
        <a class="wa-btn" href="${waLink}" target="_blank">
          ${waIcon()}
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  </header>
  <nav id="mainNav">
    <button class="menu-toggle" id="menuToggle" aria-label="Toggle menu" onclick="(function(){var n=document.getElementById('navInner');var t=document.getElementById('menuToggle');n.classList.toggle('open');t.classList.toggle('open')})()">
      <span></span><span></span><span></span>
    </button>
    <div class="nav-inner" id="navInner">
      <a href="index.html" ${activePage==='home'?'class="active"':''}>Home</a>
      <a href="products.html" ${activePage==='products'?'class="active"':''}>All Products</a>
      <a href="cat-weighing.html" ${activePage==='weighing'?'class="active"':''}>Table Top Weighing Scales</a>
      <a href="cat-platform.html" ${activePage==='crane'?'class="active"':''}>Platform Weighing Scales</a>
      <a href="cat-counting.html" ${activePage==='jewellery'?'class="active"':''}>Price counting Scales</a>
      <a href="cat-industrial.html" ${activePage==='industrial'?'class="active"':''}>Industrial Weighing Scale</a>
      <a href="cat-retail.html" ${activePage==='retail'?'class="active"':''}>Billing Scales</a>
      <a href="about.html" ${activePage==='about'?'class="active"':''}>About</a>
      <a href="service.html" ${activePage==='service'?'class="active"':''}>Service</a>
      <a href="contact.html" ${activePage==='contact'?'class="active"':''}>Contact</a>
    </div>
  </nav>`;
}

/* ── FOOTER HTML ── */
function buildFooter() {
  const s = getLiveSettings();
  const waLink = `https://wa.me/${s.phone}?text=Hello%20Bharath%20Weighing%20System%2C%0A%0AI%20am%20interested%20in%20your%20weighing%20products.%20Please%20share%20the%20price%20list%2C%20product%20details%2C%20and%20availability.%0A%0AThank%20you.`;
  return `
  <footer>
    <div class="footer-top">
      <div class="footer-brand">
        <img src="logo.png" alt="Bharath Weighing System" style="height:60px;width:auto;object-fit:contain;margin-bottom:10px;display:block;">
        <div class="name">Bharath Weighing System</div>
        <p>ISO certified manufacturer &amp; supplier of industrial weighing machines, scales and measuring instruments. 8+ Years of trusted service across South India.</p>
        <span class="iso-badge">ISO CERTIFIED | 8 YEARS EXPERIENCE | GST: ${s.gst}</span>
      </div>
      <div class="footer-col">
        <h5>Categories</h5>
        <ul>
          <li><a href="cat-weighing.html">Weighing Scales</a></li>
          <li><a href="cat-crane.html">Crane Scales</a></li>
          <li><a href="cat-jewellery.html">Jewellery Scales</a></li>
          <li><a href="cat-industrial.html">Industrial Weigh Scale</a></li>
          <li><a href="cat-retail.html">Printing Scales</a></li>
          <li><a href="cat-poultry.html">Poultry Scales</a></li>
          <li><a href="cat-platform.html">Platform Scales</a></li>
          <li><a href="cat-counting.html">Counting Scales</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Company</h5>
        <ul>
          <li><a href="about.html">About Us</a></li>
          <li><a href="service.html">Service & Repair</a></li>
          <li><a href="service.html">Calibration</a></li>
          <li><a href="service.html">AMC Service</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Contact</h5>
        <ul>
          <li><a href="tel:+${s.phone}">${s.phone_display}</a></li>
          <li><a href="${waLink}" target="_blank">WhatsApp Us</a></li>
          <li><a href="mailto:${s.email}">${s.email}</a></li>
          <li><a href="contact.html">Get a Quote</a></li>
        </ul>
        <div style="margin-top:10px;font-size:13px;opacity:0.8">
          📍 ${s.address}
        </div>
      </div>
    </div>
    <div class="footer-map">
      <h5 style="color:#f0b429;margin:0 0 12px;font-size:15px">📍 Find Us on Map</h5>
      <div style="border-radius:10px;overflow:hidden;border:2px solid rgba(240,180,41,0.3)">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.0!2d80.1390!3d13.1310!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526400000000%3A0x1!2sThendral+Nagar+Main+Rd%2C+Ambedkar+Nagar%2C+Thirumullaivoyal%2C+Chennai%2C+Tamil+Nadu+600062!5e0!3m2!1sen!2sin!4v1234567890"
          width="100%" height="220" style="border:0;display:block" allowfullscreen="" loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <a href="https://maps.google.com/?q=Thendral+Nagar+Main+Rd,Ambedkar+Nagar,Thirumullaivoyal,Chennai,Tamil+Nadu+600062" target="_blank"
        style="display:inline-block;margin-top:8px;font-size:12px;color:#f0b429;text-decoration:none">
        ↗ Open in Google Maps
      </a>
    </div>
    <div class="footer-bottom">
      <span>© 2025 Bharath Weighing System. All rights reserved.</span>
      <span>Chennai 🇮🇳 | 8 Years Experience | ISO Certified | GST: ${s.gst}</span>
    </div>
  </footer>
  <div class="float-btns">
    <a class="float-wa" href="${waLink}" target="_blank">
      ${waIcon()} <span>WhatsApp</span>
    </a>
    <a class="float-call" href="tel:+${s.phone}">
      ${callIcon()} <span>Call Now</span>
    </a>
  </div>
  <div id="toast"></div>`;
}

/* ── PRODUCT CARD ── */
function productCardHTML(p) {
  const s = getLiveSettings();
  const tag = p.tags && p.tags[0]
    ? `<div class="product-tag">${p.tags[0]}</div>` : '';
  const waMsg = encodeURIComponent(`Hello, I am interested in the ${p.name}. Please share price and details.`);
  return `
  <div class="product-card">
    <a href="product.html?id=${p.id}" style="text-decoration:none;display:block">
      <div class="product-img-wrap">
        <img src="${p.img}" alt="${p.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div class="emoji-fallback" style="display:none;align-items:center;justify-content:center;width:100%;height:100%">${p.emoji}</div>
        ${tag}
      </div>
      <div class="product-body">
        <h3>${p.name}</h3>
        <p>${(p.desc||'').substring(0, 85)}…</p>
        <div class="product-price">${p.price} <span class="original">${p.originalPrice||''}</span></div>
      </div>
    </a>
    <div class="product-body" style="padding-top:0">
      <div class="product-actions">
        <a href="product.html?id=${p.id}" class="btn-detail">View Details</a>
        <a class="btn-cart-add" href="https://wa.me/${s.phone}?text=${waMsg}" target="_blank" style="text-decoration:none;display:inline-flex;align-items:center;gap:5px">
          ${waIcon()} Enquire
        </a>
      </div>
      <a class="card-service-btn" href="https://wa.me/${s.phone}?text=${waMsg}" target="_blank">
        <span class="card-service-dot"></span>
        ${waIcon()} Service Available — Chat Now
      </a>
    </div>
  </div>`;
}

/* ── SVG ICONS ── */
function waIcon() {
  return `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;
}
function callIcon() {
  return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.77 19.79 19.79 0 01.14 1.18 2 2 0 012.11.01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>`;
}
