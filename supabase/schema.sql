-- CapacityBridge Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLE: leads
-- ============================================================
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  role TEXT,
  industry TEXT,
  country TEXT,
  interest_type TEXT NOT NULL,
  expected_timing TEXT,
  message TEXT,
  consent BOOLEAN NOT NULL DEFAULT FALSE,
  source TEXT DEFAULT 'website',
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: customer_projects
-- ============================================================
CREATE TABLE IF NOT EXISTS customer_projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_name TEXT NOT NULL,
  part_name TEXT NOT NULL,
  project_description TEXT,
  intended_application TEXT,
  industry TEXT,
  project_type TEXT,
  quantity INTEGER,
  technology TEXT,
  material TEXT,
  dimensions TEXT,
  tolerance TEXT,
  surface_finish TEXT,
  post_processing TEXT[],
  certifications TEXT[],
  delivery_date DATE,
  delivery_location TEXT,
  confidentiality_level TEXT NOT NULL DEFAULT 'restricted',
  nda_requirement TEXT,
  cad_visibility TEXT,
  hide_company_identity BOOLEAN DEFAULT FALSE,
  hide_project_name BOOLEAN DEFAULT FALSE,
  additional_confidentiality_notes TEXT,
  customer_name TEXT NOT NULL,
  customer_company TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: suppliers
-- ============================================================
CREATE TABLE IF NOT EXISTS suppliers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  company_description TEXT,
  address TEXT,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  industries_served TEXT[],
  years_experience INTEGER,
  verification_status TEXT DEFAULT 'pending',
  nda_capability BOOLEAN DEFAULT FALSE,
  secure_file_process BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: supplier_machines
-- ============================================================
CREATE TABLE IF NOT EXISTS supplier_machines (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  supplier_id UUID REFERENCES suppliers(id) ON DELETE CASCADE,
  manufacturer TEXT,
  model TEXT,
  technology TEXT,
  build_volume TEXT,
  materials TEXT[],
  layer_thickness TEXT,
  accuracy TEXT,
  maximum_dimensions TEXT,
  installation_year INTEGER,
  utilisation INTEGER,
  available_capacity TEXT,
  calibration_status TEXT DEFAULT 'current',
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: supplier_services
-- ============================================================
CREATE TABLE IF NOT EXISTS supplier_services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  supplier_id UUID REFERENCES suppliers(id) ON DELETE CASCADE,
  service_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: supplier_certifications
-- ============================================================
CREATE TABLE IF NOT EXISTS supplier_certifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  supplier_id UUID REFERENCES suppliers(id) ON DELETE CASCADE,
  certification_name TEXT NOT NULL,
  certificate_url TEXT,
  expiry_date DATE,
  verification_status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplier_machines ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplier_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplier_certifications ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- LEADS POLICIES
-- Public: INSERT only (anyone can submit a lead)
-- Read/Update/Delete: authenticated admins only
-- ============================================================
CREATE POLICY "Public can insert leads"
  ON leads FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Admins can read all leads"
  ON leads FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can update leads"
  ON leads FOR UPDATE
  TO authenticated
  USING (true);

-- ============================================================
-- CUSTOMER_PROJECTS POLICIES
-- Public: INSERT only
-- Read/Update: authenticated admins only
-- ============================================================
CREATE POLICY "Public can insert project interests"
  ON customer_projects FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Admins can read all projects"
  ON customer_projects FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can update projects"
  ON customer_projects FOR UPDATE
  TO authenticated
  USING (true);

-- ============================================================
-- SUPPLIERS POLICIES
-- Public: INSERT only (supplier application)
-- Read/Update: authenticated admins only
-- ============================================================
CREATE POLICY "Public can insert supplier applications"
  ON suppliers FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Admins can read all suppliers"
  ON suppliers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can update supplier status"
  ON suppliers FOR UPDATE
  TO authenticated
  USING (true);

-- ============================================================
-- SUPPLIER_MACHINES POLICIES
-- Public: INSERT only (when submitting supplier application)
-- Read: authenticated admins only
-- ============================================================
CREATE POLICY "Public can insert supplier machines"
  ON supplier_machines FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Admins can read supplier machines"
  ON supplier_machines FOR SELECT
  TO authenticated
  USING (true);

-- ============================================================
-- SUPPLIER_SERVICES POLICIES
-- ============================================================
CREATE POLICY "Public can insert supplier services"
  ON supplier_services FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Admins can read supplier services"
  ON supplier_services FOR SELECT
  TO authenticated
  USING (true);

-- ============================================================
-- SUPPLIER_CERTIFICATIONS POLICIES
-- ============================================================
CREATE POLICY "Public can insert supplier certifications"
  ON supplier_certifications FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Admins can read supplier certifications"
  ON supplier_certifications FOR SELECT
  TO authenticated
  USING (true);

-- ============================================================
-- STORAGE SETUP (run separately in Supabase dashboard)
-- ============================================================
-- Create a PRIVATE bucket named 'project-files' for CAD uploads
-- Never create a public bucket for sensitive project files
-- Access should be controlled via signed URLs only
-- File size limit: 100MB per file
-- Allowed extensions: .step, .stp, .stl, .3mf, .obj, .pdf, .zip

-- ============================================================
-- INDEXES for performance
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_interest_type ON leads(interest_type);
CREATE INDEX IF NOT EXISTS idx_projects_status ON customer_projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_confidentiality ON customer_projects(confidentiality_level);
CREATE INDEX IF NOT EXISTS idx_suppliers_verification ON suppliers(verification_status);
CREATE INDEX IF NOT EXISTS idx_supplier_machines_supplier ON supplier_machines(supplier_id);
CREATE INDEX IF NOT EXISTS idx_supplier_services_supplier ON supplier_services(supplier_id);
CREATE INDEX IF NOT EXISTS idx_supplier_certs_supplier ON supplier_certifications(supplier_id);
