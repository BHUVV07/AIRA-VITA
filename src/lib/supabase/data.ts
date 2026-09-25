import { createAdminClient } from "./admin";
import { PRODUCTS, Product, COMPANY_INFO } from "@/data/products";

export interface SupabaseCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface SupabaseProduct {
  id: string;
  category_id: string | null;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  primary_image_url: string | null;
  seo_title: string | null;
  seo_description: string | null;
  is_featured: boolean;
  availability_status: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  category?: SupabaseCategory | null;
}

export interface SupabaseEnquiry {
  id: string;
  name: string;
  company: string | null;
  email: string;
  phone: string;
  product_id: string | null;
  product_name: string | null;
  variant_id: string | null;
  variant_name: string | null;
  message: string | null;
  project_type: string | null;
  location: string | null;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  source: string;
  created_at: string;
  updated_at: string;
}

export async function getDbProducts(): Promise<Product[]> {
  try {
    const supabase = createAdminClient();
    const { data: dbProducts, error } = await supabase
      .from("products")
      .select("*, category:categories(*)")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error || !dbProducts || dbProducts.length === 0) {
      return PRODUCTS;
    }

    // Fetch variants and specs for products
    const productIds = dbProducts.map((p) => p.id);

    const { data: dbVariants } = await supabase
      .from("product_variants")
      .select("*")
      .in("product_id", productIds)
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    const { data: dbSpecs } = await supabase
      .from("product_specifications")
      .select("*")
      .in("product_id", productIds)
      .order("sort_order", { ascending: true });

    const { data: dbDocs } = await supabase
      .from("product_documents")
      .select("*")
      .in("product_id", productIds);

    // Map Supabase rows back to Product format
    return dbProducts.map((p) => {
      const fallback = PRODUCTS.find((fp) => fp.slug === p.slug || fp.id === p.id);

      const pVariants = dbVariants?.filter((v) => v.product_id === p.id) || [];
      const pSpecs = dbSpecs?.filter((s) => s.product_id === p.id) || [];
      const pDocs = dbDocs?.filter((d) => d.product_id === p.id) || [];

      const specMap: Record<string, string | number> = {};
      pSpecs.forEach((s) => {
        specMap[s.spec_name] = s.spec_value;
      });

      // Merge fallback specs if DB specs empty
      const specifications = Object.keys(specMap).length > 0 ? specMap : (fallback?.specifications || {});

      const subcategories = pVariants.map((v) => {
        const vSpecs: Record<string, string | number> = {};
        pSpecs
          .filter((s) => s.variant_id === v.id)
          .forEach((s) => {
            vSpecs[s.spec_name] = s.spec_value;
          });

        const fallbackSub = fallback?.subcategories?.find((sc) => sc.slug === v.slug || sc.name === v.name);

        return {
          id: v.id,
          slug: v.slug || v.name.toLowerCase().replace(/\s+/g, "-"),
          name: v.name,
          model: v.code || fallbackSub?.model,
          temperature: v.temperature || fallbackSub?.temperature,
          subtitle: v.description || fallbackSub?.subtitle,
          description: v.description || fallbackSub?.description,
          image: v.image_url || p.primary_image_url || fallbackSub?.image || "/images/products/car.png",
          isComingSoon: false,
          applications: fallbackSub?.applications || fallback?.applications || [],
          features: fallbackSub?.features || fallback?.features || [],
          standards: fallbackSub?.standards || fallback?.standards || [],
          specifications: Object.keys(vSpecs).length > 0 ? vSpecs : (fallbackSub?.specifications || {}),
          models: fallbackSub?.models || [],
        };
      });

      return {
        id: p.id,
        slug: p.slug,
        name: p.name,
        fullName: fallback?.fullName,
        subtitle: p.short_description || fallback?.subtitle || "",
        category: p.category?.name || fallback?.category || p.name,
        shortDescription: p.short_description || fallback?.shortDescription || "",
        description: p.description || fallback?.description || "",
        image: p.primary_image_url || fallback?.image || "/images/products/car.png",
        featured: p.is_featured,
        badges: fallback?.badges || (p.availability_status === "in_stock" ? ["In Stock"] : []),
        applications: fallback?.applications || [],
        features: fallback?.features || [],
        standards: fallback?.standards || [],
        specifications,
        subcategories: subcategories.length > 0 ? subcategories : (fallback?.subcategories || []),
        models: fallback?.models || [],
        technicalDocuments: pDocs.length > 0 ? pDocs.map((d) => ({
          id: d.id,
          title: d.name,
          type: (d.file_type as "Technical Data Sheet" | "Product Catalogue" | "Performance Data" | "Installation Manual") || "Technical Data Sheet",
          fileSize: d.file_size || "1.0 MB",
          format: "PDF",
        })) : (fallback?.technicalDocuments || []),
        seoTitle: p.seo_title || fallback?.seoTitle,
        seoDescription: p.seo_description || fallback?.seoDescription,
        seoKeywords: fallback?.seoKeywords || [],
      };
    });
  } catch (err) {
    console.warn("Supabase fetch fallback to local dataset:", err);
    return PRODUCTS;
  }
}

export async function getDbCategories(): Promise<SupabaseCategory[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return [
        { id: "c1", name: "Fire Retardent Canvas", slug: "fire-retardent-canvas", description: null, image_url: null, sort_order: 10, is_active: true },
        { id: "c2", name: "Disc Valves", slug: "disc-valves", description: null, image_url: null, sort_order: 20, is_active: true },
        { id: "c3", name: "Air Curtain", slug: "air-curtain", description: null, image_url: null, sort_order: 30, is_active: true },
        { id: "c4", name: "Flexible Duct", slug: "flexible-duct", description: null, image_url: null, sort_order: 40, is_active: true },
        { id: "c5", name: "CAR", slug: "car", description: null, image_url: null, sort_order: 50, is_active: true },
      ];
    }
    return data;
  } catch {
    return [
      { id: "c1", name: "Fire Retardent Canvas", slug: "fire-retardent-canvas", description: null, image_url: null, sort_order: 10, is_active: true },
      { id: "c2", name: "Disc Valves", slug: "disc-valves", description: null, image_url: null, sort_order: 20, is_active: true },
      { id: "c3", name: "Air Curtain", slug: "air-curtain", description: null, image_url: null, sort_order: 30, is_active: true },
      { id: "c4", name: "Flexible Duct", slug: "flexible-duct", description: null, image_url: null, sort_order: 40, is_active: true },
      { id: "c5", name: "CAR", slug: "car", description: null, image_url: null, sort_order: 50, is_active: true },
    ];
  }
}

export async function getSiteSettings() {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase.from("site_settings").select("*").eq("key", "company_info").single();
    if (data && data.value) {
      return data.value;
    }
  } catch {
    // fallback
  }
  return {
    name: COMPANY_INFO.name,
    tagline: COMPANY_INFO.tagline,
    email: COMPANY_INFO.contact.email,
    phone: COMPANY_INFO.contact.formattedPhone,
    whatsapp_number: process.env.WHATSAPP_PHONE_NUMBER || "+919342050097",
    website: COMPANY_INFO.contact.website,
    distributor_name: COMPANY_INFO.distributor.name,
    distributor_location: COMPANY_INFO.distributor.location,
    distributor_address: COMPANY_INFO.distributor.address,
  };
}
