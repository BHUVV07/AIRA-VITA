import React from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { COMPANY_INFO } from "@/data/products";

export default function EngineeringPrinciples() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white via-sky-50/40 to-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Engineering Philosophy"
          title="Built Around Four Principles"
          description="Operational guidelines focused on uncompromising quality, technical precision, ready inventory, and nationwide project delivery."
          align="center"
          className="mb-16"
        />

        {/* Editorial Layout with Oversized Numerical Typography */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
          {COMPANY_INFO.principles.map((principle) => (
            <div
              key={principle.number}
              className="relative p-8 sm:p-10 rounded-3xl bg-white border border-sky-100 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden"
            >
              {/* Soft background blue glow on hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-100/50 rounded-full blur-2xl group-hover:scale-150 transition-transform pointer-events-none" />

              <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-6">
                {/* Oversized Number */}
                <span className="text-5xl sm:text-6xl font-black font-heading text-sky-900/30 group-hover:text-sky-700 transition-colors shrink-0">
                  {principle.number}
                </span>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-slate-900 group-hover:text-sky-700 transition-colors">
                    {principle.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
