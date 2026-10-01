"use client";

import React, { useEffect, useState } from "react";
import {
  Inbox,
  Search,
  Trash2,
  MessageCircle,
  X,
} from "lucide-react";
import { generateWhatsAppEnquiryUrl } from "@/utils/whatsapp";

interface AdminEnquiryItem {
  id: string;
  name: string;
  company?: string | null;
  email: string;
  phone: string;
  product_name?: string | null;
  variant_name?: string | null;
  message?: string | null;
  project_type?: string | null;
  status: string;
  created_at: string;
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<AdminEnquiryItem[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<AdminEnquiryItem | null>(null);

  const fetchEnquiries = async () => {
    try {
      const res = await fetch(`/api/admin/enquiries?status=${statusFilter}&search=${encodeURIComponent(search)}`);
      const data = await res.json();
      if (data.enquiries) setEnquiries(data.enquiries);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const res = await fetch(`/api/admin/enquiries?status=${statusFilter}&search=${encodeURIComponent(search)}`);
        const data = await res.json();
        if (active && data.enquiries) {
          setEnquiries(data.enquiries);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [statusFilter, search]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/admin/enquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchEnquiries();
    } catch {
      alert("Failed to update status.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry lead?")) return;
    try {
      await fetch(`/api/admin/enquiries/${id}`, { method: "DELETE" });
      fetchEnquiries();
      if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
    } catch {
      alert("Failed to delete enquiry.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-bold text-sky-700 bg-sky-100 px-3 py-1 rounded-full border border-sky-200 uppercase tracking-wider inline-block mb-2">
            Lead Management
          </span>
          <h1 className="text-3xl font-extrabold font-heading text-slate-900">
            Customer Enquiries ({enquiries.length})
          </h1>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white border border-slate-200 p-4 sm:p-6 rounded-3xl shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, company, email, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-sky-500 outline-none"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-mono text-slate-500 font-bold uppercase">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 outline-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        {enquiries.length === 0 ? (
          <div className="py-16 text-center text-slate-400 space-y-2">
            <Inbox className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm text-slate-500">No lead enquiries found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 font-mono uppercase border-b border-slate-200">
                <tr>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Product / Variant</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-sky-50/50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-slate-900 text-sm">{enq.name}</div>
                      <div className="text-[11px] text-slate-500">{enq.company || "Individual"}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-sky-800">{enq.product_name || "General Enquiry"}</div>
                      {enq.variant_name && (
                        <div className="text-[11px] font-mono text-slate-500">{enq.variant_name}</div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="font-mono text-slate-900">{enq.phone}</div>
                      <div className="text-[11px] text-slate-500">{enq.email}</div>
                    </td>
                    <td className="p-4">
                      <select
                        value={enq.status}
                        onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                        className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border outline-none cursor-pointer ${
                          enq.status === "new"
                            ? "bg-amber-50 text-amber-800 border-amber-200"
                            : enq.status === "contacted"
                            ? "bg-sky-50 text-sky-800 border-sky-200"
                            : enq.status === "qualified"
                            ? "bg-purple-50 text-purple-800 border-purple-200"
                            : "bg-emerald-50 text-emerald-800 border-emerald-200"
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="p-4 font-mono text-slate-500 text-[11px]">
                      {new Date(enq.created_at).toLocaleString()}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedEnquiry(enq)}
                          className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleDelete(enq.id)}
                          className="p-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg border border-red-200 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Details Drawer Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 space-y-6 text-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-sky-700 font-bold block">
                  Lead Details #{selectedEnquiry.id.substring(0, 8)}
                </span>
                <h3 className="text-xl font-bold font-heading text-slate-900">{selectedEnquiry.name}</h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-2 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 font-mono">
                <div>Company: <span className="text-slate-900 font-bold">{selectedEnquiry.company || "Individual"}</span></div>
                <div>Email: <span className="text-slate-900 font-bold">{selectedEnquiry.email}</span></div>
                <div>Phone: <span className="text-slate-900 font-bold">{selectedEnquiry.phone}</span></div>
                {selectedEnquiry.project_type && (
                  <div>Project Type: <span className="text-sky-700 font-bold">{selectedEnquiry.project_type}</span></div>
                )}
              </div>

              <div className="p-3.5 bg-sky-50 rounded-2xl border border-sky-100 space-y-1">
                <span className="text-sky-800 uppercase font-bold text-[10px]">Product / Variant Enquired:</span>
                <div className="text-sm font-bold text-sky-900">{selectedEnquiry.product_name || "General Enquiry"}</div>
                {selectedEnquiry.variant_name && (
                  <div className="text-xs text-slate-600 font-mono">Variant: {selectedEnquiry.variant_name}</div>
                )}
              </div>

              <div>
                <span className="text-slate-500 uppercase font-bold text-[10px] block mb-1">Customer Message / Specifications:</span>
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-slate-700 leading-relaxed">
                  {selectedEnquiry.message || "No specific message provided."}
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <a
                href={generateWhatsAppEnquiryUrl({
                  name: selectedEnquiry.name,
                  company: selectedEnquiry.company || undefined,
                  email: selectedEnquiry.email,
                  phone: selectedEnquiry.phone,
                  product: selectedEnquiry.product_name || undefined,
                  variant: selectedEnquiry.variant_name || undefined,
                  message: selectedEnquiry.message || undefined,
                  projectType: selectedEnquiry.project_type || undefined,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open WhatsApp Chat</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
