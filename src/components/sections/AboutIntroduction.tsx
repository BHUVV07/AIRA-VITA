import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Building2, Factory, Home } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { COMPANY_INFO } from "@/data/ariaVitaData";

export default function AboutIntroduction() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              badge="About Aria Vita™"
              title="Engineering Airflow for Tomorrow"
              description={COMPANY_INFO.concept}
            />

            <p className="text-slate-600 text-base leading-relaxed">
              Aria Vita™ manufactures and supplies high-performance air distribution products engineered to meet demanding HVAC requirements across commercial, industrial and residential projects.
            </p>

            {/* Application Sectors Pills */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
                <Building2 className="w-5 h-5 text-purple-600 mx-auto mb-1.5" />
                <span className="text-xs font-bold text-slate-800 block">Commercial</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
                <Factory className="w-5 h-5 text-sky-600 mx-auto mb-1.5" />
                <span className="text-xs font-bold text-slate-800 block">Industrial</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
                <Home className="w-5 h-5 text-purple-600 mx-auto mb-1.5" />
                <span className="text-xs font-bold text-slate-800 block">Residential</span>
              </div>
            </div>

            {/* Core Focus Items */}
            <ul className="space-y-3 pt-2 text-sm text-slate-700 font-medium">
              {[
                "Strict quality control and fire safety standards",
                "Dedicated technical support for sizing & selection",
                "Tailored solutions for complex project requirements",
                "Reliable delivery & local stock via Ecosta Systems",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Button
                variant="primary"
                size="md"
                href="/about"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                About Aria Vita™
              </Button>
            </div>
          </div>

          {/* Right Product Graphic */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white p-3">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100">
                <Image
                  src="/images/products/fire-retardant-flexible-duct.jpg"
                  alt="Aria Vita™ Fire Retardant Flexible Duct Engineering"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Float Trust Card */}
              <div className="mt-4 p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400 block">
                    Pan India Authorized Distribution
                  </span>
                  <p className="text-sm font-bold mt-0.5">Ecosta Systems, Bangalore</p>
                </div>
                <Link
                  href="/contact"
                  className="text-xs font-semibold px-3.5 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-lg transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
