-- ARIA VITA DATABASE SEED DATA
-- Migration: seed.sql

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
