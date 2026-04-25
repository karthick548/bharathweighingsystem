/* ============================================================
   BHARATH WEIGHING SYSTEM — Supabase Integration
   supabase.js
   ============================================================
   SETUP INSTRUCTIONS:
   1. Go to https://supabase.com → Create a free project
   2. Copy your Project URL and anon/public API key below
   3. Run the SQL in SETUP_SUPABASE.sql in your Supabase SQL editor
   ============================================================ */

const SUPABASE_URL = 'https://srrwupivbifsbiudcwte.supabase.co';       // e.g. https://abcxyz.supabase.co
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNycnd1cGl2Ymlmc2JpdWRjd3RlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5MTYxNTAsImV4cCI6MjA5MjQ5MjE1MH0.Cz_kDAP18MZ6CBOrsAhJVhMf5jT4f5m_isWAW7TBwWw'; // starts with eyJ...

/* ── Lightweight Supabase REST client (no npm needed) ── */
const SB = {
  headers: {
    'apikey': SUPABASE_ANON_KEY,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  },

  authHeaders(token) {
    return { ...this.headers, 'Authorization': `Bearer ${token || SUPABASE_ANON_KEY}` };
  },

  /* AUTH */
  async signIn(email, password) {
    const r = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: { 'apikey': SUPABASE_ANON_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data.error_description || data.msg || 'Login failed');
    return data; // { access_token, user, ... }
  },

  async signOut(token) {
    await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
      method: 'POST',
      headers: this.authHeaders(token)
    });
  },

  async getUser(token) {
    const r = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: this.authHeaders(token)
    });
    if (!r.ok) return null;
    return await r.json();
  },

  /* DB HELPERS */
  async select(table, token, filters = '') {
    const headers = token
      ? this.authHeaders(token)
      : { 'apikey': SUPABASE_ANON_KEY, 'Content-Type': 'application/json', 'Authorization': Bearer ${SUPABASE_ANON_KEY} };
    const r = await fetch(${SUPABASE_URL}/rest/v1/${table}?${filters}&order=created_at.desc, {
      headers: headers
    });
    if (!r.ok) { const e = await r.json(); throw new Error(e.message || 'Select failed'); }
    return await r.json();
  },

  async insert(table, data, token) {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: 'POST',
      headers: this.authHeaders(token),
      body: JSON.stringify(data)
    });
    if (!r.ok) { const e = await r.json(); throw new Error(e.message || 'Insert failed'); }
    return await r.json();
  },

  async update(table, id, data, token) {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
      method: 'PATCH',
      headers: this.authHeaders(token),
      body: JSON.stringify(data)
    });
    if (!r.ok) { const e = await r.json(); throw new Error(e.message || 'Update failed'); }
    return await r.json();
  },

  async remove(table, id, token) {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
      method: 'DELETE',
      headers: this.authHeaders(token)
    });
    if (!r.ok) { const e = await r.json(); throw new Error(e.message || 'Delete failed'); }
    return true;
  },

  /* STORAGE — upload image, return public URL */
  async uploadImage(bucket, filePath, file, token) {
    const r = await fetch(`${SUPABASE_URL}/storage/v1/object/${bucket}/${filePath}`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${token || SUPABASE_ANON_KEY}`,
        'Content-Type': file.type,
        'x-upsert': 'true'
      },
      body: file
    });
    if (!r.ok) { const e = await r.json(); throw new Error(e.error || 'Upload failed'); }
    return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${filePath}`;
  }
};

/* ── SESSION MANAGEMENT ── */
const BWS_SESSION_KEY = 'bws_sb_session';

function getSession() {
  try {
    const s = sessionStorage.getItem(BWS_SESSION_KEY);
    return s ? JSON.parse(s) : null;
  } catch { return null; }
}

function setSession(data) {
  sessionStorage.setItem(BWS_SESSION_KEY, JSON.stringify(data));
}

function clearSession() {
  sessionStorage.removeItem(BWS_SESSION_KEY);
}

