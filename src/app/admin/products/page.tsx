"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle2,
  Eye,
} from "lucide-react";
import { Product } from "@/data/products";

interface AdminCategorySimple {
  id: string;
  name: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<AdminCategorySimple[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const [, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const [pRes, cRes] = await Promise.all([
        fetch("/api/admin/products"),
        fetch("/api/admin/categories"),
      ]);
      const pData = await pRes.json();
      const cData = await cRes.json();
      if (pData.products) setProducts(pData.products);
      if (cData.categories) setCategories(cData.categories);
    } catch (err) {
      console.error("Fetch products error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const [pRes, cRes] = await Promise.all([
          fetch("/api/admin/products"),
          fetch("/api/admin/categories"),
        ]);
        const pData = await pRes.json();
        const cData = await cRes.json();
        if (active) {
          if (pData.products) setProducts(pData.products);
          if (cData.categories) setCategories(cData.categories);
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
  }, []);

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !currentActive }),
      });
      fetchProducts();
    } catch (err) {
      alert("Failed to update product status.");
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete product "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        fetchProducts();
      } else {
        alert(data.error || "Failed to delete product.");
      }
    } catch {
      alert("Error deleting product.");
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === "all" || p.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest block mb-1">
            Product Catalogue Management
          </span>
          <h1 className="text-3xl font-extrabold font-heading text-white">Products ({filteredProducts.length})</h1>
        </div>

        <Link
          href="/admin/products/new"
          className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Toolbar & Filter */}
      <div className="bg-slate-900 border border-slate-800 p-4 sm:p-6 rounded-3xl shadow-xl flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, slug, specs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:ring-2 focus:ring-sky-500 outline-none"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          <span className="text-xs font-mono text-slate-400 font-bold uppercase">Category:</span>
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950 text-slate-400 font-mono uppercase border-b border-slate-800">
              <tr>
                <th className="p-4">Sort</th>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Availability</th>
                <th className="p-4">Variants</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredProducts.map((p, idx) => (
                <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-mono text-slate-400 font-bold">
                    #{String(idx + 1).padStart(2, "0")}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shrink-0">
                        <Image src={p.image} alt={p.name} fill className="object-contain p-1" />
                      </div>
                      <div>
                        <Link
                          href={`/products/${p.slug}`}
                          target="_blank"
                          className="font-bold text-white hover:text-sky-400 transition-colors text-sm"
                        >
                          {p.name}
                        </Link>
                        <div className="text-[11px] text-slate-400 font-mono">/products/{p.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded bg-slate-950 text-slate-300 border border-slate-800 font-medium">
                      {p.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold text-[10px] uppercase tracking-wider inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>In Stock</span>
                    </span>
                  </td>
                  <td className="p-4 text-slate-300 font-mono">
                    {p.subcategories?.length || 0} Variants
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/products/${p.slug}`}
                        target="_blank"
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                        title="View Public Page"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="p-2 bg-sky-950 hover:bg-sky-900 text-sky-400 rounded-lg transition-colors border border-sky-800"
                        title="Edit Product"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDeleteProduct(p.id, p.name)}
                        className="p-2 bg-red-950 hover:bg-red-900 text-red-400 rounded-lg transition-colors border border-red-800 cursor-pointer"
                        title="Delete Product"
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
      </div>
    </div>
  );
}
