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
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest block mb-1">
            Category Management
          </span>
          <h1 className="text-3xl font-extrabold font-heading text-white">Categories ({categories.length})</h1>
        </div>

        <button
          onClick={() => setShowAdd(!showAdd)}
          className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleCreateCategory} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
          <h2 className="text-base font-bold text-white border-b border-slate-800 pb-2">Create New Category</h2>
          {error && <p className="text-xs text-red-400">{error}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
            <div>
              <label className="block text-slate-300 font-bold mb-1 uppercase">Category Name *</label>
              <input
                type="text"
                required
                value={newCat.name}
                onChange={handleNameChange}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1 uppercase">Slug *</label>
              <input
                type="text"
                required
                value={newCat.slug}
                onChange={(e) => setNewCat({ ...newCat, slug: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowAdd(false)}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold shadow-md"
            >
              Save Category
            </button>
          </div>
        </form>
      )}

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-950 text-slate-400 font-mono uppercase border-b border-slate-800">
            <tr>
              <th className="p-4">Sort</th>
              <th className="p-4">Category Name</th>
              <th className="p-4">Slug</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {categories.map((c, idx) => (
              <tr key={c.id} className="hover:bg-slate-800/40">
                <td className="p-4 font-mono font-bold text-slate-400">#{c.sort_order || (idx + 1) * 10}</td>
                <td className="p-4 font-bold text-white text-sm">{c.name}</td>
                <td className="p-4 font-mono text-sky-400">{c.slug}</td>
                <td className="p-4">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] uppercase font-bold">
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
