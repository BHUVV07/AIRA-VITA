"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { ProductItem } from "@/data/ariaVitaData";

interface ProductModalProps {
  product: ProductItem;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400 block">
              {product.category}
            </span>
            <h3 className="text-xl font-bold font-heading">{product.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Image */}
            <div className="md:col-span-5 relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-50 border border-slate-200 p-2">
              <Image
                src={product.image}
                alt={product.slug === "car" ? "Aria Vita Constant Airflow Regulator" : `Aria Vita ${product.name}`}
                fill
                className="object-contain p-2"
              />
            </div>

            {/* Overview */}
            <div className="md:col-span-7 space-y-3">
              <p className="text-sm text-slate-700 leading-relaxed">{product.description}</p>

              {product.standards && (
                <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 space-y-1">
                  <span className="text-xs font-bold text-purple-900 block">Fire & Safety Test Standards:</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {product.standards.map((std) => (
                      <span
                        key={std}
                        className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-white text-purple-700 border border-purple-200"
                      >
                        {std}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Technical Specs Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 border-b border-slate-200 pb-1">
              Technical Specifications
            </h4>
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full text-xs text-left">
                <tbody className="divide-y divide-slate-100 bg-white">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <tr key={key} className="hover:bg-slate-50">
                      <td className="px-4 py-2.5 font-semibold text-slate-700 bg-slate-50/70 w-1/3">
                        {key}
                      </td>
                      <td className="px-4 py-2.5 text-slate-900 font-mono">{String(val)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Key Applications */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
              Primary HVAC Applications
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.applications.map((app) => (
                <div key={app} className="flex items-center gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>{app}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Stocked & Distributed by <strong>Ecosta Systems, Bangalore</strong>
          </span>
          <Link
            href={`/products/${product.slug}`}
            onClick={onClose}
            className="px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs rounded-lg inline-flex items-center gap-2 shadow-sm"
          >
            <span>Full Product Page</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
