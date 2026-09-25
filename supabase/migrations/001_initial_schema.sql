-- ARIA VITA HVAC AIR DISTRIBUTION DATABASE SCHEMA
-- Migration: 001_initial_schema.sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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
CREATE POLICY "Allow public read active categories" ON public.categories FOR SELECT USING (is_active = true OR public.is_admin());
CREATE POLICY "Allow public read active products" ON public.products FOR SELECT USING (is_active = true OR public.is_admin());
CREATE POLICY "Allow public read active variants" ON public.product_variants FOR SELECT USING (is_active = true OR public.is_admin());
CREATE POLICY "Allow public read specs" ON public.product_specifications FOR SELECT USING (true);
CREATE POLICY "Allow public read images" ON public.product_images FOR SELECT USING (true);
CREATE POLICY "Allow public read documents" ON public.product_documents FOR SELECT USING (true);
CREATE POLICY "Allow public read industries" ON public.industries FOR SELECT USING (true);
CREATE POLICY "Allow public read product_industries" ON public.product_industries FOR SELECT USING (true);
CREATE POLICY "Allow public read site_settings" ON public.site_settings FOR SELECT USING (true);

-- Public Insert for Enquiries (Allows visitors to submit enquiries)
CREATE POLICY "Allow public insert enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);

-- Admin Full Access Policies
CREATE POLICY "Admin manage categories" ON public.categories FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage products" ON public.products FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage variants" ON public.product_variants FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage specs" ON public.product_specifications FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage images" ON public.product_images FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage documents" ON public.product_documents FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage industries" ON public.industries FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage product_industries" ON public.product_industries FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage enquiries" ON public.enquiries FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage profiles" ON public.admin_profiles FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage site_settings" ON public.site_settings FOR ALL USING (public.is_admin());

-- ------------------------------------------------------------
-- STORAGE BUCKETS CREATION INSTRUCTIONS
-- Execute in Supabase Storage setup:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true) ON CONFLICT DO NOTHING;
-- INSERT INTO storage.buckets (id, name, public) VALUES ('product-documents', 'product-documents', true) ON CONFLICT DO NOTHING;
-- ------------------------------------------------------------
