import { Upload, Search, BarChart3, Factory, CheckSquare } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Submit the Project',
    description: 'Provide part description, CAD files (optional at this stage), material, quantity, dimensions, tolerances, required technology, certifications, post-processing needs, and confidentiality level.',
    details: ['Part description & CAD files', 'Material & quantity', 'Tolerances & surface finish', 'Certifications required', 'Delivery deadline & location', 'Confidentiality level selection'],
  },
  {
    number: '02',
    icon: Search,
    title: 'Technical Matching',
    description: 'CapacityBridge matches the request with qualified suppliers based on printing technology, materials, build volume, certifications, quality score, and geographic location.',
    details: ['Technology compatibility', 'Material capabilities', 'Build volume check', 'Certification matching', 'Geographic proximity', 'Available capacity'],
  },
  {
    number: '03',
    icon: BarChart3,
    title: 'Compare Offers',
    description: 'Review structured, comparable quotations covering total price, lead time, supplier rating, technical process, certifications, inspection options, and IP readiness.',
    details: ['Total price & lead time', 'Supplier quality rating', 'Technical process detail', 'Inspection options', 'Logistics & delivery', 'IP & NDA readiness'],
  },
  {
    number: '04',
    icon: Factory,
    title: 'Select and Produce',
    description: 'The selected supplier signs the required confidentiality agreement and receives controlled, time-limited access to project files before production begins.',
    details: ['NDA signing workflow', 'Controlled file access', 'Production confirmation', 'Timeline agreement', 'Quality milestone plan', 'Planned: transaction protection'],
  },
  {
    number: '05',
    icon: CheckSquare,
    title: 'Inspect and Complete',
    description: 'Review delivery, inspection records, material certificates, and quality evidence before approving project completion. Full audit trail maintained.',
    details: ['Dimensional inspection', 'Material certificates', 'Quality evidence review', 'Delivery confirmation', 'Completion approval', 'Project record archive'],
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[#1D4ED8] uppercase tracking-wider mb-3">Process</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F1F3D] mb-4">How CapacityBridge Works</h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            From confidential CAD upload to verified supplier selection and delivery — managed in one secure workflow.
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
            >
              {/* Step Number + Icon */}
              <div className="lg:col-span-1 flex lg:flex-col items-center gap-4 lg:gap-0">
                <div className="w-12 h-12 rounded-xl bg-[#0F1F3D] flex items-center justify-center shrink-0">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block w-0.5 h-12 bg-[#E2E8F0] mx-auto mt-2"></div>
                )}
              </div>

              {/* Content */}
              <div className="lg:col-span-11">
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Step {step.number}</span>
                      </div>
                      <h3 className="text-xl font-bold text-[#0F1F3D] mb-3">{step.title}</h3>
                      <p className="text-[#64748B] mb-4 leading-relaxed">{step.description}</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {step.details.map((detail) => (
                          <div key={detail} className="flex items-center gap-2 text-sm text-[#0F172A]">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8] shrink-0"></div>
                            {detail}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-[#FFF7ED] border border-orange-200 rounded-xl p-4 text-center">
          <p className="text-sm text-[#EA580C]">
            <strong>Note:</strong> Escrow-based transaction protection is a planned future feature and is not yet implemented in this early-access prototype.
          </p>
        </div>
      </div>
    </section>
  );
}
