import { ArrowRight, Shield, CheckCircle } from 'lucide-react';

interface HeroSectionProps {
  onOpenProjectForm?: () => void;
}

const DEMO_SUPPLIERS = [
  {
    name: 'Bavaria Additive GmbH',
    location: 'Munich, DE',
    technology: 'LPBF',
    price: '\u20ac8,400',
    leadTime: '14 days',
    score: 4.8,
    certification: 'ISO 9001',
    nda: true,
    recommended: true,
  },
  {
    name: 'Alpine Metal AM',
    location: 'Innsbruck, AT',
    technology: 'DMLS',
    price: '\u20ac9,100',
    leadTime: '18 days',
    score: 4.6,
    certification: 'ISO 9001',
    nda: true,
    recommended: false,
  },
  {
    name: 'Rhine Additive Systems',
    location: 'D\u00fcsseldorf, DE',
    technology: 'LPBF',
    price: '\u20ac7,950',
    leadTime: '21 days',
    score: 4.4,
    certification: 'ISO 9001',
    nda: false,
    recommended: false,
  },
];

export default function HeroSection({ onOpenProjectForm }: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-br from-[#EFF6FF] via-white to-[#F8FAFC] pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#0F1F3D] text-white text-xs font-medium px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              Early Access \u2014 Munich, Germany
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] leading-tight">
              Europe's faster way to source{' '}
              <span className="text-[#1D4ED8]">industrial metal 3D printing.</span>
            </h1>

            <p className="text-lg font-semibold text-[#0F172A]">
              Submit your requirements and get matched with verified suppliers in as little as 3 days.
            </p>

            <p className="text-base text-[#64748B] leading-relaxed">
              From one prototype to serial production, CapacityBridge helps you compare qualified metal additive manufacturing partners while protecting your CAD files, intellectual property, and confidential project data.
            </p>

            <div className="bg-[#ECFDF5] border border-[#059669]/20 rounded-lg p-4 flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#059669] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[#059669]">Your designs stay under your control</p>
                <p className="text-sm text-[#064E3B] mt-0.5">
                  Choose who can access your CAD files, when access is granted, and whether an NDA is required before technical review.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={onOpenProjectForm}
                className="inline-flex items-center gap-2 bg-[#1D4ED8] hover:bg-[#1e40af] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Submit a Project <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#early-access"
                className="inline-flex items-center gap-2 border border-[#1D4ED8] text-[#1D4ED8] hover:bg-[#EFF6FF] font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Join Early Access
              </a>
              <a
                href="/for-suppliers"
                className="inline-flex items-center gap-2 text-[#64748B] hover:text-[#0F172A] font-medium px-2 py-3 transition-colors"
              >
                Join as a Supplier
              </a>
            </div>

            <div className="flex flex-wrap gap-6 pt-2 text-sm text-[#64748B]">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#059669]" />
                Verified metal AM suppliers
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#059669]" />
                Controlled CAD-file access
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#059669]" />
                Transparent comparable quotations
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl border border-[#E2E8F0] overflow-hidden">
              <div className="bg-[#FFF7ED] border-b border-[#E2E8F0] px-5 py-3 flex items-center justify-between">
                <span className="text-[#EA580C] text-xs font-medium">\u26a0 Prototype marketplace data \u2014 illustrative only</span>
                <span className="text-xs text-[#64748B]">Demo Request</span>
              </div>

              <div className="px-5 pt-4 pb-3 border-b border-[#E2E8F0]">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-[#0F172A]">Titanium Structural Bracket</h3>
                    <p className="text-xs text-[#64748B] mt-0.5">Ti6Al4V \u00b7 50 units \u00b7 DMLS or LPBF \u00b7 \u00b10.05mm</p>
                  </div>
                  <span className="bg-[#0F1F3D] text-white text-xs px-2 py-1 rounded-md font-medium">Restricted</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs bg-[#EFF6FF] text-[#1D4ED8] px-2 py-0.5 rounded-full">ISO 9001</span>
                  <span className="text-xs bg-[#EFF6FF] text-[#1D4ED8] px-2 py-0.5 rounded-full">Heat Treatment</span>
                  <span className="text-xs bg-[#EFF6FF] text-[#1D4ED8] px-2 py-0.5 rounded-full">CNC Finishing</span>
                </div>
              </div>

              <div className="px-5 py-3 space-y-2">
                {DEMO_SUPPLIERS.map((supplier) => (
                  <div
                    key={supplier.name}
                    className={`rounded-xl border p-3 ${supplier.recommended ? 'border-[#1D4ED8] bg-[#EFF6FF]' : 'border-[#E2E8F0] bg-white'}`}
                  >
                    {supplier.recommended && (
                      <div className="flex items-center gap-1 mb-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-[#1D4ED8]" />
                        <span className="text-xs font-semibold text-[#1D4ED8]">Recommended technical fit</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-[#0F172A]">{supplier.name}</p>
                        <p className="text-xs text-[#64748B]">{supplier.location} \u00b7 {supplier.technology}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-[#0F172A]">{supplier.price}</p>
                        <p className="text-xs text-[#64748B]">{supplier.leadTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-[#64748B]">
                      <span>Score: <strong className="text-[#0F172A]">{supplier.score}</strong></span>
                      <span>{supplier.certification}</span>
                      {supplier.nda && (
                        <span className="flex items-center gap-1 text-[#059669]">
                          <Shield className="w-3 h-3" /> NDA-ready
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-5 py-3 border-t border-[#E2E8F0]">
                <p className="text-xs text-center text-[#64748B] italic">Fictional supplier data for demonstration purposes only</p>
              </div>

              <div className="px-5 py-3 border-t border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[#64748B]">
                  <span className="w-2 h-2 bg-[#059669] rounded-full"></span>
                  Matched in 3 days
                </div>
                <span className="text-xs text-[#64748B]">Average response time</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
