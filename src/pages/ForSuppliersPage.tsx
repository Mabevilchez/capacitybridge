import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle, ArrowRight, ChevronRight, ChevronLeft, Package, Factory, Award, Clock, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

const steps = ['Company', 'Machines', 'Services', 'Certifications', 'Availability', 'Review'];

const schema = z.object({
  company_name: z.string().min(2, 'Company name required'),
  contact_name: z.string().min(2, 'Contact name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  website: z.string().optional(),
  company_description: z.string().optional(),
  address: z.string().optional(),
  city: z.string().min(1, 'City required'),
  country: z.string().min(1, 'Country required'),
  years_experience: z.string().optional(),
  machine_manufacturer: z.string().optional(),
  machine_model: z.string().optional(),
  machine_technology: z.string().optional(),
  machine_materials: z.string().optional(),
  nda_capability: z.boolean().optional(),
  secure_file_process: z.boolean().optional(),
  availability_status: z.string().optional(),
  supplier_consent: z.boolean().refine(v => v === true, 'Consent is required'),
});

type FormData = z.infer<typeof schema>;

const supplierBenefits = [
  { icon: Package, title: 'Receive technically relevant requests', desc: 'Only receive project requests that match your actual machine capabilities and material certifications.' },
  { icon: Factory, title: 'Control your available capacity', desc: 'Define exactly what capacity you can offer and manage your availability in real time.' },
  { icon: Award, title: 'Build a verified quality profile', desc: 'Showcase your certifications, quality score, and post-processing capabilities to qualified customers.' },
  { icon: Shield, title: 'Protect yourself with clear project scopes', desc: 'Receive structured, well-defined project briefs before committing to a quotation.' },
  { icon: Clock, title: 'Submit structured quotations', desc: 'Respond to requests with a standardised format covering price, lead time, and process details.' },
  { icon: Zap, title: 'Access new European engineering customers', desc: 'Connect with qualified engineering teams and R&D departments across Germany and Europe.' },
];

const allServices = [
  'Design for additive manufacturing', 'Topology optimisation', 'Build preparation',
  'Prototype production', 'Low-volume production', 'Serial production',
  'Support removal', 'Heat treatment', 'HIP', 'CNC finishing',
  'Polishing', 'Shot peening', 'Coating', 'Dimensional inspection',
  'CT scanning', 'Material testing', 'Packaging', 'Logistics',
];

const allCertifications = [
  'ISO 9001', 'AS9100', 'ISO 13485', 'IATF 16949',
  'Machine calibration certificates', 'Material certificates', 'Quality documentation',
];

export default function ForSuppliersPage() {
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);
  const { toast } = useToast();

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { nda_capability: false, secure_file_process: false, supplier_consent: false },
  });

  const toggleService = (s: string) => setSelectedServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const toggleCert = (c: string) => setSelectedCerts(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const { data: supplierData, error } = await supabase.from('suppliers').insert({
        company_name: data.company_name,
        contact_name: data.contact_name,
        email: data.email,
        phone: data.phone,
        website: data.website,
        company_description: data.company_description,
        address: data.address,
        city: data.city,
        country: data.country,
        years_experience: data.years_experience ? parseInt(data.years_experience) : null,
        nda_capability: data.nda_capability,
        secure_file_process: data.secure_file_process,
        verification_status: 'pending',
      }).select().single();

      if (error) throw error;

      if (supplierData && selectedServices.length > 0) {
        await supabase.from('supplier_services').insert(
          selectedServices.map(s => ({ supplier_id: supplierData.id, service_name: s }))
        );
      }

      if (supplierData && selectedCerts.length > 0) {
        await supabase.from('supplier_certifications').insert(
          selectedCerts.map(c => ({ supplier_id: supplierData.id, certification_name: c, verification_status: 'pending' }))
        );
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      toast({ title: 'Error', description: 'Could not submit. Please try again.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0F1F3D] to-[#1D4ED8] py-20 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm font-semibold text-blue-200 uppercase tracking-wider mb-4">For Metal AM Suppliers</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Turn available metal AM capacity into qualified industrial projects.
          </h1>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto mb-8">
            CapacityBridge connects verified industrial metal 3D printing suppliers with qualified engineering customers across Germany and Europe.
          </p>
          <Button size="lg" onClick={() => setShowForm(true)} className="bg-white text-[#0F1F3D] hover:bg-blue-50 px-10">
            Apply as a Supplier <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F1F3D] mb-4">Why join CapacityBridge as a supplier?</h2>
            <p className="text-[#64748B] max-w-xl mx-auto">Purpose-built for industrial metal AM suppliers who want qualified customers, not generic machine-rental leads.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supplierBenefits.map((b) => (
              <div key={b.title} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-6">
                <div className="w-11 h-11 bg-[#EFF6FF] rounded-xl flex items-center justify-center mb-4">
                  <b.icon className="w-5 h-5 text-[#1D4ED8]" />
                </div>
                <h3 className="font-bold text-[#0F1F3D] mb-2">{b.title}</h3>
                <p className="text-sm text-[#64748B]">{b.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button size="lg" onClick={() => setShowForm(true)} className="bg-[#1D4ED8] text-white hover:bg-blue-700">
              Apply as a Supplier <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Application Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl my-8 shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-[#E2E8F0]">
              <div>
                <h2 className="text-xl font-bold text-[#0F1F3D]">Supplier Application</h2>
                <p className="text-sm text-[#64748B]">Early-access programme — CapacityBridge will verify your details</p>
              </div>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-gray-100 rounded-lg text-[#64748B] text-xl font-bold">✕</button>
            </div>

            {!submitted ? (
              <>
                {/* Progress */}
                <div className="px-6 pt-4 pb-2">
                  <div className="flex items-center gap-1">
                    {steps.map((s, i) => (
                      <div key={s} className="flex items-center gap-1 flex-1">
                        <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${i <= step ? 'bg-[#1D4ED8] text-white' : 'bg-[#E2E8F0] text-[#64748B]'}`}>
                          {i < step ? '✓' : i + 1}
                        </div>
                        <span className={`text-xs hidden sm:block ${i === step ? 'text-[#1D4ED8] font-medium' : 'text-[#64748B]'}`}>{s}</span>
                        {i < steps.length - 1 && <div className={`h-0.5 flex-1 mx-1 ${i < step ? 'bg-[#1D4ED8]' : 'bg-[#E2E8F0]'}`} />}
                      </div>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">

                    {step === 0 && (
                      <div className="space-y-4">
                        <h3 className="font-semibold text-[#0F1F3D]">Company Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Company Name *</Label>
                            <Input {...register('company_name')} placeholder="Your company name" className="mt-1" />
                            {errors.company_name && <p className="text-red-500 text-xs mt-1">{errors.company_name.message}</p>}
                          </div>
                          <div>
                            <Label>Contact Name *</Label>
                            <Input {...register('contact_name')} placeholder="Full name" className="mt-1" />
                            {errors.contact_name && <p className="text-red-500 text-xs mt-1">{errors.contact_name.message}</p>}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Work Email *</Label>
                            <Input {...register('email')} type="email" placeholder="you@company.com" className="mt-1" />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                          </div>
                          <div>
                            <Label>Phone</Label>
                            <Input {...register('phone')} placeholder="+49 ..." className="mt-1" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>City *</Label>
                            <Input {...register('city')} placeholder="e.g. Munich" className="mt-1" />
                            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                          </div>
                          <div>
                            <Label>Country *</Label>
                            <Input {...register('country')} placeholder="e.g. Germany" className="mt-1" />
                            {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
                          </div>
                        </div>
                        <div>
                          <Label>Company Description</Label>
                          <Textarea {...register('company_description')} placeholder="Describe your metal AM capabilities..." className="mt-1 resize-none" rows={3} />
                        </div>
                        <div>
                          <Label>Years of Metal AM Experience</Label>
                          <Input {...register('years_experience')} type="number" placeholder="e.g. 8" className="mt-1" />
                        </div>
                      </div>
                    )}

                    {step === 1 && (
                      <div className="space-y-4">
                        <h3 className="font-semibold text-[#0F1F3D]">Machine Information</h3>
                        <p className="text-sm text-[#64748B]">Enter details for your primary machine. Additional machines can be added after onboarding.</p>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Machine Manufacturer</Label>
                            <Input {...register('machine_manufacturer')} placeholder="e.g. EOS, Trumpf, SLM Solutions" className="mt-1" />
                          </div>
                          <div>
                            <Label>Machine Model</Label>
                            <Input {...register('machine_model')} placeholder="e.g. EOS M400-4" className="mt-1" />
                          </div>
                        </div>
                        <div>
                          <Label>Technology</Label>
                          <Select onValueChange={(v) => setValue('machine_technology', v)}>
                            <SelectTrigger className="mt-1"><SelectValue placeholder="Select technology" /></SelectTrigger>
                            <SelectContent>
                              {['DMLS', 'SLM', 'LPBF', 'EBM', 'DED', 'Metal Binder Jetting'].map(t => (
                                <SelectItem key={t} value={t}>{t}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Supported Materials</Label>
                          <Input {...register('machine_materials')} placeholder="e.g. Ti6Al4V, 316L, AlSi10Mg, Inconel 718" className="mt-1" />
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-4">
                        <h3 className="font-semibold text-[#0F1F3D]">Services Offered</h3>
                        <p className="text-sm text-[#64748B]">Select all services your company can provide.</p>
                        <div className="grid grid-cols-2 gap-2">
                          {allServices.map((s) => (
                            <label key={s} className={`flex items-center gap-2 border rounded-lg p-2.5 cursor-pointer text-sm transition-colors ${selectedServices.includes(s) ? 'bg-[#EFF6FF] border-[#1D4ED8] text-[#1D4ED8]' : 'border-[#E2E8F0] text-[#64748B]'}`}>
                              <Checkbox checked={selectedServices.includes(s)} onCheckedChange={() => toggleService(s)} />
                              {s}
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-4">
                        <h3 className="font-semibold text-[#0F1F3D]">Certifications</h3>
                        <p className="text-sm text-[#64748B]">Select certifications you hold. Documents can be uploaded after onboarding.</p>
                        <div className="grid grid-cols-1 gap-2">
                          {allCertifications.map((c) => (
                            <label key={c} className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer text-sm transition-colors ${selectedCerts.includes(c) ? 'bg-[#ECFDF5] border-[#059669] text-[#059669]' : 'border-[#E2E8F0] text-[#64748B]'}`}>
                              <Checkbox checked={selectedCerts.includes(c)} onCheckedChange={() => toggleCert(c)} />
                              {c}
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 4 && (
                      <div className="space-y-4">
                        <h3 className="font-semibold text-[#0F1F3D]">Availability & Confidentiality</h3>
                        <div>
                          <Label>Availability Status</Label>
                          <Select onValueChange={(v) => setValue('availability_status', v)}>
                            <SelectTrigger className="mt-1"><SelectValue placeholder="Select availability" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="available_now">Available now</SelectItem>
                              <SelectItem value="available_30">Available within 30 days</SelectItem>
                              <SelectItem value="limited">Limited capacity</SelectItem>
                              <SelectItem value="quote_only">Project quotation only</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-3 mt-4">
                          <p className="text-sm font-semibold text-[#0F1F3D]">Supplier Confidentiality Commitment</p>
                          <div className="flex items-center gap-3">
                            <Checkbox id="nda_cap" onCheckedChange={(c) => setValue('nda_capability', c === true)} />
                            <Label htmlFor="nda_cap" className="cursor-pointer text-sm">We can accept and sign NDAs provided by customers</Label>
                          </div>
                          <div className="flex items-center gap-3">
                            <Checkbox id="secure_file" onCheckedChange={(c) => setValue('secure_file_process', c === true)} />
                            <Label htmlFor="secure_file" className="cursor-pointer text-sm">We have a documented secure file-handling process</Label>
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 5 && (
                      <div className="space-y-4">
                        <h3 className="font-semibold text-[#0F1F3D]">Review Application</h3>
                        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 space-y-2 text-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div><span className="text-[#64748B]">Company:</span> <strong>{watch('company_name')}</strong></div>
                            <div><span className="text-[#64748B]">Contact:</span> <strong>{watch('contact_name')}</strong></div>
                            <div><span className="text-[#64748B]">Email:</span> <strong>{watch('email')}</strong></div>
                            <div><span className="text-[#64748B]">Location:</span> <strong>{watch('city')}, {watch('country')}</strong></div>
                            <div><span className="text-[#64748B]">Technology:</span> <strong>{watch('machine_technology') || '—'}</strong></div>
                            <div><span className="text-[#64748B]">Materials:</span> <strong>{watch('machine_materials') || '—'}</strong></div>
                          </div>
                          {selectedServices.length > 0 && (
                            <div><span className="text-[#64748B]">Services:</span> <strong>{selectedServices.length} selected</strong></div>
                          )}
                          {selectedCerts.length > 0 && (
                            <div><span className="text-[#64748B]">Certifications:</span> <strong>{selectedCerts.join(', ')}</strong></div>
                          )}
                        </div>
                        <div className="flex items-start gap-3">
                          <Checkbox id="supplier_consent" onCheckedChange={(c) => setValue('supplier_consent', c === true)} />
                          <Label htmlFor="supplier_consent" className="text-sm cursor-pointer">
                            I confirm the information is accurate and consent to CapacityBridge storing this supplier application
                            for early onboarding verification and matching purposes.
                          </Label>
                        </div>
                        {errors.supplier_consent && <p className="text-red-500 text-xs">{errors.supplier_consent.message}</p>}
                      </div>
                    )}
                  </div>

                  <div className="px-6 pb-6 flex items-center justify-between border-t border-[#E2E8F0] pt-4">
                    <Button type="button" variant="ghost" onClick={() => step > 0 ? setStep(s => s - 1) : setShowForm(false)}>
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      {step === 0 ? 'Cancel' : 'Back'}
                    </Button>
                    {step < steps.length - 1 ? (
                      <Button type="button" onClick={() => setStep(s => s + 1)} className="bg-[#1D4ED8] text-white">
                        Next <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    ) : (
                      <Button type="submit" disabled={loading} className="bg-[#1D4ED8] text-white">
                        {loading ? 'Submitting...' : 'Submit Supplier Application'}
                      </Button>
                    )}
                  </div>
                </form>
              </>
            ) : (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-[#ECFDF5] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-[#059669]" />
                </div>
                <h3 className="text-xl font-bold text-[#0F1F3D] mb-3">Application Received</h3>
                <p className="text-[#64748B] mb-6">
                  Your supplier application has been received. CapacityBridge will contact you regarding
                  capability verification and early supplier onboarding.
                </p>
                <Button onClick={() => setShowForm(false)} className="bg-[#1D4ED8] text-white">Close</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
