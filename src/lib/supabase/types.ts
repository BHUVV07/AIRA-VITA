export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          image_url?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          image_url?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
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
        };
        Insert: {
          id?: string;
          category_id?: string | null;
          name: string;
          slug: string;
          short_description?: string | null;
          description?: string | null;
          primary_image_url?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          is_featured?: boolean;
          availability_status?: string;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          category_id?: string | null;
          name?: string;
          slug?: string;
          short_description?: string | null;
          description?: string | null;
          primary_image_url?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          is_featured?: boolean;
          availability_status?: string;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      product_variants: {
        Row: {
          id: string;
          product_id: string;
          name: string;
          code: string | null;
          slug: string | null;
          description: string | null;
          image_url: string | null;
          temperature: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          name: string;
          code?: string | null;
          slug?: string | null;
          description?: string | null;
          image_url?: string | null;
          temperature?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          name?: string;
          code?: string | null;
          slug?: string | null;
          description?: string | null;
          image_url?: string | null;
          temperature?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      product_specifications: {
        Row: {
          id: string;
          product_id: string;
          variant_id: string | null;
          spec_name: string;
          spec_value: string;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          variant_id?: string | null;
          spec_name: string;
          spec_value: string;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          variant_id?: string | null;
          spec_name?: string;
          spec_value?: string;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      product_images: {
        Row: {
          id: string;
          product_id: string;
          variant_id: string | null;
          image_url: string;
          alt_text: string | null;
          sort_order: number;
          is_primary: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          variant_id?: string | null;
          image_url: string;
          alt_text?: string | null;
          sort_order?: number;
          is_primary?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          variant_id?: string | null;
          image_url?: string;
          alt_text?: string | null;
          sort_order?: number;
          is_primary?: boolean;
          created_at?: string;
        };
      };
      product_documents: {
        Row: {
          id: string;
          product_id: string;
          variant_id: string | null;
          name: string;
          file_url: string;
          file_type: string;
          file_size: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          variant_id?: string | null;
          name: string;
          file_url: string;
          file_type?: string;
          file_size?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          variant_id?: string | null;
          name?: string;
          file_url?: string;
          file_type?: string;
          file_size?: string | null;
          created_at?: string;
        };
      };
      enquiries: {
        Row: {
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
        };
        Insert: {
          id?: string;
          name: string;
          company?: string | null;
          email: string;
          phone: string;
          product_id?: string | null;
          product_name?: string | null;
          variant_id?: string | null;
          variant_name?: string | null;
          message?: string | null;
          project_type?: string | null;
          location?: string | null;
          status?: 'new' | 'contacted' | 'qualified' | 'closed';
          source?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          company?: string | null;
          email?: string;
          phone?: string;
          product_id?: string | null;
          product_name?: string | null;
          variant_id?: string | null;
          variant_name?: string | null;
          message?: string | null;
          project_type?: string | null;
          location?: string | null;
          status?: 'new' | 'contacted' | 'qualified' | 'closed';
          source?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      admin_profiles: {
        Row: {
          id: string;
          user_id: string;
          role: 'admin' | 'editor';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          role?: 'admin' | 'editor';
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          role?: 'admin' | 'editor';
          created_at?: string;
        };
      };
      site_settings: {
        Row: {
          id: string;
          key: string;
          value: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          value: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          key?: string;
          value?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      is_admin: {
        Args: { user_uid: string };
        Returns: boolean;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
