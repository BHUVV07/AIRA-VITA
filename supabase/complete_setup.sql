-- ============================================================
-- ARIA VITA — COMPLETE SINGLE-FILE SUPABASE DATABASE SETUP
-- Description: Run this single file in Supabase SQL Editor.
-- It creates all tables, indexes, RLS policies, storage buckets,
-- and seeds initial product & site configuration data.
-- ============================================================

-- ------------------------------------------------------------
-- 0. EXTENSIONS & STORAGE BUCKETS
-- ------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('product-images', 'product-images', true),
  ('product-documents', 'product-documents', true)
ON CONFLICT (id) DO NOTHING;

-- ------------------------------------------------------------
-- 1. CATEGORIES TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------------------------
-- 2. PRODUCTS TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    short_description TEXT,
    description TEXT,
    primary_image_url TEXT,
    seo_title TEXT,
    seo_description TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    availability_status TEXT DEFAULT 'in_stock',
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------------------------
-- 3. PRODUCT VARIANTS TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    code TEXT,
    slug TEXT,
    description TEXT,
    image_url TEXT,
    temperature TEXT,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------------------------
-- 4. PRODUCT SPECIFICATIONS TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.product_specifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES public.product_variants(id) ON DELETE CASCADE,
    spec_name TEXT NOT NULL,
    spec_value TEXT NOT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------------------------
