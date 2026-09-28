export interface GalleryItem {
  id: string;
  title: string;
  category: "Disc Valves" | "Air Curtains" | "Flexible Ducts" | "Fire Retardent Canvas" | "CAR Regulators" | "Installations";
  description: string;
  image: string;
  imageAlt: string;
  badge?: string;
  productSlug?: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  badge: string;
  image: string;
  imageAlt: string;
  link?: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "car",
    title: "CAR — Constant Airflow Regulator",
    badge: "50–250 Pa Control",
    image: "/images/products/car.png",
    imageAlt: "CAV AriaVita Constant Airflow Regulator",
    link: "/products/car",
  },
  {
    id: "disc-valves",
    title: "Disc Valves — Aluminium & Stainless Steel",
    badge: "360° Dispersion",
    image: "/images/products/disc-valves.png",
    imageAlt: "Aria Vita Disc Valves in Aluminium, Stainless Steel, and ABS Plastic",
    link: "/products/disc-valves",
  },
  {
    id: "air-curtains",
    title: "Air Curtains — Commercial & Industrial",
    badge: "AACA / AACS / AACH",
    image: "/images/products/air-curtains.jpg",
    imageAlt: "Aria Vita Air Curtain Units",
    link: "/products/air-curtain",
  },
  {
    id: "flexible-duct",
    title: "Flexible Duct — Insulated & Uninsulated",
    badge: "30 m/s Max Velocity",
    image: "/images/products/flexible-duct.jpg",
    imageAlt: "AriaVita Heavy Duty Flexible Ducting",
    link: "/products/flexible-duct",
  },
  {
    id: "fire-retardent-canvas",
    title: "Fire Retardent Canvas — 92°C & 250°C",
    badge: "Fire Safety Certified",
    image: "/images/products/fire-retardent-canvas.png",
    imageAlt: "Aria Vita Fire Retardent Canvas Duct Connectors",
    link: "/products/fire-retardent-canvas",
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-car-01",
    title: "Constant Airflow Regulator (CAR)",
    category: "CAR Regulators",
    description: "Self-balancing mechanical Constant Airflow Regulator operating across 50–200 dia and 50–250 Pa static pressure range.",
    image: "/images/products/car.png",
    imageAlt: "CAV AriaVita Constant Airflow Regulator CAR",
    badge: "50–250 Pa",
    productSlug: "car",
  },
  {
    id: "gal-car-02",
    title: "CAR Mechanical Regulator Assembly",
    category: "CAR Regulators",
    description: "Detailed view of the internal pressure-compensating membrane and high-impact polystyrene casing.",
    image: "/images/products/constant-airflow-regulator.jpg",
    imageAlt: "Constant Airflow Regulator Internal Assembly",
    badge: "Self-Balancing",
    productSlug: "car",
  },
  {
    id: "gal-dv-01",
    title: "Aerodynamic Disc Valves Collection",
    category: "Disc Valves",
    description: "Aluminium powder-coated white, Grade 304/316 stainless steel, and TDV series ABS plastic supply & exhaust disc valves.",
    image: "/images/products/disc-valves.png",
    imageAlt: "Aria Vita Aerodynamic Supply and Exhaust Disc Valves",
    badge: "3 Material Variants",
    productSlug: "disc-valves",
  },
  {
    id: "gal-dv-02",
    title: "TDV Series ABS Plastic Disc Valves",
    category: "Disc Valves",
    description: "Lightweight, corrosion-proof polypropylene disc valves designed for domestic and commercial bathroom extraction.",
    image: "/images/products/plastic-disc-valves.jpg",
    imageAlt: "TDV Series ABS Plastic Disc Valve",
    badge: "Recyclable PP",
    productSlug: "disc-valves",
  },
  {
    id: "gal-ac-01",
    title: "High-Efficiency Air Curtain Barrier Unit",
    category: "Air Curtains",
    description: "Centrifugal blower air curtain unit engineered for commercial mall entrances, cleanrooms, and industrial loading bays.",
    image: "/images/products/air-curtains.jpg",
    imageAlt: "Aria Vita Commercial and Industrial Air Curtain",
    badge: "Centrifugal Blowers",
    productSlug: "air-curtain",
  },
  {
    id: "gal-fd-01",
    title: "Multi-Ply Aluminium Flexible Ducting",
    category: "Flexible Ducts",
    description: "1 ply Aluminium + 2 ply Polyester flexible ducting with encapsulated spring steel wire helix for high velocity airflow.",
    image: "/images/products/flexible-duct.jpg",
    imageAlt: "AriaVita Multi-Ply Flexible Ducting",
    badge: "30 m/s Max Velocity",
    productSlug: "flexible-duct",
  },
  {
    id: "gal-fd-02",
    title: "Flexible Duct Connectors & Joints",
    category: "Flexible Ducts",
    description: "Insulated and uninsulated flexible duct joints engineered for minimal pressure drop and heat resistance.",
    image: "/images/products/flexible-duct-connectors.jpg",
    imageAlt: "HVAC Flexible Duct Connectors",
    badge: "Acoustic & Thermal",
    productSlug: "flexible-duct",
  },
  {
    id: "gal-frc-01",
    title: "Fire Retardent Canvas Connector (92°C & 250°C)",
    category: "Fire Retardent Canvas",
    description: "Fire safety-certified flexible duct connectors engineered for smoke exhaust shafts and high-risk fire zones.",
    image: "/images/products/fire-retardent-canvas.png",
    imageAlt: "Aria Vita Fire Retardent Canvas Flexible Connector",
    badge: "UL 94 V-0",
    productSlug: "fire-retardent-canvas",
  },
  {
    id: "gal-frc-02",
    title: "High-Temperature Fire Proof Canvas",
    category: "Fire Retardent Canvas",
    description: "Heavy-duty 250°C fire-resistant canvas with flange options for commercial kitchen hood exhausts and risers.",
    image: "/images/products/fire-retardant-flexible-duct.jpg",
    imageAlt: "High Temperature Fire Resistant Flexible Duct Canvas",
    badge: "250°C Rated",
    productSlug: "fire-retardent-canvas",
  },
  {
    id: "gal-inst-01",
    title: "Commercial Office Tower Airflow Installation",
    category: "Installations",
    description: "Centralized HVAC air distribution and CAR airflow regulators deployed in high-rise corporate office towers.",
    image: "/images/industries/commercial-buildings.jpg",
    imageAlt: "Commercial Office Building HVAC Airflow System",
    badge: "Commercial Tower",
  },
  {
    id: "gal-inst-02",
    title: "Sterile Cleanroom & Healthcare Installation",
    category: "Installations",
    description: "Stainless steel SS air curtains and Grade 316 SS disc valves installed in pharmaceutical cleanrooms.",
    image: "/images/industries/hospitals-healthcare.jpg",
    imageAlt: "Hospital Cleanroom HVAC Ventilation Installation",
    badge: "Cleanroom Grade",
  },
  {
    id: "gal-inst-03",
    title: "Mission-Critical Data Center Cooling Installation",
    category: "Installations",
    description: "Constant Airflow Regulators maintaining cold-aisle static pressure balance in high-density server rooms.",
    image: "/images/industries/data-centers.jpg",
    imageAlt: "Data Center Airflow & Pressure Regulation System",
    badge: "Data Center",
  },
  {
    id: "gal-inst-04",
    title: "Heavy Industrial Manufacturing Facility Installation",
    category: "Installations",
    description: "Industrial high-velocity air curtains (AACH) and fire retardent canvas duct connectors installed in factory bays.",
    image: "/images/industries/manufacturing-plants.jpg",
    imageAlt: "Industrial Factory Air Barrier and Smoke Exhaust System",
    badge: "Heavy Industrial",
  },
];
