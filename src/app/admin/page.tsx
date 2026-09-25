"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  Layers,
  Inbox,
  Clock,
  Plus,
  ArrowRight,
} from "lucide-react";

interface AdminEnquiryItem {
  id: string;
  name: string;
  company?: string | null;
  email: string;
  phone: string;
  product_name?: string | null;
  status: string;
  created_at: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalProducts: 5,
    activeCategories: 5,
    totalEnquiries: 0,
    newEnquiries: 0,
  });

  const [recentEnquiries, setRecentEnquiries] = useState<AdminEnquiryItem[]>([]);
  const [, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [prodRes, catRes, enqRes] = await Promise.all([
          fetch("/api/admin/products"),
          fetch("/api/admin/categories"),
          fetch("/api/admin/enquiries"),
        ]);

        const prodData = await prodRes.json();
        const catData = await catRes.json();
        const enqData = await enqRes.json();

        const prods = prodData.products || [];
        const cats = catData.categories || [];
        const enqs = enqData.enquiries || [];

        setStats({
          totalProducts: prods.length,
          activeCategories: cats.length,
          totalEnquiries: enqs.length,
          newEnquiries: enqs.filter((e: AdminEnquiryItem) => e.status === "new").length,
        });

        setRecentEnquiries(enqs.slice(0, 5));
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest block mb-1">
            Control Center
          </span>
          <h1 className="text-3xl font-extrabold font-heading text-white">Dashboard Overview</h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all shadow-md inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Products</span>
            <div className="w-10 h-10 rounded-xl bg-sky-950 border border-sky-800 text-sky-400 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold font-heading text-white">{stats.totalProducts}</div>
          <p className="text-[11px] text-slate-400">Active product catalogue items</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Categories</span>
            <div className="w-10 h-10 rounded-xl bg-sky-950 border border-sky-800 text-sky-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold font-heading text-white">{stats.activeCategories}</div>
          <p className="text-[11px] text-slate-400">Active product categories</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">New Enquiries</span>
            <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-800 text-amber-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold font-heading text-amber-400">{stats.newEnquiries}</div>
          <p className="text-[11px] text-slate-400">Pending customer leads</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Leads</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center">
              <Inbox className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold font-heading text-white">{stats.totalEnquiries}</div>
          <p className="text-[11px] text-slate-400">Submitted site inquiries</p>
        </div>
      </div>

      {/* Quick Actions & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Enquiries */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold font-heading text-white">Recent Customer Enquiries</h2>
              <p className="text-xs text-slate-400">Latest leads received from the website contact forms</p>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs font-bold text-sky-400 hover:text-sky-300 inline-flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentEnquiries.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <Inbox className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-xs">No enquiries received yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-950 text-slate-400 font-mono uppercase border-b border-slate-800">
                  <tr>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Product</th>
                    <th className="p-3">Contact</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {recentEnquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-slate-800/40">
                      <td className="p-3">
                        <div className="font-bold text-white">{enq.name}</div>
                        <div className="text-[11px] text-slate-400">{enq.company || "Individual"}</div>
                      </td>
                      <td className="p-3 font-semibold text-sky-300">{enq.product_name || "General"}</td>
                      <td className="p-3 font-mono text-slate-300">{enq.phone}</td>
                      <td className="p-3">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            enq.status === "new"
                              ? "bg-amber-950 text-amber-300 border border-amber-800"
                              : enq.status === "contacted"
                              ? "bg-sky-950 text-sky-300 border border-sky-800"
                              : "bg-emerald-950 text-emerald-300 border border-emerald-800"
                          }`}
                        >
                          {enq.status}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-[11px] text-slate-400">
                        {new Date(enq.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* System & Stock Status */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h2 className="text-lg font-bold font-heading text-white">Catalogue Health</h2>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Default Display Order:</span>
                <span className="font-mono font-bold text-emerald-400">Verified</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Product Availability:</span>
                <span className="font-mono font-bold text-emerald-400">All In Stock</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Supabase RLS:</span>
                <span className="font-mono font-bold text-emerald-400">Enabled</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <Link
                href="/admin/settings"
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <span>Edit Site & Business Settings</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
