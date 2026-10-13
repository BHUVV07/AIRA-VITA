/**
 * ARIA VITA — South India & Pan India Geographic SEO Dataset
 * Preserves all client-supplied cities, aliases, and state groupings.
 */

export interface GeographicCityRecord {
  city: string;
  state: "Karnataka" | "Tamil Nadu" | "Andhra Pradesh" | "Telangana" | "Kerala" | "Pan India";
  aliases: string[];
  isSouthIndia: boolean;
  isHub?: boolean;
  notes?: string;
}

export const SOUTH_INDIA_STATES = [
  "Karnataka",
  "Tamil Nadu",
  "Andhra Pradesh",
  "Telangana",
  "Kerala",
] as const;

export type SouthIndiaState = (typeof SOUTH_INDIA_STATES)[number];

export const SOUTH_INDIA_GEOGRAPHY: Record<SouthIndiaState, GeographicCityRecord[]> = {
  Karnataka: [
    { city: "Bangalore", state: "Karnataka", aliases: ["Bengaluru", "Bangalore City"], isSouthIndia: true, isHub: true, notes: "Central warehousing hub & Ecosta Systems HQ" },
    { city: "Mysore", state: "Karnataka", aliases: ["Mysuru"], isSouthIndia: true },
    { city: "Mangalore", state: "Karnataka", aliases: ["Mangaluru"], isSouthIndia: true },
    { city: "Hubli", state: "Karnataka", aliases: ["Hubballi", "Hubli-Dharwad"], isSouthIndia: true },
    { city: "Dharwad", state: "Karnataka", aliases: ["Dharwada"], isSouthIndia: true },
    { city: "Belgaum", state: "Karnataka", aliases: ["Belagavi"], isSouthIndia: true },
    { city: "Gulbarga", state: "Karnataka", aliases: ["Kalaburagi"], isSouthIndia: true },
    { city: "Davangere", state: "Karnataka", aliases: ["Davanagere"], isSouthIndia: true },
    { city: "Bellary", state: "Karnataka", aliases: ["Ballari"], isSouthIndia: true },
    { city: "Shimoga", state: "Karnataka", aliases: ["Shivamogga"], isSouthIndia: true },
    { city: "Tumkur", state: "Karnataka", aliases: ["Tumakuru"], isSouthIndia: true },
    { city: "Bijapur", state: "Karnataka", aliases: ["Vijayapura"], isSouthIndia: true },
    { city: "Udupi", state: "Karnataka", aliases: ["Odipu"], isSouthIndia: true },
    { city: "Hassan", state: "Karnataka", aliases: [], isSouthIndia: true },
    { city: "Gadag", state: "Karnataka", aliases: ["Gadag-Betageri"], isSouthIndia: true },
  ],
  "Tamil Nadu": [
    { city: "Chennai", state: "Tamil Nadu", aliases: ["Madras"], isSouthIndia: true },
    { city: "Coimbatore", state: "Tamil Nadu", aliases: ["Kovai"], isSouthIndia: true },
    { city: "Madurai", state: "Tamil Nadu", aliases: [], isSouthIndia: true },
    { city: "Trichy", state: "Tamil Nadu", aliases: ["Tiruchirappalli", "Tiruchirapalli"], isSouthIndia: true },
    { city: "Salem", state: "Tamil Nadu", aliases: [], isSouthIndia: true },
    { city: "Tirunelveli", state: "Tamil Nadu", aliases: ["Nellai"], isSouthIndia: true },
    { city: "Thoothukudi", state: "Tamil Nadu", aliases: ["Tuticorin"], isSouthIndia: true },
    { city: "Vellore", state: "Tamil Nadu", aliases: [], isSouthIndia: true },
    { city: "Thanjavur", state: "Tamil Nadu", aliases: ["Tanjore"], isSouthIndia: true },
    { city: "Erode", state: "Tamil Nadu", aliases: [], isSouthIndia: true },
    { city: "Hosur", state: "Tamil Nadu", aliases: [], isSouthIndia: true },
    { city: "Karur", state: "Tamil Nadu", aliases: [], isSouthIndia: true },
    { city: "Kanchipuram", state: "Tamil Nadu", aliases: ["Conjeevaram"], isSouthIndia: true },
    { city: "Tiruppur", state: "Tamil Nadu", aliases: ["Tirupur"], isSouthIndia: true },
    { city: "Nagercoil", state: "Tamil Nadu", aliases: [], isSouthIndia: true },
  ],
  "Andhra Pradesh": [
    { city: "Visakhapatnam", state: "Andhra Pradesh", aliases: ["Vizag", "Waltair"], isSouthIndia: true },
    { city: "Vijayawada", state: "Andhra Pradesh", aliases: ["Bezawada"], isSouthIndia: true },
    { city: "Guntur", state: "Andhra Pradesh", aliases: [], isSouthIndia: true },
    { city: "Tirupati", state: "Andhra Pradesh", aliases: [], isSouthIndia: true },
    { city: "Rajahmundry", state: "Andhra Pradesh", aliases: ["Rajamahendravaram"], isSouthIndia: true },
    { city: "Kakinada", state: "Andhra Pradesh", aliases: [], isSouthIndia: true },
    { city: "Nellore", state: "Andhra Pradesh", aliases: [], isSouthIndia: true },
    { city: "Kadapa", state: "Andhra Pradesh", aliases: ["Cuddapah"], isSouthIndia: true },
    { city: "Anantapur", state: "Andhra Pradesh", aliases: ["Ananthapuramu"], isSouthIndia: true },
    { city: "Kurnool", state: "Andhra Pradesh", aliases: [], isSouthIndia: true },
    { city: "Ongole", state: "Andhra Pradesh", aliases: [], isSouthIndia: true },
    { city: "Eluru", state: "Andhra Pradesh", aliases: [], isSouthIndia: true },
  ],
  Telangana: [
    { city: "Hyderabad", state: "Telangana", aliases: ["Bhagyanagar"], isSouthIndia: true },
    { city: "Secunderabad", state: "Telangana", aliases: ["Twin City"], isSouthIndia: true },
    { city: "Warangal", state: "Telangana", aliases: ["Orugallu"], isSouthIndia: true },
    { city: "Nizamabad", state: "Telangana", aliases: [], isSouthIndia: true },
    { city: "Khammam", state: "Telangana", aliases: [], isSouthIndia: true },
    { city: "Karimnagar", state: "Telangana", aliases: [], isSouthIndia: true },
    { city: "Ramagundam", state: "Telangana", aliases: [], isSouthIndia: true },
    { city: "Mahbubnagar", state: "Telangana", aliases: ["Palamoor"], isSouthIndia: true },
  ],
  Kerala: [
    { city: "Kochi", state: "Kerala", aliases: ["Cochin", "Ernakulam"], isSouthIndia: true },
    { city: "Trivandrum", state: "Kerala", aliases: ["Thiruvananthapuram"], isSouthIndia: true },
    { city: "Calicut", state: "Kerala", aliases: ["Kozhikode"], isSouthIndia: true },
    { city: "Thrissur", state: "Kerala", aliases: ["Trichur"], isSouthIndia: true },
    { city: "Kollam", state: "Kerala", aliases: ["Quilon"], isSouthIndia: true },
    { city: "Kannur", state: "Kerala", aliases: ["Cannanore"], isSouthIndia: true },
    { city: "Alappuzha", state: "Kerala", aliases: ["Alleppey"], isSouthIndia: true },
    { city: "Kottayam", state: "Kerala", aliases: [], isSouthIndia: true },
    { city: "Palakkad", state: "Kerala", aliases: ["Palghat"], isSouthIndia: true },
    { city: "Malappuram", state: "Kerala", aliases: [], isSouthIndia: true },
    { city: "Kasaragod", state: "Kerala", aliases: ["Kasargod"], isSouthIndia: true },
    { city: "Wayanad", state: "Kerala", aliases: ["Kalpetta"], isSouthIndia: true },
  ],
};

