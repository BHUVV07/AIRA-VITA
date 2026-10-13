/**
 * ARIA VITA — Master SEO Site Configuration
 * Centralized client, distributor, domain, and product taxonomy configurations.
 */

export const SEO_SITE_CONFIG = {
  clientName: "ARIA VITA™",
  tagline: "Precision Air. Perfect Comfort.",
  domain: "https://www.ariavita.in",
  canonicalBase: "https://www.ariavita.in",
  defaultLocale: "en_IN",
  geography: {
    primaryRegion: "South India",
    nationalScope: "Pan India",
    hubCity: "Bangalore",
    hubState: "Karnataka",
  },
  distributor: {
    name: "Ecosta Systems",
    role: "Authorized Pan-India Distributor",
    city: "Bangalore",
    state: "Karnataka",
    address: "#31, Ground Floor, 80 Feet Rd, HAL 2nd Stage, Indiranagar, Near LPSC, Bengaluru, Karnataka 560008",
    phones: ["+91 93420 50097", "+91 93420 50099"],
    email: "info@ariavita.in",
    website: "https://www.ariavita.in",
    whatsappUrl: "https://wa.me/919342050097",
  },
  approvedProducts: [
    {
      id: "fire-retardent-canvas",
      name: "Fire Retardent Canvas",
      slug: "fire-retardent-canvas",
      displayOrder: 1,
      variants: [
        { name: "Fire Retardent", spec: "92°C Operating Temperature" },
        { name: "Fire Resistant", spec: "250°C Operating Temperature" },
      ],
      seoPhraseNote:
        "Retain client phrase 'Fire Retardant Flexible Duct' in keyword inventory; maintain distinct technical profile from canvas duct connectors.",
    },
    {
      id: "disc-valves",
      name: "Disc Valves",
      slug: "disc-valves",
      displayOrder: 2,
      variants: [
        { name: "Aluminium Powder Coated", spec: "White powder coated finish" },
        { name: "Stainless Steel", spec: "SS 304 marine/industrial grade" },
        { name: "ABS Plastic", spec: "Impact-resistant polymer" },
      ],
    },
    {
      id: "air-curtain",
      name: "Air Curtain",
      slug: "air-curtain",
      displayOrder: 3,
      variants: [
        { name: "Aluminium Powder Coated", code: "AACA", spec: "Architectural & commercial airflow barrier" },
        { name: "Stainless Steel", code: "AACS", spec: "Corrosion-resistant hygiene & pharma barrier" },
        { name: "Industrial Application", code: "AACH", spec: "Heavy-velocity industrial factory barrier" },
      ],
      namingRule: "Official code for AACH is 'Industrial Application'. Do not rename to 'Heavy Duty' without client approval.",
    },
    {
      id: "flexible-duct",
      name: "Flexible Duct",
      slug: "flexible-duct",
      displayOrder: 4,
      variants: [
        { name: "Non-Insulated", spec: "Multi-ply aluminium laminate" },
        { name: "Insulated", spec: "Fiberglass insulation with reinforced vapour barrier jacket" },
      ],
    },
    {
      id: "car",
      name: "CAR",
      fullName: "Constant Airflow Regulator (CAR)",
      slug: "car",
      displayOrder: 5,
      specifications: {
        diameterRange: "50–200 mm",
        pressureRange: "50–250 Pa",
        mechanism: "Mechanical, pressure-independent, aerodynamic regulation without electric actuator",
      },
    },
  ],
} as const;
