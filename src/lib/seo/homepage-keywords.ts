/**
 * ARIA VITA — Homepage Money Keywords Dataset
 * Preserves all 20 client-supplied homepage commercial intent phrases.
 */

export interface HomepageKeywordRecord {
  id: number;
  phrase: string;
  category: "distributor" | "hvac_products" | "product_specific" | "pricing";
  searchIntent: "commercial" | "transactional";
  verificationStatus: "verified" | "needs_client_confirmation";
  notes?: string;
}

export const HOMEPAGE_MONEY_KEYWORDS: HomepageKeywordRecord[] = [
  {
    id: 1,
    phrase: "Aria Vita distributor best price South India",
    category: "distributor",
    searchIntent: "transactional",
    verificationStatus: "verified",
    notes: "Ecosta Systems Bangalore is the authorized distributor for South India.",
  },
  {
    id: 2,
    phrase: "Aria Vita distributor best quality South India",
    category: "distributor",
    searchIntent: "commercial",
    verificationStatus: "verified",
  },
  {
    id: 3,
    phrase: "HVAC air distribution products best price Karnataka Tamil Nadu Kerala Andhra Telangana",
    category: "hvac_products",
    searchIntent: "transactional",
    verificationStatus: "verified",
    notes: "Covers all 5 core South India states supplied by client.",
  },
  {
    id: 4,
    phrase: "Fire retardant flexible duct best price best quality South India",
    category: "product_specific",
    searchIntent: "commercial",
    verificationStatus: "verified",
  },
  {
    id: 5,
    phrase: "Air curtain best price best quality South India",
    category: "product_specific",
    searchIntent: "commercial",
    verificationStatus: "verified",
  },
  {
    id: 6,
    phrase: "Cheapest air curtain South India premium quality",
    category: "pricing",
    searchIntent: "transactional",
    verificationStatus: "needs_client_confirmation",
    notes: "'Cheapest' superlative preserved in SEO inventory; avoid unqualified claims in public body copy.",
  },
  {
    id: 7,
    phrase: "Lowest price flexible duct best quality South India",
    category: "pricing",
    searchIntent: "transactional",
    verificationStatus: "needs_client_confirmation",
  },
  {
    id: 8,
    phrase: "Best quality disc valve best price Bangalore Chennai Hyderabad Kochi",
    category: "product_specific",
    searchIntent: "transactional",
    verificationStatus: "verified",
    notes: "Key South India metro coverage for disc valves.",
  },
  {
    id: 9,
    phrase: "Premium quality CAR best price South India",
    category: "product_specific",
    searchIntent: "commercial",
    verificationStatus: "verified",
  },
  {
    id: 10,
    phrase: "Aria Vita authorized distributor best price Pan South India - Ecosta Systems",
    category: "distributor",
    searchIntent: "transactional",
    verificationStatus: "verified",
  },
  {
    id: 11,
    phrase: "Best HVAC products supplier South India best price",
    category: "hvac_products",
    searchIntent: "transactional",
    verificationStatus: "verified",
  },
  {
    id: 12,
    phrase: "Top quality air distribution products South India",
    category: "hvac_products",
    searchIntent: "commercial",
    verificationStatus: "verified",
  },
  {
    id: 13,
    phrase: "Wholesale price Aria Vita products South India",
    category: "pricing",
    searchIntent: "transactional",
    verificationStatus: "verified",
    notes: "B2B project quantity pricing available through distributor.",
  },
  {
    id: 14,
    phrase: "Factory price air curtain South India",
    category: "pricing",
    searchIntent: "transactional",
    verificationStatus: "needs_client_confirmation",
    notes: "Factory price wording preserved; Ecosta Systems represents distributor model.",
  },
  {
    id: 15,
    phrase: "Direct manufacturer price Aria Vita South India",
    category: "pricing",
    searchIntent: "transactional",
    verificationStatus: "needs_client_confirmation",
    notes: "Direct manufacturer price claim flagged for distributor terms clarity.",
  },
  {
    id: 16,
    phrase: "Best price HVAC ducting South India best quality",
    category: "hvac_products",
    searchIntent: "transactional",
    verificationStatus: "verified",
  },
  {
    id: 17,
    phrase: "High quality low price air curtain South India",
    category: "pricing",
    searchIntent: "commercial",
    verificationStatus: "verified",
  },
  {
    id: 18,
    phrase: "Affordable air curtain South India best quality",
    category: "pricing",
    searchIntent: "commercial",
    verificationStatus: "verified",
  },
  {
    id: 19,
    phrase: "Budget price fire retardant duct South India best quality",
    category: "product_specific",
    searchIntent: "commercial",
    verificationStatus: "verified",
  },
  {
    id: 20,
    phrase: "Ecosta Systems best price best quality Aria Vita South India",
    category: "distributor",
    searchIntent: "transactional",
    verificationStatus: "verified",
  },
];
