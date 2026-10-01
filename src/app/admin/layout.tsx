"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Layers,
  Inbox,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Building2,
} from "lucide-react";
import AriaVitaLogo from "@/components/ui/AriaVitaLogo";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setAuthenticated(true);
      return;
    }

    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/auth/session");
        const data = await res.json();
        if (res.ok && data.authenticated) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
          router.replace("/admin/login");
        }
      } catch {
        setAuthenticated(false);
        router.replace("/admin/login");
      }
    }

    checkAuth();
  }, [pathname, router]);

  // If on login page, render full screen without sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Show loading screen while verifying session
  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-lg text-center space-y-4 max-w-sm w-full">
          <AriaVitaLogo showTagline={false} />
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-sky-700 pt-2">
            <span className="w-4 h-4 rounded-full border-2 border-sky-600 border-t-transparent animate-spin inline-block" />
            <span>Verifying Admin Authorization...</span>
          </div>
        </div>
      </div>
    );
  }

  // If unauthenticated, return null while redirecting
  if (!authenticated) {
    return null;
  }

  const navItems = [
    { name: "Dashboard Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Products Catalogue", href: "/admin/products", icon: Package },
    { name: "Product Categories", href: "/admin/categories", icon: Layers },
    { name: "Lead Enquiries", href: "/admin/enquiries", icon: Inbox },
    { name: "Site Settings", href: "/admin/settings", icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
    } catch {}
    setAuthenticated(false);
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row">
      {/* Mobile Header Bar */}
      <div className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-40 shadow-xs">
        <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-200">
          <AriaVitaLogo showTagline={false} />
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-200 transform ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } shadow-sm`}
      >
        <div className="p-6 space-y-8">
          {/* Logo Brand Header */}
          <div className="bg-gradient-to-b from-sky-50/80 to-white p-3.5 rounded-2xl border border-sky-100 shadow-xs">
            <AriaVitaLogo showTagline={true} />
          </div>

          {/* Navigation Links */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block px-3 mb-2">
              CMS Navigation
            </span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-sky-600 text-white shadow-md shadow-sky-600/20"
                      : "text-slate-600 hover:text-sky-800 hover:bg-sky-50"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-sky-600"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 space-y-2 bg-slate-50/50">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-sky-800 hover:bg-white transition-all border border-transparent hover:border-slate-200"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-sky-600" />
              <span>Live Website</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">View ↗</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 border border-transparent hover:border-red-100 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>

          <div className="pt-2 text-center">
            <span className="text-[10px] font-mono text-slate-400 block">
              ARIA VITA™ Admin CMS v1.0
            </span>
          </div>
        </div>
      </aside>

      {/* Main Dashboard Workspace */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto min-h-screen bg-slate-50">
        {children}
      </main>
    </div>
  );
}
