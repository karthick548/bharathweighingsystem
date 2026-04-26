/* ============================================================
   ANNAM WEIGHING SYSTEM — Cart Module
   cart.js
   ============================================================ */

let cart = JSON.parse(localStorage.getItem('bharath_cart') || '[]');

function saveCart() {
  localStorage.setItem('bharath_cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => el.textContent = total);
}

function addToCart(pid) {
  const p = PRODUCTS.find(x => x.id === pid);
  if (!p) return;
  const ex = cart.find(x => x.id === pid);
  if (ex) {
    ex.qty++;
  } else {
    cart.push({ id: pid, name: p.name, price: p.priceNum, priceStr: p.price, emoji: p.emoji, img: p.img, qty: 1 });
  }
  saveCart();
  showToast('✅ Added to cart: ' + p.name);
}

function changeQty(pid, delta) {
  const item = cart.find(x => x.id === pid);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(x => x.id !== pid);
  saveCart();
  if (typeof renderCartPage === 'function') renderCartPage();
}

function removeFromCart(pid) {
  cart = cart.filter(x => x.id !== pid);
  saveCart();
  if (typeof renderCartPage === 'function') renderCartPage();
}

function clearCart() {
  cart = [];
  saveCart();
  if (typeof renderCartPage === 'function') renderCartPage();
}
