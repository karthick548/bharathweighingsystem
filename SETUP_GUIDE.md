# 🚀 Bharath Weighing System — Supabase Setup Guide

Follow these steps **once** to connect your website to Supabase (free database + storage + auth).

---

## STEP 1 — Create Free Supabase Account

1. Go to **https://supabase.com**
2. Click **Start your project** → Sign up (free)
3. Click **New Project**
   - Name: `bharath-weighing`
   - Password: (choose a strong DB password — save it)
   - Region: `Southeast Asia (Singapore)` ← closest to India
4. Wait ~2 minutes for project to create

---

## STEP 2 — Copy Your API Keys

In your Supabase project dashboard:

1. Go to **Settings** (gear icon) → **API**
2. Copy these two values:

   | Field | Where to find |
   |---|---|
   | **Project URL** | Under "Project URL" e.g. `https://abcxyz.supabase.co` |
   | **anon / public key** | Under "Project API keys" → `anon public` (starts with `eyJ...`) |

3. Open the file `js/supabase.js` in your project
4. Replace these two lines near the top:

```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL';        // ← paste your Project URL here
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // ← paste your anon key here
```

**Example:**
```javascript
const SUPABASE_URL = 'https://abcdefgh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

---

## STEP 3 — Create Database Tables

1. In Supabase dashboard → click **SQL Editor** (left sidebar)
2. Click **New query**
3. Open the file `SETUP_SUPABASE.sql` from your project folder
4. Copy ALL the content and paste it into the SQL editor
5. Click **Run** (green button)
6. You should see "Success" messages

This creates:
- `products` table — for all your products
- `categories` table — for product categories
- `settings` table — for phone, email, address, WhatsApp toggle
- `enquiries` table — saves every enquiry from your contact form
- Storage bucket `product-images` — for product photos

---

## STEP 4 — Create Admin Storage Bucket

1. In Supabase dashboard → click **Storage** (left sidebar)
2. Click **New bucket**
   - Name: `product-images`
   - Check **Public bucket** ✓
3. Click **Save**

*(The SQL already sets policies — this just creates the bucket visually)*

---

## STEP 5 — Create Your Admin User

1. In Supabase dashboard → click **Authentication** (left sidebar)
2. Click **Users** tab
3. Click **Invite user** (or **Add user** → **Create new user**)
4. Enter:
   - Email: `bharathweightingsystem@gmail.com` (or any email you prefer)
   - Password: `YourSecurePassword@2024` (choose something strong)
5. Click **Create user**

> ⚠️ **Only this email+password will be able to log in to your admin panel.**
> Nobody else can access the admin — it's protected by Supabase Auth.

---

## STEP 6 — Deploy Your Website

Upload all the files to your web hosting (Hostinger, cPanel, Netlify, GitHub Pages etc.):

```
bharath_output/
├── index.html
├── admin.html
├── contact.html
├── products.html
├── product.html
├── about.html
├── cart.html
├── cat-weighing.html
├── cat-crane.html
├── ... (all other cat-*.html)
├── css/
│   ├── style.css
│   └── admin.css
└── js/
    ├── supabase.js      ← NEW (has your API keys)
    ├── admin.js         ← UPDATED
    ├── products.js
    └── components.js
```

---

## STEP 7 — Test It!

1. Open your website → go to `/admin.html`
2. Login with the email + password you created in Step 5
3. You should see the admin dashboard with:
   - 📦 Products tab
   - 📂 Categories tab
   - 📩 Enquiries tab
   - ⚙️ Settings tab

4. Try adding a product with an uploaded photo
5. Open your contact page and submit a test enquiry
6. Check the Enquiries tab in admin — it should appear there!

---

## HOW IT WORKS

| Feature | How |
|---|---|
| **Admin Login** | Email + Password via Supabase Auth (secure, no hardcoded password) |
| **Products** | Saved to Supabase `products` table; loaded live by every page |
| **Product Images** | Uploaded to Supabase Storage → public URL stored in product |
| **Categories** | Saved to Supabase `categories` table |
| **Enquiries** | Every contact form submission saved to `enquiries` table |
| **Settings** | Phone/email/address saved in `settings` table → live on website |
| **Changes go live** | Instantly — no rebuild needed, website reads from database |

---

## FREE PLAN LIMITS (Supabase)

| Resource | Free Limit |
|---|---|
| Database rows | 500 MB (unlimited rows) |
| Storage | 1 GB (plenty for product images) |
| API requests | 2 million / month |
| Auth users | Unlimited |

This is **more than enough** for Bharath Weighing System.

---

## NEED HELP?

Contact your developer or refer to: https://supabase.com/docs
