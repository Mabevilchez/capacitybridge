import { Shield, CheckCircle, BarChart3, ArrowRight, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onSubmitProject: () => void;
  onJoinAccess: () => void;
}

export default function HeroSection({ onSubmitProject, onJoinAccess }: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-b from-[#EFF6FF] to-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#0F1F3D] text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 bg-[#059669] rounded-full animate-pulse"></span>
              Early Access — Munich, Germany
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-[#0F1F3D] leading-tight mb-6">
              Upload the part.{' '}
              <span className="text-[#1D4ED8]">Find the right metal 3D printing supplier.</span>
            </h1>

            <p className="text-lg text-[#64748B] mb-4 leading-relaxed">
              Compare verified industrial metal AM suppliers based on technology, materials,
              certifications, quality, lead time, IP protection, and price.
            </p>

            <p className="text-base text-[#64748B] mb-8 leading-relaxed">
              Europe's faster way to source industrial metal 3D printing.
            </p>

            {/* Confidentiality Message */}
            <div className="bg-[#ECFDF5] border border-[#059669]/30 rounded-xl p-4 mb-8">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#059669] mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-[#0F172A] mb-1">Your designs stay under your control</p>
                  <p className="text-sm text-[#64748B]">
                    Choose who can access your CAD files, when access is granted, and whether an NDA is required before technical review.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button
                size="lg"
                onClick={onSubmitProject}
                className="bg-[#1D4ED8] hover:bg-blue-700 text-white px-8"
              >
                Submit a Project
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={onJoinAccess}
                className="border-[#1D4ED8] text-[#1D4ED8] hover:bg-[#EFF6FF]"
              >
                Join Early Access
              </Button>
              <Button
                size="lg"
                variant="ghost"
                onClick={() => {
                  const el = document.querySelector('#for-suppliers');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-[#64748B] hover:text-[#0F1F3D]"
              >
                Join as a Supplier
              </Button>
            </div>

            {/* Three Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: CheckCircle, text: 'Verified metal AM suppliers', color: 'text-[#059669]' },
                { icon: Shield, text: 'Controlled CAD-file access', color: 'text-[#1D4ED8]' },
                { icon: BarChart3, text: 'Transparent comparable quotations', color: 'text-[#EA580C]' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <item.icon className={`w-5 h-5 ${item.color} shrink-0`} />
                  <span className="text-sm font-medium text-[#0F172A]">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Demo Marketplace Panel */}
          <div className="relative">
            <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-xl overflow-hidden">
              {/* Demo Label */}
              <div className="bg-[#FFF7ED] border-b border-orange-100 px-4 py-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#EA580C]">⚠ Prototype marketplace data — illustrative only</span>
                <span className="text-xs text-[#64748B]">Demo Request</span>
              </div>

              {/* Part Info */}
              <div className="p-4 bg-[#F8FAFC] border-b border-[#E2E8F0]">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-[#0F1F3D] text-sm">Titanium Structural Bracket</h3>
                    <p className="text-xs text-[#64748B] mt-0.5">Ti6Al4V · 50 units · DMLS or LPBF · ±0.05mm</p>
                  </div>
                  <span className="bg-[#0F1F3D] text-white text-xs px-2 py-1 rounded-full">Restricted</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs bg-[#EFF6FF] text-[#1D4ED8] px-2 py-0.5 rounded-full">ISO 9001</span>
                  <span className="text-xs bg-[#ECFDF5] text-[#059669] px-2 py-0.5 rounded-full">Heat Treatment</span>
                  <span className="text-xs bg-[#F8FAFC] text-[#64748B] px-2 py-0.5 rounded-full">CNC Finishing</span>
                </div>
              </div>

              {/* Supplier Offers */}
              <div className="p-4 space-y-3">
                {[
                  {
                    name: 'Bavaria Additive GmbH',
                    location: 'Munich, DE',
                    price: '€8,400',
                    lead: '14 days',
                    tech: 'LPBF',
                    cert: 'ISO 9001',
                    score: '4.8',
                    nda: true,
                    recommended: true,
                  },
                  {
                    name: 'Alpine Metal AM',
                    location: 'Innsbruck, AT',
                    price: '€9,100',
                    lead: '18 days',
                    tech: 'DMLS',
                    cert: 'ISO 9001',
                    score: '4.6',
                    nda: true,
                    recommended: false,
                  },
                  {
                    name: 'Rhine Additive Systems',
                    location: 'Düsseldorf, DE',
                    price: '€7,950',
                    lead: '21 days',
                    tech: 'LPBF',
                    cert: 'ISO 9001',
                    score: '4.4',
                    nda: false,
                    recommended: false,
                  },
                ].map((supplier) => (
                  <div
                    key={supplier.name}
                    className={`border rounded-xl p-3 ${supplier.recommended ? 'border-[#1D4ED8] bg-[#EFF6FF]' : 'border-[#E2E8F0] bg-white'}`}
                  >
                    {supplier.recommended && (
                      <div className="text-xs font-semibold text-[#1D4ED8] mb-1.5 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Recommended technical fit
                      </div>
                    )}
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-[#0F1F3D] text-sm">{supplier.name}</p>
                        <p className="text-xs text-[#64748B]">{supplier.location} · {supplier.tech}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#0F1F3D] text-sm">{supplier.price}</p>
                        <p className="text-xs text-[#64748B]">{supplier.lead}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-[#64748B]">Score: <strong>{supplier.score}</strong></span>
                      <span className="text-xs text-[#64748B]">{supplier.cert}</span>
                      {supplier.nda && (
                        <span className="text-xs text-[#059669] flex items-center gap-0.5">
                          <Shield className="w-3 h-3" /> NDA-ready
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-4 pb-4">
                <p className="text-xs text-center text-[#64748B] italic">
                  Fictional supplier data for demonstration purposes only
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
