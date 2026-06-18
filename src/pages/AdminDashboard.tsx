import { useState, useEffect } from 'react';
import { Lock, Users, FolderOpen, Factory, RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/lib/supabase';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'capacitybridge-admin-2024';

type ContactStatus = 'new' | 'contacted' | 'interview_scheduled' | 'qualified' | 'pilot_candidate' | 'not_relevant';

const statusColors: Record<ContactStatus, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  interview_scheduled: 'bg-purple-100 text-purple-800',
  qualified: 'bg-green-100 text-green-800',
  pilot_candidate: 'bg-orange-100 text-orange-800',
  not_relevant: 'bg-gray-100 text-gray-600',
};

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'leads' | 'projects' | 'suppliers'>('leads');
  const [leads, setLeads] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const [leadsRes, projectsRes, suppliersRes] = await Promise.all([
      supabase.from('leads').select('*').order('created_at', { ascending: false }),
      supabase.from('customer_projects').select('*').order('created_at', { ascending: false }),
      supabase.from('suppliers').select('*').order('created_at', { ascending: false }),
    ]);
    if (leadsRes.data) setLeads(leadsRes.data);
    if (projectsRes.data) setProjects(projectsRes.data);
    if (suppliersRes.data) setSuppliers(suppliersRes.data);
    setLoading(false);
  };

  useEffect(() => {
    if (authenticated) fetchData();
  }, [authenticated]);

  const updateLeadStatus = async (id: string, status: string) => {
    await supabase.from('leads').update({ status } as any).eq('id', id);
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  const updateProjectStatus = async (id: string, status: string) => {
    await supabase.from('customer_projects').update({ status }).eq('id', id);
    setProjects(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#0F1F3D] rounded-xl flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#0F1F3D]">Admin Dashboard</h1>
              <p className="text-sm text-[#64748B]">CapacityBridge — Protected access</p>
            </div>
          </div>
          <div className="bg-[#FFF7ED] border border-orange-200 rounded-lg p-3 mb-6">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-[#EA580C] mt-0.5 shrink-0" />
              <p className="text-xs text-[#EA580C]">This dashboard is restricted to authorised CapacityBridge administrators only.</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="admin-pass">Admin Password</Label>
              <Input
                id="admin-pass"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder="Enter admin password"
                className="mt-1"
              />
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
            <Button onClick={handleLogin} className="w-full bg-[#1D4ED8] text-white">
              Access Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'leads', label: 'Leads', icon: Users, count: leads.length },
    { id: 'projects', label: 'Projects', icon: FolderOpen, count: projects.length },
    { id: 'suppliers', label: 'Suppliers', icon: Factory, count: suppliers.length },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-[#0F1F3D] text-white py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">CapacityBridge Admin</h1>
            <p className="text-blue-300 text-xs">Protected dashboard — authorised access only</p>
          </div>
          <Button variant="ghost" size="sm" onClick={fetchData} className="text-white hover:bg-blue-800">
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {tabs.map((tab) => (
            <div key={tab.id} className="bg-white border border-[#E2E8F0] rounded-xl p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#EFF6FF] rounded-lg flex items-center justify-center">
                  <tab.icon className="w-5 h-5 text-[#1D4ED8]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#0F1F3D]">{tab.count}</p>
                  <p className="text-sm text-[#64748B]">{tab.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-[#1D4ED8] text-white' : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#0F1F3D]'}`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Leads Table */}
        {activeTab === 'leads' && (
          <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E2E8F0]">
              <h2 className="font-semibold text-[#0F1F3D]">Early Access Leads</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <tr>
                    <th className="text-left px-4 py-3 text-[#64748B] font-medium">Name</th>
                    <th className="text-left px-4 py-3 text-[#64748B] font-medium">Email</th>
                    <th className="text-left px-4 py-3 text-[#64748B] font-medium">Company</th>
                    <th className="text-left px-4 py-3 text-[#64748B] font-medium">Interest</th>
                    <th className="text-left px-4 py-3 text-[#64748B] font-medium">Country</th>
                    <th className="text-left px-4 py-3 text-[#64748B] font-medium">Date</th>
                    <th className="text-left px-4 py-3 text-[#64748B] font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {leads.length === 0 ? (
                    <tr><td colSpan={7} className="px-4 py-8 text-center text-[#64748B]">No leads yet</td></tr>
                  ) : leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-[#F8FAFC]">
                      <td className="px-4 py-3 font-medium text-[#0F1F3D]">{lead.full_name}</td>
                      <td className="px-4 py-3 text-[#64748B]">{lead.email}</td>
                      <td className="px-4 py-3 text-[#64748B]">{lead.company}</td>
                      <td className="px-4 py-3">
                        <span className="bg-[#EFF6FF] text-[#1D4ED8] px-2 py-0.5 rounded-full text-xs">{lead.interest_type}</span>
                      </td>
                      <td className="px-4 py-3 text-[#64748B]">{lead.country}</td>
                      <td className="px-4 py-3 text-[#64748B] text-xs">{lead.created_at ? new Date(lead.created_at).toLocaleDateString() : '—'}</td>
                      <td className="px-4 py-3">
                        <Select defaultValue={lead.status || 'new'} onValueChange={(v) => updateLeadStatus(lead.id, v)}>
                          <SelectTrigger className="h-7 text-xs w-36">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="interview_scheduled">Interview Scheduled</SelectItem>
                            <SelectItem value="qualified">Qualified</SelectItem>
                            <SelectItem value="pilot_candidate">Pilot Candidate</SelectItem>
                            <SelectItem value="not_relevant">Not Currently Relevant</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Projects Table */}
        {activeTab === 'projects' && (
          <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E2E8F0]">
              <h2 className="font-semibold text-[#0F1F3D]">Customer Project Interests</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <tr>
                    <th className="text-left px-4 py-3 text-[#64748B] font-medium">Project</th>
                    <th className="text-left px-4 py-3 text-[#64748B] font-medium">Part</th>
                    <th className="text-left px-4 py-3 text-[#64748B] font-medium">Customer</th>
                    <th className="text-left px-4 py-3 text-[#64748B] font-medium">Confidentiality</th>
                    <th className="text-left px-4 py-3 text-[#64748B] font-medium">Technology</th>
                    <th className="text-left px-4 py-3 text-[#64748B] font-medium">Date</th>
                    <th className="text-left px-4 py-3 text-[#64748B] font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {projects.length === 0 ? (
                    <tr><td colSpan={7} className="px-4 py-8 text-center text-[#64748B]">No project submissions yet</td></tr>
                  ) : projects.map((p) => (
                    <tr key={p.id} className="hover:bg-[#F8FAFC]">
                      <td className="px-4 py-3 font-medium text-[#0F1F3D]">{p.project_name}</td>
                      <td className="px-4 py-3 text-[#64748B]">{p.part_name}</td>
                      <td className="px-4 py-3 text-[#64748B]">{p.customer_name}<br /><span className="text-xs">{p.customer_email}</span></td>
                      <td className="px-4 py-3"><span className="bg-[#FFF7ED] text-[#EA580C] px-2 py-0.5 rounded-full text-xs capitalize">{p.confidentiality_level?.replace('_', ' ')}</span></td>
                      <td className="px-4 py-3 text-[#64748B]">{p.technology || '—'}</td>
                      <td className="px-4 py-3 text-[#64748B] text-xs">{p.created_at ? new Date(p.created_at).toLocaleDateString() : '—'}</td>
                      <td className="px-4 py-3">
                        <Select defaultValue={p.status || 'new'} onValueChange={(v) => updateProjectStatus(p.id, v)}>
                          <SelectTrigger className="h-7 text-xs w-36"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="qualified">Qualified</SelectItem>
                            <SelectItem value="pilot_candidate">Pilot Candidate</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Suppliers Table */}
        {activeTab === 'suppliers' && (
          <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E2E8F0]">
              <h2 className="font-semibold text-[#0F1F3D]">Supplier Applications</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <tr>
                    <th className="text-left px-4 py-3 text-[#64748B] font-medium">Company</th>
                    <th className="text-left px-4 py-3 text-[#64748B] font-medium">Contact</th>
                    <th className="text-left px-4 py-3 text-[#64748B] font-medium">Location</th>
                    <th className="text-left px-4 py-3 text-[#64748B] font-medium">NDA</th>
                    <th className="text-left px-4 py-3 text-[#64748B] font-medium">Status</th>
                    <th className="text-left px-4 py-3 text-[#64748B] font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {suppliers.length === 0 ? (
                    <tr><td colSpan={6} className="px-4 py-8 text-center text-[#64748B]">No supplier applications yet</td></tr>
                  ) : suppliers.map((s) => (
                    <tr key={s.id} className="hover:bg-[#F8FAFC]">
                      <td className="px-4 py-3 font-medium text-[#0F1F3D]">{s.company_name}</td>
                      <td className="px-4 py-3 text-[#64748B]">{s.contact_name}<br /><span className="text-xs">{s.email}</span></td>
                      <td className="px-4 py-3 text-[#64748B]">{s.city}, {s.country}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${s.nda_capability ? 'bg-[#ECFDF5] text-[#059669]' : 'bg-gray-100 text-gray-500'}`}>
                          {s.nda_capability ? 'NDA-ready' : 'Not confirmed'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="bg-[#EFF6FF] text-[#1D4ED8] px-2 py-0.5 rounded-full text-xs capitalize">{s.verification_status || 'pending'}</span>
                      </td>
                      <td className="px-4 py-3 text-[#64748B] text-xs">{s.created_at ? new Date(s.created_at).toLocaleDateString() : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
