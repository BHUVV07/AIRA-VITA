export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: string;
  description: string;
  image: string;
  applications: string[];
  features: string[];
  standards?: string[];
  specifications: Record<string, string | number>;
  models?: Array<{
    name: string;
    size?: string;
    weight?: string;
    airflowRange?: string;
    application?: string;
    soundLevel?: string;
  }>;
}

export interface IndustryItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  keyProducts: string[];
  complianceNotes?: string;
}

export interface TechnicalResource {
  id: string;
  title: string;
  product: string;
  type: "Product Catalogues" | "Technical Data Sheets" | "Performance Data" | "Installation Information";
  fileSize: string;
  format: "PDF";
  updatedDate: string;
}

export const COMPANY_INFO = {
  name: "ARIA VITA",
  tagline: "Precision Air. Perfect Comfort.",
  positioning: "Engineering Airflow for Tomorrow",
  concept: "At Aria Vita, we believe clean, controlled air is the foundation of comfort and safety.",
  business: "Manufacturer and supplier of air distribution products for commercial, industrial and residential HVAC applications.",
  focus: [
    "Quality Engineering",
    "Technical Support",
    "Product Performance",
    "Project Requirements",
    "Reliable Delivery",
  ],
  distributor: {
    name: "Ecosta Systems",
    location: "Bangalore - 560008",
    address: "Bangalore - 560008, Karnataka, India",
    tagline: "Authorized Pan India Distributor & Technical Support Partner",
  },
  contact: {
    email: "info@ariavita.in",
    phone: "9342050099",
    formattedPhone: "+91 93420 50099",
    website: "www.ariavita.in",
    location: "Bangalore, Karnataka, India",
  },
};

