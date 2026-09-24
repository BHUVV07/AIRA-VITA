"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Cpu, Sliders, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductModal from "@/components/ui/ProductModal";
import { PRODUCTS, ProductItem } from "@/data/ariaVitaData";

export default function ProductShowcase() {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Product Portfolio"
          title="Engineered Air Distribution Solutions"
          description="Explore products designed to regulate, distribute and move air efficiently across demanding HVAC environments."
          align="center"
          className="mb-14"
        />

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-slate-200 hover:border-purple-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Product Image Treatment */}
              <div className="relative aspect-[4/3] bg-slate-50 border-b border-slate-100 overflow-hidden p-2">
                <Image
                  src={product.image}
                  alt={product.slug === "car" ? "Aria Vita Constant Airflow Regulator" : `Aria Vita ${product.name}`}
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md border border-slate-800">
                  {product.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold font-heading text-slate-900 group-hover:text-purple-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {product.subtitle}
                  </p>

                  {/* Standards / Key Feature Badges */}
                  {product.standards && product.standards.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {product.standards.map((std) => (
                        <span
                          key={std}
                          className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200"
                        >
                          <ShieldCheck className="w-3 h-3 text-purple-600" />
                          {std}
                        </span>
                      ))}
                    </div>
                  )}

                  {!product.standards && product.features && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {product.features.slice(0, 2).map((feat) => (
                        <span
                          key={feat}
                          className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200"
                        >
                          <Sliders className="w-3 h-3 text-sky-600" />
                          {feat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Action Links */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="text-xs font-semibold text-slate-600 hover:text-purple-700 transition-colors cursor-pointer"
                  >
                    Quick Specs
                  </button>

                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-bold text-purple-700 hover:text-purple-800 group-hover:translate-x-1 transition-all"
                  >
                    <span>View Product</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Range CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl transition-all shadow-md"
          >
            <span>Explore Complete Product Technical Catalog</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Quick Specs Drawer / Modal */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </section>
  );
}
