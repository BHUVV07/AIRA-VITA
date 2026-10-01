export interface GalleryItem {
  id: string;
  title: string;
  category: "Flexible Duct" | "Fire Retardent Canvas" | "Air Curtain" | "Disc Valves";
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
    id: "disc-valves",
    title: "Disc Valves — Aluminium & Stainless Steel",
    badge: "360° Dispersion",
    image: "/images/products/disc-valves.png",
    imageAlt: "Aria Vita Disc Valves in Aluminium, Stainless Steel, and ABS Plastic",
    link: "/products/disc-valves",
  },
  {
    id: "fire-retardent-canvas",
    title: "Fire Retardent Canvas — 92°C & 250°C",
    badge: "Fire Safety Certified",
    image: "/images/products/fire-retardent-canvas.png",
    imageAlt: "Aria Vita Fire Retardent Canvas Duct Connectors",
    link: "/products/fire-retardent-canvas",
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
    id: "air-curtains",
    title: "Air Curtains — Commercial & Industrial",
    badge: "AACA / AACS / AACH",
    image: "/images/products/air-curtains.jpg",
    imageAlt: "Aria Vita Air Curtain Units",
    link: "/products/air-curtain",
  },
  {
    id: "car",
    title: "CAR — Constant Airflow Regulator",
    badge: "50–250 Pa Control",
    image: "/images/products/car.png",
    imageAlt: "CAV AriaVita Constant Airflow Regulator",
    link: "/products/car",
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  // 1. Flexible Duct (1-4)
  {
    id: "gal-fd-01",
    title: "Insulated Flexible Duct",
    category: "Flexible Duct",
    description: "Thermal insulated flexible ducting with acoustic fiberglass wool layer for HVAC air distribution.",
    image: "/images/gallery/PHOTO-2026-09-30-20-17-11.jpg",
    imageAlt: "Insulated Flexible Duct",
    badge: "Thermal & Acoustic",
    productSlug: "flexible-duct",
  },
  {
    id: "gal-fd-02",
    title: "Ariavita Flexible Duct",
    category: "Flexible Duct",
    description: "High-durability multi-ply flexible ducting with encapsulated spring steel wire helix.",
    image: "/images/gallery/PHOTO-2026-09-30-20-17-34.jpg",
    imageAlt: "Ariavita Flexible Duct",
    badge: "Multi-Ply Aluminium",
    productSlug: "flexible-duct",
  },
  {
    id: "gal-fd-03",
    title: "Uninsulated Flexible Duct",
    category: "Flexible Duct",
    description: "Heavy-duty uninsulated flexible ducting designed for high velocity airflow and low pressure drop.",
    image: "/images/gallery/PHOTO-2026-09-30-20-18-03.jpg",
    imageAlt: "Uninsulated Flexible Duct",
    badge: "Uninsulated",
    productSlug: "flexible-duct",
  },
  {
    id: "gal-fd-04",
    title: "Flexible Duct",
    category: "Flexible Duct",
    description: "Flexible ducting connection for seamless HVAC supply and exhaust airflow networks.",
    image: "/images/gallery/PHOTO-2026-09-30-20-18-30.jpg",
    imageAlt: "Flexible Duct",
    badge: "30 m/s Max Velocity",
    productSlug: "flexible-duct",
  },

  // 2. Fire Retardent Canvas (5-9)
  {
    id: "gal-frc-01",
    title: "Fire Rated Canvas",
    category: "Fire Retardent Canvas",
    description: "Fire safety-certified flexible canvas connector for smoke extraction shafts and fire risk zones.",
    image: "/images/gallery/PHOTO-2026-09-30-20-19-20.jpg",
    imageAlt: "Fire Rated Canvas",
    badge: "Fire Safety Certified",
    productSlug: "fire-retardent-canvas",
  },
  {
    id: "gal-frc-02",
    title: "Fire Retardent Canvas",
    category: "Fire Retardent Canvas",
    description: "Fire retardent flexible duct connector engineered for HVAC vibration isolation and safety.",
    image: "/images/gallery/PHOTO-2026-09-30-20-19-43.jpg",
    imageAlt: "Fire Retardent Canvas",
    badge: "92°C / 250°C Rated",
    productSlug: "fire-retardent-canvas",
  },
  {
    id: "gal-frc-03",
    title: "Ariavita Fire Rated Canvas",
    category: "Fire Retardent Canvas",
    description: "High-grade fire rated canvas flexible connector for commercial and industrial ventilation shafts.",
    image: "/images/gallery/PHOTO-2026-09-30-20-20-09.jpg",
    imageAlt: "Ariavita Fire Rated Canvas",
    badge: "Aria Vita Certified",
    productSlug: "fire-retardent-canvas",
  },
  {
    id: "gal-frc-04",
    title: "Neoprene Canvas",
    category: "Fire Retardent Canvas",
    description: "Neoprene-coated flexible canvas for enhanced chemical, moisture, and fire resistance.",
    image: "/images/gallery/PHOTO-2026-09-30-20-20-33.jpg",
    imageAlt: "Neoprene Canvas",
    badge: "Neoprene Coated",
    productSlug: "fire-retardent-canvas",
  },
  {
    id: "gal-frc-05",
    title: "Fire Canvas with Flange",
    category: "Fire Retardent Canvas",
    description: "Pre-assembled fire canvas flexible duct connector with integrated steel flange frames.",
    image: "/images/gallery/PHOTO-2026-09-30-20-20-49.jpg",
    imageAlt: "Fire Canvas with Flange",
    badge: "Flange Frame",
    productSlug: "fire-retardent-canvas",
  },

  // 3. Air Curtain (10-13)
  {
    id: "gal-ac-01",
    title: "Aircurtain Ariavita",
    category: "Air Curtain",
    description: "High-efficiency commercial air curtain barrier unit with centrifugal blowers.",
    image: "/images/gallery/PHOTO-2026-09-30-20-25-51.jpg",
    imageAlt: "Aircurtain Ariavita",
    badge: "Centrifugal Blower",
    productSlug: "air-curtain",
  },
  {
    id: "gal-ac-02",
    title: "Air Curtain – Stainless Steel",
    category: "Air Curtain",
    description: "Grade 304 stainless steel air curtain unit engineered for cleanrooms, healthcare, and food processing.",
    image: "/images/gallery/PHOTO-2026-09-30-20-26-14.jpg",
    imageAlt: "Air Curtain – Stainless Steel",
    badge: "Stainless Steel (AACS)",
    productSlug: "air-curtain",
  },
  {
    id: "gal-ac-03",
    title: "Air Curtain",
    category: "Air Curtain",
    description: "Doorway air barrier unit projecting high-velocity airstream to prevent energy loss and dust ingress.",
    image: "/images/gallery/PHOTO-2026-09-30-20-28-36.jpg",
    imageAlt: "Air Curtain",
    badge: "AACA Series",
    productSlug: "air-curtain",
  },
  {
    id: "gal-ac-04",
    title: "Air Curtain – Industrial Air Curtain",
    category: "Air Curtain",
    description: "Heavy-duty industrial air curtain unit for factory entrances, loading bays, and cold storage doors.",
    image: "/images/gallery/PHOTO-2026-09-30-20-29-01.jpg",
    imageAlt: "Air Curtain – Industrial Air Curtain",
    badge: "Industrial (AACH)",
    productSlug: "air-curtain",
  },

  // 4. Disc Valves (14-17)
  {
    id: "gal-dv-01",
    title: "Disc Valves – Ariavita Disc Valve",
    category: "Disc Valves",
    description: "Aerodynamic supply and exhaust disc valves engineered for ceiling and wall mounting.",
    image: "/images/gallery/PHOTO-2026-09-30-20-34-47.jpg",
    imageAlt: "Disc Valves – Ariavita Disc Valve",
    badge: "360° Dispersion",
    productSlug: "disc-valves",
  },
  {
    id: "gal-dv-02",
    title: "Disc Valve – SS Disc Valve",
    category: "Disc Valves",
    description: "Stainless steel supply and exhaust disc valve for cleanrooms, laboratories, and corrosive environments.",
    image: "/images/gallery/PHOTO-2026-09-30-20-34-56.jpg",
    imageAlt: "Disc Valve – SS Disc Valve",
    badge: "Stainless Steel",
    productSlug: "disc-valves",
  },
  {
    id: "gal-dv-03",
    title: "Disc Valve – Plastic Disc Valve",
    category: "Disc Valves",
    description: "TDV series ABS plastic disc valve for lightweight domestic and commercial bathroom ventilation.",
    image: "/images/gallery/PHOTO-2026-09-30-20-35-06.jpg",
    imageAlt: "Disc Valve – Plastic Disc Valve",
    badge: "ABS Plastic",
    productSlug: "disc-valves",
  },
  {
    id: "gal-dv-04",
    title: "Disc Valve – Aluminium Powder Coated Disc Valve",
    category: "Disc Valves",
    description: "Aluminium powder-coated white disc valve designed for smooth air dispersion and minimal sound levels.",
    image: "/images/gallery/PHOTO-2026-09-30-20-35-28.jpg",
    imageAlt: "Disc Valve – Aluminium Powder Coated Disc Valve",
    badge: "Powder Coated",
    productSlug: "disc-valves",
  },
];
