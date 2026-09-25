export const DEFAULT_WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER || process.env.WHATSAPP_PHONE_NUMBER || "919342050097";

export interface EnquiryFormData {
  name: string;
  company?: string;
  email: string;
  phone: string;
  projectType?: string;
  product?: string;
  variant?: string;
  message?: string;
  location?: string;
}

/**
 * Clean phone number for WhatsApp deep-linking (removes +, spaces, dashes)
 */
export function formatPhoneForWhatsApp(phone: string): string {
  return phone.replace(/[^0-9]/g, "");
}

/**
 * Builds a clean, professional B2B WhatsApp inquiry message.
 */
export function generateWhatsAppEnquiryUrl(data: EnquiryFormData, customPhoneNumber?: string): string {
  const phone = formatPhoneForWhatsApp(customPhoneNumber || DEFAULT_WHATSAPP_PHONE);
  const companyName = data.company?.trim() ? data.company.trim() : "Direct / Individual Enquiry";
  const userMessage = data.message?.trim()
    ? data.message.trim()
    : "Requesting technical data sheets, sizing guidance, and commercial quotation.";

  const lines = [
    "Hello Aria Vita Team,",
    "",
    "I would like to enquire about:",
    `• Product: ${data.product || "General Enquiry"}`,
    `• Variant: ${data.variant || "—"}`,
    `• Company: ${companyName}`,
    `• Name: ${data.name.trim()}`,
    `• Phone: ${data.phone.trim()}`,
    `• Email: ${data.email.trim()}`,
    data.projectType ? `• Project Type: ${data.projectType}` : null,
    data.location ? `• Location: ${data.location}` : null,
    "",
    "Message:",
    userMessage,
    "",
    "Thank you.",
  ].filter(Boolean) as string[];

  return `https://wa.me/${phone}?text=${encodeURIComponent(lines.join("\n"))}`;
}

/**
 * Direct WhatsApp chat link for general inquiries.
 */
export function getDirectWhatsAppUrl(customMessage?: string, customPhoneNumber?: string): string {
  const phone = formatPhoneForWhatsApp(customPhoneNumber || DEFAULT_WHATSAPP_PHONE);
  const defaultMsg =
    "Hello Aria Vita Team,\n\nI would like to enquire about your HVAC Air Distribution products and technical catalog.";
  return `https://wa.me/${phone}?text=${encodeURIComponent(customMessage || defaultMsg)}`;
}
