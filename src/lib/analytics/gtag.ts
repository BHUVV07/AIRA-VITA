export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-E8VWW1R7NK";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * PII blacklist: Never send personal information, emails, phone numbers,
 * messages, passwords, tokens or credentials to Google Analytics.
 */
const FORBIDDEN_PII_KEYS = new Set([
  "email",
  "phone",
  "phonenumber",
  "phone_number",
  "name",
  "fullname",
  "full_name",
  "firstname",
  "lastname",
  "password",
  "token",
  "auth_token",
  "access_token",
  "secret",
  "message",
  "comments",
  "address",
  "contact",
]);

/**
 * Sanitizes an event parameter object to strip out any accidental PII.
 */
function sanitizeParams(params: Record<string, unknown>): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(params)) {
    const lowerKey = key.toLowerCase();
    if (FORBIDDEN_PII_KEYS.has(lowerKey)) {
      continue;
    }

    // Skip nested strings that look like emails or phone numbers
    if (typeof value === "string") {
      if (value.includes("@") && value.includes(".")) {
        continue;
      }
      if (/^\+?[0-9]{10,14}$/.test(value.trim())) {
        continue;
      }
    }

    sanitized[key] = value;
  }

  return sanitized;
}

/**
 * Check if Google Analytics is enabled in the current environment
 */
export function isGAEnabled(): boolean {
  return typeof window !== "undefined" && Boolean(GA_MEASUREMENT_ID) && typeof window.gtag === "function";
}

/**
 * Track page view across client-side navigation
 * Avoids tracking internal admin dashboard (/admin/*)
 */
export function pageview(url: string) {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID) return;
  if (url.startsWith("/admin")) return;

  if (typeof window.gtag === "function") {
    window.gtag("event", "page_view", {
      page_path: url,
      page_location: window.location.href,
      page_title: typeof document !== "undefined" ? document.title : "",
    });
  }
}

/**
 * Generic sanitized custom event tracker
 */
export function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID) return;
  if (window.location.pathname.startsWith("/admin")) return;

  const sanitized = sanitizeParams(params);

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, sanitized);
  }
}

// -------------------------------------------------------------
// Dedicated Type-Safe Custom Event Helpers
// -------------------------------------------------------------

export interface ViewItemParams {
  item_id?: string;
  item_name: string;
  item_category?: string;
  item_variant?: string;
}

/**
 * 1. view_item: Product detail page viewed
 */
export function trackViewItem({ item_id, item_name, item_category, item_variant }: ViewItemParams) {
  trackEvent("view_item", {
    currency: "INR",
    items: [
      {
        item_id: item_id || item_name.toLowerCase().replace(/\s+/g, "-"),
        item_name,
        item_category,
        item_variant,
      },
    ],
  });
}

export interface SelectItemParams {
  item_id?: string;
  item_name: string;
  item_category?: string;
  item_list_name?: string;
  item_variant?: string;
}

/**
 * 2. select_item: Product selected from a listing or catalog
 */
export function trackSelectItem({
  item_id,
  item_name,
  item_category,
  item_list_name = "Product Listing",
  item_variant,
}: SelectItemParams) {
  trackEvent("select_item", {
    item_list_name,
    items: [
      {
        item_id: item_id || item_name.toLowerCase().replace(/\s+/g, "-"),
        item_name,
        item_category,
        item_variant,
      },
    ],
  });
}

export interface ClickWhatsAppParams {
  location: string;
  label?: string;
}

/**
 * 3. click_whatsapp: WhatsApp enquiry button clicked
 */
export function trackClickWhatsApp({ location, label = "Sales Desk" }: ClickWhatsAppParams) {
  trackEvent("click_whatsapp", {
    location,
    channel: "whatsapp",
    contact_label: label,
  });
}

export interface ClickEmailParams {
  location: string;
}

/**
 * 4. click_email: Email contact link clicked
 */
export function trackClickEmail({ location }: ClickEmailParams) {
  trackEvent("click_email", {
    location,
    channel: "email",
    contact_label: "sales_inquiry",
  });
}

export interface FormStartParams {
  form_id: string;
  form_name: string;
}

/**
 * 5. form_start: Enquiry form interaction started
 */
export function trackFormStart({ form_id, form_name }: FormStartParams) {
  trackEvent("form_start", {
    form_id,
    form_name,
  });
}

export interface GenerateLeadParams {
  form_id: string;
  lead_type?: string;
  product_name?: string;
  project_type?: string;
}

/**
 * 6. generate_lead: Enquiry successfully submitted (confirmed by backend)
 * Strictly sends NO PII (no name, email, phone, or raw message).
 */
export function trackGenerateLead({
  form_id,
  lead_type = "product_enquiry",
  product_name,
  project_type,
}: GenerateLeadParams) {
  trackEvent("generate_lead", {
    form_id,
    lead_type,
    product_name: product_name || undefined,
    project_type: project_type || undefined,
    currency: "INR",
  });
}

export interface ViewGalleryParams {
  category?: string;
  item_count?: number;
}

/**
 * 7. view_gallery: Gallery page viewed
 */
export function trackViewGallery({ category = "All", item_count }: ViewGalleryParams = {}) {
  trackEvent("view_gallery", {
    category,
    item_count: typeof item_count === "number" ? item_count : undefined,
  });
}
