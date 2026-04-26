/* ============================================================
   BHARATH WEIGHING SYSTEM — Admin Panel Logic (Supabase Edition)
   admin.js
   ============================================================ */

/* ── LEGACY KEYS (kept for fallback only) ── */
const STORAGE_KEY_PRODUCTS  = 'bws_products';
const STORAGE_KEY_CATS      = 'bws_categories';
const STORAGE_KEY_SETTINGS  = 'bws_settings';

/* ── COMPATIBILITY WRAPPERS (used by index.html, products.html etc.) ── */
async function getAdminProducts() {
  // Always show local products immediately as fallback
  const local = typeof PRODUCTS !== 'undefined' ? JSON.parse(JSON.stringify(PRODUCTS)) : [];
  try {
    const rows = await Promise.race([
      dbGetProducts(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 5000))
    ]);
    if (rows && rows.length > 0) return rows;
  } catch(e) { 
    console.warn('Supabase failed, using local products:', e.message); 
  }
  return local;
}
function saveAdminProducts(arr)   { localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(arr)); }
function getAdminCategories() {
  try { const s = localStorage.getItem(STORAGE_KEY_CATS); if (s) return JSON.parse(s); } catch {}
  if (typeof CAT_META !== 'undefined')
    return Object.entries(CAT_META).map(([id,v]) => ({id, name:v.name, icon:v.icon, desc:v.desc, page:'cat-'+id+'.html'}));
  return [];
}
function saveAdminCategories(arr) { localStorage.setItem(STORAGE_KEY_CATS, JSON.stringify(arr)); }
function getAdminSettings() {
  try { const s = localStorage.getItem(STORAGE_KEY_SETTINGS); if (s) return JSON.parse(s); } catch {}
  return { gst:'33AVXPS3237R1ZI', phone:'917358863516', phone_display:'+91-73588-63516',
    email:'bharathweightingsystem@gmail.com',
    address:'4, Thendral Nagar Main Rd, Ambedkar Nagar, Thirumullaivoyal, Chennai, Tamil Nadu 600062, India',
    whatsapp_available:true };
}
function saveAdminSettings(obj) { localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(obj)); }

/* ── AUTH (Supabase) ── */
function checkAdminAuth() { return isLoggedIn(); }

