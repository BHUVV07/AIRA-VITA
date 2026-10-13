"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Truck,
  ArrowRight,
  Phone,
  Layers,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ContactModal from "@/components/ui/ContactModal";
import {
  SOUTH_INDIA_GEOGRAPHY,
  SOUTH_INDIA_STATES,
  SouthIndiaState,
} from "@/lib/seo/location-keywords";
import { SEO_SITE_CONFIG } from "@/lib/seo/site-config";
import { trackSelectItem } from "@/lib/analytics/gtag";

export default function SouthIndiaCoverage() {
  const [selectedState, setSelectedState] = useState<SouthIndiaState | "All">("All");
  const [modalOpen, setModalOpen] = useState(false);

  const displayCities =
    selectedState === "All"
      ? Object.entries(SOUTH_INDIA_GEOGRAPHY).flatMap(([st, cities]) =>
          cities.map((c) => ({ ...c, stateLabel: st }))
        )
      : SOUTH_INDIA_GEOGRAPHY[selectedState].map((c) => ({
          ...c,
          stateLabel: selectedState,
        }));

  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            badge="South India Supply & Logistics"
            title="HVAC Air Distribution Network Across South India"
            description="Rapid dispatch and MEP project delivery coordinated from central Bangalore warehousing by authorized distributor Ecosta Systems."
          />

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setModalOpen(true)}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Check City Delivery Timeline
            </Button>
          </div>
        </div>

        {/* Narrative Box with Client-Supplied Content */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 block">
                Regional Distribution Overview
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 leading-snug">
                Precision Air. Perfect Comfort &bull; Direct Project Supply
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Aria Vita™ manufactures high-performance HVAC air distribution systems engineered for optimal airflow, safety, and acoustic control. Our comprehensive product portfolio includes <strong>Fire Retardent Canvas</strong> (92&deg;C & 250&deg;C), <strong>Constant Airflow Regulators (CAR)</strong>, <strong>ABS Disc Valves</strong>, <strong>Flexible Ducts</strong> (Insulated & Non-Insulated), and <strong>Air Curtains</strong> (AACA, AACS Stainless Steel, AACH Industrial).
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Supplied at competitive project rates with ready stock dispatched across Karnataka, Tamil Nadu, Andhra Pradesh, Telangana, and Kerala via our authorized Pan-India distributor, <strong>{SEO_SITE_CONFIG.distributor.name}</strong>, Bangalore.
              </p>
            </div>

            <div className="lg:col-span-4 bg-sky-50/70 p-6 rounded-2xl border border-sky-200 space-y-3">
              <div className="flex items-center gap-2 text-sky-800 font-bold text-sm">
                <Truck className="w-4 h-4 text-sky-600" />
                <span>Central Distribution Hub</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                All South India dispatches are consolidated at <strong>Indiranagar, Bangalore</strong>, guaranteeing consistent packaging, verified factory test submittals, and expedited freight.
              </p>
              <div className="pt-1 text-xs text-slate-700 font-semibold flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-sky-600" />
                <span>Direct Enquiry: {SEO_SITE_CONFIG.distributor.phones[0]}</span>
              </div>
            </div>
          </div>
        </div>

        {/* State Filter Tabs */}
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3 border-b border-slate-200 pb-4">
            <div>
              <h4 className="text-sm font-bold font-heading text-slate-900">
                Verified Delivery Coverage by State
              </h4>
              <p className="text-xs text-slate-500">
                Select a state to inspect supported commercial and industrial hubs:
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedState("All")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedState === "All"
                    ? "bg-sky-600 text-white shadow-xs"
                    : "bg-white text-slate-700 border border-slate-200 hover:border-sky-300"
                }`}
              >
                All South India ({Object.values(SOUTH_INDIA_GEOGRAPHY).flat().length})
              </button>

              {SOUTH_INDIA_STATES.map((state) => (
                <button
                  key={state}
                  onClick={() => setSelectedState(state)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedState === state
                      ? "bg-sky-600 text-white shadow-xs"
                      : "bg-white text-slate-700 border border-slate-200 hover:border-sky-300"
                  }`}
                >
                  {state} ({SOUTH_INDIA_GEOGRAPHY[state].length})
                </button>
              ))}
            </div>
          </div>

          {/* City Chips Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {displayCities.map((cityObj, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border text-left transition-all ${
                  cityObj.isHub
                    ? "bg-sky-100/70 border-sky-300 text-sky-950 font-semibold"
                    : "bg-white border-slate-200 hover:border-sky-300 text-slate-800"
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-bold flex items-center gap-1.5 truncate">
                    <MapPin className={`w-3.5 h-3.5 shrink-0 ${cityObj.isHub ? "text-sky-700" : "text-slate-400"}`} />
                    {cityObj.city}
                  </span>
                  {cityObj.isHub && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-600 text-white font-extrabold uppercase shrink-0">
                      Hub
                    </span>
                  )}
                </div>

                <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                  <span>{cityObj.stateLabel}</span>
                  {cityObj.aliases.length > 0 && (
                    <span className="text-[10px] text-slate-400 truncate max-w-[80px]">
                      ({cityObj.aliases[0]})
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Product Links for Crawlability */}
        <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-600 font-semibold">
            <Layers className="w-4 h-4 text-sky-600 shrink-0" />
            <span>Target Product Specifications for South India Projects:</span>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/products/fire-retardent-canvas"
              onClick={() =>
                trackSelectItem({
                  item_id: "fire-retardent-canvas",
                  item_name: "Fire Retardent Canvas",
                  item_category: "Fire Retardent Canvas",
                  item_list_name: "South India Coverage Links",
                })
              }
              className="px-3 py-1 bg-white rounded-lg border border-slate-200 text-slate-700 hover:text-sky-700 font-medium transition-colors"
            >
              Fire Retardent Canvas
            </Link>

            <Link
              href="/products/disc-valves"
              onClick={() =>
                trackSelectItem({
                  item_id: "disc-valves",
                  item_name: "Disc Valves",
                  item_category: "Disc Valves",
                  item_list_name: "South India Coverage Links",
                })
              }
              className="px-3 py-1 bg-white rounded-lg border border-slate-200 text-slate-700 hover:text-sky-700 font-medium transition-colors"
            >
              Disc Valves
            </Link>

            <Link
              href="/products/air-curtain"
              onClick={() =>
                trackSelectItem({
                  item_id: "air-curtain",
                  item_name: "Air Curtain",
                  item_category: "Air Curtain",
                  item_list_name: "South India Coverage Links",
                })
              }
              className="px-3 py-1 bg-white rounded-lg border border-slate-200 text-slate-700 hover:text-sky-700 font-medium transition-colors"
            >
              Air Curtain
            </Link>

            <Link
              href="/products/flexible-duct"
              onClick={() =>
                trackSelectItem({
                  item_id: "flexible-duct",
                  item_name: "Flexible Duct",
                  item_category: "Flexible Duct",
                  item_list_name: "South India Coverage Links",
                })
              }
              className="px-3 py-1 bg-white rounded-lg border border-slate-200 text-slate-700 hover:text-sky-700 font-medium transition-colors"
            >
              Flexible Duct
            </Link>

            <Link
              href="/constant-airflow-regulator-best-brand-pan-india"
              onClick={() =>
                trackSelectItem({
                  item_id: "car",
                  item_name: "Constant Airflow Regulator",
                  item_category: "CAR",
                  item_list_name: "South India Coverage Links",
                })
              }
              className="px-3 py-1 bg-sky-50 rounded-lg border border-sky-300 text-sky-800 hover:text-sky-900 font-bold transition-colors"
            >
              Constant Airflow Regulator (CAR) &rarr;
            </Link>
          </div>
        </div>
      </div>

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
