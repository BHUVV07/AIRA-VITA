"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Download, Eye, Search, BookOpen, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FinalCTASection from "@/components/sections/FinalCTASection";
import ContactModal from "@/components/ui/ContactModal";
import { TECHNICAL_RESOURCES, TechnicalResource } from "@/data/ariaVitaData";
import { TECHNICAL_ARTICLES } from "@/data/articles";

export default function ResourcesClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [previewResource, setPreviewResource] = useState<TechnicalResource | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const categories = [
    "All",
    "Product Catalogues",
    "Technical Data Sheets",
    "Performance Data",
    "Installation Information",
  ];

  const filteredResources = TECHNICAL_RESOURCES.filter((res) => {
    const matchesCat = selectedCategory === "All" || res.type === selectedCategory;
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.product.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-slate-900 text-white py-16 lg:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block mb-3">
            Engineering Documentation & Knowledge Base
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading tracking-tight">
            HVAC Technical Resources & Educational Guides
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Access verified technical data sheets, airflow performance curves, fire safety compliance documentation, and educational guides on HVAC air distribution.
          </p>
        </div>
      </section>

      {/* Educational Technical Articles Strip */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 block mb-1">
                Knowledge Base & HVAC Engineering Guides
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900">
                Technical Airflow Articles & Product Guides
              </h2>
            </div>
            <p className="text-xs text-slate-600 max-w-md">
              In-depth technical overviews covering Constant Airflow Regulators (CAR), Disc Valves, Flexible Ducts, Air Curtains, and Fire Retardent Canvas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TECHNICAL_ARTICLES.map((art) => (
              <Link
                key={art.slug}
                href={`/resources/${art.slug}`}
                className="group bg-slate-50 hover:bg-white p-6 rounded-2xl border border-slate-200 hover:border-purple-300 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2.5 py-1 rounded">
                      {art.category}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {art.readTime}
                    </span>
                  </div>
                  <h3 className="text-base font-bold font-heading text-slate-900 group-hover:text-purple-700 transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-purple-700 group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Data Sheets & Catalogues */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Downloads & Datasheets"
          title="Verified Engineering Data Sheets"
          description="Download product specification matrices, airflow calibration charts, and material safety compliance datasheets."
          align="left"
          className="mb-8"
        />

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-purple-700 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search data sheets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded border border-purple-100">
                    {res.type}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 font-medium">
                    {res.format} • {res.fileSize}
                  </span>
                </div>

                <h3 className="text-base font-bold font-heading text-slate-900 group-hover:text-purple-700 transition-colors">
                  {res.title}
                </h3>

                <p className="text-xs text-slate-500 font-medium">
                  Product Category: <span className="text-slate-800">{res.product}</span>
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => setPreviewResource(res)}
                  className="flex-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-600" />
                  <span>Preview</span>
                </button>
                <button
                  onClick={() => setModalOpen(true)}
                  className="flex-1 px-3 py-2 bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Request PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal / Preview Drawer */}
      {previewResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                Document Overview
              </span>
              <button
                onClick={() => setPreviewResource(null)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                Close ✕
              </button>
            </div>

            <h3 className="text-lg font-bold font-heading text-slate-900">{previewResource.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              This official technical document contains validated airflow performance curves, dimension tables, structural diagrams, and MEP installation guidelines for {previewResource.product}.
            </p>

            <div className="p-3 bg-slate-50 rounded-xl text-xs font-mono text-slate-700 space-y-1">
              <div>Format: PDF</div>
              <div>File Size: {previewResource.fileSize}</div>
              <div>Target Product: {previewResource.product}</div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => {
                  setPreviewResource(null);
                  setModalOpen(true);
                }}
                className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-semibold text-xs shadow-sm"
              >
                Request Full Technical Copy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Final CTA */}
      <FinalCTASection />

      {/* Modal */}
      {modalOpen && <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />}
    </div>
  );
}
