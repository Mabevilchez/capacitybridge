import { createClient } from '@supabase/supabase-js';

// Fallback values prevent crash when env vars are not set
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const isSupabaseConfigured =
  !!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY;

// Database types
export interface Lead {
  id?: string;
  full_name: string;
  email: string;
  company?: string;
  role?: string;
  industry?: string;
  country?: string;
  interest_type: 'customer' | 'supplier' | 'both' | 'other';
  expected_timing?: string;
  message?: string;
  consent: boolean;
  source?: string;
  created_at?: string;
}

export interface CustomerProject {
  id?: string;
  project_name: string;
  part_name?: string;
  part_description?: string;
  application?: string;
  industry?: string;
  project_type?: string;
  quantity?: number;
  delivery_date?: string;
  delivery_location?: string;
  technology?: string[];
  material?: string;
  dimensions?: string;
  tolerance?: string;
  surface_finish?: string;
  confidentiality_level: 'standard' | 'restricted' | 'highly_confidential';
  nda_required?: boolean;
  hide_company_identity?: boolean;
  full_name: string;
  company_name?: string;
  email: string;
  phone?: string;
  job_title?: string;
  website?: string;
  country?: string;
  consent: boolean;
  status?: string;
  created_at?: string;
}

export interface Supplier {
  id?: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone?: string;
  website?: string;
  company_description?: string;
  address?: string;
  city?: string;
  country?: string;
  years_experience?: number;
  nda_capability?: boolean;
  secure_file_process?: boolean;
  verification_status?: string;
  consent: boolean;
  created_at?: string;
}
