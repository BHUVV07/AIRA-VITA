/**
 * ARIA VITA — Client Marketing Claims Verification & Risk Audit
 * Flags unverified superlatives, certifications, and technical claims for client sign-off.
 */

export interface ClaimAuditItem {
  id: string;
  claim: string;
  category: "Superlative" | "Certification" | "Pricing" | "Product Feature" | "Operational" | "Competitor";
  riskLevel: "Low" | "Medium" | "High";
  clientWording: string;
  seoImplementationStrategy: string;
  verificationRequirement: string;
  status: "Needs Client Confirmation" | "Accepted with Contextual Framing";
}

export const CLIENT_CLAIMS_AUDIT: ClaimAuditItem[] = [
  {
    id: "claim-best-brand",
    claim: "India's Best Brand / No. 1",
    category: "Superlative",
    riskLevel: "Medium",
    clientWording: "India's Best Brand for Constant Airflow Regulators (CAR) - Aria Vita - Pan India",
    seoImplementationStrategy:
      "Preserved as primary H1 and title target on the dedicated landing page to capture exact user search intent; supplemented with objective technical performance descriptions in body copy.",
    verificationRequirement: "Requires industry award or consumer survey backing if challenged in regulated advertising.",
    status: "Accepted with Contextual Framing",
  },
  {
    id: "claim-pricing-superlatives",
    claim: "Lowest Price / Cheapest Price / Best Price",
    category: "Pricing",
    riskLevel: "High",
    clientWording: "Fire retardant flexible duct lowest price South India / Cheapest air curtain South India",
    seoImplementationStrategy:
      "Preserved in SEO keyword metadata to capture high-intent transactional search queries; framed in visible copy as 'Competitive B2B Wholesale Pricing' and 'Direct Project Quotes via Ecosta Systems'.",
    verificationRequirement: "Requires explicit client policy confirming lowest price guarantee or price matching.",
    status: "Needs Client Confirmation",
  },
  {
    id: "claim-manufacturer-vs-distributor",
    claim: "Leading Manufacturer / Direct Manufacturer Price / Factory Price",
    category: "Operational",
    riskLevel: "Medium",
    clientWording: "We are South India's leading manufacturer of best quality, best price HVAC air distribution products / Direct manufacturer price",
    seoImplementationStrategy:
      "Clarified operational model: Aria Vita™ brand systems are supplied with direct project pricing through authorized Pan-India distributor Ecosta Systems, Bangalore.",
    verificationRequirement: "Client must confirm factory/manufacturing facility registration status vs distribution entity.",
    status: "Needs Client Confirmation",
  },
  {
    id: "claim-fire-certifications",
    claim: "BS 476 Part 7 Class 1, ASTM E84 Class A, UL 94 V-0",
    category: "Certification",
    riskLevel: "High",
    clientWording: "Fire Retardant Flexible Duct (BS 476 Part 7 Class 1, ASTM E84 Class A, UL 94 V-0)",
    seoImplementationStrategy:
      "Targeted as search keywords in metadata and technical query lists; noted on product specs pending test certificate documentation.",
    verificationRequirement: "Official NABL/third-party laboratory test reports must be provided by client before publishing certificate numbers.",
    status: "Needs Client Confirmation",
  },
  {
    id: "claim-compliance-nabh-pharma",
    claim: "NABH Compliant / Pharma Grade / Green Building",
    category: "Certification",
    riskLevel: "Medium",
    clientWording: "Constant airflow regulator for hospitals best brand India - NABH compliant / pharma grade",
    seoImplementationStrategy:
      "Framed as 'Engineered to assist MEP consultants in achieving NABH ventilation compliance and cleanroom differential pressure standards'.",
    verificationRequirement: "Confirm guidelines under which product contributes to hospital NABH or green building credits (IGBC/LEED).",
    status: "Accepted with Contextual Framing",
  },
  {
    id: "claim-energy-savings-40",
    claim: "Energy Saving 40%",
    category: "Product Feature",
    riskLevel: "High",
    clientWording: "Air Curtain with Motion Sensor in Coimbatore - Energy Saving 40%",
    seoImplementationStrategy:
      "Targeted in GBP drafts and metadata; phrased in visible text as 'Helps reduce HVAC conditioned air loss and energy overheads'.",
    verificationRequirement: "Specific percentage savings claim must be backed by aerodynamic energy audit study.",
    status: "Needs Client Confirmation",
  },
  {
    id: "claim-aaca-ms-motion-sensor",
    claim: "AACA-MS with Motion Sensor / 3 ft–6 ft sizing",
    category: "Product Feature",
    riskLevel: "Medium",
    clientWording: "AACA-MS air curtain with motion sensor / 3ft to 6ft",
    seoImplementationStrategy:
      "Preserved in keyword list and accessory listings; main product catalog retains approved top-level variant names (AACA, AACS, AACH).",
    verificationRequirement: "Confirm motion sensor availability as a standard catalog variant vs factory option.",
    status: "Needs Client Confirmation",
  },
  {
    id: "claim-competitor-superiority",
    claim: "Better than Trox / Halton / Systemair",
    category: "Competitor",
    riskLevel: "High",
    clientWording: "Best alternative to Trox CAR India / Better than Systemair CAR",
    seoImplementationStrategy:
      "Retained in SEO keyword configuration for comparative organic search discovery; avoided making disparaging or unsubstantiated direct claims in visible marketing text.",
    verificationRequirement: "Requires head-to-head empirical lab comparison test before publishing public comparative claims.",
    status: "Accepted with Contextual Framing",
  },
  {
    id: "claim-pan-india-stock",
    claim: "Ready Stock / Fast Delivery across 40+ cities",
    category: "Operational",
    riskLevel: "Low",
    clientWording: "Pan India Stock - Fast Delivery / Supply across 40+ cities via authorized distributor Ecosta Systems",
    seoImplementationStrategy:
      "Accurately represented as centrally warehoused inventory in Bangalore with national logistics dispatch coverage.",
    verificationRequirement: "Warehouse inventory levels verified with Ecosta Systems management.",
    status: "Accepted with Contextual Framing",
  },
];
