/**
 * Types générés pour la base de données Supabase CBDL
 * Tables: news, partnerships, profiles, audit_log
 */

export type UserRole = "admin" | "editor";
export type AuditAction = "create" | "update" | "delete";

export interface Database {
  public: {
    Tables: {
      news: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string | null;
          image_url: string | null;
          image_alt: string | null;
          gallery: string[];
          tags: string[];
          seo_title: string | null;
          seo_description: string | null;
          og_image: string | null;
          published_at: string | null;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt?: string | null;
          content?: string | null;
          image_url?: string | null;
          image_alt?: string | null;
          gallery?: string[];
          tags?: string[];
          seo_title?: string | null;
          seo_description?: string | null;
          og_image?: string | null;
          published_at?: string | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string | null;
          content?: string | null;
          image_url?: string | null;
          image_alt?: string | null;
          gallery?: string[];
          tags?: string[];
          seo_title?: string | null;
          seo_description?: string | null;
          og_image?: string | null;
          published_at?: string | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      partnerships: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          logo_url: string | null;
          website_url: string | null;
          category: string | null;
          display_order: number;
          is_active: boolean;
          color: string | null;
          icon_name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          logo_url?: string | null;
          website_url?: string | null;
          category?: string | null;
          display_order?: number;
          is_active?: boolean;
          color?: string | null;
          icon_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          logo_url?: string | null;
          website_url?: string | null;
          category?: string | null;
          display_order?: number;
          is_active?: boolean;
          color?: string | null;
          icon_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          role: UserRole;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          full_name?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
      };
      audit_log: {
        Row: {
          id: number;
          actor_id: string | null;
          actor_email: string | null;
          action: AuditAction;
          entity: string;
          entity_id: string | null;
          entity_label: string | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          actor_id?: string | null;
          actor_email?: string | null;
          action: AuditAction;
          entity: string;
          entity_id?: string | null;
          entity_label?: string | null;
          created_at?: string;
        };
        Update: never;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// Types utilitaires pour faciliter l'usage
export type News = Database['public']['Tables']['news']['Row'];
export type NewsInsert = Database['public']['Tables']['news']['Insert'];
export type NewsUpdate = Database['public']['Tables']['news']['Update'];

export type Partnership = Database['public']['Tables']['partnerships']['Row'];
export type PartnershipInsert = Database['public']['Tables']['partnerships']['Insert'];
export type PartnershipUpdate = Database['public']['Tables']['partnerships']['Update'];

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type AuditEntry = Database['public']['Tables']['audit_log']['Row'];

