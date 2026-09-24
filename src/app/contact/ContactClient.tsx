"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Globe, ShieldCheck, Send, CheckCircle2, Building, MessageCircle } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { COMPANY_INFO, PRODUCTS } from "@/data/ariaVitaData";
import { generateWhatsAppEnquiryUrl, getDirectWhatsAppUrl } from "@/utils/whatsapp";

export default function ContactClient() {
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

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      const whatsappUrl = generateWhatsAppEnquiryUrl({
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        product: formData.product,
        projectType: formData.projectType,
        message: formData.message,
      });

      window.open(whatsappUrl, "_blank");
    }, 600);
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-slate-900 text-white py-16 lg:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block mb-3">
            Get in Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading tracking-tight">
            Contact Aria Vita™ Technical Support
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Reach out to our engineering team and authorized distributor Ecosta Systems in Indiranagar, Bengaluru for technical quotes, product sizing, and project inquiries.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-lg space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 block mb-1">
                Project Enquiry
              </span>
              <h2 className="text-2xl font-bold font-heading text-slate-900">
                Submit Product Specification Request
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Fill in your project details below to route your inquiry to our Bengaluru distribution desk.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-purple-50 rounded-2xl border border-purple-200 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-purple-700 mx-auto" />
                <h3 className="text-xl font-bold text-slate-900">Enquiry Redirecting to WhatsApp</h3>
                <p className="text-xs text-slate-600">
                  Thank you, {formData.name}! Your enquiry details have been formatted for instant dispatch to Ecosta Systems technical desk.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-purple-700 text-white font-semibold text-xs rounded-xl"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Company / Organization</label>
                    <input
                      type="text"
                      placeholder="e.g. Apex MEP Consultants"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="rajesh@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Target Product Line</label>
                    <select
                      value={formData.product}
                      onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                    >
                      {PRODUCTS.map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Project Classification</label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                    >
                      <option value="Commercial Building">Commercial Office Building</option>
                      <option value="Hospital / Healthcare">Hospital / Cleanroom</option>
                      <option value="Hotel & Hospitality">Hotel & Resort</option>
                      <option value="Industrial / Warehouse">Factory / Warehouse</option>
                      <option value="Residential Project">Residential Complex</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Project Notes & Specifications</label>
                  <textarea
                    rows={4}
                    placeholder="Mention required quantities, sizes, static pressure ratings, or site location..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{loading ? "Formatting Enquiry..." : "Send Technical Enquiry via WhatsApp"}</span>
                </button>
              </form>
            )}
          </div>

          {/* Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 block">
                Official Channels
              </span>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-500 font-semibold uppercase block">
                      Authorized Stockist & Address:
                    </span>
                    <span className="font-bold text-slate-900 block">{COMPANY_INFO.distributor.name}</span>
                    <span className="text-xs text-slate-600 leading-relaxed block mt-0.5">
                      {COMPANY_INFO.distributor.address}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-500 font-semibold uppercase block">
                      Email Address:
                    </span>
                    <a href={`mailto:${COMPANY_INFO.contact.email}`} className="font-bold text-slate-900 hover:text-purple-700 transition-colors">
                      {COMPANY_INFO.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-500 font-semibold uppercase block">
                      Direct Support Line:
                    </span>
                    <a href={`tel:${COMPANY_INFO.contact.phone}`} className="font-bold text-slate-900 hover:text-purple-700 transition-colors">
                      {COMPANY_INFO.contact.formattedPhone}
                    </a>
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
