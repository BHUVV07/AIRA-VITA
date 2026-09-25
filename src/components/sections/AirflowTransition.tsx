"use client";

import React from "react";
import { Wind, Activity, Sliders, CheckCircle2 } from "lucide-react";

export default function AirflowTransition() {
  return (
    <section className="relative bg-gradient-to-b from-white via-sky-50/50 to-ice-blue py-16 lg:py-24 border-y border-slate-200/80 overflow-hidden">
      {/* Background SVG Flowing Airflow Ribbon */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M-100 160C200 80 400 240 700 160C1000 80 1200 220 1540 140"
            stroke="url(#airflow-grad-1)"
            strokeWidth="3"
            strokeDasharray="12 8"
            className="animate-airflow"
          />
          <path
            d="M-50 200C250 120 450 280 750 200C1050 120 1250 260 1590 180"
            stroke="url(#airflow-grad-2)"
            strokeWidth="2.5"
            strokeDasharray="20 10"
            className="animate-airflow"
            style={{ animationDuration: "8s" }}
          />
          <path
            d="M0 120C300 200 500 40 800 140C1100 240 1300 100 1600 160"
            stroke="url(#airflow-grad-1)"
            strokeWidth="1.5"
            opacity="0.5"
          />
          <defs>
            <linearGradient id="airflow-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#0284C7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="airflow-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284C7" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Engineering Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-sky-200 shadow-sm mb-6 text-xs font-bold uppercase tracking-widest text-sky-800">
          <Wind className="w-4 h-4 text-sky-600 animate-spin-slow" />
          <span>Controlled Dynamics</span>
        </div>

        {/* Signature Editorial Statement */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
          &ldquo;Air isn&apos;t just movement. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-700 via-sky-500 to-sky-400">
            It&apos;s performance.&rdquo;
          </span>
        </h2>

        {/* Technical Annotations */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
          <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-sky-100 shadow-xs flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 font-mono font-bold text-xs">
              01
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase text-slate-900">CFM Stability</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Calibrated flow despite duct static fluctuations</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-sky-100 shadow-xs flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 font-mono font-bold text-xs">
              02
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase text-slate-900">Passive Safety</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Fire retardant materials for safety zones</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-sky-100 shadow-xs flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 font-mono font-bold text-xs">
              03
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase text-slate-900">Acoustic Balance</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Vibration isolation and low sound decibels</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
