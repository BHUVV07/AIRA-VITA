"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  Mail,
  ArrowRight,
  Wind,
  Settings2,
} from "lucide-react";
import Button from "@/components/ui/Button";
import ContactModal from "@/components/ui/ContactModal";
import { getProductBySlug, PRODUCTS, COMPANY_INFO } from "@/data/products";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);

  const [selectedModelIdx, setSelectedModelIdx] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [carMode, setCarMode] = useState<"blowing" | "extraction">("blowing");

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold font-heading text-slate-900">Product Not Found</h1>
        <p className="text-slate-600 mt-2">The requested product category does not exist.</p>
        <Link href="/products" className="mt-6 px-6 py-3 bg-purple-700 text-white rounded-xl text-xs font-semibold">
          Return to Products Catalogue
        </Link>
      </div>
    );
  }

  const isCAR = product.slug === "constant-airflow-regulator";
  const isDiscValves = product.slug === "plastic-disc-valves";
  const isAirCurtains = product.slug === "air-curtains";

  const currentModel = product.models ? product.models[selectedModelIdx] : null;

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-slate-600 font-medium">
          <Link href="/" className="hover:text-purple-700 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/products" className="hover:text-purple-700 transition-colors">
            Products
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-slate-900">{product.name}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white via-sky-50/60 to-ice-blue py-12 lg:py-16 border-b border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-3.5 py-1 rounded-full border border-purple-200 inline-block">
                {product.category}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 tracking-tight leading-tight">
                {product.name}
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed font-normal">
                {product.subtitle}
              </p>

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
                <Image src={product.image} alt={product.name} fill className="object-cover rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Technical Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
        {/* Description & Key Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-bold font-heading text-slate-900 border-b border-slate-200 pb-3">
              Product Overview & Principles
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">{product.description}</p>

            <div>
              <h3 className="text-base font-bold font-heading text-slate-900 mb-3">
                Primary HVAC Applications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.applications.map((app) => (
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

            <div>
              <h3 className="text-base font-bold font-heading text-slate-900 mb-3">
                Key Performance Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feat) => (
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
          </div>

          {/* Specifications Table */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold font-heading text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
              <span>Technical Data Sheet</span>
              <span className="text-xs font-mono text-slate-400">Verified</span>
            </h3>

            <div className="divide-y divide-slate-100">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="py-2.5 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600">{key}</span>
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
                The Constant Airflow Regulator operates on mechanical pressure differential balancing. Inside the bulb, an inflatable membrane automatically opens or closes the airflow passage in response to pressure changes between 50 and 250 Pa.
              </p>
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
                  Operating Pressure: 50 Pa to 250 Pa | Max Temp: 60°C | Polystyrene
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

            {/* Diameter Selector */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold font-heading text-slate-900">
                  Select Your CAR Diameter Model:
                </h3>
                <span className="text-xs text-slate-500 font-mono">7 Sizes Available</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {product.models?.map((m, idx) => (
                  <button
                    key={m.name}
                    onClick={() => setSelectedModelIdx(idx)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs font-mono transition-all cursor-pointer ${
                      selectedModelIdx === idx
                        ? "bg-purple-700 text-white shadow-md ring-2 ring-purple-300"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {m.name}
                  </button>
                ))}
              </div>

              {currentModel && (
                <div className="p-6 rounded-2xl bg-purple-50 border border-purple-200 grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-purple-700 font-semibold block">Model Designation:</span>
                    <span className="text-slate-900 font-bold font-mono text-sm">{currentModel.name}</span>
                  </div>
                  <div>
                    <span className="text-purple-700 font-semibold block">Duct Size:</span>
                    <span className="text-slate-900 font-bold font-mono text-sm">{currentModel.size}</span>
                  </div>
                  <div>
                    <span className="text-purple-700 font-semibold block">Calibrated Airflow Range:</span>
                    <span className="text-sky-700 font-bold font-mono text-sm">{currentModel.airflowRange}</span>
                  </div>
                  <div>
                    <span className="text-purple-700 font-semibold block">Unit Weight:</span>
                    <span className="text-slate-900 font-bold font-mono text-sm">{currentModel.weight}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PLASTIC DISC VALVES MODEL RANGE */}
        {isDiscValves && product.models && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-6">
            <h2 className="text-2xl font-bold font-heading text-slate-900">
              TDV Series Plastic Disc Valves Model Specifications
            </h2>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-900 text-white font-heading text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Model</th>
                    <th className="px-4 py-3">Duct Connection Size</th>
                    <th className="px-4 py-3">Primary Application</th>
                    <th className="px-4 py-3">Sound Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white font-medium">
                  {product.models.map((m) => (
                    <tr key={m.name} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-bold text-slate-900 font-mono">{m.name}</td>
                      <td className="px-4 py-3 text-slate-700 font-mono">{m.size}</td>
                      <td className="px-4 py-3 text-slate-700">{m.application}</td>
                      <td className="px-4 py-3 text-sky-700 font-mono font-semibold">{m.soundLevel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* AIR CURTAIN SERIES RANGE */}
        {isAirCurtains && product.models && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-6">
            <h2 className="text-2xl font-bold font-heading text-slate-900">
              Air Curtain Series Range
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {product.models.map((m) => (
                <div key={m.name} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-xs font-mono font-bold text-purple-700 uppercase block">
                    {m.name}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">{m.bodyMaterial}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{m.application}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Related Products */}
        <div>
          <h2 className="text-2xl font-bold font-heading text-slate-900 mb-6">
            Related Air Distribution Products
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
        defaultProduct={product.name}
      />
    </div>
  );
}
