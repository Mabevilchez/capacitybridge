import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export type Lead = {
  id?: string;
  full_name: string;
  email: string;
  company: string;
  role?: string;
  industry?: string;
  country?: string;
  interest_type: string;
  expected_timing?: string;
  message?: string;
  consent: boolean;
  source?: string;
  created_at?: string;
};

export type CustomerProject = {
  id?: string;
  project_name: string;
  part_name: string;
  project_description?: string;
  intended_application?: string;
  industry?: string;
  project_type?: string;
  quantity?: number;
  technology?: string;
  material?: string;
  dimensions?: string;
  tolerance?: string;
  surface_finish?: string;
  post_processing?: string[];
  certifications?: string[];
  delivery_date?: string;
  delivery_location?: string;
  confidentiality_level: string;
  nda_requirement?: string;
  cad_visibility?: string;
  hide_company_identity?: boolean;
  hide_project_name?: boolean;
  additional_confidentiality_notes?: string;
  customer_name: string;
  customer_company: string;
  customer_email: string;
  customer_phone?: string;
  status?: string;
  created_at?: string;
};

export type Supplier = {
  id?: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone?: string;
  website?: string;
  company_description?: string;
  address?: string;
  city?: string;
  country: string;
  industries_served?: string[];
  years_experience?: number;
  verification_status?: string;
  nda_capability?: boolean;
  secure_file_process?: boolean;
  created_at?: string;
};
