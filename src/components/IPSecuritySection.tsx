import { Lock, Eye, FileText, ClipboardList, ShieldCheck } from 'lucide-react';

export default function IPSecuritySection() {
  return (
    <section id="ip-security" className="py-24 bg-[#0F1F3D] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-900/30 border border-green-500/30 text-green-400 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            <ShieldCheck className="w-4 h-4" />
            IP &amp; Security
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-4">Your intellectual property, protected by design</h2>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">CapacityBridge is built with confidentiality as a core principle. Every feature is designed to keep your designs under your control.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300">
            <div className="w-11 h-11 bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
              <Lock className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-sm font-bold text-white mb-2">Encrypted storage</h3>
            <p className="text-blue-200 text-xs leading-relaxed mb-4">All uploaded files are stored with AES-256 encryption. No file is accessible without an authenticated, time-limited signed URL.</p>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-[#EA580C] bg-[#FFF7ED]">Planned</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300">
            <div className="w-11 h-11 bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
              <Eye className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-sm font-bold text-white mb-2">Controlled file access</h3>
            <p className="text-blue-200 text-xs leading-relaxed mb-4">You decide which suppliers can request access. Access is never granted automatically — every release requires your explicit approval.</p>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-[#059669] bg-[#ECFDF5]">Core feature</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300">
            <div className="w-11 h-11 bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
              <FileText className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-sm font-bold text-white mb-2">NDA workflow</h3>
            <p className="text-blue-200 text-xs leading-relaxed mb-4">Suppliers can only view confidential details after accepting a Non-Disclosure Agreement. The NDA acceptance is logged and timestamped.</p>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-[#059669] bg-[#ECFDF5]">Core feature</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300">
            <div className="w-11 h-11 bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
              <ClipboardList className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-sm font-bold text-white mb-2">Access record</h3>
            <p className="text-blue-200 text-xs leading-relaxed mb-4">Every file access event — view, download, and NDA acceptance — is logged in a transparent audit trail you can review at any time.</p>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-[#EA580C] bg-[#FFF7ED]">Planned</span>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-2">Confidentiality levels</h3>
          <p className="text-blue-200 text-sm mb-8">Choose the protection level that matches your project sensitivity. <strong className="text-white">Restricted is the default</strong> — you must actively reduce protection if you want more openness.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl p-5 border-2 border-green-500/30 bg-green-500/10">
              <div className="w-2.5 h-2.5 rounded-full mb-3 bg-[#059669]" />
              <h4 className="text-base font-bold text-white mb-2">Standard</h4>
              <p className="text-blue-200 text-xs leading-relaxed">Supplier can view part description and general specs before NDA.</p>
            </div>
            <div className="rounded-2xl p-5 border-2 border-blue-500/40 bg-blue-500/10 relative">
              <span className="absolute -top-3 left-4 bg-[#1D4ED8] text-white text-xs font-bold px-3 py-1 rounded-full">Default</span>
              <div className="w-2.5 h-2.5 rounded-full mb-3 bg-[#1D4ED8]" />
              <h4 className="text-base font-bold text-white mb-2">Restricted</h4>
              <p className="text-blue-200 text-xs leading-relaxed">NDA required before any technical detail or file is visible.</p>
            </div>
            <div className="rounded-2xl p-5 border-2 border-purple-500/30 bg-purple-500/10">
              <div className="w-2.5 h-2.5 rounded-full mb-3 bg-[#7C3AED]" />
              <h4 className="text-base font-bold text-white mb-2">Highly Confidential</h4>
              <p className="text-blue-200 text-xs leading-relaxed">Manual approval required for each supplier. Additional screening applied.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
