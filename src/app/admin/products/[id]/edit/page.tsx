"use client";

import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Upload,
  Save,
  AlertCircle,
} from "lucide-react";
import { Product } from "@/data/products";

interface AdminCategorySimple {
  id: string;
  name: string;
}

interface Context {
  params: Promise<{ id: string }>;
}

export default function EditProductPage({ params }: Context) {
  const resolvedParams = use(params);
  const router = useRouter();

  const [categories, setCategories] = useState<AdminCategorySimple[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category_id: "",
    short_description: "",
    description: "",
    primary_image_url: "/images/products/car.png",
    seo_title: "",
    seo_description: "",
    is_featured: true,
    availability_status: "in_stock",
    sort_order: 10,
    is_active: true,
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [cRes, pRes] = await Promise.all([
          fetch("/api/admin/categories"),
          fetch("/api/admin/products"),
        ]);
        const cData = await cRes.json();
        const pData = await pRes.json();

        if (cData.categories) setCategories(cData.categories);

        const found = pData.products?.find((p: Product) => p.id === resolvedParams.id);
        if (found) {
          setFormData({
            name: found.name || "",
            slug: found.slug || "",
            category_id: found.category_id || "",
            short_description: found.shortDescription || found.subtitle || "",
            description: found.description || "",
            primary_image_url: found.image || "/images/products/car.png",
            seo_title: found.seoTitle || "",
            seo_description: found.seoDescription || "",
            is_featured: found.featured ?? true,
            availability_status: found.availability_status || "in_stock",
            sort_order: found.sort_order || 10,
            is_active: true,
          });
        }
      } catch (err) {
        console.error("Load product edit error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [resolvedParams.id]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("bucket", "product-images");

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        setFormData({ ...formData, primary_image_url: result.url });
      } else {
        alert(result.error || "Image upload failed.");
      }
    } catch {
      alert("Error uploading image file.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/products/${resolvedParams.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Failed to update product.");
        setSaving(false);
        return;
      }

      router.push("/admin/products");
      router.refresh();
    } catch {
      setError("Server error updating product.");
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-slate-400">Loading product details...</div>;
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest block">
              Product Catalogue
            </span>
            <h1 className="text-2xl font-extrabold font-heading text-white">Edit Product</h1>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-950/80 border border-red-800 rounded-2xl text-xs text-red-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 text-xs font-sans">
        <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Product Slug *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Category
              </label>
              <select
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Availability Status
              </label>
              <select
                value={formData.availability_status}
                onChange={(e) => setFormData({ ...formData, availability_status: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none cursor-pointer"
              >
                <option value="in_stock">In Stock</option>
                <option value="out_of_stock">Out of Stock</option>
                <option value="pre_order">Pre-Order</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Short Description / Subtitle
            </label>
            <input
              type="text"
              value={formData.short_description}
              onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Full Product Description
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Primary Image URL
            </label>
            <div className="flex gap-3 items-center">
              <input
                type="text"
                value={formData.primary_image_url}
                onChange={(e) => setFormData({ ...formData, primary_image_url: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none"
              />
              <label className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer inline-flex items-center gap-2">
                <Upload className="w-4 h-4" />
                <span>{uploading ? "Uploading..." : "Upload File"}</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-end gap-4 border-t border-slate-800">
          <Link
            href="/admin/products"
            className="px-5 py-2.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white text-xs font-bold rounded-xl transition-all shadow-lg inline-flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Updating..." : "Update Product"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
