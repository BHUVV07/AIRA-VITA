import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Globe, ShieldCheck, ArrowUpRight } from "lucide-react";
import AriaVitaLogo from "@/components/ui/AriaVitaLogo";
import { COMPANY_INFO, PRODUCTS } from "@/data/products";

export default function Footer() {
  return (
    <footer className="bg-slate-50 text-slate-700 border-t border-slate-200">
      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Column 1: Supplied Logo & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <AriaVitaLogo showTagline={true} />

            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              {COMPANY_INFO.concept}
            </p>

            <p className="text-xs text-slate-500 leading-relaxed">
              Manufacturer & supplier of high-performance HVAC air distribution products engineered for commercial, industrial and residential projects.
            </p>

            {/* Distributor Badge */}
            <div className="pt-2">
              <div className="p-4 rounded-2xl bg-white border border-sky-200 shadow-xs flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-700 shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-sky-800 block">
                    Authorized Pan India Distributor
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                    {COMPANY_INFO.distributor.name}
                  </h4>
                  <p className="text-xs text-slate-500">{COMPANY_INFO.distributor.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Dynamic Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-heading border-b border-slate-200 pb-2">
              Products
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              {PRODUCTS.map((prod) => (
                <li key={prod.id}>
                  <Link
                    href={`/products/${prod.slug}`}
                    className="hover:text-sky-700 transition-colors"
                  >
                    {prod.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-heading border-b border-slate-200 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              <li>
                <Link href="/" className="hover:text-sky-700 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-sky-700 transition-colors">
                  All Products Catalogue
                </Link>
              </li>
              <li>
                <Link href="/industries" className="hover:text-sky-700 transition-colors">
                  Industries & Sectors
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-sky-700 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-sky-700 transition-colors">
                  Technical Resources
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-sky-700 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-heading border-b border-slate-200 pb-2">
              Contact
            </h4>
            <ul className="space-y-3 text-xs text-slate-600 font-medium">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                <a
                  href={`mailto:${COMPANY_INFO.contact.email}`}
                  className="hover:text-slate-900 font-bold transition-colors"
                >
                  {COMPANY_INFO.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <a
                    href={`tel:${COMPANY_INFO.contact.phone}`}
                    className="hover:text-slate-900 font-bold transition-colors"
                  >
                    {COMPANY_INFO.contact.formattedPhone}
                  </a>
                  <a
                    href="https://wa.me/919342050097"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                  >
                    WhatsApp: +91 93420 50097
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.contact.location}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Globe className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <a
                  href={`https://${COMPANY_INFO.contact.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 font-bold transition-colors inline-flex items-center gap-1"
                >
                  <span>{COMPANY_INFO.contact.website}</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} ARIA VITA™. All Rights Reserved. Precision Air. Perfect Comfort.</p>
          <div className="flex items-center gap-6 font-medium">
            <span>Authorized Distributor: Ecosta Systems, Bangalore</span>
            <Link href="/contact" className="hover:text-sky-700 transition-colors">
              RFQ Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
