import { PRODUCTS as MAIN_PRODUCTS, COMPANY_INFO as MAIN_COMPANY_INFO, INDUSTRIES as MAIN_INDUSTRIES } from "./products";

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: string;
  description: string;
  image: string;
  applications: string[];
  features: string[];
  standards?: string[];
  specifications: Record<string, string | number>;
  models?: Array<{
    name: string;
    size?: string;
    weight?: string;
    airflowRange?: string;
    application?: string;
    soundLevel?: string;
    bodyMaterial?: string;
  }>;
  subcategories?: Array<{
    id: string;
    slug: string;
    name: string;
    subtitle?: string;
    description?: string;
    image?: string;
    isComingSoon?: boolean;
  }>;
}

export interface IndustryItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  keyProducts: string[];
  complianceNotes?: string;
}

export interface TechnicalResource {
  id: string;
  title: string;
  product: string;
  type: "Product Catalogues" | "Technical Data Sheets" | "Performance Data" | "Installation Information";
  fileSize: string;
  format: "PDF";
  updatedDate: string;
}

export const COMPANY_INFO = MAIN_COMPANY_INFO;

export const PRODUCTS: ProductItem[] = MAIN_PRODUCTS.map((p) => ({
  id: p.id,
  slug: p.slug,
  name: p.name,
  subtitle: p.subtitle,
  category: p.category,
  description: p.description,
  image: p.image,
  applications: p.applications || [],
  features: p.features || [],
  standards: p.standards,
  specifications: (p.specifications as Record<string, string | number>) || {},
  models: p.models,
  subcategories: p.subcategories?.map((sc) => ({
    id: sc.id,
    slug: sc.slug,
    name: sc.name,
    subtitle: sc.subtitle,
    description: sc.description,
    image: sc.image,
    isComingSoon: sc.isComingSoon,
  })),
}));

export const INDUSTRIES: IndustryItem[] = MAIN_INDUSTRIES.map((ind) => ({
  id: ind.id,
  slug: ind.slug,
  name: ind.name,
  description: ind.description,
  image: ind.image,
  keyProducts: ind.keyProducts,
}));

export const TECHNICAL_RESOURCES: TechnicalResource[] = [
  {
    id: "res-01",
    title: "Aria Vita Master Air Distribution Technical Catalogue",
    product: "All Products",
    type: "Product Catalogues",
    fileSize: "4.2 MB",
    format: "PDF",
    updatedDate: "2026-01-15",
  },
  {
    id: "res-02",
    title: "CAR Constant Airflow Regulator Sizing & Performance Curves",
    product: "CAR",
    type: "Performance Data",
    fileSize: "1.8 MB",
    format: "PDF",
    updatedDate: "2026-02-10",
  },
  {
    id: "res-03",
    title: "Fire Retardent Canvas Safety & Test Compliance Datasheet",
    product: "Fire Retardent Canvas",
    type: "Technical Data Sheets",
    fileSize: "1.1 MB",
    format: "PDF",
    updatedDate: "2025-11-20",
  },
  {
    id: "res-04",
    title: "Disc Valves Airflow & Sound Level Manual",
    product: "Disc Valves",
    type: "Technical Data Sheets",
    fileSize: "950 KB",
    format: "PDF",
    updatedDate: "2026-01-05",
  },
  {
    id: "res-05",
    title: "Non-Insulated Flexible Duct Installation & Radius Guidelines",
    product: "Flexible Duct",
    type: "Installation Information",
    fileSize: "1.4 MB",
    format: "PDF",
    updatedDate: "2025-12-18",
  },
  {
    id: "res-06",
    title: "Air Curtain Selection Matrix & Specs",
    product: "Air Curtain",
    type: "Product Catalogues",
    fileSize: "2.6 MB",
    format: "PDF",
    updatedDate: "2026-02-28",
  },
];
