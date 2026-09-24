export const WHATSAPP_PHONE = "919342050097";

export interface EnquiryFormData {
  name: string;
  company?: string;
  email: string;
  phone: string;
  projectType: string;
  product: string;
  message?: string;
}

/**
 * Builds a clean, professional, executive B2B WhatsApp inquiry message.
 * Formatted specifically for clear WhatsApp readability without fragile emojis.
 */
export function generateWhatsAppEnquiryUrl(data: EnquiryFormData): string {
  const companyName = data.company?.trim() ? data.company.trim() : "Direct / Individual Enquiry";
  const userMessage = data.message?.trim()
    ? data.message.trim()
    : "Requesting technical data sheets, sizing guidance, and commercial quotation.";

  const lines = [
    "Hello ARIA VITA™ Team,",
    "",
    "I would like to request product information, technical sizing support, and a commercial quotation.",
    "",
    "*--- PROJECT ENQUIRY DETAILS ---*",
    `• *Name:* ${data.name.trim()}`,
    `• *Company / Firm:* ${companyName}`,
    `• *Contact Number:* ${data.phone.trim()}`,
    `• *Email:* ${data.email.trim()}`,
    `• *Project Sector:* ${data.projectType}`,
    `• *Product of Interest:* ${data.product}`,
    "",
    "*Requirements / Specifications:*",
    userMessage,
    "",
    "Please share the relevant technical data sheets and pricing at your earliest convenience.",
    "",
    "Thank you.",
  ];

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(lines.join("\n"))}`;
}

/**
 * Direct WhatsApp chat link for general inquiries.
 */
export function getDirectWhatsAppUrl(customMessage?: string): string {
  const defaultMsg =
    "Hello ARIA VITA™ Team,\n\nI would like to enquire about your HVAC Air Distribution products and technical catalog.";
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(customMessage || defaultMsg)}`;
}
