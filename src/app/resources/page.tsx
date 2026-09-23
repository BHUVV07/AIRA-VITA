"use client";

import React, { useState } from "react";
import { FileText, Download, Eye, Search, Filter, ShieldCheck, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FinalCTASection from "@/components/sections/FinalCTASection";
import ContactModal from "@/components/ui/ContactModal";
import { TECHNICAL_RESOURCES, TechnicalResource } from "@/data/ariaVitaData";

export default function ResourcesPage() {
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
            Engineering Documentation
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading tracking-tight">
            Technical Resources & Data Sheets
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Access verified technical data sheets, airflow sizing performance curves, fire test safety documentation, and installation manuals for Aria Vita™ products.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

                <p className="text-xs text-slate-500 font-medium">Product: {res.product}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setPreviewResource(res)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-purple-700 transition-colors cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </button>

                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-purple-800 bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-200 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Preview Dialog Modal */}
      {previewResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-xl w-full border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-lg font-bold font-heading text-slate-900">
                {previewResource.title}
              </h3>
              <button
                onClick={() => setPreviewResource(null)}
                className="text-slate-400 hover:text-slate-900"
              >
                ✕
              </button>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <p>
                <strong>Target Product:</strong> {previewResource.product}
              </p>
              <p>
                <strong>Document Category:</strong> {previewResource.type}
              </p>
              <p>
                <strong>File Specifications:</strong> {previewResource.format} ({previewResource.fileSize})
              </p>
              <p>
                <strong>Last Updated:</strong> {previewResource.updatedDate}
              </p>
            </div>
            <p className="text-xs text-slate-600">
              Technical data sheets are verified against original Aria Vita™ laboratory test reports.
            </p>
            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setPreviewResource(null)}
                className="px-4 py-2 text-xs text-slate-600"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setPreviewResource(null);
                  setModalOpen(true);
                }}
                className="px-5 py-2 bg-purple-700 text-white rounded-lg text-xs font-semibold"
              >
                Request Download Access
              </button>
            </div>
          </div>
        </div>
      )}

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <FinalCTASection />
    </div>
  );
}