function getToken() {
  const s = getSession();
  return s ? s.access_token : null;
}

function isLoggedIn() {
  const s = getSession();
  if (!s || !s.access_token) return false;
  // check expiry (expires_at is unix timestamp)
  if (s.expires_at && Date.now() / 1000 > s.expires_at - 60) {
    clearSession();
    return false;
  }
  return true;
}

/* ── PRODUCTS ── */
async function dbGetProducts() {
  try {
    const rows = await SB.select('products', null, 'select=*');
    if (!rows || rows.length === 0) return getLocalProducts(); // fallback
    return rows.map(dbRowToProduct);
  } catch (e) {
    console.warn('Supabase products fetch failed, using local:', e.message);
    return getLocalProducts();
  }
}

async function dbSaveProduct(prod, token) {
  const row = productToDbRow(prod);
  if (prod._dbId) {
    return await SB.update('products', prod._dbId, row, token);
  } else {
    return await SB.insert('products', row, token);
  }
}

async function dbDeleteProduct(dbId, token) {
  return await SB.remove('products', dbId, token);
}

function dbRowToProduct(row) {
  return {
    _dbId: row.id,
    id: row.slug || ('p' + row.id),
    name: row.name,
    cat: row.category_id,
    catName: row.category_name || row.category_id,
    emoji: row.emoji || '⚖️',
    img: row.image_url || '',
    price: row.price || '',
    priceNum: row.price_num || 0,
    originalPrice: row.original_price || '',
    desc: row.description || '',
    specs: row.specs ? (typeof row.specs === 'string' ? JSON.parse(row.specs) : row.specs) : [],
    tags: row.tags ? (typeof row.tags === 'string' ? JSON.parse(row.tags) : row.tags) : [],
    is_new: row.is_new || false
  };
}

function productToDbRow(prod) {
  return {
    slug: prod.id,
    name: prod.name,
    category_id: prod.cat,
    category_name: prod.catName,
    emoji: prod.emoji || '⚖️',
    image_url: prod.img || '',
    price: prod.price || '',
    price_num: prod.priceNum || 0,
    original_price: prod.originalPrice || '',
    description: prod.desc || '',
    specs: JSON.stringify(prod.specs || []),
    tags: JSON.stringify(prod.tags || []),
    is_new: prod.is_new || false
  };
}

/* ── CATEGORIES ── */
async function dbGetCategories() {
  try {
    const rows = await SB.select('categories', null, 'select=*');
    if (!rows || rows.length === 0) return getLocalCategories();
    return rows.map(r => ({
      _dbId: r.id,
      id: r.slug,
      name: r.name,
      icon: r.icon || '',
      desc: r.description || '',
      page: r.page_url || ''
    }));
  } catch (e) {
    console.warn('Supabase categories fetch failed, using local:', e.message);
    return getLocalCategories();
  }
}

async function dbSaveCategory(cat, token) {
  const row = {
    slug: cat.id,
    name: cat.name,
    icon: cat.icon || '',
    description: cat.desc || '',
    page_url: cat.page || ''
  };
  if (cat._dbId) return await SB.update('categories', cat._dbId, row, token);
  return await SB.insert('categories', row, token);
}

async function dbDeleteCategory(dbId, token) {
  return await SB.remove('categories', dbId, token);
}

/* ── SETTINGS ── */
async function dbGetSettings() {
  try {
    const rows = await SB.select('settings', null, 'select=*&limit=1');
    if (rows && rows[0]) {
      const r = rows[0];
      return {
        _dbId: r.id,
        gst: r.gst || '',
        phone: r.phone || '',
        phone_display: r.phone_display || '',
        email: r.email || '',
        address: r.address || '',
        whatsapp_available: r.whatsapp_available !== false
      };
    }
  } catch (e) {
    console.warn('Settings fetch failed:', e.message);
  }
  return getLocalSettings();
}

