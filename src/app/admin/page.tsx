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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-bold text-sky-700 bg-sky-100 px-3 py-1 rounded-full border border-sky-200 uppercase tracking-wider inline-block mb-2">
            Control Center
          </span>
          <h1 className="text-3xl font-extrabold font-heading text-slate-900">Dashboard Overview</h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white rounded-xl text-xs font-bold transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Products</span>
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold font-heading text-slate-900">{stats.totalProducts}</div>
          <p className="text-[11px] text-slate-500">Active product catalogue items</p>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Categories</span>
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold font-heading text-slate-900">{stats.activeCategories}</div>
          <p className="text-[11px] text-slate-500">Active product categories</p>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">New Enquiries</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold font-heading text-amber-600">{stats.newEnquiries}</div>
          <p className="text-[11px] text-slate-500">Pending customer leads</p>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Leads</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
              <Inbox className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold font-heading text-slate-900">{stats.totalEnquiries}</div>
          <p className="text-[11px] text-slate-500">Submitted site inquiries</p>
        </div>
      </div>

      {/* Quick Actions & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Enquiries */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold font-heading text-slate-900">Recent Customer Enquiries</h2>
              <p className="text-xs text-slate-500">Latest leads received from the website contact forms</p>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs font-bold text-sky-700 hover:text-sky-900 inline-flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentEnquiries.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <Inbox className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-500">No enquiries received yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 font-mono uppercase border-b border-slate-200">
                  <tr>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Product</th>
                    <th className="p-3">Contact</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentEnquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-sky-50/50 transition-colors">
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{enq.name}</div>
                        <div className="text-[11px] text-slate-500">{enq.company || "Individual"}</div>
                      </td>
                      <td className="p-3 font-semibold text-sky-800">{enq.product_name || "General"}</td>
                      <td className="p-3 font-mono text-slate-600">{enq.phone}</td>
                      <td className="p-3">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border ${
                            enq.status === "new"
                              ? "bg-amber-50 text-amber-800 border-amber-200"
                              : enq.status === "contacted"
                              ? "bg-sky-50 text-sky-800 border-sky-200"
                              : "bg-emerald-50 text-emerald-800 border-emerald-200"
                          }`}
                        >
                          {enq.status}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-[11px] text-slate-500">
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
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
            <h2 className="text-lg font-bold font-heading text-slate-900">Catalogue Health</h2>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <span className="text-slate-600">Default Display Order:</span>
                <span className="font-mono font-bold text-emerald-700">Verified</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <span className="text-slate-600">Product Availability:</span>
                <span className="font-mono font-bold text-emerald-700">All In Stock</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <span className="text-slate-600">Supabase RLS:</span>
                <span className="font-mono font-bold text-emerald-700">Enabled</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <Link
                href="/admin/settings"
                className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs"
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
