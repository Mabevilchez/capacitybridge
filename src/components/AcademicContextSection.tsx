import { GraduationCap } from 'lucide-react';

export default function AcademicContextSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#0F1F3D] rounded-2xl flex items-center justify-center shrink-0">
              <GraduationCap className="w-9 h-9 text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1">Academic Context</p>
              <h3 className="text-xl font-bold text-[#0F1F3D]">Technical University of Munich — TUM</h3>
              <p className="text-sm text-[#64748B] mt-1">Munich, Bavaria, Germany</p>
            </div>
          </div>
          <div className="md:border-l md:border-[#E2E8F0] md:pl-8 flex-1">
            <p className="text-[#64748B] leading-relaxed">
              CapacityBridge is developed as an <strong className="text-[#0F1F3D]">early-stage innovation project</strong>{' '}
              within the Technical University of Munich (TUM). The project explores how digital platforms can reduce friction
              in industrial metal additive manufacturing sourcing for European engineering teams.
            </p>
            <p className="text-xs text-[#64748B] mt-3 italic">
              TUM is referenced as the academic context of this project. TUM does not endorse CapacityBridge as an official university venture.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
