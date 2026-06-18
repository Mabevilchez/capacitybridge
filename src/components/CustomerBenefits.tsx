import { Search, Shield, BarChart2, Layers, AlertTriangle, Package } from 'lucide-react';

const BENEFITS = [
  {
    icon: Search,
    title: 'Find qualified suppliers faster',
    description:
      'Stop relying on fragmented searches and informal referrals. Access a structured network of verified industrial metal AM providers with documented capabilities.',
    color: '#1D4ED8',
    bg: '#EFF6FF',
    stat: '3 days',
    statLabel: 'avg. matching time',
  },
  {
    icon: Shield,
    title: 'Protect confidential designs',
    description:
      'Control who can see your CAD files. Require NDA acceptance before technical review, and choose your exact confidentiality level for every project.',
    color: '#059669',
    bg: '#ECFDF5',
    stat: '3 levels',
    statLabel: 'of IP protection',
  },
  {
    icon: BarChart2,
    title: 'Compare complete offers',
    description:
      'Evaluate price, technology, certification, lead time, and post-processing in a structured, side-by-side format — not scattered emails.',
    color: '#7C3AED',
    bg: '#F5F3FF',
    stat: '100%',
    statLabel: 'standardised quotes',
  },
  {
    icon: Layers,
    title: 'Access specialised capacity without ownership',
    description:
      'Tap into Europe's distributed metal AM capacity on demand — from single prototypes to production batches — without capital investment in equipment.',
    color: '#EA580C',
    bg: '#FFF7ED',
    stat: 'DMLS · SLM · EBM',
    statLabel: 'technologies covered',
  },
  {
    icon: AlertTriangle,
    title: 'Reduce technical sourcing risk',
    description:
      'Supplier capabilities are documented and verified. Machine specs, material qualifications, and certifications are checked before a supplier joins the network.',
    color: '#DC2626',
    bg: '#FEF2F2',
    stat: 'Verified',
    statLabel: 'supplier profiles only',
  },
  {
    icon: Package,
    title: 'Track the project from quote to delivery',
    description:
      'Follow every stage — from offer acceptance through production milestones to final delivery and quality documentation — in one place.',
    color: '#0F1F3D',
    bg: '#F1F5F9',
    stat: 'End-to-end',
    statLabel: 'project tracking',
  },
];

export default function CustomerBenefits() {
  return (
    <section id="for-customers" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-[#1D4ED8] mb-3 block">For Engineering Teams</span>
          <h2 className="text-4xl font-extrabold text-[#0F172A] mb-4">
            Why engineering teams choose CapacityBridge
          </h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            CapacityBridge helps engineering teams compare verified industrial metal additive manufacturing suppliers based on technology, materials, certifications, quality, lead time, IP protection, and price.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="group bg-white rounded-2xl border border-[#E2E8F0] p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: benefit.bg }}
                >
                  <Icon className="w-6 h-6" style={{ color: benefit.color }} />
                </div>

                <h3 className="text-base font-bold text-[#0F172A] mb-2 leading-snug">
                  {benefit.title}
                </h3>
                <p className="text-sm text-[#64748B] leading-relaxed flex-1">
                  {benefit.description}
                </p>

                {/* Stat pill */}
                <div className="mt-5 pt-4 border-t border-[#F1F5F9] flex items-center gap-2">
                  <span
                    className="text-sm font-bold"
                    style={{ color: benefit.color }}
                  >
                    {benefit.stat}
                  </span>
                  <span className="text-xs text-[#94A3B8]">{benefit.statLabel}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-[#0F1F3D] to-[#1D4ED8] p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Ready to source smarter?</h3>
            <p className="text-blue-200 text-sm max-w-md">
              Submit your first project and get matched with verified metal AM suppliers in as little as 3 days.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a
              href="#submit-project"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#1D4ED8] hover:bg-blue-50 font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              Submit a Project →
            </a>
            <a
              href="#early-access"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 font-medium px-6 py-3 rounded-xl transition-colors text-sm"
            >
              Join Early Access
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