export const PAN_INDIA_METROS: GeographicCityRecord[] = [
  { city: "Mumbai", state: "Pan India", aliases: ["Bombay"], isSouthIndia: false },
  { city: "Delhi", state: "Pan India", aliases: ["New Delhi", "NCR"], isSouthIndia: false },
  { city: "Pune", state: "Pan India", aliases: ["Poona"], isSouthIndia: false },
  { city: "Kolkata", state: "Pan India", aliases: ["Calcutta"], isSouthIndia: false },
  { city: "Ahmedabad", state: "Pan India", aliases: ["Amdavad"], isSouthIndia: false },
  { city: "Jaipur", state: "Pan India", aliases: ["Pink City"], isSouthIndia: false },
  { city: "Lucknow", state: "Pan India", aliases: [], isSouthIndia: false },
  { city: "Chandigarh", state: "Pan India", aliases: [], isSouthIndia: false },
  { city: "Nagpur", state: "Pan India", aliases: [], isSouthIndia: false },
  { city: "Indore", state: "Pan India", aliases: [], isSouthIndia: false },
  { city: "Surat", state: "Pan India", aliases: [], isSouthIndia: false },
  { city: "Bhubaneswar", state: "Pan India", aliases: ["Bhubaneshwar"], isSouthIndia: false },
  { city: "Patna", state: "Pan India", aliases: [], isSouthIndia: false },
  { city: "Bhopal", state: "Pan India", aliases: [], isSouthIndia: false },
  { city: "Vadodara", state: "Pan India", aliases: ["Baroda"], isSouthIndia: false },
  { city: "Nashik", state: "Pan India", aliases: ["Nasik"], isSouthIndia: false },
  { city: "Rajkot", state: "Pan India", aliases: [], isSouthIndia: false },
  { city: "Raipur", state: "Pan India", aliases: [], isSouthIndia: false },
  { city: "Ranchi", state: "Pan India", aliases: [], isSouthIndia: false },
  { city: "Guwahati", state: "Pan India", aliases: [], isSouthIndia: false },
  { city: "Ludhiana", state: "Pan India", aliases: [], isSouthIndia: false },
  { city: "Kanpur", state: "Pan India", aliases: [], isSouthIndia: false },
  { city: "Agra", state: "Pan India", aliases: [], isSouthIndia: false },
  { city: "Varanasi", state: "Pan India", aliases: ["Banaras", "Kashi"], isSouthIndia: false },
  { city: "Dehradun", state: "Pan India", aliases: [], isSouthIndia: false },
  { city: "Goa", state: "Pan India", aliases: ["Panaji"], isSouthIndia: false },
];

/**
 * Returns a flat list of all South India cities.
 */
export function getAllSouthIndiaCities(): GeographicCityRecord[] {
  return Object.values(SOUTH_INDIA_GEOGRAPHY).flat();
}

/**
 * Generates an SEO title based on the client formula:
 * [Product] in [City] | Best Price | Best Quality | Aria Vita Distributor | Ecosta Systems
 */
export function generateLocationSeoTitle(productName: string, cityName: string): string {
  return `${productName} in ${cityName} | Best Price | Best Quality | Aria Vita Distributor | Ecosta Systems`;
}
