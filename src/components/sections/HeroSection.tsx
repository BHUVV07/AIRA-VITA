"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PhoneCall, ShieldCheck, Wind, Cpu, Sliders, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import ContactModal from "@/components/ui/ContactModal";

export default function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="relative min-h-[92vh] bg-gradient-to-b from-white via-sky-50/60 to-ice-blue pt-32 pb-20 overflow-hidden flex items-center border-b border-sky-100">
      {/* Background Soft Blue & Translucent Airflow Orbs */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-tech-grid opacity-50 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Engineering Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-purple-900 border border-purple-200 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
              <span>Aria Vita™ Air Distribution</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading text-slate-900 tracking-tight leading-[1.08]">
              Precision Air. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-sky-600 to-purple-900">
                Perfect Comfort.
              </span>
            </h1>

            {/* Secondary Heading & Body */}
            <div className="space-y-2">
              <h2 className="text-lg sm:text-xl font-bold font-heading text-slate-800">
                Engineered Air Distribution for Modern Spaces.
              </h2>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                High-performance HVAC air distribution products for commercial, industrial and residential projects. Focused on airflow control, safety, reliability, and long-term operating efficiency.
              </p>
            </div>

            {/* Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                size="lg"
                href="/products"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Explore Products
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => setModalOpen(true)}
                icon={<PhoneCall className="w-5 h-5 text-purple-600" />}
                className="bg-white hover:bg-slate-50 border-slate-300 text-slate-900 shadow-sm"
              >
                Talk to Our Team
              </Button>
            </div>

            {/* Technical Highlights */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-700 shrink-0" />
                <span className="font-medium">Fire Safety Tested</span>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="font-medium">Flow Balancing</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-700 shrink-0" />
                <span className="font-medium">MEP Consultant Grade</span>
              </div>
            </div>
          </div>

          {/* Right Product Composition with Soft Blue Airflow Shape & Technical Annotations */}
          <div className="lg:col-span-5 relative">
            {/* Background Soft Blue Airflow Shape */}
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-200/60 via-purple-100/40 to-sky-100/80 rounded-3xl transform rotate-3 scale-105 pointer-events-none border border-sky-200/60 shadow-lg" />

            {/* Main Featured Visual Container */}
            <div className="relative rounded-2xl overflow-hidden bg-white p-3 border border-sky-200 shadow-2xl group">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-950">
                <Image
                  src="/images/products/constant-airflow-regulator.jpg"
                  alt="Aria Vita™ Constant Airflow Regulator HVAC Engineering"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Internal Label */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 flex items-center justify-between text-slate-900 shadow-lg">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-purple-700 block">
                      Flagship Product
                    </span>
                    <span className="text-sm font-bold block">
                      Constant Airflow Regulator (CAR)
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded border border-sky-200">
                    50–250 Pa
                  </span>
                </div>
              </div>
            </div>

            {/* Technical Engineering Annotations around Hero */}
            <div className="hidden sm:block absolute -top-5 -right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-sky-200 shadow-lg text-[11px] font-mono text-slate-800 z-30">
              <span className="w-2 h-2 rounded-full bg-purple-600 inline-block mr-1.5" />
              AIRFLOW CONTROL • 50–250 Pa
            </div>

            <div className="hidden sm:block absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-sky-200 shadow-xl z-30 max-w-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                <span>Ecosta Systems, Bangalore</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Authorized Distributor & Stockist
              </p>
            </div>
          </div>
        </div>
      </div>

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
