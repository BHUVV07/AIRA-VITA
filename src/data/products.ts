export interface ProductModel {
  name: string;
  size?: string;
  weight?: string;
  airflowRange?: string;
  application?: string;
  soundLevel?: string;
  bodyMaterial?: string;
}

export interface TechnicalDocument {
  id: string;
  title: string;
  type: "Product Catalogue" | "Technical Data Sheet" | "Performance Data" | "Installation Manual";
  fileSize: string;
  format: "PDF";
}

export interface ProductSubcategory {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  description?: string;
  image?: string;
  isComingSoon?: boolean;
  applications?: string[];
  features?: string[];
  standards?: string[];
  specifications?: Record<string, string | number>;
  models?: ProductModel[];
  technicalDocuments?: TechnicalDocument[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  fullName?: string;
  subtitle: string;
  category: string;
  shortDescription: string;
  description: string;
  image: string;
  gallery?: string[];
  applications: string[];
  features: string[];
  standards?: string[];
  specifications: Record<string, string | number>;
  models?: ProductModel[];
  badges?: string[];
  featured?: boolean;
  technicalDocuments?: TechnicalDocument[];
  subcategories?: ProductSubcategory[];
}

export type ProductItem = Product;

export interface Industry {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  keyProducts: string[];
}

export const COMPANY_INFO = {
  name: "ARIA VITA",
  tagline: "Precision Air. Perfect Comfort.",
  positioning: "Engineering Airflow for Tomorrow",
  concept: "At Aria Vita, we believe clean, controlled air is the foundation of comfort and safety.",
  business: "Aria Vita manufactures and supplies high-performance HVAC air distribution products for commercial, industrial and residential projects.",
  focus: [
    "Quality Engineering",
    "Technical Support",
    "Product Performance",
    "Project Requirements",
    "Reliable Delivery",
  ],
  principles: [
    {
      number: "01",
      title: "QUALITY FIRST",
      description: "Tested for fire safety, durability and performance.",
    },
    {
      number: "02",
      title: "PAN INDIA REACH",
      description: "Distribution & support via Ecosta Systems, Bangalore.",
    },
    {
      number: "03",
      title: "TECHNICAL EXPERTISE",
      description: "Product selection, sizing & installation support.",
    },
    {
      number: "04",
      title: "FAST DELIVERY",
      description: "Ready stock for urgent project requirements.",
    },
  ],
  distributor: {
    name: "Ecosta Systems",
    location: "Bangalore - 560008",
    address: "Bangalore - 560008, Karnataka, India",
    tagline: "Authorized Distributor",
  },
  contact: {
    email: "info@ariavita.in",
    phone: "9342050099",
    formattedPhone: "+91 93420 50099",
    website: "www.ariavita.in",
    location: "Bangalore, Karnataka, India",
  },
};

export const PRODUCTS: Product[] = [
  {
    id: "disc-valves",
    slug: "disc-valves",
    name: "Disc Valves",
    subtitle: "Aerodynamic supply and exhaust disc valves for clean air distribution.",
    category: "Disc Valves",
    shortDescription: "Aerodynamic disc valves available in Aluminium Powder Coated, Stainless Steel, and ABS Plastic variants.",
    description:
      "Disc valves engineered for ceiling and wall mounting in supply and exhaust ventilation systems. Designed for smooth air distribution, minimal pressure drop, and low acoustic emission across commercial, residential, and industrial HVAC applications.",
    image: "/images/products/plastic-disc-valves.jpg",
    featured: true,
    badges: ["3 Material Variants", "Supply & Exhaust", "Aerodynamic Design"],
    subcategories: [
      {
        id: "aluminium-powder-coated",
        slug: "aluminium-powder-coated",
        name: "Aluminium Powder Coated",
        subtitle: "Architectural aluminium disc valves with durable powder-coated finish.",
        description: "High-grade aluminium disc valves finished with electrostatic powder coating for superior corrosion resistance and seamless architectural integration in premium HVAC systems.",
        isComingSoon: true,
      },
      {
        id: "stainless-steel",
        slug: "stainless-steel",
        name: "Stainless Steel",
        subtitle: "Corrosion-resistant stainless steel disc valves for hygienic environments.",
        description: "Heavy-duty stainless steel disc valves engineered specifically for cleanrooms, laboratories, commercial kitchens, and aggressive ambient environments.",
        isComingSoon: true,
      },
      {
        id: "abs-plastic",
        slug: "abs-plastic",
        name: "ABS Plastic",
        subtitle: "TDV Series aerodynamic plastic disc valves for ceiling and wall mounting.",
        description: "TDV Series aerodynamic plastic disc valves manufactured from durable, recyclable polypropylene. Designed for smooth air distribution and extraction in commercial offices, residential bathrooms, and domestic ventilation networks.",
        image: "/images/products/plastic-disc-valves.jpg",
        isComingSoon: false,
        applications: [
          "Domestic bathroom & kitchen extraction",
          "Commercial office air distribution",
          "Hotel room supply & return air",
          "Industrial amenity ventilation",
        ],
        features: [
          "Aerodynamic Design",
          "Low Sound Level",
          "Large Volume Air Capacity",
          "Quick & Easy Installation",
          "Corrosion-Proof Recyclable Polypropylene",
        ],
        specifications: {
          "Series": "TDV Series",
          "Material": "Recyclable Polypropylene",
          "Maximum Temperature": "100°C",
          "Mounting Frame": "Bayonet ring clamp",
          "Airflow Pattern": "360° Radial Dispersion",
        },
        models: [
          { name: "TDV 80", size: "Ø80 mm", application: "Small bathroom exhaust", soundLevel: "< 24 dB(A)" },
          { name: "TDV 100", size: "Ø100 mm", application: "Standard washroom / kitchen", soundLevel: "< 26 dB(A)" },
          { name: "TDV 125", size: "Ø125 mm", application: "Commercial office supply", soundLevel: "< 28 dB(A)" },
          { name: "TDV 160", size: "Ø160 mm", application: "High-flow exhaust zone", soundLevel: "< 31 dB(A)" },
          { name: "TDV 200", size: "Ø200 mm", application: "Large space air transfer", soundLevel: "< 34 dB(A)" },
        ],
      },
    ],
    applications: [
      "Domestic bathroom & kitchen extraction",
      "Commercial office air distribution",
      "Hotel room supply & return air",
      "Industrial amenity ventilation",
    ],
    features: [
      "Aerodynamic Design",
      "Low Sound Level",
      "Large Volume Air Capacity",
      "Quick & Easy Installation",
      "Corrosion-Proof Materials",
    ],
    specifications: {
      "Available Variants": "Aluminium Powder Coated, Stainless Steel, ABS Plastic",
      "Mounting": "Ceiling & Wall Mounting",
      "Airflow Dispersion": "360° Radial Dispersion Pattern",
    },
  },
  {
    id: "air-curtain",
    slug: "air-curtain",
    name: "Air Curtain",
    subtitle: "Create an invisible barrier. Keep dust, insects & temperature in check.",
    category: "Air Curtain",
    shortDescription: "Commercial and industrial air curtain barrier units with centrifugal blowers.",
    description:
      "Aria Vita Air Curtains project a continuous high-speed air stream across open doorways, forming an invisible environmental barrier. Reduces air conditioning energy loss, excludes dust, smoke, and flying insects.",
    image: "/images/products/air-curtains.jpg",
    featured: true,
    badges: ["Width 900–1800 mm", "Height 7–18 ft", "4 Series Options"],
    applications: [
      "Mall entrances & retail shops",
      "Hospitals & healthcare lobbies",
      "Clean rooms & pharmaceutical labs",
      "Factories, warehouses & cold storage",
    ],
    features: [
      "Substantial Energy Saving",
      "Dust & Insect Exclusion Barrier",
      "Multiple Body Options (Aluminium & Stainless Steel)",
      "Optional Inbuilt Motion Sensor",
      "Low Noise Centrifugal Operation",
    ],
    specifications: {
      "Width Range": "900 mm to 1800 mm",
      "Door Height Coverage": "7 ft to 18 ft",
      "Blower Type": "Centrifugal direct-drive fan wheels",
    },
    models: [
      { name: "AACA Series", bodyMaterial: "Aluminium Body", application: "Mall entrances, retail shops, hospitals" },
      { name: "AACS Series", bodyMaterial: "Stainless Steel Body", application: "Clean rooms, commercial kitchens, food processing" },
      { name: "AACH Series", bodyMaterial: "Heavy Duty Body", application: "Factories, warehouses, industrial bays" },
      { name: "AACA-MS Series", bodyMaterial: "Aluminium + Motion Sensor", application: "Retail stores, automated office entrances" },
    ],
    technicalDocuments: [
      {
        id: "doc-ac-01",
        title: "Air Curtain Selection Matrix & Technical Specifications",
        type: "Product Catalogue",
        fileSize: "2.6 MB",
        format: "PDF",
      },
    ],
  },
  {
    id: "flexible-duct",
    slug: "flexible-duct",
    name: "Flexible Duct",
    subtitle: "High-durability multi-ply flexible ducting for HVAC & ventilation.",
    category: "Flexible Duct",
    shortDescription: "1 ply Aluminium + 2 ply Polyester flexible ducting with spring steel helix.",
    description:
      "High-performance flexible ducting engineered for HVAC air distribution, indoor agriculture, and hydroponic ventilation systems. Offers high velocity capability, minimal pressure drop, and superior humidity resistance.",
    image: "/images/products/flexible-duct.jpg",
    featured: true,
    badges: ["Non-Insulated & Insulated", "30 m/s Max Velocity", "3000 Pa Pressure"],
    subcategories: [
      {
        id: "non-insulated",
        slug: "non-insulated",
        name: "Non-Insulated",
        subtitle: "1 ply Aluminium + 2 ply Polyester (Black) flexible ducting.",
        description: "Heavy-duty non-insulated flexible ducting constructed with 1 ply Aluminium combined with 2 ply Polyester (Black) over encapsulated spring steel wire. Engineered for minimal pressure drop, high velocity airflow, and extreme humidity resistance.",
        image: "/images/products/flexible-duct.jpg",
        isComingSoon: false,
        applications: [
          "Ventilation heating and cooling",
          "Hydroponic ventilation",
          "Indoor agriculture",
          "Grow rooms",
          "Low and medium pressure applications",
        ],
        features: [
          "Coated spring steel wire",
          "Resistant to humidity and heat",
          "Airtight",
          "Low pressure drop",
        ],
        specifications: {
          "Construction": "1 ply Aluminium + 2 ply Polyester (Black)",
          "Nominal Thickness": "45 micron",
          "Diameter": "102–508 mm",
          "Operating Temperature": "-30°C to +120°C",
          "Maximum Air Velocity": "30 m/s",
          "Maximum Operating Pressure": "3000 Pa",
          "Standard Length": "5 m / 10 m",
        },
      },
      {
        id: "insulated",
        slug: "insulated",
        name: "Insulated",
        subtitle: "Thermal and acoustic insulated flexible ducting.",
        description: "Thermal insulated flexible ducting with acoustic fiber wool layer engineered to eliminate condensation and reduce duct breakout noise.",
        isComingSoon: true,
      },
    ],
    applications: [
      "Ventilation heating and cooling",
      "Hydroponic ventilation",
      "Indoor agriculture",
      "Grow rooms",
      "Low and medium pressure applications",
    ],
    features: [
      "Coated spring steel wire",
      "Resistant to humidity and heat",
      "Airtight",
      "Low pressure drop",
    ],
    specifications: {
      "Construction": "1 ply Aluminium + 2 ply Polyester (Black)",
      "Nominal Thickness": "45 micron",
      "Diameter Range": "102–508 mm",
      "Operating Temperature": "-30°C to +120°C",
      "Maximum Air Velocity": "30 m/s",
      "Maximum Operating Pressure": "3000 Pa",
      "Standard Length": "5 m / 10 m",
    },
  },
  {
    id: "fire-retardent-canvas",
    slug: "fire-retardent-canvas",
    name: "Fire Retardent Canvas",
    subtitle: "Safety-first ducting for critical applications.",
    category: "Fire Retardent Canvas",
    shortDescription: "Fire safety-certified flexible ducting for smoke exhaust and high-risk HVAC zones.",
    description:
      "Safety-first flexible ducting engineered specifically for smoke extraction systems, commercial kitchen exhausts, and fire-rated building shafts. Built with multi-layer fire retardant composite material that prevents flame propagation while maintaining high acoustic flexibility.",
    image: "/images/products/fire-retardant-flexible-duct.jpg",
    featured: true,
    badges: ["BS 476 Part 7 Class 1", "ASTM E84 Class A", "UL 94 V-0"],
    applications: [
      "Smoke exhaust systems",
      "Kitchen exhaust hood connections",
      "High-risk fire rated building zones",
      "Stairwell pressurization & safety shafts",
    ],
    features: [
      "Fire Retardant Composite Construction",
      "High Temperature Resistance",
      "Lightweight & Highly Flexible",
      "Quick & Tool-less Installation",
    ],
    standards: [
      "BS 476 Part 7 Class 1",
      "ASTM E84 Class A",
      "UL 94 V-0",
    ],
    specifications: {
      "Material Construction": "Fire-Retardant Multi-Layer Composite",
      "Fire Safety Standards": "BS 476 Part 7 Class 1 / ASTM E84 Class A / UL 94 V-0",
      "Temperature Range": "-30°C to +140°C",
      "Flexibility Radius": "0.6 x Diameter",
    },
    technicalDocuments: [
      {
        id: "doc-frd-01",
        title: "Fire Retardent Canvas Safety & Test Compliance Datasheet",
        type: "Technical Data Sheet",
        fileSize: "1.1 MB",
        format: "PDF",
      },
    ],
  },
  {
    id: "car",
    slug: "car",
    name: "CAR",
    fullName: "Constant Airflow Regulator",
    subtitle: "Maintain consistent airflow despite duct pressure fluctuations.",
    category: "CAR",
    shortDescription: "Self-balancing mechanical air regulator for constant volumetric airflow in HVAC ducts.",
    description:
      "The Constant Airflow Regulator (CAR) is a self-adjusting mechanical device designed to automatically balance air distribution systems. Operating between 50 and 250 Pa static pressure, the CAR internal inflatable membrane adjusts its passage cross-section in response to duct pressure variations, ensuring calibrated CFM rates without electrical sensors.",
    image: "/images/products/constant-airflow-regulator.jpg",
    featured: true,
    badges: ["Flagship Technology", "50–250 Pa Control", "Zero Power"],
    applications: [
      "Multi-story residential apartment exhaust shafts",
      "Hotel bathroom & room ventilation risers",
      "Commercial office fresh air distribution",
      "Hospital room supply & extract airflow balance",
    ],
    features: [
      "Automatic Duct Pressure Compensation",
      "Screwdriver Airflow Calibration Adjustment",
      "Airtight Seal Ring Gasket",
      "Durable Polystyrene Housing",
      "Zero Electrical Wiring Required",
    ],
    specifications: {
      "Pressure range": "50–250 Pa",
      "Maximum temperature": "60°C",
      "Material": "Polystyrene",
      "Colour": "Black",
      "Available sizes": "Ø80, Ø100, Ø125, Ø150, Ø160, Ø200, Ø250",
    },
    models: [
      { name: "CAR Ø80", size: "Ø80 mm", airflowRange: "15 – 90 m³/h", weight: "0.12 kg" },
      { name: "CAR Ø100", size: "Ø100 mm", airflowRange: "15 – 120 m³/h", weight: "0.15 kg" },
      { name: "CAR Ø125", size: "Ø125 mm", airflowRange: "15 – 180 m³/h", weight: "0.19 kg" },
      { name: "CAR Ø150", size: "Ø150 mm", airflowRange: "50 – 300 m³/h", weight: "0.24 kg" },
      { name: "CAR Ø160", size: "Ø160 mm", airflowRange: "50 – 300 m³/h", weight: "0.26 kg" },
      { name: "CAR Ø200", size: "Ø200 mm", airflowRange: "100 – 500 m³/h", weight: "0.38 kg" },
      { name: "CAR Ø250", size: "Ø250 mm", airflowRange: "150 – 700 m³/h", weight: "0.52 kg" },
    ],
    technicalDocuments: [
      {
        id: "doc-car-01",
        title: "CAR Constant Airflow Regulator Sizing & Technical Data",
        type: "Performance Data",
        fileSize: "1.8 MB",
        format: "PDF",
      },
    ],
  },
];

export const INDUSTRIES: Industry[] = [
  {
    id: "commercial-buildings",
    slug: "commercial-buildings",
    name: "Commercial Buildings",
    description: "High-rise office towers, IT parks, and corporate headquarters requiring quiet, energy-efficient airflow regulation and balanced ventilation.",
    image: "/images/industries/commercial-buildings.jpg",
    keyProducts: ["CAR", "Disc Valves", "Flexible Duct"],
  },
  {
    id: "hospitals-healthcare",
    slug: "hospitals-healthcare",
    name: "Hospitals & Healthcare",
    description: "Sterile surgical cleanrooms, isolation wards, and diagnostic labs demanding precise pressure control and fire safety ducting.",
    image: "/images/industries/hospitals-healthcare.jpg",
    keyProducts: ["Fire Retardent Canvas", "CAR", "Air Curtain"],
  },
  {
    id: "hotels-hospitality",
    slug: "hotels-hospitality",
    name: "Hotels & Hospitality",
    description: "Luxury guest rooms, banquet halls, and commercial kitchens requiring low-noise ventilation valves and stainless steel air barriers.",
    image: "/images/industries/commercial-buildings.jpg",
    keyProducts: ["Disc Valves", "Air Curtain", "CAR"],
  },
  {
    id: "malls-retail",
    slug: "malls-retail",
    name: "Malls & Retail",
    description: "Heavy foot-traffic retail hubs and shopping centers requiring high-capacity motion-sensor air curtains and balanced fresh air supply.",
    image: "/images/industries/commercial-buildings.jpg",
    keyProducts: ["Air Curtain", "Flexible Duct", "Disc Valves"],
  },
  {
    id: "data-centers",
    slug: "data-centers",
    name: "Data Centers",
    description: "Mission-critical server facilities requiring precise cold-aisle pressure control and vibration isolation connections.",
    image: "/images/industries/data-centers.jpg",
    keyProducts: ["CAR", "Flexible Duct"],
  },
  {
    id: "manufacturing-plants",
    slug: "manufacturing-plants",
    name: "Manufacturing Plants",
    description: "Heavy industrial production facilities requiring robust smoke exhaust ducting and high-velocity industrial air barriers.",
    image: "/images/industries/manufacturing-plants.jpg",
    keyProducts: ["Air Curtain", "Fire Retardent Canvas"],
  },
  {
    id: "educational-institutions",
    slug: "educational-institutions",
    name: "Educational Institutions",
    description: "Universities, research auditoriums, and schools requiring whisper-quiet disc valves and reliable room air exchanges.",
    image: "/images/industries/commercial-buildings.jpg",
    keyProducts: ["Disc Valves", "CAR"],
  },
  {
    id: "food-processing-units",
    slug: "food-processing-units",
    name: "Food Processing Units",
    description: "Hygienic food packaging and cold storage facilities requiring washdown stainless steel air curtains and airtight ducting.",
    image: "/images/industries/hospitals-healthcare.jpg",
    keyProducts: ["Air Curtain", "Flexible Duct"],
  },
];

// Helper Functions for Dynamic UI rendering & Future Expansion
export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  if (!slug) return undefined;
  const s = slug.toLowerCase();
  
