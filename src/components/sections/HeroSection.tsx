"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, PhoneCall, ShieldCheck, Wind, Cpu, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";
import ContactModal from "@/components/ui/ContactModal";
import { HERO_SLIDES } from "@/data/gallery";

export default function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-slide effect (4s interval, pauses on hover)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const currentSlide = HERO_SLIDES[activeIndex];

  return (
    <section className="relative min-h-[92vh] bg-gradient-to-b from-white via-sky-50/70 to-ice-blue pt-32 pb-20 overflow-hidden flex items-center border-b border-sky-100">
      {/* Background Soft Blue & Translucent Airflow Orbs */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-tech-grid opacity-50 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading text-slate-900 tracking-tight leading-[1.08]">
              Precision Air. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-sky-400 to-sky-800">
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
                icon={<PhoneCall className="w-5 h-5 text-sky-600" />}
                className="bg-white hover:bg-slate-50 border-slate-300 text-slate-900 shadow-sm"
              >
                Talk to Our Team
              </Button>
            </div>

            {/* Technical Highlights */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="font-medium">Fire Safety Tested</span>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-sky-500 shrink-0" />
                <span className="font-medium">Flow Balancing</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="font-medium">MEP Consultant Grade</span>
              </div>
            </div>
          </div>

          {/* Right Product Composition - AUTOMATIC HERO CAROUSEL */}
          <div
            className="lg:col-span-5 relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Background Soft Blue Airflow Shape */}
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-200/60 via-sky-100/40 to-sky-100/80 rounded-3xl transform rotate-3 scale-105 pointer-events-none border border-sky-200/60 shadow-lg" />

            {/* Main Featured Carousel Visual Container */}
            <div className="relative rounded-2xl overflow-hidden bg-white p-3 border border-sky-200 shadow-2xl">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900/95 p-2 select-none">
                {/* Carousel Progress / Indicator Dots */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-30 bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  {HERO_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        idx === activeIndex ? "w-5 bg-sky-400" : "w-1.5 bg-white/40 hover:bg-white/80"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Animated Slide Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                    className="absolute inset-0 p-2"
                  >
                    <Image
                      src={currentSlide.image}
                      alt={currentSlide.imageAlt}
                      fill
                      className="object-contain p-3 group-hover:scale-105 transition-transform duration-700"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent pointer-events-none" />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Chevrons */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md border border-slate-200 transition-all opacity-0 group-hover:opacity-100 z-30 cursor-pointer"
                  aria-label="Previous Product"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md border border-slate-200 transition-all opacity-0 group-hover:opacity-100 z-30 cursor-pointer"
                  aria-label="Next Product"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Internal Slide Label Overlay */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 flex items-center justify-between text-slate-900 shadow-lg z-20">
                  {currentSlide.link ? (
                    <Link href={currentSlide.link} className="text-xs sm:text-sm font-bold font-heading hover:text-sky-600 transition-colors truncate max-w-[210px]">
                      {currentSlide.title}
                    </Link>
                  ) : (
                    <span className="text-xs sm:text-sm font-bold font-heading truncate max-w-[210px]">
                      {currentSlide.title}
                    </span>
                  )}
                  <span className="text-[10px] sm:text-xs font-mono font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded border border-sky-200 shrink-0">
                    {currentSlide.badge}
                  </span>
                </div>
              </div>
            </div>

            {/* Technical Engineering Annotations around Hero */}
            <div className="hidden sm:block absolute -top-5 -right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-sky-200 shadow-lg text-[11px] font-mono text-slate-800 z-30">
              <span className="w-2 h-2 rounded-full bg-sky-500 inline-block mr-1.5 animate-pulse" />
              AIRFLOW CONTROL • 50–250 Pa
            </div>

            <div className="hidden sm:block absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-sky-200 shadow-xl z-30 max-w-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
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
