import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Stethoscope, Hotel, ShoppingBag, Server, Factory, GraduationCap, Utensils } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { INDUSTRIES } from "@/data/ariaVitaData";

export default function IndustriesPreview() {
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
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <SectionHeading
            badge="Target Sectors"
            title="Built for Demanding Environments"
            description="Our air distribution products meet technical specifications across critical commercial, industrial, and institutional sectors."
          />

          <Link
            href="/industries"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl transition-all shadow-sm shrink-0"
          >
            <span>Explore All Sectors</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 8 Sector Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDUSTRIES.map((ind) => {
            const Icon = iconMap[ind.slug] || Building2;
            return (
              <Link
                key={ind.id}
                href="/industries"
                className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[260px] p-6"
              >
                {/* Background Image with Dark Overlay */}
                <Image
                  src={ind.image}
                  alt={ind.name}
                  fill
                  className="object-cover opacity-35 group-hover:opacity-45 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />

                {/* Card Top: Icon */}
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-sky-950/80 border border-sky-800/60 text-sky-400 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Card Bottom: Info */}
                <div className="relative z-10 space-y-2 mt-auto">
                  <h3 className="text-lg font-bold font-heading text-white group-hover:text-sky-300 transition-colors">
                    {ind.name}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {ind.description}
                  </p>
                  <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-sky-400 group-hover:text-white transition-colors">
                    <span>View Applications</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
