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

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: "Airflow Control" | "Fire Safety" | "Air Distribution" | "Flexible Ducting" | "Air Barriers" | "Accessories";
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
}

export interface Industry {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  keyProducts: string[];
}

export const COMPANY_INFO = {
  name: "ARIA VITA™",
  tagline: "Precision Air. Perfect Comfort.",
  positioning: "Engineering Airflow for Tomorrow",
  concept: "At Aria Vita™, we believe clean, controlled air is the foundation of comfort and safety.",
  business: "Aria Vita™ manufactures and supplies high-performance HVAC air distribution products for commercial, industrial and residential projects.",
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
    phone: "9342050097",
    formattedPhone: "+91 93420 50097",
    website: "www.ariavita.in",
    location: "Bangalore, Karnataka, India",
  },
};

export const PRODUCTS: Product[] = [
  {
    id: "constant-airflow-regulator",
    slug: "constant-airflow-regulator",
    name: "Constant Airflow Regulator (CAR)",
    subtitle: "Maintain consistent airflow despite duct pressure fluctuations.",
    category: "Airflow Control",
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
      "Operating Pressure Range": "50–250 Pa",
      "Maximum Operating Temp": "60°C",
      "Adjustment Method": "Screwdriver airflow rate calibration",
      "Housing Material": "High-impact Polystyrene",
      "Color": "Black",
      "Available Diameter Sizes": "Ø80, Ø100, Ø125, Ø150, Ø160, Ø200, Ø250 mm",
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
  {
    id: "fire-retardant-flexible-duct",
    slug: "fire-retardant-flexible-duct",
    name: "Fire Retardant Flexible Duct",
    subtitle: "Safety-first ducting for critical applications.",
    category: "Fire Safety",
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
        title: "Fire Retardant Flexible Duct Safety & Test Compliance Datasheet",
        type: "Technical Data Sheet",
        fileSize: "1.1 MB",
        format: "PDF",
      },
    ],
  },
  {
    id: "plastic-disc-valves",
    slug: "plastic-disc-valves",
    name: "ABS / Plastic Disc Valves",
    subtitle: "Aerodynamic supply and exhaust disc valves for clean air distribution.",
    category: "Air Distribution",
    shortDescription: "TDV Series aerodynamic plastic disc valves for ceiling and wall mounting.",
    description:
      "TDV Series aerodynamic plastic disc valves manufactured from durable, recyclable polypropylene. Designed for smooth air distribution and extraction in commercial offices, residential bathrooms, and domestic ventilation networks.",
    image: "/images/products/plastic-disc-valves.jpg",
    featured: false,
    badges: ["TDV Series", "Polypropylene", "100°C Max Temp"],
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
  {
    id: "flexible-duct",
    slug: "flexible-duct",
    name: "Non-Insulated Flexible Duct",
    subtitle: "High-durability multi-ply flexible ducting for HVAC & ventilation.",
    category: "Flexible Ducting",
    shortDescription: "1 ply Aluminium + 2 ply Polyester flexible ducting with spring steel helix.",
    description:
      "Heavy-duty non-insulated flexible ducting constructed with 1 ply Aluminium combined with 2 ply Polyester (Black) over encapsulated spring steel wire. Engineered for minimal pressure drop, high velocity airflow, and extreme humidity resistance.",
    image: "/images/products/flexible-duct.jpg",
    featured: false,
    badges: ["45 Micron Thickness", "30 m/s Max Velocity", "3000 Pa Pressure"],
    applications: [
      "Ventilation heating and cooling air distribution",
      "Hydroponic ventilation systems",
      "Indoor agriculture & grow rooms",
      "Low and medium pressure HVAC branch lines",
    ],
    features: [
      "Coated Spring Steel Wire Helix",
      "High Humidity and Heat Resistance",
      "Airtight Tear-Resistant Seal",
      "Low Pressure Drop",
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
    id: "air-curtains",
    slug: "air-curtains",
    name: "Air Curtains",
    subtitle: "Create an invisible barrier. Keep dust, insects & temperature in check.",
    category: "Air Barriers",
    shortDescription: "Commercial and industrial air barrier units with centrifugal blowers.",
    description:
      "Aria Vita™ Air Curtains project a continuous high-speed air stream across open doorways, forming an invisible environmental barrier. Reduces air conditioning energy loss, excludes dust, smoke, and flying insects.",
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
  },
  {
    id: "flexible-duct-connectors",
    slug: "flexible-duct-connectors",
    name: "Flexible Duct Connectors & Accessories",
    subtitle: "Flexible solutions for duct stability & vibration isolation.",
    category: "Accessories",
    shortDescription: "Air Duct Vibration Isolation Connectors & Self-Adhesive Insulation Pins.",
    description:
      "Essential ductwork connection accessories designed to decouple mechanical AHU fan vibration, prevent acoustic resonance transfer in metal duct runs, and mount thermal insulation cleanly.",
    image: "/images/products/flexible-duct-connectors.jpg",
    featured: false,
    badges: ["Vibration Isolation", "Self-Adhesive Pins", "Galvanized Steel Edging"],
    applications: [
      "AHU and fan coil unit duct connection joints",
      "Vibration decoupling in main air supply runs",
      "Thermal & acoustic insulation pin attachment",
    ],
    features: [
      "Air Duct Vibration Isolation Connector",
      "Self-Adhesive Pins for Insulation Mounting",
      "Airtight Mechanical Metal-to-Fabric Seam",
      "Corrosion-Resistant Galvanized Steel",
    ],
    specifications: {
      "Primary Component": "Air Duct Vibration Isolation Connector",
      "Reference Accessory": "Self-Adhesive Pins",
      "Operating Pressure": "Up to 2500 Pa",
    },
  },
];

export const INDUSTRIES: Industry[] = [
  {
    id: "commercial-buildings",
    slug: "commercial-buildings",
    name: "Commercial Buildings",
    description: "High-rise office towers, IT parks, and corporate headquarters requiring quiet, energy-efficient airflow regulation and balanced ventilation.",
    image: "/images/industries/commercial-buildings.jpg",
    keyProducts: ["Constant Airflow Regulator", "ABS / Plastic Disc Valves", "Non-Insulated Flexible Duct"],
  },
  {
    id: "hospitals-healthcare",
    slug: "hospitals-healthcare",
    name: "Hospitals & Healthcare",
    description: "Sterile surgical cleanrooms, isolation wards, and diagnostic labs demanding precise pressure control and fire safety ducting.",
    image: "/images/industries/hospitals-healthcare.jpg",
    keyProducts: ["Fire Retardant Flexible Duct", "Constant Airflow Regulator", "Air Curtains"],
  },
  {
    id: "hotels-hospitality",
    slug: "hotels-hospitality",
    name: "Hotels & Hospitality",
    description: "Luxury guest rooms, banquet halls, and commercial kitchens requiring low-noise ventilation valves and stainless steel air barriers.",
    image: "/images/industries/commercial-buildings.jpg",
    keyProducts: ["ABS / Plastic Disc Valves", "AACS Stainless Steel Air Curtains", "Constant Airflow Regulator"],
  },
  {
    id: "malls-retail",
    slug: "malls-retail",
    name: "Malls & Retail",
    description: "Heavy foot-traffic retail hubs and shopping centers requiring high-capacity motion-sensor air curtains and balanced fresh air supply.",
    image: "/images/industries/commercial-buildings.jpg",
    keyProducts: ["AACA-MS Air Curtains", "Non-Insulated Flexible Duct", "ABS / Plastic Disc Valves"],
  },
  {
    id: "data-centers",
    slug: "data-centers",
    name: "Data Centers",
    description: "Mission-critical server facilities requiring precise cold-aisle pressure control and vibration isolation connections.",
    image: "/images/industries/data-centers.jpg",
    keyProducts: ["Constant Airflow Regulator", "Flexible Duct Connectors & Accessories"],
  },
  {
    id: "manufacturing-plants",
    slug: "manufacturing-plants",
    name: "Manufacturing Plants",
    description: "Heavy industrial production facilities requiring robust smoke exhaust ducting and high-velocity industrial air barriers.",
    image: "/images/industries/manufacturing-plants.jpg",
    keyProducts: ["AACH Heavy Duty Air Curtains", "Fire Retardant Flexible Duct"],
  },
  {
    id: "educational-institutions",
    slug: "educational-institutions",
    name: "Educational Institutions",
    description: "Universities, research auditoriums, and schools requiring whisper-quiet disc valves and reliable room air exchanges.",
    image: "/images/industries/commercial-buildings.jpg",
    keyProducts: ["ABS / Plastic Disc Valves", "Constant Airflow Regulator"],
  },
  {
    id: "food-processing-units",
    slug: "food-processing-units",
    name: "Food Processing Units",
    description: "Hygienic food packaging and cold storage facilities requiring washdown stainless steel air curtains and airtight ducting.",
    image: "/images/industries/hospitals-healthcare.jpg",
    keyProducts: ["AACS Stainless Steel Air Curtains", "Flexible Duct Connectors & Accessories"],
  },
];

// Helper Functions for Dynamic UI rendering & Future Expansion
export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getProductsByCategory(category: string): Product[] {
  if (!category || category === "All Products" || category === "All") {
    return PRODUCTS;
  }
  return PRODUCTS.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase() || p.category.includes(category)
  );
}

export function getAllCategories(): string[] {
  const categories = Array.from(new Set(PRODUCTS.map((p) => p.category)));
  return ["All Products", ...categories];
}

export function searchProducts(query: string): Product[] {
  if (!query) return PRODUCTS;
  const q = query.toLowerCase();
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.applications.some((app) => app.toLowerCase().includes(q))
  );
}
