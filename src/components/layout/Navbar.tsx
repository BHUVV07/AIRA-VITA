"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowRight, Layers, FileText } from "lucide-react";
import AriaVitaLogo from "@/components/ui/AriaVitaLogo";
import Button from "@/components/ui/Button";
import ContactModal from "@/components/ui/ContactModal";
import { PRODUCTS } from "@/data/products";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsHover, setProductsHover] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products", hasDropdown: true },
    { name: "Industries", href: "/industries" },
    { name: "About", href: "/about" },
    { name: "Resources", href: "/resources" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-sky-100 py-3"
            : "bg-white/90 backdrop-blur-sm border-b border-slate-100 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Official Logo */}
            <AriaVitaLogo />

            {/* Center: Nav links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.name}
                      className="relative py-2"
                      onMouseEnter={() => setProductsHover(true)}
                      onMouseLeave={() => setProductsHover(false)}
                    >
                      <Link
                        href="/products"
                        className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl transition-colors ${
                          isActive || pathname.startsWith("/products")
                            ? "text-sky-800 bg-sky-50 font-bold"
                            : "text-slate-700 hover:text-sky-800 hover:bg-slate-50"
                        }`}
                      >
                        <span>Products</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            productsHover ? "rotate-180 text-sky-600" : "text-slate-400"
                          }`}
                        />
                      </Link>

                      {/* Dynamic Mega Menu */}
                      {productsHover && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-white rounded-2xl shadow-2xl border border-sky-100 p-6 grid grid-cols-2 gap-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                          <div className="col-span-2 pb-3 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-800 font-heading">
                              <Layers className="w-4 h-4 text-sky-600" />
                              <span>Official Air Distribution Catalogue</span>
                            </div>
                            <span className="text-xs text-slate-400 font-mono font-semibold">
                              5 Top-Level Product Lines
                            </span>
                          </div>

                          {PRODUCTS.map((prod) => (
                            <div
                              key={prod.id}
                              className="p-3 rounded-xl hover:bg-sky-50/70 border border-transparent hover:border-sky-100 transition-all flex flex-col justify-between"
                            >
                              <Link
                                href={`/products/${prod.slug}`}
                                onClick={() => setProductsHover(false)}
                                className="group flex items-start gap-2.5"
                              >
                                <div className="w-7 h-7 rounded-lg bg-sky-50 group-hover:bg-sky-600 text-sky-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors mt-0.5">
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                                    {prod.name}
                                  </h4>
                                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                    {prod.subtitle}
                                  </p>
                                </div>
                              </Link>

                              {/* Subcategories if present */}
                              {prod.subcategories && prod.subcategories.length > 0 && (
                                <div className="mt-2 pl-9 space-y-1 border-l-2 border-sky-100 ml-3">
                                  {prod.subcategories.map((sub) => (
                                    <Link
                                      key={sub.id}
                                      href={`/products/${prod.slug}/${sub.slug}`}
                                      onClick={() => setProductsHover(false)}
                                      className="block text-[11px] font-semibold text-slate-600 hover:text-sky-700 transition-colors"
                                    >
                                      → {sub.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}

                          <div className="col-span-2 pt-3 border-t border-slate-100 flex items-center justify-between bg-gradient-to-r from-ice-blue to-white -mx-6 -mb-6 p-4 rounded-b-2xl">
                            <span className="text-xs text-slate-600 font-medium">
                              Authorized Stockist: <strong className="text-slate-900">Ecosta Systems, Bangalore</strong>
                            </span>
                            <Link
                              href="/products"
                              onClick={() => setProductsHover(false)}
                              className="text-xs font-bold text-sky-700 hover:text-sky-800 flex items-center gap-1"
                            >
                              Full Catalogue →
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-4 py-2 text-sm font-semibold rounded-xl transition-colors ${
                      isActive
                        ? "text-sky-800 bg-sky-50 font-bold"
                        : "text-slate-700 hover:text-sky-800 hover:bg-slate-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Request Product Information Button */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => setModalOpen(true)}
                icon={<FileText className="w-4 h-4" />}
              >
                Request Product Information
              </Button>
            </div>

            {/* Mobile menu toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setModalOpen(true)}
                className="px-3 py-1.5 bg-sky-600 text-white text-xs font-semibold rounded-lg"
              >
                Inquire
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
                aria-label="Toggle Navigation"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200 max-h-[85vh] overflow-y-auto">
            {navLinks.map((link) => (
              <div key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-2.5 text-base font-bold rounded-xl ${
                    pathname === link.href
                      ? "text-sky-800 bg-sky-50"
                      : "text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </Link>

                {link.hasDropdown && (
                  <div className="pl-4 pr-2 py-1 space-y-2 border-l-2 border-sky-200 ml-4 my-1">
                    {PRODUCTS.map((prod) => (
                      <div key={prod.id} className="space-y-1">
                        <Link
                          href={`/products/${prod.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className="block text-xs font-bold text-slate-800 hover:text-sky-700 py-0.5"
                        >
                          • {prod.name}
                        </Link>
                        {prod.subcategories && prod.subcategories.length > 0 && (
                          <div className="pl-4 space-y-1">
                            {prod.subcategories.map((sub) => (
                              <Link
                                key={sub.id}
                                href={`/products/${prod.slug}/${sub.slug}`}
                                onClick={() => setMobileOpen(false)}
                                className="block text-[11px] font-semibold text-slate-500 hover:text-sky-700 py-0.5"
                              >
                                → {sub.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => {
                  setMobileOpen(false);
                  setModalOpen(true);
                }}
              >
                Request Product Information
              </Button>
            </div>
          </div>
        )}
      </header>

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
