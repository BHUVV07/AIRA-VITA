import React from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { ShieldCheck, Wrench, PackageCheck, MapPin } from "lucide-react";

export default function WhyAriaVita() {
  const blocks = [
    {
      number: "01",
      title: "Quality First",
      description: "Tested for fire safety, durability and performance.",
      icon: ShieldCheck,
      color: "border-purple-200 bg-purple-50/50 text-purple-700",
    },
    {
      number: "02",
      title: "Technical Expertise",
      description: "Product selection, sizing and installation support.",
      icon: Wrench,
      color: "border-sky-200 bg-sky-50/50 text-sky-700",
    },
    {
      number: "03",
      title: "Reliable Supply",
      description: "Ready stock and dependable project support.",
      icon: PackageCheck,
      color: "border-purple-200 bg-purple-50/50 text-purple-700",
    },
    {
      number: "04",
      title: "Pan India Reach",
      description: "Distribution and support through Ecosta Systems, Bangalore.",
      icon: MapPin,
      color: "border-sky-200 bg-sky-50/50 text-sky-700",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Why Choose Us"
          title="Built Around Performance"
          description="Engineered solutions tailored to high-reliability commercial, industrial, and residential HVAC engineering standards."
          align="center"
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blocks.map((block) => {
            const Icon = block.icon;
            return (
              <div
                key={block.number}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-black font-heading text-slate-300 group-hover:text-purple-600 transition-colors">
                      {block.number}
                    </span>
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${block.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold font-heading text-slate-900 group-hover:text-purple-700 transition-colors">
                    {block.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {block.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-purple-700 group-hover:translate-x-1 transition-transform">
                  <span>Learn more</span>
                  <span>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
