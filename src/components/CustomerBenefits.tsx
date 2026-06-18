import { Search, Shield, BarChart2, Layers, AlertTriangle, Package } from 'lucide-react';

export default function CustomerBenefits() {
  return (
    <section id="for-customers" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-[#1D4ED8] mb-3 block">For Engineering Teams</span>
          <h2 className="text-4xl font-extrabold text-[#0F172A] mb-4">Why engineering teams choose CapacityBridge</h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            CapacityBridge helps engineering teams compare verified industrial metal additive manufacturing suppliers based on technology, materials, certifications, quality, lead time, IP protection, and price.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="group bg-white rounded-2xl border border-[#E2E8F0] p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-[#EFF6FF]">
              <Search className="w-6 h-6 text-[#1D4ED8]" />
            </div>
            <h3 className="text-base font-bold text-[#0F172A] mb-2">Find qualified suppliers faster</h3>
            <p className="text-sm text-[#64748B] leading-relaxed flex-1">Stop relying on fragmented searches and informal referrals. Access a structured network of verified industrial metal AM providers with documented capabilities.</p>
            <div className="mt-5 pt-4 border-t border-[#F1F5F9] flex items-center gap-2">
              <span className="text-sm font-bold text-[#1D4ED8]">3 days</span>
              <span className="text-xs text-[#94A3B8]">avg. matching time</span>
            </div>
          </div>
          <div className="group bg-white rounded-2xl border border-[#E2E8F0] p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-[#ECFDF5]">
              <Shield className="w-6 h-6 text-[#059669]" />
            </div>
            <h3 className="text-base font-bold text-[#0F172A] mb-2">Protect confidential designs</h3>
            <p className="text-sm text-[#64748B] leading-relaxed flex-1">Control who can see your CAD files. Require NDA acceptance before technical review, and choose your exact confidentiality level for every project.</p>
            <div className="mt-5 pt-4 border-t border-[#F1F5F9] flex items-center gap-2">
              <span className="text-sm font-bold text-[#059669]">3 levels</span>
              <span className="text-xs text-[#94A3B8]">of IP protection</span>
            </div>
          </div>
          <div className="group bg-white rounded-2xl border border-[#E2E8F0] p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-[#F5F3FF]">
              <BarChart2 className="w-6 h-6 text-[#7C3AED]" />
            </div>
            <h3 className="text-base font-bold text-[#0F172A] mb-2">Compare complete offers</h3>
            <p className="text-sm text-[#64748B] leading-relaxed flex-1">Evaluate price, technology, certification, lead time, and post-processing in a structured, side-by-side format — not scattered emails.</p>
            <div className="mt-5 pt-4 border-t border-[#F1F5F9] flex items-center gap-2">
              <span className="text-sm font-bold text-[#7C3AED]">100%</span>
              <span className="text-xs text-[#94A3B8]">standardised quotes</span>
            </div>
          </div>
          <div className="group bg-white rounded-2xl border border-[#E2E8F0] p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-[#FFF7ED]">
              <Layers className="w-6 h-6 text-[#EA580C]" />
            </div>
            <h3 className="text-base font-bold text-[#0F172A] mb-2">Access specialised capacity without ownership</h3>
            <p className="text-sm text-[#64748B] leading-relaxed flex-1">Tap into distributed metal AM capacity on demand — from single prototypes to production batches — without capital investment in equipment.</p>
            <div className="mt-5 pt-4 border-t border-[#F1F5F9] flex items-center gap-2">
              <span className="text-sm font-bold text-[#EA580C]">DMLS · SLM · EBM</span>
              <span className="text-xs text-[#94A3B8]">technologies covered</span>
            </div>
          </div>
          <div className="group bg-white rounded-2xl border border-[#E2E8F0] p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-[#FEF2F2]">
              <AlertTriangle className="w-6 h-6 text-[#DC2626]" />
            </div>
            <h3 className="text-base font-bold text-[#0F172A] mb-2">Reduce technical sourcing risk</h3>
            <p className="text-sm text-[#64748B] leading-relaxed flex-1">Supplier capabilities are documented and verified. Machine specs, material qualifications, and certifications are checked before a supplier joins the network.</p>
            <div className="mt-5 pt-4 border-t border-[#F1F5F9] flex items-center gap-2">
              <span className="text-sm font-bold text-[#DC2626]">Verified</span>
              <span className="text-xs text-[#94A3B8]">supplier profiles only</span>
            </div>
          </div>
          <div className="group bg-white rounded-2xl border border-[#E2E8F0] p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-[#F1F5F9]">
              <Package className="w-6 h-6 text-[#0F1F3D]" />
            </div>
            <h3 className="text-base font-bold text-[#0F172A] mb-2">Track the project from quote to delivery</h3>
            <p className="text-sm text-[#64748B] leading-relaxed flex-1">Follow every stage — from offer acceptance through production milestones to final delivery and quality documentation — in one place.</p>
            <div className="mt-5 pt-4 border-t border-[#F1F5F9] flex items-center gap-2">
              <span className="text-sm font-bold text-[#0F1F3D]">End-to-end</span>
              <span className="text-xs text-[#94A3B8]">project tracking</span>
            </div>
          </div>
        </div>
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-[#0F1F3D] to-[#1D4ED8] p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Ready to source smarter?</h3>
            <p className="text-blue-200 text-sm max-w-md">Submit your first project and get matched with verified metal AM suppliers in as little as 3 days.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a href="#submit-project" className="inline-flex items-center justify-center gap-2 bg-white text-[#1D4ED8] hover:bg-blue-50 font-semibold px-6 py-3 rounded-xl transition-colors text-sm">Submit a Project</a>
            <a href="#early-access" className="inline-flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 font-medium px-6 py-3 rounded-xl transition-colors text-sm">Join Early Access</a>
          </div>
        </div>
      </div>
    </section>
  );
}
