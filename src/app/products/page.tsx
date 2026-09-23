"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Search, Filter, Wind, ChevronRight, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FinalCTASection from "@/components/sections/FinalCTASection";
import ProductModal from "@/components/ui/ProductModal";
import { PRODUCTS, getAllCategories, getProductsByCategory, Product } from "@/data/products";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Products");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = getAllCategories();

  // Dynamic filtering logic
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === "All Products" ||
      product.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      selectedCategory.toLowerCase().includes(product.category.toLowerCase());

    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.applications.some((app) => app.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      {/* Editorial Hero */}
      <section className="bg-gradient-to-b from-white via-sky-50 to-ice-blue py-16 lg:py-24 border-b border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-3.5 py-1 rounded-full border border-purple-200 inline-block">
            Engineering Catalogue
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-slate-900 tracking-tight leading-tight">
            Air Distribution, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-sky-600 to-purple-900">
              Engineered Around Performance.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Explore Aria Vita™&apos;s range of HVAC air distribution solutions for commercial, industrial and residential applications.
          </p>
        </div>
      </section>

      {/* Dynamic Filter & Search Toolbar */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-sky-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between mb-10">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-purple-700 text-white shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products, models, specs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
        </div>

        {/* Dynamic Editorial Layout Showcase */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900">No Products Matched</h3>
            <p className="text-slate-500 text-sm mt-1">Try clearing your search query or category filter.</p>
            <button
              onClick={() => {
                setSelectedCategory("All Products");
                setSearchQuery("");
              }}
              className="mt-4 px-5 py-2.5 bg-purple-700 text-white font-semibold text-xs rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Display Product List with Asymmetric & Editorial Card Styling */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, idx) => (
                <div
                  key={product.id}
                  className={`bg-white rounded-3xl border border-slate-200 hover:border-purple-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
                    product.featured ? "md:col-span-2 lg:col-span-2 bg-gradient-to-r from-sky-50/80 to-white" : ""
                  }`}
                >
                  <div className={`relative bg-slate-950 overflow-hidden ${product.featured ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 text-purple-900 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-md border border-purple-200">
                      {product.category}
                    </div>

                    {product.featured && (
                      <div className="absolute top-4 right-4 bg-purple-700 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-md">
                        Flagship Technical Product
                      </div>
                    )}
                  </div>

                  <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-2xl font-extrabold font-heading text-slate-900 group-hover:text-purple-700 transition-colors">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {product.subtitle}
                      </p>

                      {product.standards && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {product.standards.map((std) => (
                            <span
                              key={std}
                              className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200"
                            >
                              <ShieldCheck className="w-3 h-3 text-purple-600" />
                              {std}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="text-xs font-semibold text-slate-500 hover:text-purple-700 cursor-pointer"
                      >
                        Quick Data Sheet
                      </button>

                      <Link
                        href={`/products/${product.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-purple-700 hover:text-purple-800 group-hover:translate-x-1 transition-transform"
                      >
                        <span>View Product Specs</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}

      <FinalCTASection />
    </div>
  );
}