export const PRODUCTS: ProductItem[] = [
  {
    id: "fire-retardant-flexible-duct",
    slug: "fire-retardant-flexible-duct",
    name: "Fire Retardant Flexible Duct",
    subtitle: "Safety-first flexible ducting for demanding HVAC applications",
    category: "Fire Safety & Ducting",
    description:
      "Safety-first flexible ducting designed for high-risk zones, kitchen exhausts, and smoke extraction systems. Built with certified fire-retardant materials to prevent flame spread and ensure passive safety compliance in commercial and industrial HVAC installations.",
    image: "/images/products/fire-retardant-flexible-duct.jpg",
    applications: [
      "Smoke exhaust systems",
      "Commercial kitchen exhaust hood connections",
      "High-risk fire rated building zones",
      "Stairwell pressurization & safety shafts",
    ],
    features: [
      "Fire Retardant Construction",
      "High Temperature Resistance",
      "Lightweight & Highly Flexible",
      "Quick & Easy Installation",
    ],
    standards: [
      "BS 476 Part 7 Class 1",
      "ASTM E84 Class A",
      "UL 94 V-0",
    ],
    specifications: {
      "Material Construction": "Fire-Retardant Multi-Layer Composite",
      "Fire Safety Classification": "BS 476 Part 7 Class 1 / ASTM E84 Class A / UL 94 V-0",
      "Temperature Range": "-30°C to +140°C",
      "Installation Profile": "Tool-less collar clamp mounting",
      "Flexibility Radius": "0.6 x Diameter",
    },
  },
  {
    id: "constant-airflow-regulator",
    slug: "constant-airflow-regulator",
    name: "Constant Airflow Regulator (CAR)",
    subtitle: "Maintain consistent airflow despite duct pressure fluctuations",
    category: "Airflow Control",
    description:
      "Self-balancing mechanical air regulator that automatically adjusts duct cross-section to maintain a pre-set constant airflow independent of duct pressure variations. Engineered for energy-efficient commercial and residential ventilation.",
    image: "/images/products/constant-airflow-regulator.jpg",
    applications: [
      "Multi-story residential apartment exhaust shafts",
      "Hotel bathroom & room ventilation",
      "Commercial office fresh air distribution",
      "Hospital room supply & extract balance",
    ],
    features: [
      "Automatic Pressure Compensation",
      "Easy Screwdriver Airflow Adjustment",
      "Airtight Seal Ring Gasket",
      "Durable Polystyrene Housing",
      "Zero Electrical Power Required",
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
  },
  {
    id: "plastic-disc-valves",
    slug: "plastic-disc-valves",
    name: "Plastic Disc Valves",
    subtitle: "Aerodynamic supply and exhaust disc valves for clean air distribution",
    category: "Air Distribution",
    description:
      "TDV Series aerodynamic plastic disc valves engineered for ceiling and wall mounting in supply and exhaust ventilation systems. Manufactured from durable, recyclable polypropylene with low sound emission profiles.",
    image: "/images/products/plastic-disc-valves.jpg",
    applications: [
      "Domestic bathroom & kitchen extraction",
      "Commercial office air distribution",
      "Hotel room supply & return air",
      "Industrial amenity ventilation",
    ],
    features: [
      "Aerodynamic Air Flow Profile",
      "Low Acoustic Sound Profile",
      "High Volume Air Capacity",
      "Quick & Tool-less Installation",
      "Corrosion-Proof Polypropylene",
    ],
    specifications: {
      "Series": "TDV Series",
      "Material": "Recyclable Polypropylene",
      "Maximum Operating Temp": "100°C",
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
    subtitle: "High-durability multi-ply flexible ducting for HVAC & ventilation",
    category: "Flexible Ducting",
    description:
      "Robust non-insulated flexible ducting constructed with 1 ply Aluminium combined with 2 ply Polyester over high-tension encapsulated spring steel wire helix. Engineered for low pressure drop and high air velocity.",
    image: "/images/products/flexible-duct.jpg",
    applications: [
      "Ventilation heating & cooling air distribution",
      "Hydroponic ventilation systems",
      "Indoor agriculture & grow room airflow",
      "Low and medium pressure HVAC branch lines",
    ],
    features: [
      "Coated Spring Steel Wire Helix",
      "Resistant to Humidity and Heat",
      "Airtight Tear-Resistant Seal",
      "Minimal Internal Pressure Drop",
    ],
    specifications: {
      "Layer Construction": "1 Ply Aluminium + 2 Ply Polyester (Black)",
      "Nominal Wall Thickness": "45 micron",
      "Diameter Range": "102 mm to 508 mm",
      "Operating Temperature": "-30°C to +120°C",
      "Maximum Air Velocity": "30 m/s",
      "Maximum Operating Pressure": "3000 Pa",
      "Standard Pack Lengths": "5 m / 10 m rolls",
    },
  },
  {
    id: "air-curtains",
    slug: "air-curtains",
    name: "Air Curtains",
    subtitle: "Create an invisible barrier. Keep dust, insects and temperature in check.",
    category: "Air Barrier Systems",
    description:
      "Commercial and industrial heavy-duty air curtains designed to create a high-velocity air barrier across open doorways. Prevents conditioned air loss, excludes dust, fumes, and insects, while lowering building energy costs.",
    image: "/images/products/air-curtains.jpg",
    applications: [
      "Commercial mall & store entrances",
      "Cleanrooms & pharmaceutical zones",
      "Hospital lobbies & ICU entrances",
      "Cold storage facilities & food processing",
      "Industrial factory loading bays",
    ],
    features: [
      "Substantial Energy Cost Savings",
      "Effective Dust & Insect Exclusion Barrier",
      "Multiple Heavy-Duty Body Options",
      "Optional Smart Motion Sensor Activation",
      "Low-Noise Centrifugal Blower Wheels",
    ],
    specifications: {
      "Width Range": "900 mm to 1800 mm",
      "Door Height Coverage": "7 ft to 18 ft",
      "Power Input": "Single Phase / Three Phase Options",
      "Blower Type": "Direct drive centrifugal aluminum fan wheels",
    },
    models: [
      { name: "AACA Series", application: "Mall entrances, retail shops, hospital lobbies", size: "Aluminium Body" },
      { name: "AACS Series", application: "Clean rooms, commercial kitchens, food processing units", size: "Stainless Steel Body" },
      { name: "AACH Series", application: "Industrial factories, warehouses, loading bays", size: "Heavy Duty Industrial Body" },
      { name: "AACA-MS Series", application: "Automated retail, corporate office entrances", size: "Aluminium Body + Motion Sensor" },
    ],
  },
  {
    id: "flexible-duct-connectors",
    slug: "flexible-duct-connectors",
    name: "Flexible Duct Connectors & Accessories",
    subtitle: "Air duct vibration isolation joints and acoustic mounting hardware",
    category: "Duct Accessories & Isolation",
    description:
      "Essential duct mounting accessories engineered to isolate equipment vibration, reduce noise transfer in rigid ductwork, and secure acoustic/thermal insulation cleanly.",
    image: "/images/products/flexible-duct-connectors.jpg",
    applications: [
      "AHU and fan coil unit duct connection joints",
      "Vibration decoupling in main air supply runs",
      "Thermal & acoustic insulation pin attachment",
    ],
    features: [
      "High Vibration Decoupling Efficiency",
      "Airtight Mechanical Metal-to-Fabric Seam",
      "Self-Adhesive High-Bond Pin Backing",
      "Corrosion-Resistant Galvanized Steel Edging",
    ],
    specifications: {
      "Primary Component": "Air Duct Vibration Isolation Connector",
      "Reference Accessory": "Self-Adhesive Pins for insulation mounting",
      "Fabric Material": "Heavy-duty airtight vinyl/polyester flexible joint",
      "Operating Pressure": "Up to 2500 Pa",
    },
  },
];

export const INDUSTRIES: IndustryItem[] = [
  {
    id: "commercial-buildings",
    slug: "commercial-buildings",
    name: "Commercial Buildings",
    description: "High-rise office towers, IT parks, and corporate headquarters requiring quiet, energy-efficient airflow regulation and balanced ventilation.",
    image: "/images/industries/commercial-buildings.jpg",
    keyProducts: ["Constant Airflow Regulator", "Plastic Disc Valves", "Flexible Duct"],
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
    keyProducts: ["Plastic Disc Valves", "AACS Air Curtains", "Constant Airflow Regulator"],
  },
  {
    id: "malls-retail",
    slug: "malls-retail",
    name: "Malls & Retail",
    description: "Heavy foot-traffic retail hubs and shopping centers requiring high-capacity motion-sensor air curtains and balanced fresh air supply.",
    image: "/images/industries/commercial-buildings.jpg",
    keyProducts: ["AACA-MS Air Curtains", "Flexible Duct", "Plastic Disc Valves"],
  },
  {
    id: "data-centers",
    slug: "data-centers",
    name: "Data Centers",
    description: "Mission-critical server facilities requiring precise cold-aisle pressure control and vibration isolation connections.",
    image: "/images/industries/data-centers.jpg",
    keyProducts: ["Constant Airflow Regulator", "Flexible Duct Connectors"],
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
    keyProducts: ["TDV Plastic Disc Valves", "Constant Airflow Regulator"],
  },
  {
    id: "food-processing-units",
    slug: "food-processing-units",
    name: "Food Processing Units",
    description: "Hygienic food packaging and cold storage facilities requiring washdown stainless steel air curtains and airtight ducting.",
    image: "/images/industries/hospitals-healthcare.jpg",
    keyProducts: ["AACS Stainless Steel Air Curtains", "Flexible Duct Connectors"],
  },
];

export const TECHNICAL_RESOURCES: TechnicalResource[] = [
  {
    id: "res-01",
    title: "Aria Vita Master Air Distribution Technical Catalogue",
    product: "All Products",
    type: "Product Catalogues",
    fileSize: "4.2 MB",
    format: "PDF",
    updatedDate: "2026-01-15",
  },
  {
    id: "res-02",
    title: "Constant Airflow Regulator (CAR) Sizing & Performance Curves",
    product: "Constant Airflow Regulator (CAR)",
    type: "Performance Data",
    fileSize: "1.8 MB",
    format: "PDF",
    updatedDate: "2026-02-10",
  },
  {
    id: "res-03",
    title: "Fire Retardant Flexible Duct Safety & Test Compliance Datasheet",
    product: "Fire Retardant Flexible Duct",
    type: "Technical Data Sheets",
    fileSize: "1.1 MB",
    format: "PDF",
    updatedDate: "2025-11-20",
  },
  {
    id: "res-04",
    title: "TDV Series Plastic Disc Valves Airflow & Sound Level Manual",
    product: "Plastic Disc Valves",
    type: "Technical Data Sheets",
    fileSize: "950 KB",
    format: "PDF",
    updatedDate: "2026-01-05",
  },
  {
    id: "res-05",
    title: "Non-Insulated Flexible Duct Installation & Radius Guidelines",
    product: "Non-Insulated Flexible Duct",
    type: "Installation Information",
    fileSize: "1.4 MB",
    format: "PDF",
    updatedDate: "2025-12-18",
  },
  {
    id: "res-06",
    title: "Air Curtains Commercial & Industrial Selection Matrix",
    product: "Air Curtains",
    type: "Product Catalogues",
    fileSize: "2.6 MB",
    format: "PDF",
    updatedDate: "2026-02-28",
  },
  {
    id: "res-07",
    title: "Duct Vibration Isolation Connector Technical Specification Sheet",
    product: "Flexible Duct Connectors & Accessories",
    type: "Technical Data Sheets",
    fileSize: "880 KB",
    format: "PDF",
    updatedDate: "2025-10-30",
  },
];
