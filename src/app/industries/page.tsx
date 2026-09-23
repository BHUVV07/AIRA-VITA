import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Building2, Stethoscope, Hotel, ShoppingBag, Server, Factory, GraduationCap, Utensils } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FinalCTASection from "@/components/sections/FinalCTASection";
import { INDUSTRIES } from "@/data/ariaVitaData";

export const metadata = {
  title: "Target Industries & Sectors | Aria Vita™ HVAC",
  description:
    "Engineered air distribution solutions tailored for Commercial Buildings, Hospitals, Hotels, Malls, Data Centers, Manufacturing Plants, Educational Institutions, and Food Processing Units.",
};

export default function IndustriesPage() {
  const iconMap: Record<string, React.ElementType> = {
    "commercial-buildings": Building2,
    "hospitals-healthcare": Stethoscope,
    "hotels-hospitality": Hotel,
    "malls-retail": ShoppingBag,
    "data-centers": Server,
    "manufacturing-plants": Factory,
    "educational-institutions": GraduationCap,
    "food-processing-units": Utensils,
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-slate-900 text-white py-16 lg:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block mb-3">
            Industry Applications
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading tracking-tight">
            Built for Demanding Environments
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Our high-performance air distribution products meet technical specifications across critical commercial, healthcare, industrial, and institutional sectors.
          </p>
        </div>
      </section>

      {/* Industries Detailed List */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INDUSTRIES.map((ind) => {
            const Icon = iconMap[ind.slug] || Building2;
            return (
              <div
                key={ind.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div className="relative aspect-[16/9] bg-slate-900">
                  <Image src={ind.image} alt={ind.name} fill className="object-cover opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold font-heading text-white">{ind.name}</h3>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <p className="text-sm text-slate-600 leading-relaxed">{ind.description}</p>

                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block mb-2">
                      Recommended Products:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {ind.keyProducts.map((prod) => (
                        <span
                          key={prod}
                          className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded bg-purple-50 text-purple-700 border border-purple-200"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                          {prod}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <Link
                      href="/products"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-purple-800"
                    >
                      <span>Explore Sector Products</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <FinalCTASection />
    </div>
  );
}
