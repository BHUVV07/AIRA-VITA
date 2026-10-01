"use client";

import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";

interface AdminCategoryItem {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  sort_order?: number;
  is_active?: boolean;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<AdminCategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newCat, setNewCat] = useState({ name: "", slug: "", description: "", sort_order: 10 });
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      if (data.categories) setCategories(data.categories);
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
        const res = await fetch("/api/admin/categories");
        const data = await res.json();
        if (active && data.categories) {
          setCategories(data.categories);
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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const slugVal = val.toLowerCase().trim().replace(/\s+/g, "-");
    setNewCat({ ...newCat, name: val, slug: slugVal });
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCat),
      });
      const data = await res.json();
      if (data.success) {
        setShowAdd(false);
        setNewCat({ name: "", slug: "", description: "", sort_order: 10 });
        fetchCategories();
      } else {
        setError(data.error || "Failed to create category.");
      }
    } catch {
      setError("Error creating category.");
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-bold text-sky-700 bg-sky-100 px-3 py-1 rounded-full border border-sky-200 uppercase tracking-wider inline-block mb-2">
            Category Management
          </span>
          <h1 className="text-3xl font-extrabold font-heading text-slate-900">Categories ({categories.length})</h1>
        </div>

        <button
          onClick={() => setShowAdd(!showAdd)}
          className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white rounded-xl text-xs font-bold transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleCreateCategory} className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">Create New Category</h2>
          {error && <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">{error}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
            <div>
              <label className="block text-slate-700 font-bold mb-1 uppercase">Category Name *</label>
              <input
                type="text"
                required
                value={newCat.name}
                onChange={handleNameChange}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-sky-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1 uppercase">Slug *</label>
              <input
                type="text"
                required
                value={newCat.slug}
                onChange={(e) => setNewCat({ ...newCat, slug: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono outline-none"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowAdd(false)}
              className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
            >
              Save Category
            </button>
          </div>
        </form>
      )}

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 text-slate-500 font-mono uppercase border-b border-slate-200">
            <tr>
              <th className="p-4">Sort</th>
              <th className="p-4">Category Name</th>
              <th className="p-4">Slug</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {categories.map((c, idx) => (
              <tr key={c.id} className="hover:bg-sky-50/50 transition-colors">
                <td className="p-4 font-mono font-bold text-slate-400">#{c.sort_order || (idx + 1) * 10}</td>
                <td className="p-4 font-bold text-slate-900 text-sm">{c.name}</td>
                <td className="p-4 font-mono text-sky-700 font-semibold">{c.slug}</td>
                <td className="p-4">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] uppercase font-bold">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
