-- ============================================================
-- BHARATH WEIGHING SYSTEM — Supabase Database Setup
-- Run this entire script in your Supabase SQL Editor
-- Go to: Supabase Dashboard → SQL Editor → New Query → Paste → Run
-- ============================================================

-- 1. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE,
  name TEXT NOT NULL,
  category_id TEXT,
  category_name TEXT,
  emoji TEXT DEFAULT '⚖️',
  image_url TEXT,
  price TEXT,
  price_num NUMERIC DEFAULT 0,
  original_price TEXT,
  description TEXT,
  specs JSONB DEFAULT '[]',
  tags JSONB DEFAULT '[]',
  is_new BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  icon TEXT,
  description TEXT,
  page_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. SETTINGS TABLE (single row for business details)
CREATE TABLE IF NOT EXISTS settings (
  id SERIAL PRIMARY KEY,
  gst TEXT DEFAULT '33AVXPS3237R1ZI',
  phone TEXT DEFAULT '917358863516',
  phone_display TEXT DEFAULT '+91-73588-63516',
  email TEXT DEFAULT 'bharathweightingsystem@gmail.com',
  address TEXT DEFAULT '4, Thendral Nagar Main Rd, Ambedkar Nagar, Thirumullaivoyal, Chennai, Tamil Nadu 600062, India',
  whatsapp_available BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS enquiries (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  product TEXT,
  message TEXT,
  source TEXT DEFAULT 'contact_form',
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Insert default settings row
INSERT INTO settings (id, gst, phone, phone_display, email, address, whatsapp_available)
VALUES (1, '33AVXPS3237R1ZI', '917358863516', '+91-73588-63516',
        'bharathweightingsystem@gmail.com',
        '4, Thendral Nagar Main Rd, Ambedkar Nagar, Thirumullaivoyal, Chennai, Tamil Nadu 600062, India',
        true)
ON CONFLICT (id) DO NOTHING;

-- 6. Insert default categories
INSERT INTO categories (slug, name, icon, description, page_url) VALUES
  ('weighing',  'Weighing Scales',         '⚖️', 'High-accuracy electronic weighing scales',      'cat-weighing.html'),
  ('crane',     'Crane Scales',            '🏗️', 'Heavy-duty hanging crane scales',               'cat-crane.html'),
  ('jewellery', 'Jewellery Scales',        '💎', 'Precision jewellery and gem scales',             'cat-jewellery.html'),
  ('industrial','Industrial Weigh Scale',  '🏭', 'Large capacity industrial floor scales',         'cat-industrial.html'),
  ('retail',    'Printing Scales',         '🖨️', 'Retail billing and label printing scales',       'cat-retail.html'),
  ('poultry',   'Poultry Scales',          '🐔', 'Scales for poultry and live animal weighing',    'cat-poultry.html'),
  ('platform',  'Platform Scales',         '📦', 'Heavy platform and floor scales',                'cat-platform.html'),
  ('counting',  'Counting Scales',         '🧮', 'Precision counting and parts scales',            'cat-counting.html'),
  ('bmi',       'BMI Scales',              '🏃', 'Body weight and BMI measurement scales',         'cat-bmi.html'),
  ('lab',       'Lab Scales',              '🔬', 'High-precision laboratory analytical balances',  'cat-lab.html')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE products   ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings   ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries  ENABLE ROW LEVEL SECURITY;

-- PRODUCTS: Anyone can read; only logged-in admin can write
CREATE POLICY "Public can read products"
  ON products FOR SELECT USING (true);

CREATE POLICY "Admin can insert products"
  ON products FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin can update products"
  ON products FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can delete products"
  ON products FOR DELETE
  USING (auth.role() = 'authenticated');

-- CATEGORIES: Anyone can read; only admin can write
CREATE POLICY "Public can read categories"
  ON categories FOR SELECT USING (true);

CREATE POLICY "Admin can write categories"
  ON categories FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- SETTINGS: Anyone can read; only admin can write
CREATE POLICY "Public can read settings"
  ON settings FOR SELECT USING (true);

CREATE POLICY "Admin can update settings"
  ON settings FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ENQUIRIES: Anyone can INSERT (contact form); only admin can read/delete
CREATE POLICY "Anyone can submit enquiry"
  ON enquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin can read enquiries"
  ON enquiries FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can delete enquiries"
  ON enquiries FOR DELETE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can update enquiries"
  ON enquiries FOR UPDATE
  USING (auth.role() = 'authenticated');

-- ============================================================
-- STORAGE BUCKET FOR PRODUCT IMAGES
-- Run this after creating the bucket in Dashboard → Storage
-- ============================================================

-- Create bucket (or do it in Dashboard → Storage → New Bucket → "product-images" → Public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload
CREATE POLICY "Admin can upload images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- Allow public to view images
CREATE POLICY "Public can view images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

-- Allow authenticated to delete/update
CREATE POLICY "Admin can manage images"
  ON storage.objects FOR ALL
  USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- ============================================================
-- DONE! Your database is ready.
-- Next step: Create an admin user in Supabase →
--   Dashboard → Authentication → Users → Invite User
--   Use your admin email & set a password
-- ============================================================

-- ══════════════════════════════════════════
-- RATINGS TABLE (add this to your Supabase)
-- ══════════════════════════════════════════
CREATE TABLE IF NOT EXISTS ratings (
  id           BIGSERIAL PRIMARY KEY,
  product_id   TEXT NOT NULL,
  reviewer_name TEXT NOT NULL,
  reviewer_phone TEXT,
  rating       INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment      TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Allow public (anonymous) inserts & reads for ratings
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read ratings"   ON ratings FOR SELECT USING (true);
CREATE POLICY "Public insert ratings" ON ratings FOR INSERT WITH CHECK (true);

-- ══════════════════════════════════════════════════════
-- SHOP PHOTOS TABLE + STORAGE BUCKET
-- Run this in your Supabase SQL Editor
-- ══════════════════════════════════════════════════════

-- 1. Create the shop_photos table
CREATE TABLE IF NOT EXISTS shop_photos (
  id          BIGSERIAL PRIMARY KEY,
  image_url   TEXT NOT NULL,
  file_path   TEXT NOT NULL,
  caption     TEXT DEFAULT '',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Row Level Security — public can read, only admin can insert/update/delete
ALTER TABLE shop_photos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read shop_photos"    ON shop_photos FOR SELECT USING (true);
CREATE POLICY "Admin insert shop_photos"   ON shop_photos FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update shop_photos"   ON shop_photos FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete shop_photos"   ON shop_photos FOR DELETE USING (auth.role() = 'authenticated');

-- 3. Create the Supabase Storage bucket (run in Storage dashboard OR via SQL):
-- Go to Supabase Dashboard → Storage → New Bucket
-- Name: shop-photos
-- Public: YES (toggle on so images are publicly viewable)
-- Then add this storage policy via SQL:

INSERT INTO storage.buckets (id, name, public)
VALUES ('shop-photos', 'shop-photos', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read shop-photos storage"
  ON storage.objects FOR SELECT USING (bucket_id = 'shop-photos');

CREATE POLICY "Admin upload shop-photos storage"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'shop-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Admin delete shop-photos storage"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'shop-photos' AND auth.role() = 'authenticated');
