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
    'p1000000-0000-0000-0000-000000000001',
    'c1000000-0000-0000-0000-000000000001',
    'Fire Retardent Canvas',
    'fire-retardent-canvas',
    'Fire safety-certified flexible ducting for smoke exhaust and high-risk HVAC zones.',
    'Safety-first flexible ducting engineered specifically for smoke extraction systems, commercial kitchen exhausts, and fire-rated building shafts. Available in Fire Retardent (92°C) and Fire Resistant (250°C) variants.',
    '/images/products/fire-retardent-canvas.png',
    'Fire Retardent Canvas for HVAC Applications | Aria Vita',
    'Aria Vita fire safety-certified flexible duct connectors. Available in Fire Retardent (92°C) and Fire Resistant (250°C) high-temperature options.',
    true,
    'in_stock',
    10,
    true
  ),
  (
    'p2000000-0000-0000-0000-000000000002',
    'c2000000-0000-0000-0000-000000000002',
    'Disc Valves',
    'disc-valves',
    'Aerodynamic disc valves available in Aluminium Powder Coated, Stainless Steel, and ABS Plastic variants.',
    'Disc valves engineered for ceiling and wall mounting in supply and exhaust ventilation systems. Designed for smooth air distribution, minimal pressure drop, and low acoustic emission across commercial, residential, and industrial HVAC applications.',
    '/images/products/disc-valves.png',
    'Disc Valves for HVAC Air Distribution | Aria Vita',
    'Aria Vita disc valves for supply and exhaust air distribution in commercial and residential HVAC systems. Available in Aluminium Powder Coated, Stainless Steel, and ABS Plastic variants.',
    true,
    'in_stock',
    20,
    true
  ),
  (
    'p3000000-0000-0000-0000-000000000003',
    'c3000000-0000-0000-0000-000000000003',
    'Air Curtain',
    'air-curtain',
    'Commercial and industrial air curtain barrier units with centrifugal blowers.',
    'Aria Vita Air Curtains project a continuous high-speed air stream across open doorways, forming an invisible environmental barrier. Reduces air conditioning energy loss, excludes dust, smoke, and flying insects.',
    '/images/products/air-curtains.jpg',
    'Air Curtains for Commercial & Industrial Applications | Aria Vita',
    'Aria Vita high-efficiency air curtain barrier units for commercial entrances, retail shops, cleanrooms, and industrial applications. Available in AACA, AACS, and AACH models.',
    true,
    'in_stock',
    30,
    true
  ),
  (
    'p4000000-0000-0000-0000-000000000004',
    'c4000000-0000-0000-0000-000000000004',
    'Flexible Duct',
    'flexible-duct',
    '1 ply Aluminium + 2 ply Polyester flexible ducting with spring steel helix.',
    'High-performance flexible ducting engineered for HVAC air distribution, indoor agriculture, and hydroponic ventilation systems. Offers high velocity capability, minimal pressure drop, and superior humidity resistance.',
    '/images/products/flexible-duct.jpg',
    'Flexible Duct for HVAC Ventilation | Aria Vita',
    'Aria Vita heavy-duty multi-ply flexible ducting for HVAC heating, cooling, and ventilation networks. Available in Non-Insulated and Insulated variants.',
    true,
    'in_stock',
    40,
    true
  ),
  (
    'p5000000-0000-0000-0000-000000000005',
    'c5000000-0000-0000-0000-000000000005',
    'CAR',
    'car',
    'CAV AriaVita Constant Airflow Regulator (CAR Aria Vita Airflow Regulator / Airflow Regulator Aria Vita / CAV Aria Vita) self-balancing mechanical airflow controller.',
    'The CAR (CAV AriaVita Constant Airflow Regulator / CAR Aria Vita Airflow Regulator / Airflow Regulator Aria Vita / CAV Aria Vita) is a self-adjusting mechanical Constant Airflow Regulator designed to automatically balance air distribution systems. Operating between 50 and 250 Pa static pressure across 50–200 dia, the internal inflatable membrane adjusts its passage cross-section in response to duct pressure variations without electrical power.',
    '/images/products/car.png',
    'CAR | CAV AriaVita Constant Airflow Regulator | Aria Vita',
    'CAV AriaVita Constant Airflow Regulator (CAR Aria Vita Airflow Regulator). Self-balancing Airflow Regulator Aria Vita (CAV Aria Vita) operating across 50–200 dia and 50–250 Pa duct static pressure.',
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
    'v1000000-0000-0000-0000-000000000011',
    'p1000000-0000-0000-0000-000000000001',
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
    'v1000000-0000-0000-0000-000000000012',
    'p1000000-0000-0000-0000-000000000001',
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
    'v2000000-0000-0000-0000-000000000021',
    'p2000000-0000-0000-0000-000000000002',
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
    'v2000000-0000-0000-0000-000000000022',
    'p2000000-0000-0000-0000-000000000002',
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
    'v2000000-0000-0000-0000-000000000023',
    'p2000000-0000-0000-0000-000000000002',
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
    'v3000000-0000-0000-0000-000000000031',
    'p3000000-0000-0000-0000-000000000003',
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
    'v3000000-0000-0000-0000-000000000032',
    'p3000000-0000-0000-0000-000000000003',
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
    'v3000000-0000-0000-0000-000000000033',
    'p3000000-0000-0000-0000-000000000003',
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
    'v4000000-0000-0000-0000-000000000041',
    'p4000000-0000-0000-0000-000000000004',
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
    'v4000000-0000-0000-0000-000000000042',
    'p4000000-0000-0000-0000-000000000004',
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
    'v5000000-0000-0000-0000-000000000051',
    'p5000000-0000-0000-0000-000000000005',
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
  ('p1000000-0000-0000-0000-000000000001', 'v1000000-0000-0000-0000-000000000011', 'Temperature Resistance', '92°C', 10),
  ('p1000000-0000-0000-0000-000000000001', 'v1000000-0000-0000-0000-000000000012', 'Temperature Resistance', '250°C', 20),
  ('p1000000-0000-0000-0000-000000000001', NULL, 'Fire Safety Standards', 'BS 476 Part 7 Class 1 / ASTM E84 Class A / UL 94 V-0', 30),
  ('p1000000-0000-0000-0000-000000000001', NULL, 'Flexibility Radius', '0.6 x Diameter', 40),

  -- Disc Valves
  ('p2000000-0000-0000-0000-000000000002', NULL, 'Available Variants', 'Aluminium Powder Coated, Stainless Steel, ABS Plastic', 10),
  ('p2000000-0000-0000-0000-000000000002', NULL, 'Mounting', 'Ceiling & Wall Mounting', 20),
  ('p2000000-0000-0000-0000-000000000002', NULL, 'Airflow Dispersion', '360° Radial Dispersion Pattern', 30),

  -- Air Curtain
  ('p3000000-0000-0000-0000-000000000003', NULL, 'Available Variants', 'Aluminium Powder Coated (AACA), Stainless Steel (AACS), Industrial Application (AACH)', 10),
  ('p3000000-0000-0000-0000-000000000003', NULL, 'Door Height Coverage', '7 ft to 18 ft', 20),
  ('p3000000-0000-0000-0000-000000000003', NULL, 'Blower Type', 'Centrifugal direct-drive fan wheels', 30),

  -- Flexible Duct
  ('p4000000-0000-0000-0000-000000000004', NULL, 'Construction', '1 ply Aluminium + 2 ply Polyester (Black)', 10),
  ('p4000000-0000-0000-0000-000000000004', NULL, 'Nominal Thickness', '45 micron', 20),
  ('p4000000-0000-0000-0000-000000000004', NULL, 'Diameter Range', '102–508 mm', 30),
  ('p4000000-0000-0000-0000-000000000004', NULL, 'Operating Temperature', '-30°C to +120°C', 40),
  ('p4000000-0000-0000-0000-000000000004', NULL, 'Maximum Air Velocity', '30 m/s', 50),
  ('p4000000-0000-0000-0000-000000000004', NULL, 'Maximum Operating Pressure', '3000 Pa', 60),

  -- CAR
  ('p5000000-0000-0000-0000-000000000005', NULL, 'Diameter', '50–200 dia', 10),
  ('p5000000-0000-0000-0000-000000000005', NULL, 'Pressure Range', '50–250 Pa', 20),
  ('p5000000-0000-0000-0000-000000000005', NULL, 'Housing Material', 'High-impact Polystyrene', 30),
  ('p5000000-0000-0000-0000-000000000005', NULL, 'Color', 'Black', 40)
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
