import { Lock, Eye, FileText, ClipboardList, AlertTriangle } from 'lucide-react';

const securityCards = [
  {
    icon: Lock,
    title: 'Encrypted Storage',
    description: 'CAD files and technical documents are intended to be stored in a private, encrypted storage environment. Public file URLs are never exposed.',
    color: 'bg-[#EFF6FF]',
    iconColor: 'text-[#1D4ED8]',
    borderColor: 'border-[#1D4ED8]/20',
  },
  {
    icon: Eye,
    title: 'Controlled File Access',
    description: 'Only authorised suppliers receive access. Short-lived signed URLs ensure files cannot be shared or accessed after the authorisation window expires.',
    color: 'bg-[#ECFDF5]',
    iconColor: 'text-[#059669]',
    borderColor: 'border-[#059669]/20',
  },
  {
    icon: FileText,
    title: 'NDA Workflow',
    description: 'Customers can require NDA acceptance before detailed technical information is visible. The platform supports platform NDAs or customer-provided agreements.',
    color: 'bg-[#EFF6FF]',
    iconColor: 'text-[#1D4ED8]',
    borderColor: 'border-[#1D4ED8]/20',
  },
  {
    icon: ClipboardList,
    title: 'Access Record',
    description: 'The platform records who accessed documents and when. Full audit trails are maintained throughout the project lifecycle.',
    color: 'bg-[#ECFDF5]',
    iconColor: 'text-[#059669]',
    borderColor: 'border-[#059669]/20',
  },
];

const confidentialityLevels = [
  {
    level: 'Standard',
    color: 'bg-[#EFF6FF] border-[#1D4ED8]/30',
    titleColor: 'text-[#1D4ED8]',
    description: 'General project information may be shared with matching suppliers. Full files are shared only with the selected supplier after award.',
  },
  {
    level: 'Restricted',
    color: 'bg-[#FFF7ED] border-[#EA580C]/30',
    titleColor: 'text-[#EA580C]',
    description: 'Suppliers receive an anonymised technical summary. NDA acceptance is required before detailed files are visible. Company identity can remain hidden during initial matching.',
    default: true,
  },
  {
    level: 'Highly Confidential',
    color: 'bg-[#ECFDF5] border-[#059669]/30',
    titleColor: 'text-[#059669]',
    description: 'Only a minimal anonymised request is used for matching. CapacityBridge manually approves supplier access. Customer-provided NDA accepted. Company identity, project name, and application remain hidden.',
  },
];

export default function IPSecuritySection() {
  return (
    <section id="ip-security" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[#059669] uppercase tracking-wider mb-3">IP & Security</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F1F3D] mb-4">
            You decide how protected your project must be.
          </h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            From confidential CAD upload to verified supplier selection — CapacityBridge is designed with IP protection as a core requirement, not an afterthought.
          </p>
        </div>

        {/* Security Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {securityCards.map((card) => (
            <div
              key={card.title}
              className={`border rounded-xl p-6 ${card.borderColor} ${card.color}`}
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                <card.icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
              <h3 className="text-lg font-bold text-[#0F1F3D] mb-3">{card.title}</h3>
              <p className="text-[#64748B] text-sm leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>

        {/* Confidentiality Levels */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-[#0F1F3D] text-center mb-8">Project Confidentiality Levels</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {confidentialityLevels.map((level) => (
              <div
                key={level.level}
                className={`border-2 rounded-xl p-6 relative ${level.color}`}
              >
                {level.default && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#EA580C] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Default
                  </div>
                )}
                <h4 className={`text-xl font-bold mb-3 ${level.titleColor}`}>{level.level}</h4>
                <p className="text-[#64748B] text-sm leading-relaxed">{level.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-[#FFF7ED] border border-orange-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-[#EA580C] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-[#0F1F3D] mb-2">Early-Access Security Disclaimer</h4>
              <p className="text-sm text-[#64748B] leading-relaxed">
                This early-access platform describes intended security functionality. Production-grade security —
                including secure encrypted storage, strong authentication, signed URL access controls, and legally
                binding NDA workflows — has not yet been fully implemented and tested. We recommend that users
                do not upload commercially sensitive CAD files until the secure production environment is confirmed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
