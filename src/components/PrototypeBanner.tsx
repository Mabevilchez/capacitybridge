import { Info } from 'lucide-react';

export default function PrototypeBanner() {
  return (
    <div className="bg-[#0F1F3D] text-white py-2 px-4 text-center text-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <Info className="w-4 h-4 text-blue-300 shrink-0" />
        <p className="text-blue-100">
          <span className="font-semibold">CapacityBridge</span> is currently an early-stage innovation project developed within the{' '}
          <span className="font-semibold">Technical University of Munich</span>.{' '}
          Marketplace listings and supplier data shown on this website are illustrative.
        </p>
      </div>
    </div>
  );
}