  // Direct match on main slug or alias
  const mainMatch = PRODUCTS.find((p) => p.slug === s || p.id === s);
  if (mainMatch) return mainMatch;

  // Handle aliases
  if (s === "constant-airflow-regulator") return PRODUCTS.find((p) => p.slug === "car");
  if (s === "plastic-disc-valves" || s === "abs-plastic-disc-valves") return PRODUCTS.find((p) => p.slug === "disc-valves");
  if (s === "fire-retardant-flexible-duct") return PRODUCTS.find((p) => p.slug === "fire-retardent-canvas");
  if (s === "air-curtains") return PRODUCTS.find((p) => p.slug === "air-curtain");
  if (s === "non-insulated-flexible-duct") return PRODUCTS.find((p) => p.slug === "flexible-duct");

  // Handle subcategory slug lookup
  for (const prod of PRODUCTS) {
    if (prod.subcategories) {
      const sub = prod.subcategories.find((sc) => sc.slug === s || sc.id === s);
      if (sub) return prod;
    }
  }

  return undefined;
}

export function getSubcategoryBySlug(productSlug: string, subcategorySlug: string): { product: Product; subcategory: ProductSubcategory } | undefined {
  const product = getProductBySlug(productSlug);
  if (!product || !product.subcategories) return undefined;

  const sub = product.subcategories.find(
    (sc) => sc.slug.toLowerCase() === subcategorySlug.toLowerCase() || sc.id.toLowerCase() === subcategorySlug.toLowerCase()
  );

  if (sub) {
    return { product, subcategory: sub };
  }
  return undefined;
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getProductsByCategory(category: string): Product[] {
  if (!category || category === "All Products" || category === "All") {
    return PRODUCTS;
  }
  const catLower = category.toLowerCase();
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase() === catLower ||
      p.category.toLowerCase() === catLower ||
      p.subcategories?.some((sc) => sc.name.toLowerCase() === catLower)
  );
}

