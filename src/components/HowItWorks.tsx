import { useState } from 'react';
import { Upload, Cpu, BarChart3, Factory, CheckSquare, ArrowRight, Shield } from 'lucide-react';

const STEPS = [
  {
    id: 1,
    icon: Upload,
    label: 'Submit Project',
    title: 'Submit your project requirements',
    description: 'Define your part specifications, upload reference files, set your confidentiality level, and describe your technical requirements. Your CAD data stays under your control at all times.',
    details: [
      'Part geometry and material specification',
      'Required technology (DMLS, LPBF, EBM...)',
      'Quantity, tolerance and surface finish',
      'Confidentiality level: Standard / Restricted / Highly Confidential',
    ],
    color: '#1D4ED8',
    bg: '#EFF6FF',
    image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=700&q=80&auto=format&fit=crop',
    imageAlt: 'Engineer reviewing 3D model on computer',
  },
  {
    id: 2,
    icon: Cpu,
    label: 'Technical Matching',
    title: 'Automated technical matching',
    description: 'CapacityBridge analyses your requirements and matches them against verified supplier capabilities — machines, materials, certifications, and capacity availability.',
    details: [
      'Machine capability and build volume check',
      'Material and technology compatibility',
      'Certification match (ISO 9001, AS9100, etc.)',
      'Available capacity and lead time screening',
    ],
    color: '#7C3AED',
    bg: '#F5F3FF',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80&auto=format&fit=crop',
    imageAlt: 'Technology matching process',
  },
  {
    id: 3,
    icon: BarChart3,
    label: 'Compare Offers',
    title: 'Compare structured supplier offers',
    description: 'Receive standardised, side-by-side quotations from qualified suppliers. Compare price, lead time, certifications, post-processing, and IP protection in one clear view.',
    details: [
      'Standardised quote format for all suppliers',
      'Side-by-side comparison: price, lead time, quality',
      'NDA status and file access controls visible',
      'Supplier score and verification badge',
    ],
    color: '#EA580C',
    bg: '#FFF7ED',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80&auto=format&fit=crop',
    imageAlt: 'Data comparison dashboard',
  },
  {
    id: 4,
    icon: Factory,
    label: 'Select and Produce',
    title: 'Select your supplier and start production',
    description: 'Choose your preferred supplier, confirm the order, and grant controlled file access under NDA. The production workflow is tracked end-to-end through the platform.',
    details: [
      'Controlled CAD file release after NDA confirmation',
      'Order confirmation and production kickoff',
      'Milestone tracking and communication log',
      'Planned: transaction protection and escrow',
    ],
    color: '#059669',
    bg: '#ECFDF5',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=700&q=80&auto=format&fit=crop',
    imageAlt: 'Industrial manufacturing production floor',
  },
  {
    id: 5,
    icon: CheckSquare,
    label: 'Inspect and Complete',
    title: 'Inspect parts and close the project',
    description: 'Receive parts with full traceability documentation. Review quality reports, approve delivery, and provide supplier feedback to maintain quality standards on the platform.',
    details: [
      'Dimensional and material inspection reports',
      'Quality documentation and traceability records',
      'Part approval and delivery confirmation',
      'Supplier rating and platform feedback',
    ],
    color: '#0F1F3D',
    bg: '#F1F5F9',
    image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=700&q=80&auto=format&fit=crop',
    imageAlt: 'Quality inspection of manufactured parts',
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const step = STEPS[activeStep];
  const Icon = step.icon;

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-[#1D4ED8] mb-3 block">The Process</span>
          <h2 className="text-4xl font-extrabold text-[#0F172A] mb-4">How CapacityBridge Works</h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            From project submission to part delivery — a structured, secure, and transparent workflow designed for industrial metal AM sourcing.
          </p>
        </div>

        {/* Step tabs with numbers */}
        <div className="flex items-center justify-center mb-12 overflow-x-auto pb-2">
          <div className="flex items-center">
            {STEPS.map((s, i) => {
              const StepIcon = s.icon;
              const isActive = i === activeStep;
              const isDone = i < activeStep;
              return (
                <div key={s.id} className="flex items-center">
                  <button
                    onClick={() => setActiveStep(i)}
                    className="flex flex-col items-center gap-2 group px-3"
                  >
                    {/* Circle with number + icon */}
                    <div className="relative">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300"
                        style={
                          isActive
                            ? { backgroundColor: s.color, borderColor: s.color }
                            : isDone
                            ? { backgroundColor: s.color, borderColor: s.color }
                            : { backgroundColor: '#F8FAFC', borderColor: '#E2E8F0' }
                        }
                      >
                        <StepIcon
                          className="w-6 h-6"
                          style={{ color: isActive || isDone ? '#fff' : '#94A3B8' }}
                        />
                      </div>
                      {/* Number badge */}
                      <div
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white"
                        style={
                          isActive || isDone
                            ? { backgroundColor: '#0F172A', color: '#fff' }
                            : { backgroundColor: '#E2E8F0', color: '#64748B' }
                        }
                      >
                        {s.id}
                      </div>
                    </div>
                    <span
                      className="text-xs font-semibold whitespace-nowrap"
                      style={{ color: isActive ? '#0F172A' : isDone ? '#64748B' : '#94A3B8' }}
                    >
                      {s.label}
                    </span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className="w-10 sm:w-16 h-0.5 mx-1 mb-7 rounded-full bg-[#E2E8F0] relative overflow-hidden">
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

        {/* Active step content card */}
        <div
          className="rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-xl"
          style={{ background: step.bg }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left — text */}
            <div className="p-8 sm:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md"
                  style={{ backgroundColor: step.color }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: step.color }}
                >
                  Step {step.id} of {STEPS.length}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-4 leading-tight">
                {step.title}
              </h3>
              <p className="text-[#64748B] text-base leading-relaxed mb-8">{step.description}</p>

              <ul className="space-y-3 mb-8">
                {step.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-white text-xs font-bold"
                      style={{ backgroundColor: step.color }}
                    >
                      {i + 1}
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
                    Previous
                  </button>
                )}
                {activeStep < STEPS.length - 1 ? (
                  <button
                    onClick={() => setActiveStep(activeStep + 1)}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-white text-sm font-semibold transition-all hover:opacity-90"
                    style={{ backgroundColor: step.color }}
                  >
                    Next Step <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <a
                    href="#submit-project"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-white text-sm font-semibold bg-[#1D4ED8] hover:bg-[#1e40af] transition-colors"
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
                className="w-full h-full object-cover"
                style={{ minHeight: '340px' }}
              />
              <div
                className="absolute inset-0 opacity-20"
                style={{ background: step.color }}
              />
              <div className="absolute bottom-4 right-4 bg-white/90 rounded-xl px-4 py-2 flex items-center gap-2 shadow-lg">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: step.color }}
                />
                <span className="text-xs font-bold text-[#0F172A]">Step {step.id}: {step.label}</span>
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
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeStep ? '24px' : '8px',
                height: '8px',
                backgroundColor: i === activeStep ? '#1D4ED8' : '#CBD5E1',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