async function dbSaveSettings(s, token) {
  const row = {
    gst: s.gst, phone: s.phone, phone_display: s.phone_display,
    email: s.email, address: s.address, whatsapp_available: s.whatsapp_available
  };
  if (s._dbId) return await SB.update('settings', s._dbId, row, token);
  return await SB.insert('settings', row, token);
}

/* ── ENQUIRIES ── */
async function dbSaveEnquiry(enquiry) {
  // Public insert — no auth token needed (row-level security allows anon insert)
  return await SB.insert('enquiries', {
    name: enquiry.name,
    phone: enquiry.phone,
    email: enquiry.email || '',
    product: enquiry.product || '',
    message: enquiry.message || '',
    source: enquiry.source || 'contact_form'
  }, null);
}

async function dbGetEnquiries(token) {
  return await SB.select('enquiries', token, 'select=*');
}

async function dbDeleteEnquiry(dbId, token) {
  return await SB.remove('enquiries', dbId, token);
}

/* ── IMAGE UPLOAD ── */
async function uploadProductImage(file, productName, token) {
  const ext = file.name.split('.').pop().toLowerCase() || 'jpg';
  const safeName = productName.toLowerCase().replace(/[^a-z0-9]/g, '-').substring(0, 40);
  const filePath = `products/${safeName}-${Date.now()}.${ext}`;
  return await SB.uploadImage('product-images', filePath, file, token);
}

/* ── LOCAL FALLBACKS (from products.js) ── */
function getLocalProducts() {
  try {
    const stored = localStorage.getItem('bws_products');
    if (stored) return JSON.parse(stored);
  } catch {}
  return typeof PRODUCTS !== 'undefined' ? JSON.parse(JSON.stringify(PRODUCTS)) : [];
}
function getLocalCategories() {
  try {
    const stored = localStorage.getItem('bws_categories');
    if (stored) return JSON.parse(stored);
  } catch {}
  if (typeof CAT_META !== 'undefined') {
    return Object.entries(CAT_META).map(([id, v]) => ({ id, name: v.name, icon: v.icon, desc: v.desc, page: `cat-${id}.html` }));
  }
  return [];
}
function getLocalSettings() {
  try {
    const stored = localStorage.getItem('bws_settings');
    if (stored) return JSON.parse(stored);
  } catch {}
  return {
    gst: '33AVXPS3237R1ZI', phone: '917358863516', phone_display: '+91-73588-63516',
    email: 'bharathweightingsystem@gmail.com',
    address: '4, Thendral Nagar Main Rd, Ambedkar Nagar, Thirumullaivoyal, Chennai, Tamil Nadu 600062, India',
    whatsapp_available: true
  };
}

/* ── SHOP PHOTOS ── */
async function dbGetShopPhotos() {
  try {
    const rows = await SB.select('shop_photos', null, 'select=*&order=created_at.asc');
    return rows || [];
  } catch(e) {
    console.warn('shop_photos fetch failed:', e.message);
    return [];
  }
}

async function dbSaveShopPhoto(file, caption, token) {
  // 1. Upload image to Supabase Storage bucket "shop-photos"
  const ext = file.name.split('.').pop().toLowerCase() || 'jpg';
  const filePath = `shop/${Date.now()}-${Math.random().toString(36).slice(2,7)}.${ext}`;
  const imageUrl = await SB.uploadImage('shop-photos', filePath, file, token);
  // 2. Insert record into shop_photos table
  const rows = await SB.insert('shop_photos', {
    image_url: imageUrl,
    file_path: filePath,
    caption: caption || ''
  }, token);
  return rows;
}

async function dbDeleteShopPhoto(dbId, filePath, token) {
  // Delete storage file
  try {
    await fetch(`${SUPABASE_URL}/storage/v1/object/shop-photos/${filePath}`, {
      method: 'DELETE',
      headers: SB.authHeaders(token)
    });
  } catch(e) { console.warn('Storage delete failed:', e.message); }
  // Delete DB row
  return await SB.remove('shop_photos', dbId, token);
}

async function dbUpdateShopPhotoCaption(dbId, caption, token) {
  return await SB.update('shop_photos', dbId, { caption }, token);
}
