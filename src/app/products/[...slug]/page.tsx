"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  Mail,
  Wind,
  Settings2,
  Clock,
  PhoneCall,
  Thermometer,
} from "lucide-react";
import Button from "@/components/ui/Button";
import ContactModal from "@/components/ui/ContactModal";
import { getProductBySlug, PRODUCTS, COMPANY_INFO, ProductSubcategory } from "@/data/products";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default function DynamicProductPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slugSegments = resolvedParams.slug || [];

  const mainSlug = slugSegments[0] || "";
  const subSlug = slugSegments[1] || "";

  const product = getProductBySlug(mainSlug);

  // Determine active subcategory or selected variant index
  let initialSubIdx = 0;
  if (product && product.subcategories) {
    if (subSlug) {
      const idx = product.subcategories.findIndex(
        (sc) =>
          sc.slug.toLowerCase() === subSlug.toLowerCase() ||
          sc.id.toLowerCase() === subSlug.toLowerCase() ||
          (sc.model && sc.model.toLowerCase() === subSlug.toLowerCase())
      );
      if (idx !== -1) initialSubIdx = idx;
    } else if (mainSlug !== product.slug) {
      const idx = product.subcategories.findIndex(
        (sc) =>
          sc.slug.toLowerCase() === mainSlug.toLowerCase() ||
          sc.id.toLowerCase() === mainSlug.toLowerCase() ||
          (sc.model && sc.model.toLowerCase() === mainSlug.toLowerCase())
      );
      if (idx !== -1) initialSubIdx = idx;
    }
  }

  const [activeSubIdx, setActiveSubIdx] = useState(initialSubIdx);
  const [modalOpen, setModalOpen] = useState(false);
  const [carMode, setCarMode] = useState<"blowing" | "extraction">("blowing");

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center min-h-[60vh] flex flex-col items-center justify-center bg-slate-50">
        <h1 className="text-3xl font-bold font-heading text-slate-900">Product Not Found</h1>
        <p className="text-slate-600 mt-2">The requested product category does not exist in our catalogue.</p>
        <Link href="/products" className="mt-6 px-6 py-3 bg-purple-700 text-white rounded-xl text-xs font-semibold">
          Return to Products Catalogue
        </Link>
      </div>
    );
  }

  const isCAR = product.slug === "car";
  const isFireCanvas = product.slug === "fire-retardent-canvas";

  const subcategories = product.subcategories || [];
  const activeSubcategory: ProductSubcategory | undefined = subcategories[activeSubIdx];

  const activeSpecs = activeSubcategory?.specifications || product.specifications;
  const activeFeatures = activeSubcategory?.features || product.features || [];
  const activeApps = activeSubcategory?.applications || product.applications || [];

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-slate-600 font-medium overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-purple-700 transition-colors shrink-0">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link href="/products" className="hover:text-purple-700 transition-colors shrink-0">
            Products
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link
            href={`/products/${product.slug}`}
            className={`hover:text-purple-700 transition-colors shrink-0 ${!activeSubcategory ? "font-bold text-slate-900" : ""}`}
          >
            {product.name}
          </Link>
          {activeSubcategory && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="font-bold text-slate-900 shrink-0">{activeSubcategory.name}</span>
            </>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white via-sky-50/60 to-ice-blue py-12 lg:py-16 border-b border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-3.5 py-1 rounded-full border border-purple-200 inline-block">
                {activeSubcategory ? `${product.name} → ${activeSubcategory.name}` : product.category}
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 tracking-tight leading-tight">
                {activeSubcategory
                  ? `${product.name} — ${activeSubcategory.name}${activeSubcategory.model ? ` (${activeSubcategory.model})` : ""}`
                  : product.name}
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed font-normal">
                {activeSubcategory?.subtitle || product.subtitle}
              </p>

              {/* CAR Prominent Key Highlights */}
              {isCAR && (
                <div className="flex flex-wrap gap-3 pt-2">
                  <div className="px-4 py-2 bg-white rounded-xl border border-sky-200 shadow-sm font-mono">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">DIAMETER</span>
                    <span className="text-sm font-extrabold text-purple-900">50–200 dia</span>
                  </div>
                  <div className="px-4 py-2 bg-white rounded-xl border border-sky-200 shadow-sm font-mono">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">PRESSURE RANGE</span>
                    <span className="text-sm font-extrabold text-sky-700">50–250 Pa</span>
                  </div>
                </div>
              )}

              {/* Fire Retardent Canvas Temperature Highlight */}
              {isFireCanvas && activeSubcategory?.temperature && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900 text-white rounded-xl shadow-md font-mono text-xs">
                  <Thermometer className="w-4 h-4 text-purple-300" />
                  <span>TEMPERATURE RESISTANCE: <strong>{activeSubcategory.temperature}</strong></span>
                </div>
              )}

              {/* Standards Badges */}
              {product.standards && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {product.standards.map((std) => (
                    <span
                      key={std}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1 rounded-md bg-purple-50 text-purple-800 border border-purple-200"
                    >
                      <ShieldCheck className="w-4 h-4 text-purple-600" />
                      {std}
                    </span>
                  ))}
                </div>
              )}

              <div className="pt-4 flex items-center gap-4">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setModalOpen(true)}
                  icon={<Mail className="w-4 h-4" />}
                >
                  Request Technical Quote
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl p-2">
                <Image
                  src={activeSubcategory?.image || product.image}
                  alt={activeSubcategory ? `${product.name} ${activeSubcategory.name}` : product.name}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">
        {/* INTERACTIVE VARIANT SELECTOR FOR PRODUCTS WITH SUBCATEGORIES */}
        {subcategories.length > 0 && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sky-200 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700 block mb-1">
                  Product Selector
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
                  Select {product.name} Variant
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-400 font-semibold hidden sm:block">
                {subcategories.length} Options Available
              </span>
            </div>

            {/* Responsive Horizontally Scrollable Selector */}
            <div className="flex gap-3 overflow-x-auto pb-2 pt-2 scrollbar-none">
              {subcategories.map((sub, idx) => {
                const isSelected = activeSubIdx === idx;

                return (
                  <button
                    key={sub.id}
                    onClick={() => setActiveSubIdx(idx)}
                    className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all shrink-0 text-left cursor-pointer border ${
                      isSelected
                        ? "bg-purple-700 border-purple-700 text-white shadow-md ring-2 ring-purple-300"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{sub.name}</span>
                      {sub.model && (
                        <span className={`font-mono text-[10px] px-2 py-0.5 rounded ${isSelected ? "bg-purple-900 text-purple-200" : "bg-purple-100 text-purple-800"}`}>
                          {sub.model}
                        </span>
                      )}
                      {sub.temperature && (
                        <span className={`font-mono text-[10px] px-2 py-0.5 rounded ${isSelected ? "bg-purple-900 text-purple-200" : "bg-purple-100 text-purple-800"}`}>
                          {sub.temperature}
                        </span>
                      )}
                      {sub.isComingSoon && (
                        <span className="text-[10px] font-mono bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded">
                          Soon
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* If viewing a subcategory with isComingSoon */}
        {activeSubcategory?.isComingSoon ? (
          <div className="bg-white p-10 rounded-3xl border border-sky-200 shadow-lg text-center max-w-2xl mx-auto space-y-6">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl text-purple-700 flex items-center justify-center mx-auto">
              <Clock className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold font-heading text-slate-900">
                Technical Information Coming Soon
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Detailed technical specifications, CAD drawings, and test certificates for {product.name} — {activeSubcategory.name} are currently being updated by our engineering team.
              </p>
            </div>
            <div className="pt-2 flex justify-center gap-4">
              <Button
                variant="primary"
                size="md"
                onClick={() => setModalOpen(true)}
                icon={<PhoneCall className="w-4 h-4" />}
              >
                Contact Team for Product Details
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Overview & Key Specs */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-6">
                <h2 className="text-2xl font-bold font-heading text-slate-900 border-b border-slate-200 pb-3">
                  Product Overview & Technical Performance
                </h2>

                <p className="text-slate-700 leading-relaxed text-base">
                  {activeSubcategory?.description || product.description}
                </p>

                {/* Prominent Temperature Resistance Display for Fire Retardent Canvas */}
                {isFireCanvas && activeSubcategory?.temperature && (
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-900 to-slate-900 text-white space-y-2 shadow-md">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-300 block">
                      TEMPERATURE RESISTANCE SPECIFICATION
                    </span>
                    <div className="text-3xl font-extrabold font-mono text-purple-200">
                      {activeSubcategory.temperature}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Engineered to maintain structural integrity and flexibility under thermal operating conditions up to {activeSubcategory.temperature}.
                    </p>
                  </div>
                )}

                {activeApps.length > 0 && (
                  <div>
                    <h3 className="text-base font-bold font-heading text-slate-900 mb-3">
                      Primary HVAC Applications
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeApps.map((app) => (
                        <div
                          key={app}
                          className="p-3.5 bg-white rounded-2xl border border-slate-200 flex items-center gap-3 shadow-xs"
                        >
                          <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" />
                          <span className="text-xs font-semibold text-slate-800">{app}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeFeatures.length > 0 && (
                  <div>
                    <h3 className="text-base font-bold font-heading text-slate-900 mb-3">
                      Key Performance Features
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeFeatures.map((feat) => (
                        <div
                          key={feat}
                          className="p-3.5 bg-white rounded-2xl border border-slate-200 flex items-center gap-3 shadow-xs"
                        >
                          <Sliders className="w-5 h-5 text-sky-600 shrink-0" />
                          <span className="text-xs font-semibold text-slate-800">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Specifications Table */}
              <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-lg font-bold font-heading text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
                  <span>Technical Data Sheet</span>
                  <span className="text-xs font-mono text-slate-400">Verified</span>
                </h3>

                <div className="divide-y divide-slate-100">
                  {Object.entries(activeSpecs || {}).map(([key, value]) => (
                    <div key={key} className="py-2.5 flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-600 uppercase tracking-wide">{key}</span>
                      <span className="font-mono text-slate-900 font-bold text-right ml-4">
                        {String(value)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 bg-purple-50 p-4 rounded-2xl text-xs text-purple-900">
                  <span className="font-semibold block mb-1">Authorized Distribution & Ready Stock:</span>
                  <p className="text-purple-800">
                    {COMPANY_INFO.distributor.name}, {COMPANY_INFO.distributor.location}
                  </p>
                </div>
              </div>
            </div>

            {/* FLAGSHIP CAR TECH SHOWCASE */}
            {isCAR && (
              <div className="space-y-10 bg-white p-8 rounded-3xl border border-sky-200 shadow-lg">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-700 block mb-1">
                    Engineering Operating Concept
                  </span>
                  <h2 className="text-2xl font-bold font-heading text-slate-900">
                    How The CAR Self-Balancing Regulator Works
                  </h2>
                  <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                    The Constant Airflow Regulator operates on mechanical pressure differential balancing across 50–200 dia. Inside the bulb, an inflatable membrane automatically opens or closes the airflow passage in response to duct pressure variations between 50 and 250 Pa.
                  </p>
                </div>

                {/* Technical Specification Highlight Area */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-sky-50 border border-sky-200 space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-sky-700 block">DIAMETER</span>
                    <span className="text-xl font-extrabold font-mono text-slate-900">50–200 dia</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-purple-700 block">PRESSURE RANGE</span>
                    <span className="text-xl font-extrabold font-mono text-purple-900">50–250 Pa</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-600 block">HOUSING MATERIAL</span>
                    <span className="text-base font-bold text-slate-900">Polystyrene</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-600 block">HOUSING COLOUR</span>
                    <span className="text-base font-bold text-slate-900">Black</span>
                  </div>
                </div>

                {/* Operating Mode Toggle */}
                <div className="flex gap-4 border-b border-slate-200 pb-4">
                  <button
                    onClick={() => setCarMode("blowing")}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                      carMode === "blowing"
                        ? "bg-purple-700 text-white shadow-md"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <Wind className="w-4 h-4" />
                    <span>Supply Air / Blowing Mode</span>
                  </button>
                  <button
                    onClick={() => setCarMode("extraction")}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                      carMode === "extraction"
                        ? "bg-purple-700 text-white shadow-md"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <Wind className="w-4 h-4 rotate-180" />
                    <span>Exhaust Air / Extraction Mode</span>
                  </button>
                </div>

                {/* Mode Visual Diagram */}
                <div className="p-6 rounded-2xl bg-slate-900 text-white grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-400 font-mono">
                      {carMode === "blowing" ? "Blowing Mode (Supply Air)" : "Extraction Mode (Exhaust Air)"}
                    </span>
                    <h3 className="text-xl font-bold font-heading">
                      {carMode === "blowing"
                        ? "Constant Air Distribution into Rooms"
                        : "Regulated Exhaust from Bathrooms & Kitchens"}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {carMode === "blowing"
                        ? "Ensures exact calibrated CFM enters occupied zones regardless of total fan pressure increases in main duct headers."
                        : "Prevents over-ventilation and balances total static exhaust pressure across multi-story riser shafts."}
                    </p>
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-300 font-mono">
                      Diameter: 50–200 dia | Pressure: 50–250 Pa | Material: Polystyrene | Colour: Black
                    </div>
                  </div>

                  <div className="relative aspect-[16/9] bg-slate-950 rounded-xl border border-slate-800 p-4 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full border-4 border-purple-500 flex items-center justify-center bg-purple-950/40 mb-2">
                      <Settings2 className="w-8 h-8 text-purple-400 animate-spin-slow" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-200">
                      {carMode === "blowing" ? "SUPPLY AIR → [ CAR VALVE ] → OCCUPIED ROOM" : "EXHAUST AIR ← [ CAR VALVE ] ← ROOM RISER"}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1">Screwdriver Calibrated Setting</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Dynamic Related Products */}
        <div>
          <h2 className="text-2xl font-bold font-heading text-slate-900 mb-6">
            Explore Other Product Lines
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {PRODUCTS.filter((p) => p.slug !== product.slug)
              .slice(0, 3)
              .map((rel) => (
                <Link
                  key={rel.id}
                  href={`/products/${rel.slug}`}
                  className="group p-4 bg-white rounded-2xl border border-slate-200 hover:border-purple-300 shadow-xs hover:shadow-md transition-all space-y-3"
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100">
                    <Image src={rel.image} alt={rel.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                    {rel.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{rel.subtitle}</p>
                </Link>
              ))}
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultProduct={activeSubcategory ? `${product.name} — ${activeSubcategory.name}` : product.name}
      />
    </div>
  );
}
