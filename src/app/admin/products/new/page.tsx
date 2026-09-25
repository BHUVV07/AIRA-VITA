"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Upload,
  Plus,
  Trash2,
  Save,
  AlertCircle,
} from "lucide-react";

interface AdminCategorySimple {
  id: string;
  name: string;
}

export default function NewProductPage() {
  const router = useRouter();

  const [categories, setCategories] = useState<AdminCategorySimple[]>([]);
  const [loading, setLoading] = useState(false);
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
  });

  const [variants, setVariants] = useState<
    { name: string; code: string; description: string; temperature: string }[]
  >([]);

  const [specs, setSpecs] = useState<{ spec_name: string; spec_value: string }[]>(
    [
      { spec_name: "Mounting", spec_value: "Ceiling & Wall Mounting" },
      { spec_name: "Fire Safety Standards", spec_value: "BS 476 Part 7 / ASTM E84 / UL 94" },
    ]
  );

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("/api/admin/categories");
        const data = await res.json();
        if (data.categories) {
          setCategories(data.categories);
          if (data.categories.length > 0) {
            setFormData((prev) => ({ ...prev, category_id: data.categories[0].id }));
          }
        }
      } catch (err) {
        console.error("Load categories error:", err);
      }
    }
    loadCategories();
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameVal = e.target.value;
    const generatedSlug = nameVal
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    setFormData({
      ...formData,
      name: nameVal,
      slug: generatedSlug,
      seo_title: `${nameVal} | Aria Vita`,
    });
  };

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

  const addVariant = () => {
    setVariants([...variants, { name: "", code: "", description: "", temperature: "" }]);
  };

  const removeVariant = (idx: number) => {
    setVariants(variants.filter((_, i) => i !== idx));
  };

  const addSpec = () => {
    setSpecs([...specs, { spec_name: "", spec_value: "" }]);
  };

  const removeSpec = (idx: number) => {
    setSpecs(specs.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          variants,
          specifications: specs,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Failed to create product.");
        setLoading(false);
        return;
      }

      router.push("/admin/products");
      router.refresh();
    } catch {
      setError("Server error creating product.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
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
            <h1 className="text-2xl font-extrabold font-heading text-white">Add New Product</h1>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-950/80 border border-red-800 rounded-2xl text-xs text-red-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Product Form */}
      <form onSubmit={handleSubmit} className="space-y-8 text-xs font-sans">
        {/* Core Product Information */}
        <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl">
          <h2 className="text-lg font-bold font-heading text-white border-b border-slate-800 pb-3">
            1. Core Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Product Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Constant Airflow Regulator"
                value={formData.name}
                onChange={handleNameChange}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-sky-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Product Slug *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. constant-airflow-regulator"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:ring-2 focus:ring-sky-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Category *
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
                Sort Order (Display Priority)
              </label>
              <input
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Short Tagline / Subtitle
            </label>
            <input
              type="text"
              placeholder="e.g. Maintain consistent airflow despite duct pressure fluctuations."
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
              placeholder="Detailed engineering technical overview..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none resize-none"
            />
          </div>

          {/* Image Path / Upload */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Primary Product Image
            </label>
            <div className="flex flex-col sm:flex-row gap-3 items-center">
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

        {/* Variants Section */}
        <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-lg font-bold font-heading text-white">2. Product Variants</h2>
            <button
              type="button"
              onClick={addVariant}
              className="px-3 py-1.5 bg-sky-950 text-sky-400 border border-sky-800 rounded-lg text-xs font-bold hover:bg-sky-900 inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Variant</span>
            </button>
          </div>

          {variants.length === 0 ? (
            <p className="text-slate-400 text-xs py-2">No variants added yet. Click &quot;Add Variant&quot; above.</p>
          ) : (
            <div className="space-y-3">
              {variants.map((v, idx) => (
                <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs text-sky-400 font-bold">Variant #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeVariant(idx)}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Variant Name (e.g. Stainless Steel)"
                      value={v.name}
                      onChange={(e) => {
                        const updated = [...variants];
                        updated[idx].name = e.target.value;
                        setVariants(updated);
                      }}
                      className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Code (e.g. AACS)"
                      value={v.code}
                      onChange={(e) => {
                        const updated = [...variants];
                        updated[idx].code = e.target.value;
                        setVariants(updated);
                      }}
                      className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Temp Rating (e.g. 250°C)"
                      value={v.temperature}
                      onChange={(e) => {
                        const updated = [...variants];
                        updated[idx].temperature = e.target.value;
                        setVariants(updated);
                      }}
                      className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Specifications Section */}
        <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-lg font-bold font-heading text-white">3. Specifications</h2>
            <button
              type="button"
              onClick={addSpec}
              className="px-3 py-1.5 bg-sky-950 text-sky-400 border border-sky-800 rounded-lg text-xs font-bold hover:bg-sky-900 inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Specification</span>
            </button>
          </div>

          <div className="space-y-2">
            {specs.map((s, idx) => (
              <div key={idx} className="flex gap-3 items-center">
                <input
                  type="text"
                  placeholder="Spec Name (e.g. Diameter)"
                  value={s.spec_name}
                  onChange={(e) => {
                    const updated = [...specs];
                    updated[idx].spec_name = e.target.value;
                    setSpecs(updated);
                  }}
                  className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
                />
                <input
                  type="text"
                  placeholder="Spec Value (e.g. 50–200 dia)"
                  value={s.spec_value}
                  onChange={(e) => {
                    const updated = [...specs];
                    updated[idx].spec_value = e.target.value;
                    setSpecs(updated);
                  }}
                  className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeSpec(idx)}
                  className="text-red-400 hover:text-red-300 p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Information */}
        <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-4 shadow-xl">
          <h2 className="text-lg font-bold font-heading text-white border-b border-slate-800 pb-3">
            4. SEO Meta Configuration
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                SEO Title
              </label>
              <input
                type="text"
                value={formData.seo_title}
                onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                SEO Description
              </label>
              <textarea
                rows={3}
                value={formData.seo_description}
                onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="pt-4 flex items-center justify-end gap-4 border-t border-slate-800">
          <Link
            href="/admin/products"
            className="px-5 py-2.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white text-xs font-bold rounded-xl transition-all shadow-lg inline-flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? "Saving Product..." : "Save Product to Catalogue"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