-- 5. PRODUCT IMAGES TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES public.product_variants(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    sort_order INT DEFAULT 0,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------------------------
-- 6. PRODUCT DOCUMENTS TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.product_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES public.product_variants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT DEFAULT 'pdf',
    file_size TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------------------------
-- 7. INDUSTRIES TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.industries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------------------------
-- 8. PRODUCT INDUSTRIES JUNCTION TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.product_industries (
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    industry_id UUID REFERENCES public.industries(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, industry_id)
);

-- ------------------------------------------------------------
-- 9. ENQUIRIES TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    company TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name TEXT,
    variant_id UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,
    variant_name TEXT,
    message TEXT,
    project_type TEXT,
    location TEXT,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed')),
    source TEXT DEFAULT 'website',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------------------------
-- 10. ADMIN PROFILES TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------------------------
-- 11. SITE SETTINGS TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------------------------
-- INDEXES FOR PERFORMANCE
-- ------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_is_active ON public.categories(is_active);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON public.products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_sort_order ON public.products(sort_order);
CREATE INDEX IF NOT EXISTS idx_product_variants_product ON public.product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_product_specs_product ON public.product_specifications(product_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON public.enquiries(created_at DESC);

-- ------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Helper function to check if authenticated user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.admin_profiles
        WHERE user_id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Public Read Policies
DROP POLICY IF EXISTS "Allow public read active categories" ON public.categories;
CREATE POLICY "Allow public read active categories" ON public.categories FOR SELECT USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "Allow public read active products" ON public.products;
CREATE POLICY "Allow public read active products" ON public.products FOR SELECT USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "Allow public read active variants" ON public.product_variants;
CREATE POLICY "Allow public read active variants" ON public.product_variants FOR SELECT USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "Allow public read specs" ON public.product_specifications;
CREATE POLICY "Allow public read specs" ON public.product_specifications FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read images" ON public.product_images;
CREATE POLICY "Allow public read images" ON public.product_images FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read documents" ON public.product_documents;
CREATE POLICY "Allow public read documents" ON public.product_documents FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read industries" ON public.industries;
CREATE POLICY "Allow public read industries" ON public.industries FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read product_industries" ON public.product_industries;
CREATE POLICY "Allow public read product_industries" ON public.product_industries FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read site_settings" ON public.site_settings;
CREATE POLICY "Allow public read site_settings" ON public.site_settings FOR SELECT USING (true);

-- Public Insert for Enquiries (Allows visitors to submit enquiries)
DROP POLICY IF EXISTS "Allow public insert enquiries" ON public.enquiries;
CREATE POLICY "Allow public insert enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);

-- Admin Full Access Policies
DROP POLICY IF EXISTS "Admin manage categories" ON public.categories;
CREATE POLICY "Admin manage categories" ON public.categories FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin manage products" ON public.products;
CREATE POLICY "Admin manage products" ON public.products FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin manage variants" ON public.product_variants;
CREATE POLICY "Admin manage variants" ON public.product_variants FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin manage specs" ON public.product_specifications;
CREATE POLICY "Admin manage specs" ON public.product_specifications FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin manage images" ON public.product_images;
CREATE POLICY "Admin manage images" ON public.product_images FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin manage documents" ON public.product_documents;
CREATE POLICY "Admin manage documents" ON public.product_documents FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin manage industries" ON public.industries;
CREATE POLICY "Admin manage industries" ON public.industries FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin manage product_industries" ON public.product_industries;
CREATE POLICY "Admin manage product_industries" ON public.product_industries FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin manage enquiries" ON public.enquiries;
CREATE POLICY "Admin manage enquiries" ON public.enquiries FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin manage profiles" ON public.admin_profiles;
CREATE POLICY "Admin manage profiles" ON public.admin_profiles FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin manage site_settings" ON public.site_settings;
CREATE POLICY "Admin manage site_settings" ON public.site_settings FOR ALL USING (public.is_admin());

-- ------------------------------------------------------------
-- SEED DATA INSERTION
-- ------------------------------------------------------------

-- 1. INSERT CATEGORIES
INSERT INTO public.categories (id, name, slug, description, sort_order, is_active)
VALUES
  ('c1000000-0000-0000-0000-000000000001', 'Fire Retardent Canvas', 'fire-retardent-canvas', 'Safety-first flexible ducting for smoke exhaust and high-risk HVAC zones.', 10, true),
  ('c2000000-0000-0000-0000-000000000002', 'Disc Valves', 'disc-valves', 'Aerodynamic supply and exhaust disc valves for clean air distribution.', 20, true),
  ('c3000000-0000-0000-0000-000000000003', 'Air Curtain', 'air-curtain', 'Commercial and industrial air curtain barrier units with centrifugal blowers.', 30, true),
  ('c4000000-0000-0000-0000-000000000004', 'Flexible Duct', 'flexible-duct', 'High-durability multi-ply flexible ducting for HVAC & ventilation.', 40, true),
  ('c5000000-0000-0000-0000-000000000005', 'CAR', 'car', 'Self-balancing mechanical Constant Airflow Regulators.', 50, true)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  sort_order = EXCLUDED.sort_order;

-- 2. INSERT PRODUCTS
INSERT INTO public.products (
  id, category_id, name, slug, short_description, description, primary_image_url,
  seo_title, seo_description, is_featured, availability_status, sort_order, is_active
)
VALUES
  (
    'a1000000-0000-0000-0000-000000000001',
    'c1000000-0000-0000-0000-000000000001',
    'Fire Retardent Canvas',
    'fire-retardent-canvas',
    'Fire safety-certified flexible ducting for smoke exhaust and high-risk HVAC zones.',
    'Safety-first flexible ducting engineered specifically for smoke extraction systems, commercial kitchen exhausts, and fire-rated building shafts. Available in Fire Retardent (92°C) and Fire Resistant (250°C) variants with neoprene canvas and flange options.',
    '/images/products/fire-retardent-canvas.png',
    'Fire Retardent Canvas & Fire Rated Canvas | Aria Vita',
    'Aria Vita fire rated canvas, fire proof canvas, Neoprene canvas, and fire canvas with flange flexible duct connectors. Available in 92°C and 250°C high-temperature variants.',
    true,
    'in_stock',
    10,
    true
  ),
  (
    'a2000000-0000-0000-0000-000000000002',
    'c2000000-0000-0000-0000-000000000002',
    'Disc Valves',
    'disc-valves',
    'Aerodynamic disc valves available in Aluminium Powder Coated, Stainless Steel, and ABS Plastic variants.',
    'Disc valves engineered for ceiling and wall mounting in supply and exhaust ventilation systems. Designed for smooth air distribution, minimal pressure drop, and low acoustic emission across commercial, residential, and industrial HVAC applications.',
    '/images/products/disc-valves.png',
    'Disc Valves — Aluminium, Stainless Steel & ABS Plastic | Aria Vita',
    'Aerodynamic supply and exhaust disc valves including 150 mm disc valve aluminium, 150 mm SS stainless steel disc valve, and ABS plastic disc valves from Aria Vita.',
    true,
    'in_stock',
    20,
    true
  ),
  (
    'a3000000-0000-0000-0000-000000000003',
    'c3000000-0000-0000-0000-000000000003',
    'Air Curtain',
    'air-curtain',
    'Commercial and industrial air curtain barrier units with centrifugal blowers.',
    'Aria Vita Air Curtains project a continuous high-speed air stream across open doorways, forming an invisible environmental barrier. Reduces air conditioning energy loss, excludes dust, smoke, and flying insects.',
    '/images/products/air-curtains.jpg',
    'Air Curtain Aria Vita — Commercial, SS & Industrial Air Curtains',
    'Air curtain Aria Vita solutions including SS air curtain (AACS) and industrial air curtain (AACH) models for commercial, hygienic, and factory doorways.',
    true,
    'in_stock',
    30,
    true
  ),
  (
    'a4000000-0000-0000-0000-000000000004',
    'c4000000-0000-0000-0000-000000000004',
    'Flexible Duct',
    'flexible-duct',
    '1 ply Aluminium + 2 ply Polyester flexible ducting with spring steel helix.',
    'High-performance flexible ducting engineered for HVAC air distribution, indoor agriculture, and hydroponic ventilation systems. Offers high velocity capability, minimal pressure drop, and superior humidity resistance.',
    '/images/products/flexible-duct.jpg',
    'Flexible Duct — Insulated & Uninsulated Flexible Duct | AriaVita',
    'AriaVita flexible duct solutions including insulated flexible duct and uninsulated flexible duct options for HVAC heating, cooling, and ventilation.',
    true,
    'in_stock',
    40,
    true
  ),
  (
    'a5000000-0000-0000-0000-000000000005',
    'c5000000-0000-0000-0000-000000000005',
    'CAR',
    'car',
    'CAV AriaVita Constant Airflow Regulator (CAR Aria Vita Airflow Regulator / Airflow Regulator Aria Vita / CAV Aria Vita) self-balancing mechanical airflow controller.',
    'The CAR (CAV AriaVita constant airflow regulator / CAR Aria Vita airflow regulator / Airflow regulator Aria Vita / CAV Aria Vita) is a self-adjusting mechanical Constant Airflow Regulator designed to automatically balance air distribution systems. Operating between 50 and 250 Pa static pressure across 50–200 dia, the internal inflatable membrane adjusts its passage cross-section in response to duct pressure variations without electrical power.',
    '/images/products/car.png',
    'CAR — CAV AriaVita Constant Airflow Regulator | Aria Vita',
    'CAV AriaVita constant airflow regulator (CAR Aria Vita airflow regulator / Airflow regulator Aria Vita / CAV Aria Vita) self-balancing airflow regulator.',
    true,
    'in_stock',
    50,
    true
  )
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  sort_order = EXCLUDED.sort_order,
  availability_status = EXCLUDED.availability_status;

-- 3. INSERT PRODUCT VARIANTS
INSERT INTO public.product_variants (
  id, product_id, name, code, slug, description, image_url, temperature, sort_order, is_active
)
VALUES
  -- Fire Retardent Canvas Variants
  (
    'b1000000-0000-0000-0000-000000000011',
    'a1000000-0000-0000-0000-000000000001',
    'Fire Retardent',
    'FR-92',
    'fire-retardent',
    'Fire Retardent Canvas rated for 92°C operating temperature. Designed for general ventilation, HVAC flexible duct connections, and standard smoke extraction shafts.',
    '/images/products/fire-retardent-canvas.png',
    '92°C',
    10,
    true
  ),
  (
    'b1000000-0000-0000-0000-000000000012',
    'a1000000-0000-0000-0000-000000000001',
    'Fire Resistant',
    'FR-250',
    'fire-resistant',
    'High-temperature Fire Resistant Canvas rated for 250°C operating temperature. Engineered for commercial kitchen hood connections, high-temperature smoke extraction, and critical fire safety shafts.',
    '/images/products/fire-retardent-canvas.png',
    '250°C',
    20,
    true
  ),

  -- Disc Valves Variants
  (
    'b2000000-0000-0000-0000-000000000021',
    'a2000000-0000-0000-0000-000000000002',
    'Aluminium Powder Coated',
    'ADV-AL',
    'aluminium-powder-coated',
    'High-grade aluminium disc valves finished with electrostatic powder coating for superior corrosion resistance.',
    '/images/products/disc-valves.png',
    NULL,
    10,
    true
  ),
  (
    'b2000000-0000-0000-0000-000000000022',
    'a2000000-0000-0000-0000-000000000002',
    'Stainless Steel',
    'ADV-SS',
    'stainless-steel',
    'Heavy-duty stainless steel disc valves engineered for cleanrooms, laboratories, commercial kitchens, and aggressive ambient environments.',
    '/images/products/disc-valves.png',
    NULL,
    20,
    true
  ),
  (
    'b2000000-0000-0000-0000-000000000023',
    'a2000000-0000-0000-0000-000000000002',
    'ABS Plastic',
    'TDV',
    'abs-plastic',
    'TDV Series aerodynamic plastic disc valves manufactured from durable, recyclable polypropylene.',
    '/images/products/disc-valves.png',
    NULL,
    30,
    true
  ),

  -- Air Curtain Variants
  (
    'b3000000-0000-0000-0000-000000000031',
    'a3000000-0000-0000-0000-000000000003',
    'Aluminium Powder Coated',
    'AACA',
    'aluminium-powder-coated',
    'Commercial aluminium powder coated air curtain unit designed for mall entrances, retail stores, and hospital lobbies.',
    '/images/products/air-curtains.jpg',
    NULL,
    10,
    true
  ),
  (
    'b3000000-0000-0000-0000-000000000032',
    'a3000000-0000-0000-0000-000000000003',
    'Stainless Steel',
    'AACS',
    'stainless-steel',
    'High-hygiene stainless steel air curtain unit engineered for cleanrooms, pharmaceutical labs, commercial kitchens, and food processing facilities.',
    '/images/products/air-curtains.jpg',
    NULL,
    20,
    true
  ),
  (
    'b3000000-0000-0000-0000-000000000033',
    'a3000000-0000-0000-0000-000000000003',
    'Industrial Application',
    'AACH',
    'industrial-application',
    'Industrial application high-velocity air curtain unit engineered for factories, warehouses, cold storage, and heavy industrial loading bays.',
    '/images/products/air-curtains.jpg',
    NULL,
    30,
    true
  ),

  -- Flexible Duct Variants
  (
    'b4000000-0000-0000-0000-000000000041',
    'a4000000-0000-0000-0000-000000000004',
    'Non-Insulated',
    'FD-NI',
    'non-insulated',
    'Heavy-duty non-insulated flexible ducting constructed with 1 ply Aluminium combined with 2 ply Polyester (Black) over encapsulated spring steel wire.',
    '/images/products/flexible-duct.jpg',
    NULL,
    10,
    true
  ),
  (
    'b4000000-0000-0000-0000-000000000042',
    'a4000000-0000-0000-0000-000000000004',
    'Insulated',
    'FD-INS',
    'insulated',
    'Thermal insulated flexible ducting with acoustic fiberglass wool layer engineered to eliminate condensation and reduce duct breakout noise.',
    '/images/products/flexible-duct.jpg',
    NULL,
    20,
    true
  ),

  -- CAR Variant
  (
    'b5000000-0000-0000-0000-000000000051',
    'a5000000-0000-0000-0000-000000000005',
    'Standard CAR',
    'CAR 50-200',
    'standard-car',
    'Constant Airflow Regulator operating across 50–200 dia diameter and 50–250 Pa static pressure.',
    '/images/products/car.png',
    NULL,
    10,
    true
  )
ON CONFLICT DO NOTHING;

-- 4. INSERT PRODUCT SPECIFICATIONS
INSERT INTO public.product_specifications (product_id, variant_id, spec_name, spec_value, sort_order)
VALUES
  -- Fire Retardent Canvas
  ('a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000011', 'Temperature Resistance', '92°C', 10),
  ('a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000012', 'Temperature Resistance', '250°C', 20),
  ('a1000000-0000-0000-0000-000000000001', NULL, 'Fire Safety Standards', 'BS 476 Part 7 Class 1 / ASTM E84 Class A / UL 94 V-0', 30),
  ('a1000000-0000-0000-0000-000000000001', NULL, 'Flexibility Radius', '0.6 x Diameter', 40),

  -- Disc Valves
  ('a2000000-0000-0000-0000-000000000002', NULL, 'Available Variants', 'Aluminium Powder Coated, Stainless Steel, ABS Plastic', 10),
  ('a2000000-0000-0000-0000-000000000002', NULL, 'Mounting', 'Ceiling & Wall Mounting', 20),
  ('a2000000-0000-0000-0000-000000000002', NULL, 'Airflow Dispersion', '360° Radial Dispersion Pattern', 30),

  -- Air Curtain
  ('a3000000-0000-0000-0000-000000000003', NULL, 'Available Variants', 'Aluminium Powder Coated (AACA), Stainless Steel (AACS), Industrial Application (AACH)', 10),
  ('a3000000-0000-0000-0000-000000000003', NULL, 'Door Height Coverage', '7 ft to 18 ft', 20),
  ('a3000000-0000-0000-0000-000000000003', NULL, 'Blower Type', 'Centrifugal direct-drive fan wheels', 30),

  -- Flexible Duct
  ('a4000000-0000-0000-0000-000000000004', NULL, 'Construction', '1 ply Aluminium + 2 ply Polyester (Black)', 10),
  ('a4000000-0000-0000-0000-000000000004', NULL, 'Nominal Thickness', '45 micron', 20),
  ('a4000000-0000-0000-0000-000000000004', NULL, 'Diameter Range', '102–508 mm', 30),
  ('a4000000-0000-0000-0000-000000000004', NULL, 'Operating Temperature', '-30°C to +120°C', 40),
  ('a4000000-0000-0000-0000-000000000004', NULL, 'Maximum Air Velocity', '30 m/s', 50),
  ('a4000000-0000-0000-0000-000000000004', NULL, 'Maximum Operating Pressure', '3000 Pa', 60),

  -- CAR
  ('a5000000-0000-0000-0000-000000000005', NULL, 'Diameter', '50–200 dia', 10),
  ('a5000000-0000-0000-0000-000000000005', NULL, 'Pressure Range', '50–250 Pa', 20),
  ('a5000000-0000-0000-0000-000000000005', NULL, 'Housing Material', 'High-impact Polystyrene', 30),
  ('a5000000-0000-0000-0000-000000000005', NULL, 'Color', 'Black', 40)
ON CONFLICT DO NOTHING;

-- 5. INSERT SITE SETTINGS
INSERT INTO public.site_settings (key, value)
VALUES
  (
    'company_info',
    '{
      "name": "ARIA VITA",
      "tagline": "Precision Air. Perfect Comfort.",
      "email": "info@ariavita.in",
      "phone": "+91 93420 50097",
      "whatsapp_number": "+919342050097",
      "website": "www.ariavita.in",
      "distributor_name": "Ecosta Systems",
      "distributor_location": "Indiranagar, Bengaluru - 560008",
      "distributor_address": "#31, Ground Floor, 80 Feet Rd, HAL 2nd Stage, Indiranagar, Near LPSC, Bengaluru, Karnataka 560008"
    }'::jsonb
  )
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value;
