"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { getDirectWhatsAppUrl } from "@/utils/whatsapp";

export default function FloatingWhatsAppButton() {
  return (
    <aside aria-label="WhatsApp Quick Contact">
      <a
        href={getDirectWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group flex items-center gap-2.5 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-300"
        aria-label="Chat with ARIA VITA on WhatsApp"
      >
        <span className="relative flex items-center justify-center">
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping opacity-75" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full" />
        </span>
        <span className="text-xs font-bold tracking-wide pr-0.5 hidden sm:inline-block">
          WhatsApp Desk
        </span>
      </a>
    </aside>
  );
}
