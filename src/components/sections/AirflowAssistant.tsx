"use client";

import React, { useState } from "react";
import { Sliders, CheckCircle2, ArrowRight, Sparkles, Info } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactModal from "@/components/ui/ContactModal";
import { PRODUCTS, searchProducts } from "@/data/products";

export default function AirflowAssistant() {
  const [sector, setSector] = useState("Commercial Building");
  const [cfm, setCfm] = useState(150);
  const [category, setCategory] = useState("Airflow Control");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProductSlug, setSelectedProductSlug] = useState("");

  // Map category dynamically to matching product from the data store
  const recommendedProduct = PRODUCTS.find((p) => p.category.includes(category) || p.category === category) || PRODUCTS[0];

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white via-sky-50/50 to-ice-blue border-b border-sky-200 relative overflow-hidden">
      <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Interactive Selection Tool"
          title="Find Your Airflow Solution"
          description="Simulate your project application and target CFM requirement to identify matching Aria Vita™ engineered air distribution products."
          align="center"
          className="mb-10"
        />

        {/* Mandatory Engineering Disclaimer */}
        <div className="max-w-3xl mx-auto mb-10 p-3.5 rounded-2xl bg-white/90 border border-purple-200 text-purple-900 text-xs flex items-center gap-3 shadow-xs">
          <Info className="w-5 h-5 text-purple-600 shrink-0" />
          <span>
            <strong>Indicative selection tool.</strong> Final product selection should be verified against project requirements and applicable engineering standards.
          </span>
        </div>

        {/* Interactive Assistant Card */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-sky-200 p-6 md:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-base font-bold font-heading text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sliders className="w-4 h-4 text-purple-700" />
              <span>1. Enter Project Parameters</span>
            </h3>

            {/* Input 1: Application Environment */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Application Environment
              </label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="Commercial Building">Commercial Building (Office / IT Park)</option>
                <option value="Hospital & Cleanroom">Hospital & Cleanroom Isolation</option>
                <option value="Hotel & Hospitality">Hotel & Restaurant Ventilation</option>
                <option value="Industrial & Factory">Industrial & Factory Plant</option>
                <option value="Residential Development">Multi-story Apartment Complex</option>
              </select>
            </div>

            {/* Input 2: Airflow Rate Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Target Airflow Rate (CFM / m³/h)
                </label>
                <span className="text-xs font-mono font-bold text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-200">
                  {cfm} CFM ({Math.round(cfm * 1.699)} m³/h)
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="600"
                step="10"
                value={cfm}
                onChange={(e) => setCfm(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                <span>30 CFM (Small Room)</span>
                <span>300 CFM (Office)</span>
                <span>600 CFM (High Flow)</span>
              </div>
            </div>

            {/* Input 3: Product Category Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Primary Product Function
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Airflow Control", cat: "Airflow Control" },
                  { label: "Fire Safety Ducting", cat: "Fire Safety" },
                  { label: "Disc Valves", cat: "Air Distribution" },
                  { label: "Air Barriers", cat: "Air Barriers" },
                ].map((item) => (
                  <button
                    key={item.cat}
                    type="button"
                    onClick={() => setCategory(item.cat)}
                    className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all text-left cursor-pointer ${
                      category === item.cat
                        ? "bg-purple-700 border-purple-700 text-white shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl border border-slate-800 p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5 font-heading">
                  <Sparkles className="w-4 h-4" />
                  <span>Matching Product Recommendation</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                  Dynamic Match
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-bold font-heading text-white">
                  {recommendedProduct.name}
                </h4>
                <p className="text-xs text-sky-400 font-semibold">{recommendedProduct.subtitle}</p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {recommendedProduct.shortDescription}
              </p>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                <p className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider">
                  Technical Compatibility Profile:
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-500">Selected Sector:</span>
                    <p className="text-slate-200 font-semibold">{sector}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Target Airflow Rate:</span>
                    <p className="text-sky-400 font-mono font-semibold">{cfm} CFM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800">
              <button
                onClick={() => {
                  setSelectedProductSlug(recommendedProduct.name);
                  setModalOpen(true);
                }}
                className="w-full py-3.5 bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Request Technical RFQ for Selection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultProduct={selectedProductSlug}
      />
    </section>
  );
}
