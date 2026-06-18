import { useState } from 'react';
import { Upload, Cpu, BarChart3, Factory, CheckSquare, ArrowRight, Shield, Clock, FileCheck, Zap } from 'lucide-react';

const STEPS = [
  {
    id: 1,
    icon: Upload,
    label: 'Submit Project',
    title: 'Submit your project requirements',
    description:
      'Define your part specifications, upload reference files, set your confidentiality level, and describe your technical requirements. Your CAD data stays under your control at all times.',
    details: [
      'Part geometry & material specification',
      'Required technology (DMLS, LPBF, EBM…)',
      'Quantity, tolerance & surface finish',
      'Confidentiality level: Standard · Restricted · Highly Confidential',
    ],
    color: '#1D4ED8',
    bg: '#EFF6FF',
    image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&q=80&auto=format&fit=crop',
    imageAlt: 'Engineer reviewing 3D model on computer',
  },
  {
    id: 2,
    icon: Cpu,
    label: 'Technical Matching',
    title: 'Automated technical matching',
    description:
      'CapacityBridge analyses your requirements and matches them against verified supplier capabilities — machines, materials, certifications, and capacity availability.',
    details: [
      'Machine capability & build volume check',
      'Material & technology compatibility',
      'Certification match (ISO 9001, AS9100, etc.)',
      'Available capacity & lead time screening',
    ],
    color: '#7C3AED',
    bg: '#F5F3FF',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80&auto=format&fit=crop',
    imageAlt: 'Circuit board representing technology matching',
  },
  {
    id: 3,
    icon: BarChart3,
    label: 'Compare Offers',
    title: 'Compare structured supplier offers',
    description:
      'Receive standardised, side-by-side quotations from qualified suppliers. Compare price, lead time, certifications, post-processing, and IP protection in one clear view.',
    details: [
      'Standardised quote format for all suppliers',
      'Side-by-side comparison: price, lead time, quality',
      'NDA status and file access controls visible',
      'Supplier score and verification badge',
    ],
    color: '#EA580C',
    bg: '#FFF7ED',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&auto=format&fit=crop',
    imageAlt: 'Data comparison dashboard',
  },
  {
    id: 4,
    icon: Factory,
    label: 'Select & Produce',
    title: 'Select your supplier and start production',
    description:
      'Choose your preferred supplier, confirm the order, and grant controlled file access under NDA. The production workflow is tracked end-to-end through the platform.',
    details: [
      'Controlled CAD file release after NDA confirmation',
      'Order confirmation & production kickoff',
      'Milestone tracking & communication log',
      'Planned: transaction protection & escrow',
    ],
    color: '#059669',
    bg: '#ECFDF5',
    image: 'https://images.unsplash.com/photo-1565785759001-90e62e04fa16?w=600&q=80&auto=format&fit=crop',
    imageAlt: 'Metal 3D printing machine in operation',
  },
  {
    id: 5,
    icon: CheckSquare,
    label: 'Inspect & Complete',
    title: 'Inspect parts and close the project',
    description:
      'Receive parts with full traceability documentation. Review quality reports, approve delivery, and provide supplier feedback to maintain quality standards on the platform.',
    details: [
      'Dimensional & material inspection reports',
      'Quality documentation & traceability records',
      'Part approval & delivery confirmation',
      'Supplier rating and platform feedback',
    ],
    color: '#0F1F3D',
    bg: '#F1F5F9',
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600&q=80&auto=format&fit=crop',
    imageAlt: 'Quality inspection of metal parts',
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const step = STEPS[activeStep];
  const Icon = step.icon;

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-[#1D4ED8] mb-3 block">The Process</span>
          <h2 className="text-4xl font-extrabold text-[#0F172A] mb-4">
            How CapacityBridge Works
          </h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            From project submission to part delivery — a structured, secure, and transparent workflow designed for industrial metal AM sourcing.
          </p>
        </div>

        {/* Step tabs */}
        <div className="flex items-center justify-center mb-12 overflow-x-auto pb-2">
          <div className="flex items-center gap-0 relative">
            {STEPS.map((s, i) => {
              const StepIcon = s.icon;
              const isActive = i === activeStep;
              const isDone = i < activeStep;
              return (
                <div key={s.id} className="flex items-center">
                  <button
                    onClick={() => setActiveStep(i)}
                    className={`flex flex-col items-center gap-2 group transition-all duration-200 px-3`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        isActive
                          ? 'border-transparent text-white shadow-lg scale-110'
                          : isDone
                          ? 'border-transparent text-white'
                          : 'border-[#E2E8F0] bg-white text-[#94A3B8] group-hover:border-[#1D4ED8] group-hover:text-[#1D4ED8]'
                      }`}
                      style={isActive || isDone ? { backgroundColor: s.color } : {}}
                    >
                      <StepIcon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-xs font-semibold whitespace-nowrap transition-colors ${
                        isActive ? 'text-[#0F172A]' : isDone ? 'text-[#64748B]' : 'text-[#94A3B8] group-hover:text-[#64748B]'
                      }`}
                    >
                      {s.label}
                    </span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className="w-12 sm:w-20 h-0.5 mx-1 mb-6 relative overflow-hidden rounded-full bg-[#E2E8F0]">
                      <div
                        className="absolute inset-y-0 left-0 bg-[#1D4ED8] transition-all duration-500"
                        style={{ width: i < activeStep ? '100%' : '0%' }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Active step content */}
        <div
          className="rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-xl transition-all duration-300"
          style={{ background: step.bg }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left — text content */}
            <div className="p-8 sm:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md"
                  style={{ backgroundColor: step.color }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span
                    className="text-xs font-bold tracking-widest uppercase"
                    style={{ color: step.color }}
                  >
                    Step {step.id} of {STEPS.length}
                  </span>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-4 leading-tight">
                {step.title}
              </h3>
              <p className="text-[#64748B] text-base leading-relaxed mb-8">
                {step.description}
              </p>

              <ul className="space-y-3 mb-8">
                {step.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-white text-xs font-bold"
                      style={{ backgroundColor: step.color }}
                    >
                      ✓
                    </div>
                    <span className="text-sm text-[#374151]">{d}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-3">
                {activeStep > 0 && (
                  <button
                    onClick={() => setActiveStep(activeStep - 1)}
                    className="px-4 py-2 rounded-lg border border-[#E2E8F0] bg-white text-sm font-medium text-[#64748B] hover:text-[#0F172A] transition-colors"
                  >
                    ← Previous
                  </button>
                )}
                {activeStep < STEPS.length - 1 ? (
                  <button
                    onClick={() => setActiveStep(activeStep + 1)}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-white text-sm font-semibold transition-colors hover:opacity-90"
                    style={{ backgroundColor: step.color }}
                  >
                    Next Step <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <a
                    href="#submit-project"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-white text-sm font-semibold transition-colors hover:opacity-90 bg-[#1D4ED8]"
                  >
                    Submit a Project <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Right — image */}
            <div className="relative min-h-[300px] lg:min-h-0 overflow-hidden">
              <img
                src={step.image}
                alt={step.imageAlt}
                className="w-full h-full object-cover transition-all duration-500"
                style={{ minHeight: '340px' }}
              />
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: `linear-gradient(135deg, ${step.color}44, transparent)`,
                }}
              />
              {/* Step counter overlay */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2 shadow-lg">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: step.color }}
                />
                <span className="text-xs font-bold text-[#0F172A]">{step.label}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-6">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeStep ? 'w-6 h-2 bg-[#1D4ED8]' : 'w-2 h-2 bg-[#CBD5E1] hover:bg-[#94A3B8]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
