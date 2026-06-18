import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import CustomerBenefits from '../components/CustomerBenefits';
import IPSecuritySection from '../components/IPSecuritySection';
import EarlyAccessSection from '../components/EarlyAccessSection';
import AcademicContextSection from '../components/AcademicContextSection';

// Stats bar between hero and benefits
function StatsBar() {
  const stats = [
    { value: 'DMLS · SLM · LPBF', label: 'Metal AM technologies' },
    { value: 'EBM · DED · MBJ', label: 'Additional processes' },
    { value: 'ISO 9001 · AS9100', label: 'Certifications screened' },
    { value: '3-day', label: 'Average matching time' },
  ];
  return (
    <div className="bg-[#0F1F3D] py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-x divide-white/10">
          {stats.map((s, i) => (
            <div key={i} className={`pl-6 ${i === 0 ? 'pl-0' : ''}`}>
              <p className="text-white font-bold text-base sm:text-lg">{s.value}</p>
              <p className="text-blue-300 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Visual showcase section with Unsplash images
function ImageShowcase() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-widest uppercase text-[#1D4ED8] mb-2 block">Industrial Metal AM</span>
          <h2 className="text-3xl font-extrabold text-[#0F172A]">
            From digital file to certified metal part
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="relative rounded-2xl overflow-hidden group h-64 sm:h-80">
            <img
              src="https://images.unsplash.com/photo-1565785759001-90e62e04fa16?w=600&q=80&auto=format&fit=crop"
              alt="Metal 3D printing machine LPBF"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F3D]/80 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <p className="text-white text-sm font-bold">LPBF / DMLS Machines</p>
              <p className="text-blue-200 text-xs">Laser powder bed fusion</p>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden group h-64 sm:h-80">
            <img
              src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&q=80&auto=format&fit=crop"
              alt="Engineer reviewing metal 3D printed parts"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F3D]/80 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <p className="text-white text-sm font-bold">Engineering Review</p>
              <p className="text-blue-200 text-xs">Technical part qualification</p>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden group h-64 sm:h-80">
            <img
              src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600&q=80&auto=format&fit=crop"
              alt="Quality inspection metal additive parts"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F3D]/80 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <p className="text-white text-sm font-bold">Quality Inspection</p>
              <p className="text-blue-200 text-xs">Certified measurement & reporting</p>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-[#94A3B8] mt-4 italic">
          Illustrative photography. CapacityBridge connects you with verified suppliers operating equipment of this type.
        </p>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <HowItWorks />
      <ImageShowcase />
      <CustomerBenefits />
      <IPSecuritySection />
      <EarlyAccessSection />
      <AcademicContextSection />
    </>
  );
}
