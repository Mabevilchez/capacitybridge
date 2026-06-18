import { Lock, Eye, FileText, ClipboardList, ShieldCheck } from 'lucide-react';

const SECURITY_FEATURES = [
  {
    icon: Lock,
    title: 'Encrypted storage',
    description: 'All uploaded files are stored with AES-256 encryption. No file is accessible without an authenticated, time-limited signed URL.',
    tag: 'Planned',
    tagColor: '#EA580C',
    tagBg: '#FFF7ED',
  },
  {
    icon: Eye,
    title: 'Controlled file access',
    description: 'You decide which suppliers can request access to your files. Access is never granted automatically — every release requires your explicit approval.',
    tag: 'Core feature',
    tagColor: '#059669',
    tagBg: '#ECFDF5',
  },
  {
    icon: FileText,
    title: 'NDA workflow',
    description: 'Suppliers can only view confidential project details after accepting a Non-Disclosure Agreement. The NDA acceptance is logged and timestamped.',
    tag: 'Core feature',
    tagColor: '#059669',
    tagBg: '#ECFDF5',
  },
  {
    icon: ClipboardList,
    title: 'Access record',
    description: 'Every file access event — view, download, and NDA acceptance — is logged in a transparent audit trail that you can review at any time.',
    tag: 'Planned',
    tagColor: '#EA580C',
    tagBg: '#FFF7ED',
  },
];

const CONFIDENTIALITY_LEVELS = [
  {
    level: 'Standard',
    description: 'Supplier can view part description and general specs before NDA.',
    color: '#059669',
    bg: '#ECFDF5',
    border: '#059669',
  },
  {
    level: 'Restricted',
    description: 'NDA required before any technical detail or file is visible. Default level.',
    color: '#1D4ED8',
    bg: '#EFF6FF',
    border: '#1D4ED8',
    default: true,
  },
  {
    level: 'Highly Confidential',
    description: 'Manual approval required for each supplier. Additional screening applied.',
    color: '#7C3AED',
    bg: '#F5F3FF',
    border: '#7C3AED',
  },
];

export default function IPSecuritySection() {
  return (
    <section id="ip-security" className="py-24 bg-[#0F1F3D] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#059669]/20 border border-[#059669]/30 text-[#34D399] text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            <ShieldCheck className="w-4 h-4" />
            IP & Security
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Your intellectual property, protected by design
          </h2>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            CapacityBridge is built with confidentiality as a core principle — not an afterthought. Every feature of the platform is designed to keep your designs under your control.
          </p>
        </div>

        {/* Security features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {SECURITY_FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm"
              >
                <div className="w-11 h-11 bg-[#059669]/20 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#34D399]" />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-sm font-bold text-white">{feature.title}</h3>
                </div>
                <p className="text-blue-200 text-xs leading-relaxed mb-4">{feature.description}</p>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ color: feature.tagColor, backgroundColor: feature.tagBg }}
                >
                  {feature.tag}
                </span>
              </div>
            );
          })}
        </div>

        {/* Confidentiality levels */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-white mb-2">Confidentiality levels</h3>
          <p className="text-blue-200 text-sm mb-8">
            Choose the protection level that matches your project sensitivity. <strong className="text-white">Restricted is the default</strong> — you must actively reduce protection if you want more openness.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CONFIDENTIALITY_LEVELS.map((level) => (
              <div
                key={level.level}
                className="rounded-2xl p-5 border-2 relative"
                style={{ borderColor: level.border + '44', backgroundColor: level.border + '11' }}
              >
                {level.default && (
                  <span className="absolute -top-3 left-4 bg-[#1D4ED8] text-white text-xs font-bold px-3 py-1 rounded-full">
                    Default
                  </span>
                )}
                <div
                  className="w-2.5 h-2.5 rounded-full mb-3"
                  style={{ backgroundColor: level.border }}
                />
                <h4 className="text-base font-bold text-white mb-2">{level.level}</h4>
                <p className="text-blue-200 text-xs leading-relaxed">{level.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