/* ── IMAGE HELPER ── */
function readFileAsDataURL(file) {
  return new Promise(function(resolve, reject) {
    if (!file) return resolve(null);
    var reader = new FileReader();
    reader.onload = function(e) { resolve(e.target.result); };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ── ADMIN PANEL BUILDER ── */
function buildAdminPanel() {
  if (!checkAdminAuth()) return buildAdminLogin();
  return buildAdminDashboard();
}

function buildAdminLogin() {
  return '<div class="adm-login-wrap"><div class="adm-login-card">' +
    '<div class="adm-login-logo">' +
    '<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48">' +
    '<rect x="4" y="26" width="28" height="4" rx="1" fill="#c8910a"/>' +
    '<rect x="16" y="10" width="4" height="16" fill="#c8910a"/>' +
    '<circle cx="18" cy="8" r="4" fill="#f0b429"/>' +
    '<line x1="8" y1="26" x2="18" y2="10" stroke="white" stroke-width="1.5"/>' +
    '<line x1="28" y1="26" x2="18" y2="10" stroke="white" stroke-width="1.5"/>' +
    '<circle cx="8" cy="26" r="3" fill="#f0b429"/>' +
    '<circle cx="28" cy="26" r="3" fill="#f0b429"/></svg></div>' +
    '<h2>Admin Login</h2>' +
    '<p>Bharath Weighing System — Admin Access Only</p>' +
    '<div class="adm-form-group"><label>Email Address</label>' +
    '<input type="email" id="adminEmailInput" placeholder="admin@example.com" onkeydown="if(event.key===\'Enter\')document.getElementById(\'adminPwInput\').focus()" /></div>' +
    '<div class="adm-form-group"><label>Password</label>' +
    '<input type="password" id="adminPwInput" placeholder="Enter admin password" onkeydown="if(event.key===\'Enter\')doAdminLogin()" /></div>' +
    '<div id="adm-login-err" class="adm-err" style="display:none">Incorrect email or password.</div>' +
    '<button class="adm-btn-primary" id="adm-login-btn" onclick="doAdminLogin()">🔐 Login</button>' +
    '<p style="font-size:12px;color:#888;margin-top:14px;text-align:center">🔒 Secured by Supabase Auth</p>' +
    '</div></div>';
}

function buildAdminDashboard() {
  var session = getSession();
  var userEmail = (session && session.user && session.user.email) ? session.user.email : 'Admin';
  return '<div class="adm-wrap">' +
    '<div class="adm-sidebar">' +
    '<div class="adm-brand">⚙️ Admin Panel</div>' +
    '<div style="font-size:11px;color:#a0a0b0;padding:0 20px 12px;word-break:break-all">' + userEmail + '</div>' +
    '<nav class="adm-nav">' +
    '<a class="adm-nav-item active" onclick="showTab(\'products\')" id="tab-products">📦 Products</a>' +
    '<a class="adm-nav-item" onclick="showTab(\'categories\')" id="tab-categories">📂 Categories</a>' +
    '<a class="adm-nav-item" onclick="showTab(\'enquiries\')" id="tab-enquiries">📩 Enquiries</a>' +
    '<a class="adm-nav-item" onclick="showTab(\'shopphotos\')" id="tab-shopphotos">🏪 Shop Photos</a>' +
    '<a class="adm-nav-item" onclick="showTab(\'settings\')" id="tab-settings">⚙️ Business Settings</a>' +
    '</nav>' +
    '<button class="adm-logout" onclick="doAdminLogout()">🚪 Logout</button>' +
    '</div>' +
    '<div class="adm-content">' +

    // PRODUCTS PANE
    '<div id="pane-products" class="adm-pane active">' +
    '<div class="adm-pane-header">' +
    '<h2>Products <span class="adm-badge" id="prod-count">…</span></h2>' +
    '<button class="adm-btn-primary" onclick="openAddProduct()">＋ Add New Product</button></div>' +
    '<div class="adm-search-row">' +
    '<input type="text" id="prodSearch" placeholder="🔍 Search products…" oninput="renderProductList()" />' +
    '<select id="prodCatFilter" onchange="renderProductList()"><option value="">All Categories</option></select></div>' +
    '<div id="adm-prod-list"><div class="adm-loading">⏳ Loading products…</div></div>' +
    '</div>' +

    // CATEGORIES PANE
    '<div id="pane-categories" class="adm-pane">' +
    '<div class="adm-pane-header">' +
    '<h2>Categories <span class="adm-badge" id="cat-count">…</span></h2>' +
    '<button class="adm-btn-primary" onclick="openAddCategory()">＋ Add Category</button></div>' +
    '<div id="adm-cat-list"><div class="adm-loading">⏳ Loading categories…</div></div>' +
    '</div>' +

    // ENQUIRIES PANE
    '<div id="pane-enquiries" class="adm-pane">' +
    '<div class="adm-pane-header">' +
    '<h2>Enquiries <span class="adm-badge" id="enq-count">…</span></h2>' +
    '<button class="adm-btn-outline" onclick="loadEnquiries()">🔄 Refresh</button></div>' +
    '<div id="adm-enq-list"><div class="adm-loading">⏳ Loading enquiries…</div></div>' +
    '</div>' +

    // SETTINGS PANE
    '<div id="pane-settings" class="adm-pane">' +
    '<div class="adm-pane-header"><h2>Business Settings</h2></div>' +
    '<div class="adm-settings-form" id="settings-form-wrap"><div class="adm-loading">⏳ Loading settings…</div></div>' +
    '</div>' +

    // SHOP PHOTOS PANE
    '<div id="pane-shopphotos" class="adm-pane">' +
    '<div class="adm-pane-header"><h2>🏪 Shop Photos <span class="adm-badge" id="photos-count">0</span></h2>' +
    '<label class="adm-btn-primary" style="cursor:pointer">＋ Upload Photos <input type="file" id="shop-photo-input" accept="image/*" multiple style="display:none" onchange="handleShopPhotoUpload(event)"></label></div>' +
    '<p style="color:#888;font-size:13px;margin-bottom:20px">These photos appear in the <strong>Shop &amp; Showroom</strong> gallery on the About page. Click any photo to delete it.</p>' +
    '<div id="shop-photos-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px"></div>' +
    '</div>' +
    '</div></div>' +

    // PRODUCT MODAL
    '<div id="adm-prod-modal" class="adm-modal" style="display:none">' +
    '<div class="adm-modal-box">' +
    '<div class="adm-modal-header"><h3 id="adm-modal-title">Add New Product</h3>' +
    '<button class="adm-modal-close" onclick="closeModal()">✕</button></div>' +
    '<div class="adm-modal-body">' +
    '<input type="hidden" id="edit-prod-id" /><input type="hidden" id="edit-prod-db-id" />' +
    '<div class="adm-form-row">' +
    '<div class="adm-form-group"><label>Product Name *</label><input type="text" id="edit-name" placeholder="e.g. Electronic Table Top Weighing Scale" /></div>' +
    '<div class="adm-form-group"><label>Category *</label><select id="edit-cat"></select></div></div>' +
    '<div class="adm-form-row">' +
    '<div class="adm-form-group"><label>Selling Price (e.g. ₹3,500)</label><input type="text" id="edit-price" placeholder="₹3,500" /></div>' +
    '<div class="adm-form-group"><label>Original / MRP Price</label><input type="text" id="edit-original-price" placeholder="₹4,200" /></div></div>' +
    '<div class="adm-form-group"><label>Description</label><textarea id="edit-desc" rows="3" placeholder="Short product description…"></textarea></div>' +
    '<div class="adm-form-group"><label>Product Image — Upload File (New or Old Photo)</label>' +
    '<input type="file" id="edit-img-file" accept="image/*" onchange="previewImgFile()" />' +
    '<small style="color:#888">Upload new or old product photo — saved to Supabase Storage</small></div>' +
    '<div class="adm-form-group"><label>OR — Image URL</label>' +
    '<input type="text" id="edit-img-url" placeholder="https://…" oninput="previewImgUrl()" /></div>' +
    '<div id="img-preview-wrap" style="display:none;margin-bottom:12px">' +
    '<img id="img-preview" src="" alt="Preview" style="max-width:180px;max-height:140px;border-radius:8px;border:1px solid #ddd" /></div>' +
    '<div class="adm-form-row">' +
    '<div class="adm-form-group"><label>Capacity</label><input type="text" id="spec-capacity" placeholder="e.g. 30 kg – 150 kg" /></div>' +
    '<div class="adm-form-group"><label>Accuracy</label><input type="text" id="spec-accuracy" placeholder="e.g. 5g / 10g" /></div></div>' +
    '<div class="adm-form-row">' +
    '<div class="adm-form-group"><label>Display</label><input type="text" id="spec-display" placeholder="e.g. Bright Red LED" /></div>' +
    '<div class="adm-form-group"><label>Battery</label><input type="text" id="spec-battery" placeholder="e.g. Inbuilt Rechargeable" /></div></div>' +
    '<div class="adm-form-row">' +
    '<div class="adm-form-group"><label>Warranty</label><input type="text" id="spec-warranty" placeholder="e.g. 1 Year" /></div>' +
    '<div class="adm-form-group"><label>Tag / Badge</label><select id="edit-tag">' +
    '<option value="">None</option><option value="Bestseller">Bestseller</option>' +
    '<option value="Popular">Popular</option><option value="New">New</option><option value="Sale">Sale</option></select></div></div>' +
    '<div id="adm-prod-save-status" style="display:none;color:#0f3460;font-size:13px;margin-top:8px"></div>' +
    '</div>' +
    '<div class="adm-modal-footer">' +
    '<button class="adm-btn-outline" onclick="closeModal()">Cancel</button>' +
    '<button class="adm-btn-primary" id="save-prod-btn" onclick="saveProduct()">💾 Save Product</button>' +
    '</div></div></div>' +

    // CATEGORY MODAL
    '<div id="adm-cat-modal" class="adm-modal" style="display:none">' +
    '<div class="adm-modal-box" style="max-width:480px">' +
    '<div class="adm-modal-header"><h3 id="adm-cat-modal-title">Add Category</h3>' +
    '<button class="adm-modal-close" onclick="closeCatModal()">✕</button></div>' +
    '<div class="adm-modal-body">' +
    '<input type="hidden" id="edit-cat-db-id" />' +
    '<div class="adm-form-group"><label>Category ID (no spaces, e.g. retail)</label><input type="text" id="edit-cat-id-input" placeholder="e.g. retail" /></div>' +
    '<div class="adm-form-group"><label>Category Name *</label><input type="text" id="edit-cat-name" placeholder="e.g. Printing Scales" /></div>' +
    '<div class="adm-form-group"><label>Emoji Icon</label><input type="text" id="edit-cat-icon" placeholder="e.g. 🖨️" /></div>' +
    '<div class="adm-form-group"><label>Description</label><textarea id="edit-cat-desc" rows="2" placeholder="Short description…"></textarea></div>' +
    '<div class="adm-form-group"><label>Page URL (e.g. cat-retail.html)</label><input type="text" id="edit-cat-page" placeholder="cat-retail.html" /></div>' +
    '</div><div class="adm-modal-footer">' +
    '<button class="adm-btn-outline" onclick="closeCatModal()">Cancel</button>' +
    '<button class="adm-btn-primary" onclick="saveCategory()">💾 Save Category</button>' +
    '</div></div></div>' +

    // CONFIRM MODAL
    '<div id="adm-confirm-modal" class="adm-modal" style="display:none">' +
    '<div class="adm-modal-box" style="max-width:400px">' +
    '<div class="adm-modal-header"><h3>Confirm Delete</h3>' +
    '<button class="adm-modal-close" onclick="closeConfirmModal()">✕</button></div>' +
    '<div class="adm-modal-body"><p id="confirm-msg">Are you sure?</p></div>' +
    '<div class="adm-modal-footer">' +
    '<button class="adm-btn-outline" onclick="closeConfirmModal()">Cancel</button>' +
    '<button class="adm-btn-danger" id="confirm-ok-btn">🗑️ Delete</button>' +
    '</div></div></div>' +

    '<div id="adm-toast" class="adm-toast"></div>';
}

/* ── TAB SWITCHING ── */
window.showTab = function(tab) {
  document.querySelectorAll('.adm-pane').forEach(function(p) { p.classList.remove('active'); });
  document.querySelectorAll('.adm-nav-item').forEach(function(n) { n.classList.remove('active'); });
  document.getElementById('pane-' + tab).classList.add('active');
  document.getElementById('tab-' + tab).classList.add('active');
  if (tab === 'products')   loadAndRenderProducts();
  if (tab === 'categories') loadAndRenderCategories();
  if (tab === 'enquiries')  loadEnquiries();
  if (tab === 'settings')   loadAndRenderSettings();
  if (tab === 'shopphotos') renderShopPhotos();
};

/* ── IN-MEMORY CACHE ── */
var _cachedProducts   = null;
var _cachedCategories = null;
var _cachedSettings   = null;

/* ── PRODUCTS ── */
window.loadAndRenderProducts = async function() {
  var el = document.getElementById('adm-prod-list');
  if (el) el.innerHTML = '<div class="adm-loading">⏳ Loading products…</div>';
  try {
    _cachedProducts = await dbGetProducts();
    saveAdminProducts(_cachedProducts);
    renderProductList();
    if (_cachedCategories) {
      var sel = document.getElementById('prodCatFilter');
      if (sel) {
        var cur = sel.value;
        sel.innerHTML = '<option value="">All Categories</option>' +
          _cachedCategories.map(function(c) { return '<option value="' + c.id + '">' + c.name + '</option>'; }).join('');
        sel.value = cur;
      }
    }
  } catch (e) {
    if (el) el.innerHTML = '<div class="adm-empty">⚠️ ' + e.message + '</div>';
  }
};

window.renderProductList = function() {
  var prods    = _cachedProducts || getAdminProducts();
  var search   = ((document.getElementById('prodSearch') || {}).value || '').toLowerCase();
  var catF     = (document.getElementById('prodCatFilter') || {}).value || '';
  var filtered = prods.filter(function(p) {
    var ms = !search || p.name.toLowerCase().includes(search) || (p.desc||'').toLowerCase().includes(search);
    var mc = !catF || p.cat === catF;
    return ms && mc;
  });
  var el = document.getElementById('adm-prod-list');
  var badge = document.getElementById('prod-count');
  if (badge) badge.textContent = prods.length;
  if (!el) return;
  if (filtered.length === 0) { el.innerHTML = '<div class="adm-empty">No products found.</div>'; return; }
  el.innerHTML = '<div class="adm-prod-table-wrap"><table class="adm-prod-table">' +
    '<thead><tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Actions</th></tr></thead><tbody>' +
    filtered.map(function(p) {
      return '<tr>' +
        '<td><img src="' + (p.img||'') + '" alt="' + p.name + '" class="adm-prod-thumb" onerror="this.style.opacity=\'0.15\'" /></td>' +
        '<td><strong>' + p.name + '</strong>' + (p.tags&&p.tags[0] ? '<span class="adm-tag">'+p.tags[0]+'</span>' : '') +
        '<br/><small style="color:#5a6a7e">' + p.id + '</small></td>' +
        '<td>' + (p.catName||p.cat) + '</td>' +
        '<td>' + (p.price||'—') + '</td>' +
        '<td class="adm-actions">' +
        '<button class="adm-btn-edit" onclick="openEditProduct(\'' + p.id + '\')">✏️ Edit</button>' +
        '<button class="adm-btn-del"  onclick="confirmDeleteProduct(\'' + p.id + '\',\'' + p.name.replace(/'/g, "\\'") + '\')">🗑️</button>' +
        '</td></tr>';
    }).join('') + '</tbody></table></div>';
};

/* ── PRODUCT MODAL ── */
var _editImgFile = null;

window.openAddProduct = async function() {
  _editImgFile = null;
  document.getElementById('adm-modal-title').textContent = 'Add New Product';
  document.getElementById('edit-prod-id').value    = '';
  document.getElementById('edit-prod-db-id').value = '';
  ['edit-name','edit-price','edit-original-price','edit-desc','edit-img-url',
   'spec-capacity','spec-accuracy','spec-display','spec-battery','spec-warranty'].forEach(function(id) {
    var el = document.getElementById(id); if (el) el.value = '';
  });
  document.getElementById('edit-tag').value = '';
  document.getElementById('edit-img-file').value = '';
  document.getElementById('img-preview-wrap').style.display = 'none';
  document.getElementById('adm-prod-save-status').style.display = 'none';
  await _populateCatSelect('');
  document.getElementById('adm-prod-modal').style.display = 'flex';
};

window.openEditProduct = async function(id) {
  _editImgFile = null;
  var prods = _cachedProducts || getAdminProducts();
  var p = prods.find(function(x) { return x.id === id; });
  if (!p) return;
  document.getElementById('adm-modal-title').textContent = 'Edit Product';
  document.getElementById('edit-prod-id').value    = p.id;
  document.getElementById('edit-prod-db-id').value = p._dbId || '';
  document.getElementById('edit-name').value           = p.name || '';
  document.getElementById('edit-price').value          = p.price || '';
  document.getElementById('edit-original-price').value = p.originalPrice || '';
  document.getElementById('edit-desc').value           = p.desc || '';
  document.getElementById('edit-img-url').value        = p.img || '';
  document.getElementById('edit-tag').value            = (p.tags && p.tags[0]) ? p.tags[0] : '';
  document.getElementById('edit-img-file').value = '';
  function getSpec(k) {
    if (!p.specs) return '';
    var f = p.specs.find(function(s) { return s[0].toLowerCase() === k.toLowerCase(); });
    return f ? f[1] : '';
  }
  document.getElementById('spec-capacity').value = getSpec('Capacity');
  document.getElementById('spec-accuracy').value  = getSpec('Accuracy');
  document.getElementById('spec-display').value   = getSpec('Display');
  document.getElementById('spec-battery').value   = getSpec('Battery');
  document.getElementById('spec-warranty').value  = getSpec('Warranty');
  if (p.img) { document.getElementById('img-preview').src = p.img; document.getElementById('img-preview-wrap').style.display = 'block'; }
  else { document.getElementById('img-preview-wrap').style.display = 'none'; }
  document.getElementById('adm-prod-save-status').style.display = 'none';
  await _populateCatSelect(p.cat);
  document.getElementById('adm-prod-modal').style.display = 'flex';
};

async function _populateCatSelect(selectedCat) {
  var cats = _cachedCategories || await dbGetCategories();
  var sel  = document.getElementById('edit-cat');
  sel.innerHTML = cats.map(function(c) { return '<option value="' + c.id + '">' + c.name + '</option>'; }).join('');
  if (selectedCat) sel.value = selectedCat;
}

window.closeModal = function() { document.getElementById('adm-prod-modal').style.display = 'none'; };

window.previewImgUrl = function() {
  var url = document.getElementById('edit-img-url').value.trim();
  if (url) { document.getElementById('img-preview').src = url; document.getElementById('img-preview-wrap').style.display = 'block'; _editImgFile = null; }
};

window.previewImgFile = async function() {
  var file = document.getElementById('edit-img-file').files[0];
  if (!file) return;
  _editImgFile = file;
  var dataURL = await readFileAsDataURL(file);
  document.getElementById('img-preview').src = dataURL;
  document.getElementById('img-preview-wrap').style.display = 'block';
  document.getElementById('edit-img-url').value = '';
};

window.saveProduct = async function() {
  var name = document.getElementById('edit-name').value.trim();
  if (!name) { showAdmToast('❌ Product name is required'); return; }
  var btn    = document.getElementById('save-prod-btn');
  var status = document.getElementById('adm-prod-save-status');
  btn.disabled = true; btn.textContent = '⏳ Saving…';
  status.style.display = 'block'; status.textContent = 'Saving to Supabase database…';
  try {
    var token  = getToken();
    var cats   = _cachedCategories || await dbGetCategories();
    var catId  = document.getElementById('edit-cat').value;
    var catObj = cats.find(function(c) { return c.id === catId; }) || {};
    var imgSrc = document.getElementById('edit-img-url').value.trim();
    if (_editImgFile) {
      status.textContent = '📤 Uploading image to Supabase Storage…';
      imgSrc = await uploadProductImage(_editImgFile, name, token);
    }
    var specs = [];
    function addSpec(key, elId) { var v = document.getElementById(elId).value.trim(); if (v) specs.push([key, v]); }
    addSpec('Capacity','spec-capacity'); addSpec('Accuracy','spec-accuracy');
    addSpec('Display','spec-display');   addSpec('Battery','spec-battery');
    addSpec('Warranty','spec-warranty');
    var tag    = document.getElementById('edit-tag').value;
    var editId = document.getElementById('edit-prod-id').value;
    var dbId   = document.getElementById('edit-prod-db-id').value;
    var prod   = {
      id: editId || ('p' + Date.now()), _dbId: dbId || null,
      name: name, cat: catId, catName: catObj.name || catId,
      emoji: catObj.icon || '⚖️', img: imgSrc,
      price: document.getElementById('edit-price').value.trim(), priceNum: 0,
      originalPrice: document.getElementById('edit-original-price').value.trim(),
      desc: document.getElementById('edit-desc').value.trim(),
      specs: specs, tags: tag ? [tag] : []
    };
    status.textContent = '💾 Writing to database…';
    var saved = await dbSaveProduct(prod, token);
    if (!_cachedProducts) _cachedProducts = [];
    if (editId) {
      var idx = _cachedProducts.findIndex(function(p) { return p.id === editId; });
      if (idx > -1) _cachedProducts[idx] = Object.assign({}, prod, { _dbId: (saved[0] && saved[0].id) || dbId });
    } else {
      _cachedProducts.unshift(Object.assign({}, prod, { _dbId: saved[0] && saved[0].id }));
    }
    saveAdminProducts(_cachedProducts);
    showAdmToast(editId ? '✅ Product updated! Live now.' : '✅ Product added! Live now.');
    closeModal();
    renderProductList();
  } catch (e) {
    status.textContent = '❌ Error: ' + e.message;
    showAdmToast('❌ Save failed: ' + e.message);
  } finally {
    btn.disabled = false; btn.textContent = '💾 Save Product';
  }
};

window.confirmDeleteProduct = function(id, name) {
  document.getElementById('confirm-msg').textContent = 'Delete "' + name + '"? This cannot be undone.';
  document.getElementById('confirm-ok-btn').onclick = function() { deleteProduct(id); closeConfirmModal(); };
  document.getElementById('adm-confirm-modal').style.display = 'flex';
};
window.deleteProduct = async function(id) {
  var token = getToken();
  var prods = _cachedProducts || getAdminProducts();
  var p = prods.find(function(x) { return x.id === id; });
  try {
    if (p && p._dbId) await dbDeleteProduct(p._dbId, token);
    _cachedProducts = prods.filter(function(x) { return x.id !== id; });
    saveAdminProducts(_cachedProducts);
    renderProductList();
    showAdmToast('🗑️ Product deleted');
  } catch (e) { showAdmToast('❌ Delete failed: ' + e.message); }
};
window.closeConfirmModal = function() { document.getElementById('adm-confirm-modal').style.display = 'none'; };

/* ── CATEGORIES ── */
window.loadAndRenderCategories = async function() {
  var el = document.getElementById('adm-cat-list');
  if (el) el.innerHTML = '<div class="adm-loading">⏳ Loading…</div>';
  try {
    _cachedCategories = await dbGetCategories();
    saveAdminCategories(_cachedCategories);
    renderCategoryList();
  } catch (e) {
    if (el) el.innerHTML = '<div class="adm-empty">⚠️ ' + e.message + '</div>';
  }
};

window.renderCategoryList = function() {
  var cats  = _cachedCategories || getAdminCategories();
  var el    = document.getElementById('adm-cat-list');
  var badge = document.getElementById('cat-count');
  if (badge) badge.textContent = cats.length;
  if (!el) return;
  el.innerHTML = '<div class="adm-cat-grid">' + cats.map(function(c) {
    return '<div class="adm-cat-card">' +
      '<div class="adm-cat-icon">' + c.icon + '</div>' +
      '<div class="adm-cat-info"><strong>' + c.name + '</strong>' +
      '<small>' + c.id + ' | ' + (c.page||'') + '</small>' +
      '<p>' + (c.desc||'') + '</p></div>' +
      '<div class="adm-actions" style="flex-direction:column">' +
      '<button class="adm-btn-edit" onclick="openEditCategory(\'' + c.id + '\')">✏️ Edit</button>' +
      '<button class="adm-btn-del"  onclick="confirmDeleteCategory(\'' + c.id + '\',\'' + c.name.replace(/'/g,"\\'") + '\')">🗑️ Delete</button>' +
      '</div></div>';
  }).join('') + '</div>';
};

window.openAddCategory = function() {
  document.getElementById('adm-cat-modal-title').textContent = 'Add Category';
  ['edit-cat-db-id','edit-cat-id-input','edit-cat-name','edit-cat-icon','edit-cat-desc','edit-cat-page'].forEach(function(id) {
    var el = document.getElementById(id); if (el) el.value = '';
  });
  document.getElementById('edit-cat-id-input').disabled = false;
  document.getElementById('adm-cat-modal').style.display = 'flex';
};
window.openEditCategory = function(id) {
  var cats = _cachedCategories || getAdminCategories();
  var c = cats.find(function(x) { return x.id === id; });
  if (!c) return;
  document.getElementById('adm-cat-modal-title').textContent = 'Edit Category';
  document.getElementById('edit-cat-db-id').value    = c._dbId || '';
  document.getElementById('edit-cat-id-input').value = c.id;
  document.getElementById('edit-cat-name').value     = c.name;
  document.getElementById('edit-cat-icon').value     = c.icon || '';
  document.getElementById('edit-cat-desc').value     = c.desc || '';
  document.getElementById('edit-cat-page').value     = c.page || '';
  document.getElementById('edit-cat-id-input').disabled = true;
  document.getElementById('adm-cat-modal').style.display = 'flex';
};
window.closeCatModal = function() { document.getElementById('adm-cat-modal').style.display = 'none'; };
window.saveCategory = async function() {
  var name  = document.getElementById('edit-cat-name').value.trim();
  if (!name) { showAdmToast('❌ Category name required'); return; }
  var token = getToken();
  var newId = document.getElementById('edit-cat-id-input').value.trim().toLowerCase().replace(/\s+/g,'-');
  var dbId  = document.getElementById('edit-cat-db-id').value;
  var cat   = {
    _dbId: dbId || null, id: newId, name: name,
    icon: document.getElementById('edit-cat-icon').value.trim(),
    desc: document.getElementById('edit-cat-desc').value.trim(),
    page: document.getElementById('edit-cat-page').value.trim()
  };
  try {
    await dbSaveCategory(cat, token);
    if (!_cachedCategories) _cachedCategories = [];
    if (dbId) {
      var idx = _cachedCategories.findIndex(function(c) { return c._dbId == dbId; });
      if (idx > -1) _cachedCategories[idx] = cat;
    } else { _cachedCategories.push(cat); }
    saveAdminCategories(_cachedCategories);
    closeCatModal(); renderCategoryList();
    showAdmToast('✅ Category saved!');
  } catch (e) { showAdmToast('❌ ' + e.message); }
};
window.confirmDeleteCategory = function(id, name) {
  document.getElementById('confirm-msg').textContent = 'Delete category "' + name + '"?';
  document.getElementById('confirm-ok-btn').onclick = function() { deleteCategory(id); closeConfirmModal(); };
  document.getElementById('adm-confirm-modal').style.display = 'flex';
};
window.deleteCategory = async function(id) {
  var token = getToken();
  var cats  = _cachedCategories || getAdminCategories();
  var c     = cats.find(function(x) { return x.id === id; });
  try {
    if (c && c._dbId) await dbDeleteCategory(c._dbId, token);
    _cachedCategories = cats.filter(function(x) { return x.id !== id; });
    saveAdminCategories(_cachedCategories);
    renderCategoryList();
    showAdmToast('🗑️ Category deleted');
  } catch (e) { showAdmToast('❌ ' + e.message); }
};

/* ── ENQUIRIES ── */
window.loadEnquiries = async function() {
  var el = document.getElementById('adm-enq-list');
  if (el) el.innerHTML = '<div class="adm-loading">⏳ Loading enquiries…</div>';
  try {
    var token = getToken();
    var enqs  = await dbGetEnquiries(token);
    var badge = document.getElementById('enq-count');
    if (badge) badge.textContent = enqs.length;
    if (!el) return;
    if (enqs.length === 0) { el.innerHTML = '<div class="adm-empty">No enquiries yet.</div>'; return; }
    el.innerHTML = '<div class="adm-prod-table-wrap"><table class="adm-prod-table">' +
      '<thead><tr><th>Date</th><th>Name</th><th>Phone</th><th>Email</th><th>Product</th><th>Message</th><th>Action</th></tr></thead><tbody>' +
      enqs.map(function(e) {
        var d = new Date(e.created_at).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'});
        return '<tr style="' + (e.is_read ? '' : 'background:#fffbf0;font-weight:600') + '">' +
          '<td style="white-space:nowrap;font-size:12px">' + d + '</td>' +
          '<td>' + (e.name||'—') + '</td>' +
          '<td><a href="tel:' + e.phone + '" style="color:#0f3460">' + (e.phone||'—') + '</a></td>' +
          '<td>' + (e.email ? '<a href="mailto:'+e.email+'" style="color:#0f3460">'+e.email+'</a>' : '—') + '</td>' +
          '<td>' + (e.product||'—') + '</td>' +
          '<td style="max-width:200px;font-size:13px">' + (e.message||'—') + '</td>' +
          '<td><button class="adm-btn-del" onclick="deleteEnquiry(' + e.id + ')">🗑️</button>' +
          (!e.is_read ? '<button class="adm-btn-edit" onclick="markEnquiryRead(' + e.id + ')">✓ Read</button>' : '') +
          '</td></tr>';
      }).join('') + '</tbody></table></div>';
  } catch (e) {
    if (el) el.innerHTML = '<div class="adm-empty">⚠️ ' + e.message + '</div>';
  }
};
window.deleteEnquiry = async function(id) {
  if (!confirm('Delete this enquiry?')) return;
  try { await dbDeleteEnquiry(id, getToken()); showAdmToast('🗑️ Enquiry deleted'); loadEnquiries(); }
  catch (e) { showAdmToast('❌ ' + e.message); }
};
window.markEnquiryRead = async function(id) {
  try { await SB.update('enquiries', id, { is_read: true }, getToken()); loadEnquiries(); }
  catch (e) { showAdmToast('❌ ' + e.message); }
};

/* ── SETTINGS ── */
window.loadAndRenderSettings = async function() {
  var wrap = document.getElementById('settings-form-wrap');
  if (!wrap) return;
  try {
    _cachedSettings = await dbGetSettings();
    var s = _cachedSettings;
    wrap.innerHTML =
      '<input type="hidden" id="set-db-id" value="' + (s._dbId||'') + '" />' +
      '<div class="adm-form-group"><label>GST Number</label><input type="text" id="set-gst" value="' + (s.gst||'') + '" /></div>' +
      '<div class="adm-form-row">' +
      '<div class="adm-form-group"><label>Phone (with country code, e.g. 917358863516)</label><input type="text" id="set-phone" value="' + (s.phone||'') + '" /></div>' +
      '<div class="adm-form-group"><label>Phone Display (e.g. +91-73588-63516)</label><input type="text" id="set-phone-display" value="' + (s.phone_display||'') + '" /></div>' +
      '</div>' +
      '<div class="adm-form-group"><label>Email Address</label><input type="email" id="set-email" value="' + (s.email||'') + '" /></div>' +
      '<div class="adm-form-group"><label>Business Address</label><textarea id="set-address" rows="2">' + (s.address||'') + '</textarea></div>' +
      '<div class="adm-form-group" style="display:flex;align-items:center;gap:10px">' +
      '<input type="checkbox" id="set-wa-avail" ' + (s.whatsapp_available ? 'checked' : '') + ' style="width:auto" />' +
      '<label for="set-wa-avail" style="margin:0">WhatsApp Available (show green "Service Available" badge)</label></div>' +
      '<p id="set-preview-text" style="font-size:12px;color:#888">WhatsApp: wa.me/' + s.phone + ' | Call: ' + s.phone_display + '</p>' +
      '<button class="adm-btn-primary" style="margin-top:12px" onclick="saveSettings()">💾 Save Settings — Goes Live Instantly</button>';
  } catch (e) {
    wrap.innerHTML = '<div class="adm-empty">⚠️ ' + e.message + '</div>';
  }
};

window.saveSettings = async function() {
  var token = getToken();
  var s = {
    _dbId: document.getElementById('set-db-id').value || null,
    gst:             document.getElementById('set-gst').value.trim(),
    phone:           document.getElementById('set-phone').value.trim(),
    phone_display:   document.getElementById('set-phone-display').value.trim(),
    email:           document.getElementById('set-email').value.trim(),
    address:         document.getElementById('set-address').value.trim(),
    whatsapp_available: document.getElementById('set-wa-avail').checked
  };
  try {
    await dbSaveSettings(s, token);
    saveAdminSettings(s);
    _cachedSettings = s;
    document.getElementById('set-preview-text').textContent = 'WhatsApp: wa.me/' + s.phone + ' | Call: ' + s.phone_display;
    showAdmToast('✅ Settings saved! Changes are live on website.');
  } catch (e) { showAdmToast('❌ Save failed: ' + e.message); }
};

/* ── AUTH ── */
window.doAdminLogin = async function() {
  var email = document.getElementById('adminEmailInput').value.trim();
  var pw    = document.getElementById('adminPwInput').value;
  var btn   = document.getElementById('adm-login-btn');
  var err   = document.getElementById('adm-login-err');
  err.style.display = 'none';
  btn.disabled = true; btn.textContent = '⏳ Logging in…';
  try {
    var data = await SB.signIn(email, pw);
    setSession(data);
    document.getElementById('admin-root').innerHTML = buildAdminDashboard();
    await loadAndRenderProducts();
    await loadAndRenderCategories();
  } catch (e) {
    err.textContent = e.message || 'Login failed. Check email & password.';
    err.style.display = 'block';
    btn.disabled = false; btn.textContent = '🔐 Login';
  }
};

window.doAdminLogout = async function() {
  try { await SB.signOut(getToken()); } catch {}
  clearSession();
  document.getElementById('admin-root').innerHTML = buildAdminLogin();
};

window.showAdmToast = function(msg) {
  var t = document.getElementById('adm-toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function() { t.classList.remove('show'); }, 3000);
};

/* ══════════════════════════════════════
   SHOP PHOTOS — Supabase Live Management
   ══════════════════════════════════════ */

window.renderShopPhotos = async function() {
  var grid = document.getElementById('shop-photos-grid');
  var badge = document.getElementById('photos-count');
  if (!grid) return;
  grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:30px;color:#aaa">⏳ Loading photos…</div>';
  var photos = await dbGetShopPhotos();
  if (badge) badge.textContent = photos.length;
  if (!photos.length) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px 20px;color:#aaa;font-size:14px">No shop photos yet. Click <strong>＋ Upload Photos</strong> above to add images.</div>';
    return;
  }
  grid.innerHTML = photos.map(function(ph) {
    return '<div style="position:relative;border-radius:10px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,.1);background:#fff">' +
      '<img src="' + ph.image_url + '" alt="' + (ph.caption||'') + '" style="width:100%;height:180px;object-fit:cover;display:block">' +
      '<div style="padding:8px 10px">' +
      '<input type="text" value="' + (ph.caption||'') + '" placeholder="Add caption…" ' +
        'onchange="adminUpdateCaption(\'' + ph.id + '\', this.value)" ' +
        'style="width:100%;border:1px solid #e0e0e0;border-radius:5px;padding:5px 8px;font-size:12px;box-sizing:border-box">' +
      '</div>' +
      '<button onclick="adminDeleteShopPhoto(\'' + ph.id + '\',\'' + (ph.file_path||'') + '\')" title="Delete photo" ' +
        'style="position:absolute;top:8px;right:8px;background:rgba(220,30,30,.85);color:#fff;border:none;border-radius:50%;width:28px;height:28px;font-size:16px;line-height:1;cursor:pointer;font-weight:700">×</button>' +
    '</div>';
  }).join('');
};

window.handleShopPhotoUpload = async function(event) {
  var files = Array.from(event.target.files);
  if (!files.length) return;
  var token = getToken();
  if (!token) { adminToast('❌ Please login first.'); return; }

  var grid = document.getElementById('shop-photos-grid');
  grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:30px;color:#aaa">⏳ Uploading ' + files.length + ' photo(s) to Supabase…</div>';

  var success = 0;
  for (var i = 0; i < files.length; i++) {
    try {
      await dbSaveShopPhoto(files[i], '', token);
      success++;
    } catch(e) {
      console.warn('Upload failed for', files[i].name, e.message);
    }
  }
  event.target.value = '';
  await renderShopPhotos();
  adminToast('✅ ' + success + ' of ' + files.length + ' photo(s) uploaded live!');
};

window.adminDeleteShopPhoto = async function(dbId, filePath) {
  if (!confirm('Delete this photo from the website?')) return;
  var token = getToken();
  try {
    await dbDeleteShopPhoto(dbId, filePath, token);
    await renderShopPhotos();
    adminToast('Photo deleted from live site.');
  } catch(e) {
    adminToast('❌ Delete failed: ' + e.message);
  }
};

window.adminUpdateCaption = async function(dbId, caption) {
  var token = getToken();
  try {
    await dbUpdateShopPhotoCaption(dbId, caption, token);
    adminToast('Caption saved.');
  } catch(e) {
    adminToast('❌ Caption save failed.');
  }
};
