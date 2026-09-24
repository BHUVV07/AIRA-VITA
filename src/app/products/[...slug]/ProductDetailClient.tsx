"use client";

import React, { useState } from "react";
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

interface ProductDetailClientProps {
  mainSlug: string;
  subSlug: string;
}

export default function ProductDetailClient({ mainSlug, subSlug }: ProductDetailClientProps) {
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
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-xl p-3">
                <Image
                  src={activeSubcategory?.image || product.image}
                  alt={
                    product.slug === "car"
                      ? "Aria Vita Constant Airflow Regulator"
                      : activeSubcategory
                      ? `Aria Vita ${product.name} ${activeSubcategory.name}`
                      : `Aria Vita ${product.name}`
                  }
                  fill
                  className="object-contain p-2 rounded-xl"
                  priority
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
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{sub.name}</span>
                      {sub.model && (
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${isSelected ? "bg-purple-900 text-purple-200" : "bg-purple-100 text-purple-800"}`}>
                          {sub.model}
                        </span>
                      )}
                      {sub.temperature && (
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${isSelected ? "bg-purple-900 text-purple-200" : "bg-purple-100 text-purple-800"}`}>
                          {sub.temperature}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {activeSubcategory && (
              <div className="p-5 bg-purple-50/50 rounded-2xl border border-purple-100 text-slate-700 space-y-2 mt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">
                    {activeSubcategory.name} {activeSubcategory.model && `(${activeSubcategory.model})`} {activeSubcategory.temperature && `— ${activeSubcategory.temperature}`}
                  </h3>
                  {activeSubcategory.isComingSoon && (
                    <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                      Coming Soon
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {activeSubcategory.description || activeSubcategory.subtitle}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Detailed Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-2xl font-bold font-heading text-slate-900">
                Product Description & Applications
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {activeSubcategory?.description || product.description}
              </p>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Target Applications:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeApps.map((app) => (
                    <div
                      key={app}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center gap-2 text-xs font-medium text-slate-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                      <span>{app}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold font-heading text-slate-900">
                Key Technical Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeFeatures.map((feat) => (
                  <div
                    key={feat}
                    className="p-3.5 bg-sky-50/60 rounded-xl border border-sky-100 flex items-start gap-2.5"
                  >
                    <Sliders className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-slate-800">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Models Table if available */}
            {product.models && product.models.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-xl font-bold font-heading text-slate-900">
                  Available Model Sizes & Performance Range
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 uppercase font-bold">
                      <tr>
                        <th className="p-3">Model</th>
                        {product.models[0].size && <th className="p-3">Size / Dia</th>}
                        {product.models[0].airflowRange && <th className="p-3">Airflow Range</th>}
                        {product.models[0].bodyMaterial && <th className="p-3">Body Material</th>}
                        {product.models[0].application && <th className="p-3 font-sans">Application</th>}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {product.models.map((mod) => (
                        <tr key={mod.name} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3 font-bold text-purple-900">{mod.name}</td>
                          {mod.size && <td className="p-3 text-slate-700">{mod.size}</td>}
                          {mod.airflowRange && <td className="p-3 text-slate-700">{mod.airflowRange}</td>}
                          {mod.bodyMaterial && <td className="p-3 text-slate-700">{mod.bodyMaterial}</td>}
                          {mod.application && <td className="p-3 font-sans text-slate-600 text-xs">{mod.application}</td>}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Specifications & Documents */}
          <div className="lg:col-span-5 space-y-6">
            {/* Technical Specifications */}
            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-purple-400">
                <Settings2 className="w-5 h-5" />
                <h2 className="text-xl font-bold font-heading text-white">
                  Technical Specifications
                </h2>
              </div>
              <div className="divide-y divide-slate-800 text-xs font-mono">
                {Object.entries(activeSpecs).map(([key, val]) => (
                  <div key={key} className="py-3 flex items-center justify-between gap-4">
                    <span className="text-slate-400 font-sans">{key}</span>
                    <span className="font-bold text-white text-right">{String(val)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Documentation */}
            {product.technicalDocuments && product.technicalDocuments.length > 0 && (
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-base font-bold font-heading text-slate-900">
                  Technical Documentation
                </h3>
                {product.technicalDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-900 block">{doc.title}</span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {doc.type} • {doc.fileSize}
                      </span>
                    </div>
                    <Link
                      href="/resources"
                      className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-lg text-[11px] shrink-0"
                    >
                      View
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {/* Distribution Card */}
            <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-sm space-y-3 text-xs text-slate-600">
              <span className="text-[10px] uppercase font-bold tracking-wider text-purple-700 block">
                Pan India Distribution
              </span>
              <p className="font-semibold text-slate-900">
                Authorized Distributor: {COMPANY_INFO.distributor.name}
              </p>
              <p>Address: {COMPANY_INFO.distributor.address}</p>
              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setModalOpen(true)}
                >
                  Contact Distributor
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Product Catalogue */}
        <div className="pt-8 border-t border-slate-200 space-y-6">
          <h2 className="text-2xl font-bold font-heading text-slate-900">
            Explore Related Aria Vita™ Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRODUCTS.filter((p) => p.id !== product.id).map((rel) => (
              <Link
                key={rel.id}
                href={`/products/${rel.slug}`}
                className="group bg-white p-4 rounded-2xl border border-slate-200 hover:border-purple-300 shadow-xs hover:shadow-md transition-all flex items-center gap-3"
              >
                <div className="relative w-16 h-16 rounded-xl bg-slate-50 overflow-hidden shrink-0 border border-slate-200">
                  <Image src={rel.image} alt={`Aria Vita ${rel.name}`} fill className="object-contain p-1" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                    {rel.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{rel.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} defaultProduct={product.name} />
      )}
    </div>
  );
}
