"use client";

import React, { useState } from "react";
import { ArrowRight, Mail, PhoneCall, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import ContactModal from "@/components/ui/ContactModal";

export default function FinalCTASection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [defaultProduct, setDefaultProduct] = useState("");

  const handleOpenRFQ = (product = "") => {
    setDefaultProduct(product);
    setModalOpen(true);
  };

  return (
    <section className="py-20 lg:py-28 bg-slate-950 text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-tech-grid-dark opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-sky-950/80 text-sky-300 border border-sky-800/80 shadow-md">
          <ShieldCheck className="w-4 h-4 text-sky-400" />
          <span>B2B Project Support & Consultation</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
          Planning Your Next HVAC Project?
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Talk to our team about product selection, technical requirements and project support for commercial, industrial and residential installations.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Button
            variant="primary"
            size="lg"
            onClick={() => handleOpenRFQ("General Project Inquiry")}
            icon={<Mail className="w-5 h-5" />}
          >
            Request Product Information
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => handleOpenRFQ("Contact Sales")}
            icon={<PhoneCall className="w-5 h-5 text-sky-400" />}
            className="bg-slate-900 text-white border-slate-700 hover:bg-slate-800"
          >
            Contact Sales
          </Button>
        </div>
      </div>

      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultProduct={defaultProduct}
      />
    </section>
  );
}
