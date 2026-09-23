import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, MapPin, Building2, Phone, Mail, ArrowRight, Truck } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FinalCTASection from "@/components/sections/FinalCTASection";
import { COMPANY_INFO } from "@/data/ariaVitaData";

export const metadata = {
  title: "About Us | Aria Vita™ HVAC Air Distribution",
  description:
    "Learn about Aria Vita™, a leading manufacturer and supplier of engineered air distribution products for commercial, industrial and residential HVAC applications.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-16 lg:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block mb-3">
            Company Overview
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading tracking-tight">
            Engineering Airflow for Tomorrow
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            {COMPANY_INFO.concept}
          </p>
        </div>
      </section>

      {/* Main Story & Positioning */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              badge="Core Purpose"
              title="Precision Air Distribution Solutions"
              description="Aria Vita™ manufactures and supplies high-performance air distribution products engineered to meet demanding HVAC requirements across commercial, industrial and residential applications."
            />

            <p className="text-slate-600 text-base leading-relaxed">
              Our engineering philosophy focuses on precision airflow control, safety, long-term durability, and energy efficiency. From fire safety flexible ducting to self-balancing constant airflow regulators, our products ensure building ventilation systems operate at peak performance.
            </p>

            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Our Operational Focus:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {COMPANY_INFO.focus.map((item) => (
                  <div
                    key={item}
                    className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-3 shadow-xs"
                  >
                    <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" />
                    <span className="text-xs font-semibold text-slate-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden bg-white p-3 border border-slate-200 shadow-xl">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900">
                <Image
                  src="/images/products/constant-airflow-regulator.jpg"
                  alt="Aria Vita™ Manufacturing & Distribution"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Distributor Partnership Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-bold uppercase tracking-wider border border-purple-200">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              <span>Pan India Distribution Partner</span>
            </div>
            <h3 className="text-2xl font-bold font-heading text-slate-900">
              {COMPANY_INFO.distributor.name}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Aria Vita™ products are stocked, distributed, and supported pan-India by{" "}
              <strong>Ecosta Systems</strong>, located in {COMPANY_INFO.distributor.location}. This ensures ready stock availability, rapid project dispatch, and local technical assistance for MEP contractors and consultants.
            </p>
          </div>

          <div className="lg:col-span-5 bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-base font-bold text-purple-400">Distributor Contact Details</h4>
            <p className="text-xs text-slate-300 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-purple-400" />
              <span>{COMPANY_INFO.distributor.address}</span>
            </p>
            <p className="text-xs text-slate-300 flex items-center gap-2">
              <Mail className="w-4 h-4 text-sky-400" />
              <span>{COMPANY_INFO.contact.email}</span>
            </p>
            <p className="text-xs text-slate-300 flex items-center gap-2">
              <Phone className="w-4 h-4 text-purple-400" />
              <span>{COMPANY_INFO.contact.formattedPhone}</span>
            </p>
          </div>
        </div>
      </section>

      <FinalCTASection />
    </div>
  );
}
