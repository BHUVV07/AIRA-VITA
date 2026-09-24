"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Globe, ShieldCheck, Send, CheckCircle2, Building, MessageCircle } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { COMPANY_INFO, PRODUCTS } from "@/data/ariaVitaData";
import { generateWhatsAppEnquiryUrl, getDirectWhatsAppUrl } from "@/utils/whatsapp";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    projectType: "Commercial Building",
    product: "Disc Valves",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const waUrl = generateWhatsAppEnquiryUrl(formData);
    if (typeof window !== "undefined") {
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-16 lg:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block mb-3">
            Contact & Inquiry
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading tracking-tight">
            Let&apos;s Talk About Your Next Project
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Tell us what you&apos;re working on and our engineering team can help with product information, sizing calculations, and technical requirements.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
            <h2 className="text-2xl font-bold font-heading text-slate-900 border-b border-slate-100 pb-4 mb-6">
              Send an Engineering Project Enquiry
            </h2>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-900">Enquiry Forwarded to WhatsApp</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you! Your project enquiry details have been pre-filled and directed to our WhatsApp engineering line ({COMPANY_INFO.contact.formattedPhone}).
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-3">
                  <a
                    href={generateWhatsAppEnquiryUrl(formData)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl inline-flex items-center gap-2 shadow-md transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Open WhatsApp Chat</span>
                  </a>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-all"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Varma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Company / MEP Firm *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Spectrum HVAC Consultants"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. anand@spectrumhvac.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9342050097"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Project Type
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white outline-none transition-all"
                    >
                      <option value="Commercial Building">Commercial Building</option>
                      <option value="Hospital & Healthcare">Hospital & Healthcare</option>
                      <option value="Hotel & Hospitality">Hotel & Hospitality</option>
                      <option value="Industrial & Factory">Industrial & Factory</option>
                      <option value="Data Center">Data Center Cooling</option>
                      <option value="Distributor Inquiry">Distributor Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Product of Interest
                    </label>
                    <select
                      value={formData.product}
                      onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white outline-none transition-all"
                    >
                      {PRODUCTS.map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Project Requirements / Specifications Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Provide details such as duct sizes, required airflow (CFM), quantity requirements, or installation timelines..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    "Opening WhatsApp..."
                  ) : (
                    <>
                      <MessageCircle className="w-5 h-5" />
                      <span>Send Enquiry via WhatsApp</span>
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-slate-500">
                  ⚡ Pre-fills all project details into WhatsApp (+91 93420 50097) for rapid engineering response.
                </p>
              </form>
            )}
          </div>

          {/* Right Direct Details & Distributor Card */}
          <div className="lg:col-span-5 space-y-8">
            {/* Direct Details */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold font-heading text-slate-900 border-b border-slate-100 pb-3">
                Aria Vita™ Headquarters
              </h3>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-500 font-semibold uppercase block">
                      Email Address:
                    </span>
                    <a
                      href={`mailto:${COMPANY_INFO.contact.email}`}
                      className="font-bold text-slate-900 hover:text-purple-700 transition-colors"
                    >
                      {COMPANY_INFO.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-500 font-semibold uppercase block">
                      Phone & WhatsApp:
                    </span>
                    <div className="flex flex-wrap items-center gap-2.5 mt-0.5">
                      <a
                        href={`tel:${COMPANY_INFO.contact.phone}`}
                        className="font-bold text-slate-900 hover:text-sky-700 transition-colors"
                      >
                        {COMPANY_INFO.contact.formattedPhone}
                      </a>
                      <a
                        href={getDirectWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Chat on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-500 font-semibold uppercase block">
                      Location:
                    </span>
                    <span className="font-bold text-slate-900">{COMPANY_INFO.contact.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Globe className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-500 font-semibold uppercase block">
                      Official Website:
                    </span>
                    <span className="font-bold text-slate-900">{COMPANY_INFO.contact.website}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Distributor Card */}
            <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-950 text-purple-300 rounded-full text-[10px] uppercase font-bold tracking-wider border border-purple-800">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                <span>Authorized Stockist</span>
              </div>
              <h3 className="text-xl font-bold font-heading">{COMPANY_INFO.distributor.name}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Stocking, project support, and local dispatch for Aria Vita™ HVAC product lines.
              </p>
              <div className="pt-2 border-t border-slate-800 text-xs font-mono text-slate-400">
                Address: {COMPANY_INFO.distributor.address}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
