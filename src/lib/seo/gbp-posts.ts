/**
 * ARIA VITA — Google Business Profile (GBP) Content & Weekly Posting Strategy
 * Provides reusable post templates, weekly calendar schedule, and draft posts for 5 core products.
 */

export interface GbpPostDraft {
  week: number;
  product: string;
  targetCity: string;
  state: string;
  title: string;
  postBody: string;
  callToAction: "CALL_NOW" | "LEARN_MORE" | "GET_OFFER";
  actionUrl: string;
  recommendedPhotoAlt: string;
  verificationNotes: string;
}

export const GBP_TEMPLATE = {
  rawClientTemplate:
    "Best Price Aria Vita [Product] in [City] - Best Quality | BS 476 | Motion Sensor | Ready Stock | Ecosta Systems Bangalore 9342050099 | Pan South India Delivery | #AriaVita #[City]HVAC",
  
  generateDraft: (params: {
    product: string;
    city: string;
    keyFeature: string;
    phone?: string;
  }): string => {
    const phone = params.phone || "9342050099";
    const cityTag = params.city.replace(/\s+/g, "");
    return `Looking for ${params.product} in ${params.city}? Aria Vita™ provides high-performance HVAC solutions with ${params.keyFeature}. Supplied directly across South India by authorized distributor Ecosta Systems, Bangalore. Contact our technical sales desk at ${phone} for ready dispatch & project quotes. #AriaVita #${cityTag}HVAC #SouthIndiaVentilation`;
  },
};

export const GBP_WEEKLY_POST_SCHEDULE: GbpPostDraft[] = [
  {
    week: 1,
    product: "Fire Retardent Canvas",
    targetCity: "Bangalore",
    state: "Karnataka",
    title: "Fire Retardent Canvas in Bangalore — Ready Stock & High-Temp Resistance",
    postBody:
      "Engineered for critical HVAC duct connections and smoke extraction systems in Bangalore. Aria Vita Fire Retardent Canvas is available in 92°C and 250°C high-temperature variants. Rapid dispatch across Karnataka from Ecosta Systems, Bangalore. Call 9342050099 / +91 93420 50097 for pricing & specifications.",
    callToAction: "GET_OFFER",
    actionUrl: "https://www.ariavita.in/products/fire-retardent-canvas",
    recommendedPhotoAlt: "Aria Vita Fire Retardent Canvas flexible duct connector warehouse stock Bangalore",
    verificationNotes: "BS 476 testing claims require official report before adding specific standard certificates to live post.",
  },
  {
    week: 2,
    product: "Constant Airflow Regulator (CAR)",
    targetCity: "Chennai",
    state: "Tamil Nadu",
    title: "Constant Airflow Regulator (CAR) in Chennai — No Power Required",
    postBody:
      "Automatic duct airflow regulation without motorized actuators. Aria Vita Constant Airflow Regulators (CAR) maintain precise set CFM between 50 and 250 Pa across duct sizes from 50mm to 200mm. Ideal for Chennai hospitals, cleanrooms, and commercial towers. Supplied Pan-India by Ecosta Systems. Call 9342050099.",
    callToAction: "LEARN_MORE",
    actionUrl: "https://www.ariavita.in/constant-airflow-regulator-best-brand-pan-india",
    recommendedPhotoAlt: "Aria Vita Constant Airflow Regulator CAR mechanical damper installation Chennai",
    verificationNotes: "NABH compliance wording should be used in consulting context, not as an uncertified product claim.",
  },
  {
    week: 3,
    product: "Air Curtain",
    targetCity: "Coimbatore",
    state: "Tamil Nadu",
    title: "Commercial & Industrial Air Curtains in Coimbatore",
    postBody:
      "Protect climate-controlled interiors from dust, insects, and outdoor heat in Coimbatore. Aria Vita Air Curtains are available in Aluminium Powder Coated (AACA), Stainless Steel (AACS), and Industrial Application (AACH). Rapid dispatch across Tamil Nadu via authorized distributor Ecosta Systems. Inquire at 9342050099.",
    callToAction: "CALL_NOW",
    actionUrl: "https://www.ariavita.in/products/air-curtain",
    recommendedPhotoAlt: "Aria Vita Aluminium Air Curtain doorway installation Coimbatore",
    verificationNotes: "Motion sensor (AACA-MS) and exact 40% energy savings claims flagged for engineering confirmation before publication.",
  },
  {
    week: 4,
    product: "ABS Disc Valves",
    targetCity: "Hyderabad",
    state: "Telangana",
    title: "ABS & Stainless Steel Disc Valves in Hyderabad",
    postBody:
      "Precision supply and exhaust air distribution for commercial washrooms, cleanrooms, and multi-tenant buildings across Hyderabad. Available in ABS polymer, powder-coated aluminium, and SS 304 marine grade. Inquire with Ecosta Systems, Bangalore at 9342050099 for bulk MEP contractor pricing.",
    callToAction: "GET_OFFER",
    actionUrl: "https://www.ariavita.in/products/disc-valves",
    recommendedPhotoAlt: "Aria Vita Disc Valve ceiling ventilation diffuser Hyderabad",
    verificationNotes: "Verify available stock for ABS vs Aluminium models prior to seasonal marketing pushes.",
  },
  {
    week: 5,
    product: "Flexible Duct",
    targetCity: "Kochi",
    state: "Kerala",
    title: "Insulated & Non-Insulated Flexible Ducts in Kochi",
    postBody:
      "High-durability HVAC flexible ducting engineered for humid coastal air distribution in Kochi and Kerala. Available in standard non-insulated and insulated options with fiberglass acoustic barrier. Dispatched with fast transit from Ecosta Systems, Bangalore. Call 9342050099 for contractor rates.",
    callToAction: "GET_OFFER",
    actionUrl: "https://www.ariavita.in/products/flexible-duct",
    recommendedPhotoAlt: "Aria Vita Insulated Flexible Duct reel ready for HVAC installation Kochi",
    verificationNotes: "Ensure insulation thickness (25mm/50mm) is verified in quote specs.",
  },
];
