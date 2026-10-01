"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Maximize2,
  X,
  ChevronLeft,
  ArrowRight,
  Layers,
} from "lucide-react";
import Button from "@/components/ui/Button";
import ContactModal from "@/components/ui/ContactModal";
import { GALLERY_ITEMS } from "@/data/gallery";

const CATEGORIES = [
  "All",
  "Flexible Duct",
  "Fire Retardent Canvas",
  "Air Curtain",
  "Disc Valves",
  "CAR",
] as const;

export default function GalleryClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  const openLightbox = (index: number) => {
    setActiveItemIndex(index);
  };

  const closeLightbox = () => {
    setActiveItemIndex(null);
  };

  const prevLightboxItem = () => {
    if (activeItemIndex === null) return;
    setActiveItemIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
  };

  const nextLightboxItem = () => {
    if (activeItemIndex === null) return;
    setActiveItemIndex((prev) => (prev! + 1) % filteredItems.length);
  };

  const currentLightboxItem = activeItemIndex !== null ? filteredItems[activeItemIndex] : null;

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-slate-600 font-medium">
          <Link href="/" className="hover:text-sky-700 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-slate-900">Gallery</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-white via-sky-50/70 to-sky-100/50 py-12 lg:py-16 border-b border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100 px-3.5 py-1 rounded-full border border-sky-200 inline-block">
            Product & Project Gallery
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            Precision Airflow Solutions in Action
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed font-normal">
            Explore high-performance ARIA VITA™ HVAC air distribution products, custom engineering variants, and verified project installations across India.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Category Filters */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                  isSelected
                    ? "bg-sky-600 border-sky-600 text-white shadow-md ring-2 ring-sky-200"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
              >
                {/* Image Container */}
                <div
                  className="relative aspect-[4/3] bg-slate-900/95 p-3 cursor-pointer overflow-hidden"
                  onClick={() => openLightbox(idx)}
                >
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="p-3 rounded-full bg-white/90 text-sky-700 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <Maximize2 className="w-5 h-5" />
                    </span>
                  </div>

                  {item.badge && (
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-sky-800 text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg border border-sky-200 shadow-sm z-10">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Card Info */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-base font-bold font-heading text-slate-900 group-hover:text-sky-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => openLightbox(idx)}
                      className="text-xs font-bold text-sky-700 hover:text-sky-800 flex items-center gap-1 cursor-pointer"
                    >
                      View Photo <Maximize2 className="w-3 h-3" />
                    </button>

                    {item.productSlug && (
                      <Link
                        href={`/products/${item.productSlug}`}
                        className="text-xs font-medium text-slate-500 hover:text-sky-700 transition-colors flex items-center gap-0.5"
                      >
                        Product Details <ChevronRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <Layers className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900">No Photos Found</h3>
            <p className="text-xs text-slate-500 mt-1">
              There are no gallery photos currently in this category.
            </p>
          </div>
        )}

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-sky-300 font-bold block">
              Custom Engineering & Bulk Projects
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading">
              Need Product Samples or Project Specifications?
            </h2>
            <p className="text-sky-100 text-sm max-w-xl">
              Connect with our technical airflow engineers for site layout recommendations, CAD drawings, and volume pricing across India.
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={() => setContactModalOpen(true)}
            icon={<ArrowRight className="w-4 h-4" />}
            className="bg-white text-sky-900 hover:bg-sky-50 shrink-0"
          >
            Request Quotation
          </Button>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {currentLightboxItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]"
            >
              {/* Top Header */}
              <div className="p-4 px-6 bg-white border-b border-slate-200 flex items-center justify-between z-10">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 block">
                    {currentLightboxItem.category}
                  </span>
                  <h3 className="text-lg font-bold font-heading text-slate-900">
                    {currentLightboxItem.title}
                  </h3>
                </div>
                <button
                  onClick={closeLightbox}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Image Body */}
              <div className="relative flex-1 min-h-[320px] sm:min-h-[420px] bg-slate-950 p-4 flex items-center justify-center">
                <Image
                  src={currentLightboxItem.image}
                  alt={currentLightboxItem.imageAlt}
                  fill
                  className="object-contain p-4"
                  priority
                />

                {/* Prev / Next Chevrons */}
                <button
                  onClick={prevLightboxItem}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-xl transition-all cursor-pointer z-20"
                  aria-label="Previous Photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextLightboxItem}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-xl transition-all cursor-pointer z-20"
                  aria-label="Next Photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Bottom Footer Info */}
              <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {currentLightboxItem.description}
                  </p>
                  {currentLightboxItem.badge && (
                    <span className="inline-block text-[10px] font-mono font-bold text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded border border-sky-200">
                      {currentLightboxItem.badge}
                    </span>
                  )}
                </div>

                {currentLightboxItem.productSlug && (
                  <Link
                    href={`/products/${currentLightboxItem.productSlug}`}
                    onClick={closeLightbox}
                    className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shrink-0 flex items-center gap-1.5"
                  >
                    View Product Catalogue <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </div>
  );
}
