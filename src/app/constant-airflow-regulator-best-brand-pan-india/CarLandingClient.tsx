"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  ZapOff,
  Gauge,
  Sliders,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Building2,
  Activity,
  Layers,
  Sparkles,
  HelpCircle,
  Package,
} from "lucide-react";
import Button from "@/components/ui/Button";
import ContactModal from "@/components/ui/ContactModal";
import { CAR_LANDING_PAGE_DATA } from "@/lib/seo/car-landing-page";
import { SEO_SITE_CONFIG } from "@/lib/seo/site-config";
import { trackClickWhatsApp, trackSelectItem } from "@/lib/analytics/gtag";

export default function CarLandingClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* -------------------------------------------------------------
          1. Hero & Value Proposition Section
      ------------------------------------------------------------- */}
      <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-24 bg-gradient-to-b from-sky-50/60 via-white to-white border-b border-slate-100 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-100/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-10 w-72 h-72 bg-blue-100/40 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb nav */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link href="/" className="hover:text-sky-700 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-sky-700 transition-colors">Products</Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold">Constant Airflow Regulator</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & Core Value */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-900 border border-sky-200 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-sky-600" />
                <span>Pan India Supply &bull; Ecosta Systems Bangalore</span>
              </div>

              {/* Client-Provided Primary H1 */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 leading-[1.15] tracking-tight">
                {CAR_LANDING_PAGE_DATA.clientH1}
              </h1>

              {/* Client-Provided Secondary H2 */}
              <h2 className="text-lg sm:text-xl font-semibold text-sky-800 leading-snug">
                {CAR_LANDING_PAGE_DATA.clientH2}
              </h2>

              <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
                Aria Vita Constant Airflow Regulators (CAR) automatically maintain constant airflow volume across duct networks regardless of pressure fluctuations. Operating purely on mechanical aerodynamics, our units require <strong>zero electric power</strong>, <strong>no sensors</strong>, and <strong>no periodic calibration</strong>.
              </p>

              {/* Key Quick Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center gap-2.5">
                  <ZapOff className="w-5 h-5 text-sky-600 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Zero Power</div>
                    <div className="text-[11px] text-slate-500">100% Mechanical</div>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center gap-2.5">
                  <Gauge className="w-5 h-5 text-sky-600 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">50 – 250 Pa</div>
                    <div className="text-[11px] text-slate-500">Pressure Range</div>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center gap-2.5 col-span-2 sm:col-span-1">
                  <Sliders className="w-5 h-5 text-sky-600 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">&empty; 50 – 200 mm</div>
                    <div className="text-[11px] text-slate-500">Duct Diameters</div>
                  </div>
                </div>
              </div>

              {/* Primary Call to Actions */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setModalOpen(true)}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Request Technical Quote (RFQ)
                </Button>

                <a
                  href={`tel:${SEO_SITE_CONFIG.distributor.phones[0]}`}
                  className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:text-sky-700 hover:border-sky-400 font-semibold text-sm transition-all inline-flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-sky-600" />
                  <span>Call {SEO_SITE_CONFIG.distributor.phones[0]}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Featured Image with Official Alt Text */}
            <div className="lg:col-span-5">
              <div className="relative bg-gradient-to-b from-slate-50 to-slate-100 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl overflow-hidden group">
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  <Image
                    src="/images/products/car.png"
                    alt={CAR_LANDING_PAGE_DATA.imageAltTexts.descriptivePrimaryAlt}
                    title={CAR_LANDING_PAGE_DATA.imageAltTexts.primaryProductImage}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                  <span className="font-semibold text-slate-900">Aria Vita™ CAR Series</span>
                  <span className="text-sky-700 font-bold">Standard Diameters: 50–200 mm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          2. Client Overview & Engineering Foundation
      ------------------------------------------------------------- */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 block">
                Precision Engineering Statement
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
                Automatic CFM Control with Zero Duct Commissioning Overhead
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {CAR_LANDING_PAGE_DATA.clientSuppliedOverview}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          3. How It Works (Mechanical Principle)
      ------------------------------------------------------------- */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700">Aerodynamic Self-Balancing</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
              How the Constant Airflow Regulator Works Without Power
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              The Aria Vita CAR utilizes a calibrated, self-adjusting mechanical element that dynamically counterbalances static pressure changes between 50 and 250 Pa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-lg">
                01
              </div>
              <h3 className="text-lg font-bold font-heading text-slate-900">Low Duct Pressure (50 Pa)</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                At initial low pressure, the internal aerodynamic silicone bulb remains in its relaxed state, leaving maximum free area open so the designed airflow volume easily passes through.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-lg">
                02
              </div>
              <h3 className="text-lg font-bold font-heading text-slate-900">Pressure Surge / Fluctuations</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                When upstream blowers accelerate or dampers close on other branch lines, static pressure rises up to 250 Pa. The aerodynamic profile automatically inflates or constricts to resist excess airflow.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-lg">
                03
              </div>
              <h3 className="text-lg font-bold font-heading text-slate-900">Constant CFM Delivery</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                By maintaining continuous equilibrium between pressure and free area, the room receives steady, pre-commissioned CFM with zero motor controllers or electrical wiring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          4. Technical Specifications Table
      ------------------------------------------------------------- */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700">Engineering Data</span>
              <h2 className="text-3xl font-extrabold font-heading text-slate-900">
                Technical Specifications & Sizing
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Manufactured for seamless insertion into circular spiral ductwork, branch collar spigots, and flexible duct junctions. Tested across demanding commercial and hospital HVAC operating ranges.
              </p>

              <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 space-y-2 text-xs text-sky-900">
                <div className="font-bold">MEP Consultant Recommendation:</div>
                <p>
                  Eliminate traditional manual volume control damper (VCD) balancing cycles. Select the appropriate CAR diameter and calibrated set CFM per branch run.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <table className="w-full text-left text-sm text-slate-700">
                  <thead className="bg-slate-100 text-xs uppercase font-bold text-slate-900 border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-5">Parameter</th>
                      <th className="py-3.5 px-5">Engineering Specification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
                    <tr>
                      <td className="py-3 px-5 font-semibold text-slate-900">Diameter Range</td>
                      <td className="py-3 px-5 text-sky-700 font-bold">{CAR_LANDING_PAGE_DATA.specifications.diameterRange}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-5 font-semibold text-slate-900">Pressure Operating Range</td>
                      <td className="py-3 px-5 text-sky-700 font-bold">{CAR_LANDING_PAGE_DATA.specifications.pressureRange}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-5 font-semibold text-slate-900">Power Requirement</td>
                      <td className="py-3 px-5">{CAR_LANDING_PAGE_DATA.specifications.activation}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-5 font-semibold text-slate-900">Airflow Precision</td>
                      <td className="py-3 px-5">{CAR_LANDING_PAGE_DATA.specifications.airflowPrecision}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-5 font-semibold text-slate-900">Housing & Construction</td>
                      <td className="py-3 px-5">{CAR_LANDING_PAGE_DATA.specifications.bodyMaterial}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-5 font-semibold text-slate-900">Installation Orientation</td>
                      <td className="py-3 px-5">{CAR_LANDING_PAGE_DATA.specifications.installation}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-5 font-semibold text-slate-900">Maintenance Cycle</td>
                      <td className="py-3 px-5">{CAR_LANDING_PAGE_DATA.specifications.maintenance}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          5. Key Client Features Grid
      ------------------------------------------------------------- */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700">Key Advantages</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
              Why Engineers & Contractors Choose Aria Vita CAR
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Built to withstand Indian environmental conditions while delivering reliable pressure-independent air distribution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAR_LANDING_PAGE_DATA.clientFeatures.map((feat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2 hover:border-sky-300 transition-colors">
                <div className="flex items-center gap-2 text-sky-600">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <h3 className="text-sm font-bold text-slate-900">{feat.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-7">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          6. High-Impact Applications
      ------------------------------------------------------------- */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700">Application Domains</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
              Engineered for Critical & Commercial Ventilation
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              From sterile cleanrooms to high-density commercial towers, Aria Vita CAR units ensure exact branch airflow balancing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <Activity className="w-8 h-8 text-sky-600" />
              <h3 className="text-base font-bold text-slate-900">Hospitals & OTs</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Prevents cross-contamination by maintaining designed room pressurization and constant air change rates in NABH hospital isolation wards.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <Sparkles className="w-8 h-8 text-sky-600" />
              <h3 className="text-base font-bold text-slate-900">Pharma & Cleanrooms</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Precise room air balancing for cleanrooms and sterile formulation zones with zero electrical spark hazard in classified atmospheres.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <Building2 className="w-8 h-8 text-sky-600" />
              <h3 className="text-base font-bold text-slate-900">Offices & Malls</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Eliminates hot and cold spots across expansive multi-floor tenant offices, food courts, and retail complexes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <Layers className="w-8 h-8 text-sky-600" />
              <h3 className="text-base font-bold text-slate-900">VAV & Laboratories</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Maintains constant minimum ventilation and exhaust balancing in laboratory fume hoods and VAV systems without complex feedback loops.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          7. Pan-India Distribution & Dispatch Hub (Ecosta Systems)
      ------------------------------------------------------------- */}
      <section className="py-20 bg-gradient-to-r from-ice-blue via-sky-100/60 to-soft-blue border-b border-sky-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-sky-200 p-8 sm:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-900 border border-sky-200">
                <Package className="w-4 h-4 text-sky-600" />
                <span>Pan India Distribution Partner &bull; Ecosta Systems</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 leading-tight">
                Ready Stock & Direct Project Dispatch Across 40+ Cities
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                Aria Vita Constant Airflow Regulators are stocked in Bangalore and dispatched nationwide by authorized distributor <strong>Ecosta Systems</strong>. Fast delivery to site locations across Bangalore, Chennai, Hyderabad, Kochi, Mumbai, Delhi, Pune, Kolkata, Ahmedabad, and beyond.
              </p>

              <div className="flex flex-wrap gap-2 text-[11px] text-slate-600">
                {CAR_LANDING_PAGE_DATA.panIndiaCities.slice(0, 16).map((city, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-sky-50 rounded-md border border-sky-200/60 font-medium">
                    {city}
                  </span>
                ))}
                <span className="px-2.5 py-1 bg-slate-100 rounded-md text-slate-700 font-bold">
                  + 24 more cities
                </span>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setModalOpen(true)}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Contact Ecosta Systems
                </Button>

                <a
                  href={`tel:${SEO_SITE_CONFIG.distributor.phones[1] || SEO_SITE_CONFIG.distributor.phones[0]}`}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-800 hover:text-sky-700 hover:border-sky-400 font-semibold text-sm transition-all inline-flex items-center gap-2 bg-white"
                >
                  <Phone className="w-4 h-4 text-sky-600" />
                  <span>Call {SEO_SITE_CONFIG.distributor.phones[1] || SEO_SITE_CONFIG.distributor.phones[0]}</span>
                </a>
              </div>
            </div>

            {/* Warehouse / Hub Card */}
            <div className="lg:col-span-5 bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-5">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 block">
                  Central Distribution Hub
                </span>
                <h3 className="text-xl font-bold font-heading text-white mt-1">
                  {SEO_SITE_CONFIG.distributor.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1">Bangalore, Karnataka, India</p>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>{SEO_SITE_CONFIG.distributor.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>{SEO_SITE_CONFIG.distributor.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>{SEO_SITE_CONFIG.distributor.phones[0]} / {SEO_SITE_CONFIG.distributor.phones[1]}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Supply: Commercial & MEP Projects</span>
                <span className="text-sky-400 font-semibold">Pan India Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          8. Frequently Asked Questions (Client FAQs + Schema)
      ------------------------------------------------------------- */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700">FAQ</span>
            <h2 className="text-3xl font-extrabold font-heading text-slate-900">
              Frequently Asked Questions About Aria Vita CAR
            </h2>
            <p className="text-sm text-slate-600">
              Answers to technical, pricing, and distribution questions for HVAC contractors and MEP consultants.
            </p>
          </div>

          <div className="space-y-4">
            {CAR_LANDING_PAGE_DATA.faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50/50 transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-sky-700 transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-sky-600 shrink-0" />
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180 text-sky-600" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                      {faq.editorialAnswer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          9. Related HVAC Air Distribution Products
      ------------------------------------------------------------- */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700">Complete HVAC Catalogue</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 mt-1">
                Explore Related Aria Vita Products
              </h2>
            </div>
            <Link
              href="/products"
              className="text-xs font-bold text-sky-700 hover:text-sky-800 inline-flex items-center gap-1 group"
            >
              <span>View Full Products Catalogue</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/products/fire-retardent-canvas"
              onClick={() =>
                trackSelectItem({
                  item_id: "fire-retardent-canvas",
                  item_name: "Fire Retardent Canvas",
                  item_category: "Fire Retardent Canvas",
                  item_list_name: "CAR Landing Page Related",
                })
              }
              className="group bg-white p-5 rounded-2xl border border-slate-200 hover:border-sky-300 shadow-xs hover:shadow-md transition-all space-y-3"
            >
              <div className="relative aspect-video rounded-xl bg-slate-50 overflow-hidden">
                <Image
                  src="/images/products/fire-retardent-canvas.png"
                  alt="Aria Vita Fire Retardent Canvas"
                  fill
                  sizes="250px"
                  className="object-contain p-2 group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="font-bold text-sm text-slate-900 group-hover:text-sky-700 transition-colors">
                Fire Retardent Canvas
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2">
                Certified flexible ducting for smoke extract and high-temperature fire shafts (92°C & 250°C).
              </p>
            </Link>

            <Link
              href="/products/disc-valves"
              onClick={() =>
                trackSelectItem({
                  item_id: "disc-valves",
                  item_name: "Disc Valves",
                  item_category: "Disc Valves",
                  item_list_name: "CAR Landing Page Related",
                })
              }
              className="group bg-white p-5 rounded-2xl border border-slate-200 hover:border-sky-300 shadow-xs hover:shadow-md transition-all space-y-3"
            >
              <div className="relative aspect-video rounded-xl bg-slate-50 overflow-hidden">
                <Image
                  src="/images/products/disc-valves.png"
                  alt="Aria Vita Disc Valves"
                  fill
                  sizes="250px"
                  className="object-contain p-2 group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="font-bold text-sm text-slate-900 group-hover:text-sky-700 transition-colors">
                Disc Valves
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2">
                Supply & exhaust valves in ABS plastic, powder-coated aluminium, and stainless steel.
              </p>
            </Link>

            <Link
              href="/products/air-curtain"
              onClick={() =>
                trackSelectItem({
                  item_id: "air-curtain",
                  item_name: "Air Curtain",
                  item_category: "Air Curtain",
                  item_list_name: "CAR Landing Page Related",
                })
              }
              className="group bg-white p-5 rounded-2xl border border-slate-200 hover:border-sky-300 shadow-xs hover:shadow-md transition-all space-y-3"
            >
              <div className="relative aspect-video rounded-xl bg-slate-50 overflow-hidden">
                <Image
                  src="/images/products/air-curtain.png"
                  alt="Aria Vita Air Curtain"
                  fill
                  sizes="250px"
                  className="object-contain p-2 group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="font-bold text-sm text-slate-900 group-hover:text-sky-700 transition-colors">
                Air Curtain
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2">
                Commercial and industrial barriers (AACA, AACS Stainless Steel, AACH Industrial).
              </p>
            </Link>

            <Link
              href="/products/flexible-duct"
              onClick={() =>
                trackSelectItem({
                  item_id: "flexible-duct",
                  item_name: "Flexible Duct",
                  item_category: "Flexible Duct",
                  item_list_name: "CAR Landing Page Related",
                })
              }
              className="group bg-white p-5 rounded-2xl border border-slate-200 hover:border-sky-300 shadow-xs hover:shadow-md transition-all space-y-3"
            >
              <div className="relative aspect-video rounded-xl bg-slate-50 overflow-hidden">
                <Image
                  src="/images/products/flexible-duct.png"
                  alt="Aria Vita Flexible Duct"
                  fill
                  sizes="250px"
                  className="object-contain p-2 group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="font-bold text-sm text-slate-900 group-hover:text-sky-700 transition-colors">
                Flexible Duct
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2">
                Multi-ply aluminium non-insulated and insulated flexible ducts for HVAC take-offs.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          10. Bottom RFQ CTA Banner
      ------------------------------------------------------------- */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
            Get Technical Project Pricing
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white leading-tight">
            Ready to Integrate Aria Vita CAR Into Your HVAC Design?
          </h2>
          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Contact Ecosta Systems Bangalore for complete technical submittal packs, sizing charts, and B2B contractor rates. Dispatched Pan-India.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setModalOpen(true)}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Request Sizing & Quotation
            </Button>

            <a
              href={SEO_SITE_CONFIG.distributor.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackClickWhatsApp({
                  location: "car_landing_cta",
                  label: "CAR Sizing WhatsApp",
                })
              }
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all inline-flex items-center gap-2 shadow-md"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Interactive RFQ Modal */}
      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultProduct="CAR"
      />
    </div>
  );
}
