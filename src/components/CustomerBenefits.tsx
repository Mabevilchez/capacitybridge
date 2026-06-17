import { Search, Shield, BarChart3, Cpu, AlertTriangle, Eye } from 'lucide-react';

const benefits = [
  {
    icon: Search,
    title: 'Find qualified suppliers faster',
    description: 'Avoid fragmented supplier searches and informal referrals. Access a structured, verified network of industrial metal AM providers.',
    color: 'bg-[#EFF6FF]',
    iconColor: 'text-[#1D4ED8]',
  },
  {
    icon: Shield,
    title: 'Protect confidential designs',
    description: 'Control who can see your CAD files, require NDA acceptance before review, and choose your exact confidentiality level.',
    color: 'bg-[#ECFDF5]',
    iconColor: 'text-[#059669]',
  },
  {
    icon: BarChart3,
    title: 'Compare complete offers',
    description: 'Evaluate price, technology, certification, lead time, and post-processing in a structured, side-by-side format.',
    color: 'bg-[#FFF7ED]',
    iconColor: 'text-[#EA580C]',
  },
  {
    icon: Cpu,
    title: 'Access specialised capacity without ownership',
    description: 'Use industrial metal AM — DMLS, SLM, EBM, Binder Jetting — without purchasing expensive machines or hiring specialist staff.',
    color: 'bg-[#EFF6FF]',
    iconColor: 'text-[#1D4ED8]',
  },
  {
    icon: AlertTriangle,
    title: 'Reduce technical sourcing risk',
    description: 'Match projects to suitable processes, materials, and supplier capabilities before committing to a supplier selection.',
    color: 'bg-[#ECFDF5]',
    iconColor: 'text-[#059669]',
  },
  {
    icon: Eye,
    title: 'Track the project from quote to delivery',
    description: 'Maintain visibility over production, inspection, shipment, and final approval in one managed workflow.',
    color: 'bg-[#FFF7ED]',
    iconColor: 'text-[#EA580C]',
  },
];

export default function CustomerBenefits() {
  return (
    <section id="for-customers" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[#1D4ED8] uppercase tracking-wider mb-3">For Engineering Teams</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F1F3D] mb-4">
            Why engineering teams choose CapacityBridge
          </h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            CapacityBridge helps engineering teams compare verified industrial metal additive manufacturing
            suppliers based on technology, materials, certifications, quality, lead time, IP protection, and price.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-white border border-[#E2E8F0] rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 rounded-xl ${benefit.color} flex items-center justify-center mb-4`}>
                <benefit.icon className={`w-6 h-6 ${benefit.iconColor}`} />
              </div>
              <h3 className="text-lg font-bold text-[#0F1F3D] mb-3">{benefit.title}</h3>
              <p className="text-[#64748B] text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Supported Technologies */}
        <div className="mt-16 bg-[#0F1F3D] rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold mb-2">Supported Metal AM Technologies</h3>
            <p className="text-blue-200 text-sm">Industrial metal additive manufacturing processes covered by CapacityBridge</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { code: 'DMLS', name: 'Direct Metal Laser Sintering' },
              { code: 'SLM', name: 'Selective Laser Melting' },
              { code: 'LPBF', name: 'Laser Powder Bed Fusion' },
              { code: 'EBM', name: 'Electron Beam Melting' },
              { code: 'DED', name: 'Directed Energy Deposition' },
              { code: 'MBJ', name: 'Metal Binder Jetting' },
            ].map((tech) => (
              <div key={tech.code} className="bg-blue-900/40 border border-blue-700 rounded-xl p-4 text-center">
                <div className="text-lg font-bold text-white mb-1">{tech.code}</div>
                <div className="text-xs text-blue-300 leading-tight">{tech.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
