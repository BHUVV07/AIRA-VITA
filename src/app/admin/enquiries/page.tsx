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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest block mb-1">
            Lead Management
          </span>
          <h1 className="text-3xl font-extrabold font-heading text-white">
            Customer Enquiries ({enquiries.length})
          </h1>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-slate-900 border border-slate-800 p-4 sm:p-6 rounded-3xl shadow-xl flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, company, email, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-mono text-slate-400 font-bold uppercase">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none cursor-pointer"
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
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        {enquiries.length === 0 ? (
          <div className="py-16 text-center text-slate-400 space-y-2">
            <Inbox className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-sm">No lead enquiries found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-950 text-slate-400 font-mono uppercase border-b border-slate-800">
                <tr>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Product / Variant</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-slate-800/40">
                    <td className="p-4">
                      <div className="font-bold text-white text-sm">{enq.name}</div>
                      <div className="text-[11px] text-slate-400">{enq.company || "Individual"}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-sky-400">{enq.product_name || "General Enquiry"}</div>
                      {enq.variant_name && (
                        <div className="text-[11px] font-mono text-slate-400">{enq.variant_name}</div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="font-mono text-slate-200">{enq.phone}</div>
                      <div className="text-[11px] text-slate-400">{enq.email}</div>
                    </td>
                    <td className="p-4">
                      <select
                        value={enq.status}
                        onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                        className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border outline-none cursor-pointer ${
                          enq.status === "new"
                            ? "bg-amber-950 text-amber-300 border-amber-800"
                            : enq.status === "contacted"
                            ? "bg-sky-950 text-sky-300 border-sky-800"
                            : enq.status === "qualified"
                            ? "bg-purple-950 text-purple-300 border-purple-800"
                            : "bg-emerald-950 text-emerald-300 border-emerald-800"
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="p-4 font-mono text-slate-400 text-[11px]">
                      {new Date(enq.created_at).toLocaleString()}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedEnquiry(enq)}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleDelete(enq.id)}
                          className="p-1.5 bg-red-950 hover:bg-red-900 text-red-400 rounded-lg border border-red-800 cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 rounded-3xl border border-slate-800 max-w-lg w-full p-6 space-y-6 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-sky-400 font-bold block">
                  Lead Details #{selectedEnquiry.id.substring(0, 8)}
                </span>
                <h3 className="text-xl font-bold font-heading">{selectedEnquiry.name}</h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-2 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 font-mono">
                <div>Company: <span className="text-white font-bold">{selectedEnquiry.company || "Individual"}</span></div>
                <div>Email: <span className="text-white font-bold">{selectedEnquiry.email}</span></div>
                <div>Phone: <span className="text-white font-bold">{selectedEnquiry.phone}</span></div>
                {selectedEnquiry.project_type && (
                  <div>Project Type: <span className="text-sky-300">{selectedEnquiry.project_type}</span></div>
                )}
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 uppercase font-bold text-[10px]">Product / Variant Enquired:</span>
                <div className="text-sm font-bold text-sky-400">{selectedEnquiry.product_name || "General Enquiry"}</div>
                {selectedEnquiry.variant_name && (
                  <div className="text-xs text-slate-300 font-mono">Variant: {selectedEnquiry.variant_name}</div>
                )}
              </div>

              <div>
                <span className="text-slate-400 uppercase font-bold text-[10px] block mb-1">Customer Message / Specifications:</span>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300 leading-relaxed">
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
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 shadow-md"
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
