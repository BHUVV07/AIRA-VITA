export interface ArticleSection {
  heading: string;
  body: string[];
  bulletPoints?: string[];
}

export interface TechnicalArticle {
  slug: string;
  title: string;
  category: "Technical Guides" | "Product Deep Dive" | "HVAC Engineering" | "Industry Best Practices";
  readTime: string;
  publishedDate: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  targetProductSlug?: string;
  targetProductName?: string;
  sections: ArticleSection[];
}

export const TECHNICAL_ARTICLES: TechnicalArticle[] = [
  {
    slug: "what-is-a-constant-airflow-regulator",
    title: "What Is a Constant Airflow Regulator (CAR) in HVAC Systems?",
    category: "Product Deep Dive",
    readTime: "5 min read",
    publishedDate: "2026-02-15",
    excerpt:
      "Learn how Constant Airflow Regulators (CAR) dynamically balance HVAC duct airflow under static pressure fluctuations without electrical power.",
    metaTitle: "What Is a Constant Airflow Regulator (CAR)? | HVAC Guide | Aria Vita",
    metaDescription:
      "Comprehensive technical overview of Constant Airflow Regulators (CAR). Understand mechanical self-balancing, pressure range 50–250 Pa, and 50–200 dia applications.",
    targetProductSlug: "car",
    targetProductName: "CAR — Constant Airflow Regulator",
    sections: [
      {
        heading: "Understanding Mechanical Airflow Regulation",
        body: [
          "In modern multi-story commercial and residential buildings, maintaining balanced ventilation across dozens of floor levels is a primary HVAC engineering challenge.",
          "When exhaust fans operate or when dampers open on lower floors, pressure changes ripple through vertical risers. Without automatic compensation, upper-floor terminals receive insufficient airflow while lower floors experience excessive air velocity, draft noise, and energy waste.",
          "A Constant Airflow Regulator (CAR) is a self-adjusting mechanical control valve positioned directly inside circular ventilation ducts. It automatically maintains a pre-set volumetric airflow rate across a differential static pressure range of 50 to 250 Pa.",
        ],
      },
      {
        heading: "How a CAR Works Without Electrical Power",
        body: [
          "The core operating principle of a Constant Airflow Regulator relies on fluid mechanics and mechanical balance rather than complex electrical wiring or actuators.",
          "Inside the high-impact polystyrene casing, a flexible silicone bulb or internal membrane responds dynamically to pressure differences between the upstream and downstream air streams:",
        ],
        bulletPoints: [
          "Low Static Pressure (50 Pa): The internal membrane remains relaxed, allowing maximum open passage area for low-resistance airflow.",
          "Rising Duct Static Pressure (Up to 250 Pa): The differential pressure inflates or compresses the internal membrane, constricting the free cross-sectional area proportionally.",
          "Constant Volumetric Flow: As duct static pressure rises, the reduced passage area ensures the total volume of air passing through the regulator remains steady and constant.",
        ],
      },
      {
        heading: "Primary HVAC Applications for CAR Regulators",
        body: [
          "Constant Airflow Regulators are specified by MEP consultants across projects requiring precise air distribution balance:",
        ],
        bulletPoints: [
          "Multi-Story Residential Apartments: Balances central bathroom and kitchen exhaust risers across 10 to 50+ floors.",
          "Hotels & Hospitality: Guarantees consistent fresh air supply and silent washroom extract across all guest suites.",
          "Commercial Office Buildings: Prevents over-ventilation of conference rooms and corner offices during variable occupancy.",
          "Hospitals & Cleanroom Facilities: Maintains stable pressurization differentials between isolation rooms and corridors.",
        ],
      },
    ],
  },
  {
    slug: "what-are-disc-valves-used-for",
    title: "What Are Disc Valves Used For in HVAC Air Distribution?",
    category: "Product Deep Dive",
    readTime: "4 min read",
    publishedDate: "2026-02-20",
    excerpt:
      "Explore the design, aerodynamic principles, and applications of ceiling and wall-mounted supply and exhaust disc valves in commercial and domestic ventilation.",
    metaTitle: "What Are Disc Valves Used For in HVAC? | Aria Vita Technical Guide",
    metaDescription:
      "Discover how supply and exhaust disc valves operate in HVAC air distribution networks. Learn about Aluminium Powder Coated, Stainless Steel, and ABS Plastic variants.",
    targetProductSlug: "disc-valves",
    targetProductName: "Disc Valves",
    sections: [
      {
        heading: "Role of Disc Valves in Air Distribution",
        body: [
          "Disc valves (also known as ceiling valves or air diffusers) are terminal components installed at the interface between HVAC ductwork and conditioned indoor spaces.",
          "Their primary function is to control, distribute, or extract air in ceiling and wall installations. The central rotating disc allows precise calibration of the throat opening, regulating air volume while maintaining low acoustic levels.",
        ],
      },
      {
        heading: "Supply Air vs. Exhaust Air Disc Valves",
        body: [
          "While supply and exhaust disc valves share a similar circular profile, their internal geometry and aerodynamic discharge patterns differ:",
        ],
        bulletPoints: [
          "Supply Air Valves: Feature contoured central cones that project incoming air outward in a 360-degree radial pattern along the ceiling plane (Coanda effect). This promotes rapid mixing with ambient room air without creating direct cold drafts.",
          "Exhaust Air Valves: Designed with streamlined entry bell-mouths to collect stale, humid, or warm air smoothly into the return duct system with minimal static pressure drop.",
        ],
      },
      {
        heading: "Material Variants & Environmental Selection",
        body: [
          "Aria Vita manufactures disc valves across three distinct material classifications tailored for specific architectural and operational environments:",
        ],
        bulletPoints: [
          "Aluminium Powder Coated: Premium architectural finish for commercial offices, hotel lobbies, and high-end residential interiors.",
          "Stainless Steel: High-hygiene, corrosion-proof material for pharmaceutical cleanrooms, hospital operating suites, and commercial kitchens.",
          "ABS Plastic: Recyclable polypropylene construction for domestic amenity ventilation, washrooms, and humid coastal environments.",
        ],
      },
    ],
  },
  {
    slug: "understanding-flexible-ducts-in-hvac",
    title: "Understanding Flexible Ducts in HVAC Ventilation Systems",
    category: "HVAC Engineering",
    readTime: "5 min read",
    publishedDate: "2026-03-01",
    excerpt:
      "A technical guide to multi-ply flexible ducting, spring steel wire reinforcement, operating velocity limits, and pressure drop considerations.",
    metaTitle: "Understanding Flexible Ducts in HVAC Ventilation | Aria Vita",
    metaDescription:
      "Comprehensive technical breakdown of flexible air ducting. Learn construction standards (1 ply Aluminium + 2 ply Polyester), pressure drop, and velocity limits up to 30 m/s.",
    targetProductSlug: "flexible-duct",
    targetProductName: "Flexible Duct",
    sections: [
      {
        heading: "Introduction to Flexible Air Ducting",
        body: [
          "Flexible ducting is an indispensable element of modern HVAC distribution networks. It serves as the flexible connection between rigid sheet metal main ducts, air terminal units, disc valves, and diffusers.",
          "Its ability to navigate tight ceiling voids, structural offsets, and misaligned connection collars significantly reduces installation time and acoustic vibration transmission.",
        ],
      },
      {
        heading: "Construction Specification & Tensile Strength",
        body: [
          "High-performance non-insulated flexible ducting is constructed using composite multi-layer laminates encapsulated over a high-tensile steel wire helix:",
        ],
        bulletPoints: [
          "Multi-Ply Laminate: 1 ply Aluminium combined with 2 ply Polyester (Black) totaling 45 micron nominal thickness provides high tear resistance and airtightness.",
          "Spring Steel Helix: Coated spring steel wire wire helix maintains circular duct geometry under negative static pressures up to 3000 Pa and high air velocities up to 30 m/s.",
          "Temperature Envelope: Withstands continuous operating temperatures ranging from -30°C to +120°C.",
        ],
      },
      {
        heading: "Installation Best Practices & Pressure Drop Optimization",
        body: [
          "To ensure optimal ventilation efficiency, flexible ducting must be installed following established MEP guidelines:",
        ],
        bulletPoints: [
          "Keep Runs Fully Extended: Excessive sagging or slack increases internal friction, drastically raising friction pressure drop.",
          "Limit Bend Radii: Sharp bends restrict airflow. Bends should have a centerline radius equal to or greater than one duct diameter.",
          "Avoid Excess Length: Flexible duct runs should generally not exceed 1.5 to 2.0 meters when connecting terminal diffusers to main rigid ducts.",
        ],
      },
    ],
  },
  {
    slug: "where-are-air-curtains-used",
    title: "Where Are Air Curtains Used in Commercial & Industrial Buildings?",
    category: "Industry Best Practices",
    readTime: "4 min read",
    publishedDate: "2026-03-10",
    excerpt:
      "Discover how commercial and industrial air curtain barrier units prevent temperature loss, exclude insects/dust, and lower HVAC energy costs.",
    metaTitle: "Where Are Air Curtains Used in Commercial Buildings? | Aria Vita",
    metaDescription:
      "Explore air curtain applications across retail entrances, hospital lobbies, food processing facilities, and industrial cold storage loading bays.",
    targetProductSlug: "air-curtain",
    targetProductName: "Air Curtain",
    sections: [
      {
        heading: "The Function of an Air Curtain",
        body: [
          "An air curtain (or air door) is a fan-powered unit mounted above an open doorway or entrance. It projects a continuous stream of high-velocity air downward across the opening.",
          "This invisible air barrier separates two distinct indoor and outdoor thermal environments without obstructing pedestrian or vehicle traffic.",
        ],
      },
      {
        heading: "Key Commercial & Industrial Applications",
        body: [
          "Air curtains are deployed across diverse sectors to achieve energy efficiency and environmental control:",
        ],
        bulletPoints: [
          "Commercial Retail & Malls (AACA): Maintains conditioned indoor temperatures at busy main entrances while keeping out vehicle exhaust and flying insects.",
          "Hospitals & Cleanrooms (AACS): High-hygiene stainless steel housing units protect surgical corridors, pharmaceutical labs, and sterile air zones from airborne contaminants.",
          "Industrial Loading Bays & Cold Storage (AACH): High-velocity heavy-duty blowers prevent massive refrigeration loss when warehouse doors open for forklift transport.",
        ],
      },
    ],
  },
  {
    slug: "fire-retardent-canvas-in-hvac",
    title: "Fire Retardent Canvas & Flexible Connectors in HVAC Systems",
    category: "HVAC Engineering",
    readTime: "4 min read",
    publishedDate: "2026-03-15",
    excerpt:
      "Learn why flexible duct connectors made of Fire Retardent (92°C) and Fire Resistant (250°C) canvas are critical for mechanical vibration isolation and smoke exhaust safety.",
    metaTitle: "Fire Retardent Canvas & Duct Connectors in HVAC | Aria Vita",
    metaDescription:
      "Understand the application of Fire Retardent (92°C) and Fire Resistant (250°C) flexible canvas duct connectors for HVAC fan isolation and smoke extraction.",
    targetProductSlug: "fire-retardent-canvas",
    targetProductName: "Fire Retardent Canvas",
    sections: [
      {
        heading: "Why Flexible Connectors Are Essential in Ductwork",
        body: [
          "HVAC equipment such as air handling units (AHUs), fresh air blowers, and centrifugal exhaust fans produce mechanical vibration during operation.",
          "If rigid sheet metal ductwork is attached directly to the fan casing, this vibration travels throughout the building frame, causing structural acoustic noise, joint fatigue, and air leakage.",
          "Flexible duct connectors manufactured from heavy-duty canvas fabric isolate fan vibration while creating an airtight flexible joint.",
        ],
      },
      {
        heading: "Selecting Between 92°C Fire Retardent & 250°C Fire Resistant Variants",
        body: [
          "Material selection depends directly on the operating temperature requirement and fire hazard rating of the ventilated space:",
        ],
        bulletPoints: [
          "Fire Retardent — 92°C: Designed for standard HVAC supply/return air ducts, commercial building risers, and ambient ventilation fan connections.",
          "Fire Resistant — 250°C: Engineered for high-temperature smoke exhaust systems, kitchen hood extraction ducts, and critical fire-rated shafts where elevated thermal endurance is required.",
        ],
      },
    ],
  },
];

export function getArticleBySlug(slug: string): TechnicalArticle | undefined {
  return TECHNICAL_ARTICLES.find((art) => art.slug.toLowerCase() === slug.toLowerCase());
}
