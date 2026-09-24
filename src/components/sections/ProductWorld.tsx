"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sliders, ChevronRight, Wind, Layers } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductModal from "@/components/ui/ProductModal";
import { PRODUCTS, Product } from "@/data/products";

export default function ProductWorld() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const featuredProduct = PRODUCTS.find((p) => p.slug === "car") || PRODUCTS[0];
  const secondaryProducts = PRODUCTS.filter((p) => p.slug !== "car");

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Product Catalogue"
          title="Engineered Air Distribution"
          description="From airflow regulation to flexible ducting and air barriers, Aria Vita™ develops solutions for controlled, efficient air movement."
          align="center"
          className="mb-14"
        />

        {/* Editorial Layout: Large Featured Hero Lead + Secondary Modules */}
        <div className="space-y-8">
          {/* 1. Featured Flagship Hero Lead (Constant Airflow Regulator) */}
          <div className="bg-gradient-to-r from-sky-50 via-white to-ice-blue rounded-3xl border border-sky-200 p-6 md:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider">
                <Wind className="w-3.5 h-3.5 text-purple-600" />
                <span>Featured Technical Lead</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
                {featuredProduct.name}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {featuredProduct.description}
              </p>

              <div className="p-4 bg-white/90 rounded-2xl border border-sky-200 text-xs space-y-2">
                <span className="font-bold text-slate-900 block">Verified Performance Envelope:</span>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-700">
                  <div>Pressure Range: <strong>50–250 Pa</strong></div>
                  <div>Max Temp: <strong>60°C</strong></div>
                  <div>Sizes: <strong>Ø80 to Ø250 mm</strong></div>
                  <div>Operation: <strong>Self-Balancing</strong></div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  href={`/products/${featuredProduct.slug}`}
                  className="px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white font-semibold text-sm rounded-xl inline-flex items-center gap-2 shadow-md transition-colors"
                >
                  <span>Explore CAR System Specs</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => setSelectedProduct(featuredProduct)}
                  className="text-xs font-bold text-slate-700 hover:text-purple-700 underline underline-offset-4 cursor-pointer"
                >
                  Quick Specs
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 shadow-xl p-3">
              <Image
                src={featuredProduct.image}
                alt={`Aria Vita ${featuredProduct.fullName || featuredProduct.name}`}
                fill
                className="object-contain p-2"
              />
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-mono font-bold text-purple-900 border border-purple-200 shadow-sm">
                50–200 dia
              </div>
            </div>
          </div>

          {/* 2. Secondary Asymmetric Product Modules */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {secondaryProducts.map((prod) => (
              <div
                key={prod.id}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-sky-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div className="relative aspect-[4/3] bg-slate-50 border-b border-slate-100 overflow-hidden p-2">
                  <Image
                    src={prod.image}
                    alt={`Aria Vita ${prod.name}`}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border border-slate-800">
                    {prod.category}
                  </div>
                </div>

                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="text-lg font-bold font-heading text-slate-900 group-hover:text-purple-700 transition-colors">
                      {prod.name}
                    </h4>
                    <p className="mt-1.5 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {prod.subtitle}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedProduct(prod)}
                      className="text-xs font-semibold text-slate-500 hover:text-purple-700 cursor-pointer"
                    >
                      Quick Data Sheet
                    </button>

                    <Link
                      href={`/products/${prod.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 hover:text-purple-800 group-hover:translate-x-1 transition-transform"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Explore All CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl transition-all shadow-md"
          >
            <span>Explore Complete Dynamic Product Catalogue</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </section>
  );
}