export function getAllCategories(): string[] {
  return [
    "All Products",
    "Disc Valves",
    "Air Curtain",
    "Flexible Duct",
    "Fire Retardent Canvas",
    "CAR",
  ];
}

export function searchProducts(query: string): Product[] {
  if (!query) return PRODUCTS;
  const q = query.toLowerCase();
  return PRODUCTS.filter((p) => {
    const nameMatch = p.name.toLowerCase().includes(q) || (p.fullName && p.fullName.toLowerCase().includes(q));
    const subtitleMatch = p.subtitle.toLowerCase().includes(q);
    const catMatch = p.category.toLowerCase().includes(q);
    const descMatch = p.description.toLowerCase().includes(q);
    const appMatch = p.applications?.some((app) => app.toLowerCase().includes(q));
    const featMatch = p.features?.some((f) => f.toLowerCase().includes(q));
    const modelMatch = p.models?.some((m) => m.name.toLowerCase().includes(q) || (m.size && m.size.toLowerCase().includes(q)));
    
    // Subcategory matches
    const subMatch = p.subcategories?.some(
      (sc) =>
        sc.name.toLowerCase().includes(q) ||
        (sc.description && sc.description.toLowerCase().includes(q)) ||
        sc.applications?.some((app) => app.toLowerCase().includes(q)) ||
        sc.features?.some((f) => f.toLowerCase().includes(q)) ||
        sc.models?.some((m) => m.name.toLowerCase().includes(q) || (m.size && m.size.toLowerCase().includes(q)))
    );

    // Specifications matches
    const specMatch = Object.entries(p.specifications || {}).some(
      ([k, v]) => k.toLowerCase().includes(q) || String(v).toLowerCase().includes(q)
    );

    return nameMatch || subtitleMatch || catMatch || descMatch || appMatch || featMatch || modelMatch || subMatch || specMatch;
  });
}

