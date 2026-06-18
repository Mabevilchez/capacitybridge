import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

interface Lead {
  id: string;
  full_name: string;
  email: string;
  company?: string;
  interest_type: string;
  created_at: string;
  source?: string;
}

interface CustomerProject {
  id: string;
  project_name: string;
  full_name: string;
  email: string;
  company_name?: string;
  industry?: string;
  status?: string;
  created_at: string;
}

interface Supplier {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  city?: string;
  country?: string;
  verification_status?: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'leads' | 'projects' | 'suppliers'>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projects, setProjects] = useState<CustomerProject[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  useEffect(() => {
    if (isAuthenticated && isSupabaseConfigured) {
      loadData();
    }
  }, [isAuthenticated, activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'leads') {
        const { data } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });
        setLeads(data || []);
      } else if (activeTab === 'projects') {
        const { data } = await supabase
          .from('customer_projects')
          .select('id, project_name, full_name, email, company_name, industry, status, created_at')
          .order('created_at', { ascending: false });
        setProjects(data || []);
      } else if (activeTab === 'suppliers') {
        const { data } = await supabase
          .from('suppliers')
          .select('id, company_name, contact_name, email, city, country, verification_status, created_at')
          .order('created_at', { ascending: false });
        setSuppliers(data || []);
      }
    } catch (err) {
      console.error('Error loading data:', err);
    }
    setLoading(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1 text-sm">CapacityBridge — Restricted Access</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter admin password"
                required
              />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Sign In
            </button>
          </form>
          <p className="text-center text-xs text-gray-400 mt-4">
            This area is restricted to CapacityBridge administrators only.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">CapacityBridge Admin</h1>
          <p className="text-sm text-gray-500">Early Access Dashboard</p>
        </div>
        <button
          onClick={() => setIsAuthenticated(false)}
          className="text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg px-4 py-2"
        >
          Sign out
        </button>
      </div>

      {!isSupabaseConfigured && (
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-3">
          <p className="text-sm text-amber-800">
            <strong>Note:</strong> Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables in Vercel to enable data loading.
          </p>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 bg-white rounded-xl shadow-sm border border-gray-200 p-1 mb-6 w-fit">
          {(['leads', 'projects', 'suppliers'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab === 'leads' ? 'Early Access Leads' : tab === 'projects' ? 'Project Requests' : 'Supplier Applications'}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : !isSupabaseConfigured ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500 mb-2">Database not configured</p>
            <p className="text-sm text-gray-400">Connect Supabase to view submissions</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {activeTab === 'leads' && (
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Email</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Company</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Interest</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Source</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {leads.length === 0 ? (
                    <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">No leads yet</td></tr>
                  ) : leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{lead.full_name}</td>
                      <td className="px-4 py-3 text-gray-600">{lead.email}</td>
                      <td className="px-4 py-3 text-gray-600">{lead.company || '—'}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">{lead.interest_type}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{lead.source || '—'}</td>
                      <td className="px-4 py-3 text-gray-500">{formatDate(lead.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {activeTab === 'projects' && (
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Project</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Contact</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Company</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Industry</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {projects.length === 0 ? (
                    <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">No project requests yet</td></tr>
                  ) : projects.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{p.project_name}</td>
                      <td className="px-4 py-3 text-gray-600">{p.full_name}</td>
                      <td className="px-4 py-3 text-gray-600">{p.company_name || '—'}</td>
                      <td className="px-4 py-3 text-gray-500">{p.industry || '—'}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs">{p.status || 'new'}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{formatDate(p.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {activeTab === 'suppliers' && (
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Company</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Contact</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Email</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Location</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {suppliers.length === 0 ? (
                    <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">No supplier applications yet</td></tr>
                  ) : suppliers.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{s.company_name}</td>
                      <td className="px-4 py-3 text-gray-600">{s.contact_name}</td>
                      <td className="px-4 py-3 text-gray-600">{s.email}</td>
                      <td className="px-4 py-3 text-gray-500">{[s.city, s.country].filter(Boolean).join(', ') || '—'}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-xs">{s.verification_status || 'pending'}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{formatDate(s.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
