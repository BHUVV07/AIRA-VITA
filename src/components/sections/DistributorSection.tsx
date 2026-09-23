"use client";

import React, { useState } from "react";
import { ShieldCheck, MapPin, Phone, Mail, ArrowRight, Truck, Building } from "lucide-react";
import Button from "@/components/ui/Button";
import ContactModal from "@/components/ui/ContactModal";
import { COMPANY_INFO } from "@/data/products";

export default function DistributorSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-r from-ice-blue via-sky-100/60 to-soft-blue border-y border-sky-200 relative overflow-hidden">
      {/* Soft Blue Atmospheric Vectors */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-200/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-tech-grid opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-sky-200 p-8 md:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-900 border border-purple-200">
              <ShieldCheck className="w-4 h-4 text-purple-700" />
              <span>Pan India Distribution Partner</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 leading-tight">
              Local Stock. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-sky-600">
                Faster Support.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Our products are stocked and distributed by{" "}
              <strong className="text-slate-900">{COMPANY_INFO.distributor.name}</strong>, Bangalore for fast service, ready project inventory, and on-site technical support.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-700 text-white flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Ready Site Inventory</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Rapid dispatch across Indian project locations</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">MEP Technical Guidance</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Sizing and installation consultation</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setModalOpen(true)}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Contact Distributor
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block">
                Authorized Stockist & Partner
              </span>
              <h3 className="text-2xl font-bold font-heading text-white mt-1">
                {COMPANY_INFO.distributor.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1">{COMPANY_INFO.distributor.location}</p>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{COMPANY_INFO.distributor.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{COMPANY_INFO.contact.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{COMPANY_INFO.contact.formattedPhone}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Hub: Bangalore</span>
              <span className="text-sky-400 font-semibold">Pan India Shipping</span>
            </div>
          </div>
        </div>
      </div>

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
