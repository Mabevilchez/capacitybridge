import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle, ChevronRight, ChevronLeft, AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

const steps = ['Project', 'Technical', 'Confidentiality', 'Company', 'Review'];

const schema = z.object({
  project_name: z.string().min(2, 'Project name required'),
  part_name: z.string().min(2, 'Part name required'),
  project_description: z.string().optional(),
  intended_application: z.string().optional(),
  industry: z.string().optional(),
  project_type: z.string().optional(),
  quantity: z.string().optional(),
  delivery_date: z.string().optional(),
  delivery_location: z.string().optional(),
  technology: z.string().optional(),
  material: z.string().optional(),
  dimensions: z.string().optional(),
  tolerance: z.string().optional(),
  surface_finish: z.string().optional(),
  confidentiality_level: z.string().min(1, 'Select confidentiality level'),
  nda_requirement: z.string().optional(),
  cad_visibility: z.string().optional(),
  hide_company_identity: z.boolean().optional(),
  hide_project_name: z.boolean().optional(),
  additional_confidentiality_notes: z.string().optional(),
  customer_name: z.string().min(2, 'Full name required'),
  customer_company: z.string().min(1, 'Company required'),
  customer_email: z.string().email('Valid email required'),
  customer_phone: z.string().optional(),
  job_title: z.string().optional(),
  website: z.string().optional(),
  prototype_consent: z.boolean().refine(v => v === true, 'You must acknowledge the prototype status'),
});

type FormData = z.infer<typeof schema>;

interface ProjectSubmissionFormProps {
  onClose: () => void;
}

export default function ProjectSubmissionForm({ onClose }: ProjectSubmissionFormProps) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      confidentiality_level: 'restricted',
      hide_company_identity: false,
      hide_project_name: false,
      prototype_consent: false,
    },
  });

  const confidentialityLevel = watch('confidentiality_level');

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const { error } = await supabase.from('customer_projects').insert({
        project_name: data.project_name,
        part_name: data.part_name,
        project_description: data.project_description,
        intended_application: data.intended_application,
        industry: data.industry,
        project_type: data.project_type,
        quantity: data.quantity ? parseInt(data.quantity) : null,
        technology: data.technology,
        material: data.material,
        dimensions: data.dimensions,
        tolerance: data.tolerance,
        surface_finish: data.surface_finish,
        delivery_date: data.delivery_date || null,
        delivery_location: data.delivery_location,
        confidentiality_level: data.confidentiality_level,
        nda_requirement: data.nda_requirement,
        cad_visibility: data.cad_visibility,
        hide_company_identity: data.hide_company_identity,
        hide_project_name: data.hide_project_name,
        additional_confidentiality_notes: data.additional_confidentiality_notes,
        customer_name: data.customer_name,
        customer_company: data.customer_company,
        customer_email: data.customer_email,
        customer_phone: data.customer_phone,
        status: 'new',
      });
      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      toast({ title: 'Error', description: 'Could not submit. Please try again.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const confidentialitySummary: Record<string, string> = {
    standard: 'General project info shared with matching suppliers. Full files shared only with selected supplier.',
    restricted: 'Anonymised technical summary shared. NDA required before detailed files are visible. Company identity can remain hidden.',
    highly_confidential: 'Minimal anonymised request used. CapacityBridge manually approves access. Customer NDA accepted. Full identity protection.',
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl my-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E2E8F0]">
          <div>
            <h2 className="text-xl font-bold text-[#0F1F3D]">Submit a Project</h2>
            <p className="text-sm text-[#64748B]">Early-access prototype — do not upload sensitive CAD files</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg text-[#64748B]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!submitted ? (
          <>
            {/* Progress */}
            <div className="px-6 pt-4 pb-2">
              <div className="flex items-center gap-1">
                {steps.map((s, i) => (
                  <div key={s} className="flex items-center gap-1 flex-1">
                    <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-colors ${i <= step ? 'bg-[#1D4ED8] text-white' : 'bg-[#E2E8F0] text-[#64748B]'}`}>
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

                {/* Step 0: Project */}
                {step === 0 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-[#0F1F3D]">Project Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Project Name *</Label>
                        <Input {...register('project_name')} placeholder="e.g. Bracket Assembly Rev2" className="mt-1" />
                        {errors.project_name && <p className="text-red-500 text-xs mt-1">{errors.project_name.message}</p>}
                      </div>
                      <div>
                        <Label>Part Name *</Label>
                        <Input {...register('part_name')} placeholder="e.g. Titanium Bracket" className="mt-1" />
                        {errors.part_name && <p className="text-red-500 text-xs mt-1">{errors.part_name.message}</p>}
                      </div>
                    </div>
                    <div>
                      <Label>Project Description</Label>
                      <Textarea {...register('project_description')} placeholder="Describe your project..." className="mt-1 resize-none" rows={3} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Intended Application</Label>
                        <Input {...register('intended_application')} placeholder="e.g. Aerospace bracket" className="mt-1" />
                      </div>
                      <div>
                        <Label>Industry</Label>
                        <Select onValueChange={(v) => setValue('industry', v)}>
                          <SelectTrigger className="mt-1"><SelectValue placeholder="Select industry" /></SelectTrigger>
                          <SelectContent>
                            {['Aerospace', 'Automotive', 'Medical', 'Defence', 'Energy', 'Industrial', 'Research', 'Other'].map(i => (
                              <SelectItem key={i} value={i.toLowerCase()}>{i}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Project Type</Label>
                        <Select onValueChange={(v) => setValue('project_type', v)}>
                          <SelectTrigger className="mt-1"><SelectValue placeholder="Prototype / Production" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="prototype">Prototype</SelectItem>
                            <SelectItem value="production">Production</SelectItem>
                            <SelectItem value="series">Series production</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Quantity</Label>
                        <Input {...register('quantity')} type="number" placeholder="e.g. 50" className="mt-1" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Target Delivery Date</Label>
                        <Input {...register('delivery_date')} type="date" className="mt-1" />
                      </div>
                      <div>
                        <Label>Delivery Location</Label>
                        <Input {...register('delivery_location')} placeholder="e.g. Munich, Germany" className="mt-1" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 1: Technical */}
                {step === 1 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-[#0F1F3D]">Technical Requirements</h3>
                    <div className="bg-[#FFF7ED] border border-orange-200 rounded-lg p-3 text-sm text-[#EA580C]">
                      <AlertTriangle className="w-4 h-4 inline mr-1" />
                      For early access, do not upload CAD files. Describe your requirements in text.
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Preferred Technology</Label>
                        <Select onValueChange={(v) => setValue('technology', v)}>
                          <SelectTrigger className="mt-1"><SelectValue placeholder="Select technology" /></SelectTrigger>
                          <SelectContent>
                            {['DMLS', 'SLM', 'LPBF', 'EBM', 'DED', 'Metal Binder Jetting', 'Help me select'].map(t => (
                              <SelectItem key={t} value={t.toLowerCase()}>{t}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Material</Label>
                        <Input {...register('material')} placeholder="e.g. Ti6Al4V, 316L" className="mt-1" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Dimensions (mm)</Label>
                        <Input {...register('dimensions')} placeholder="e.g. 150 x 80 x 60" className="mt-1" />
                      </div>
                      <div>
                        <Label>Tolerance</Label>
                        <Input {...register('tolerance')} placeholder="e.g. ±0.05 mm" className="mt-1" />
                      </div>
                    </div>
                    <div>
                      <Label>Surface Finish Requirements</Label>
                      <Input {...register('surface_finish')} placeholder="e.g. Ra 3.2, as-built" className="mt-1" />
                    </div>
                  </div>
                )}

                {/* Step 2: Confidentiality */}
                {step === 2 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-[#0F1F3D]">Confidentiality Settings</h3>
                    <div>
                      <Label>Protection Level *</Label>
                      <div className="grid grid-cols-1 gap-3 mt-2">
                        {[
                          { value: 'standard', label: 'Standard', desc: 'General info shared. Full files only with selected supplier.' },
                          { value: 'restricted', label: 'Restricted (Default)', desc: 'Anonymised summary. NDA required before file access.' },
                          { value: 'highly_confidential', label: 'Highly Confidential', desc: 'Minimal anonymised request. Manual approval. Customer NDA.' },
                        ].map((opt) => (
                          <label key={opt.value} className={`flex items-start gap-3 border-2 rounded-xl p-4 cursor-pointer transition-colors ${confidentialityLevel === opt.value ? 'border-[#1D4ED8] bg-[#EFF6FF]' : 'border-[#E2E8F0]'}`}>
                            <input type="radio" className="mt-1" value={opt.value} {...register('confidentiality_level')} />
                            <div>
                              <p className="font-semibold text-[#0F1F3D] text-sm">{opt.label}</p>
                              <p className="text-xs text-[#64748B] mt-0.5">{opt.desc}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                      {errors.confidentiality_level && <p className="text-red-500 text-xs mt-1">{errors.confidentiality_level.message}</p>}
                    </div>
                    {confidentialityLevel && (
                      <div className="bg-[#ECFDF5] border border-green-200 rounded-lg p-3 text-sm text-[#059669]">
                        <strong>Effect: </strong>{confidentialitySummary[confidentialityLevel] || ''}
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Checkbox id="hide_company" onCheckedChange={(c) => setValue('hide_company_identity', c === true)} />
                        <Label htmlFor="hide_company" className="cursor-pointer">Hide company identity</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="hide_project" onCheckedChange={(c) => setValue('hide_project_name', c === true)} />
                        <Label htmlFor="hide_project" className="cursor-pointer">Hide project name</Label>
                      </div>
                    </div>
                    <div>
                      <Label>Additional Confidentiality Instructions</Label>
                      <Textarea {...register('additional_confidentiality_notes')} placeholder="Any specific confidentiality requirements..." className="mt-1 resize-none" rows={3} />
                    </div>
                  </div>
                )}

                {/* Step 3: Company */}
                {step === 3 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-[#0F1F3D]">Your Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Full Name *</Label>
                        <Input {...register('customer_name')} placeholder="Your full name" className="mt-1" />
                        {errors.customer_name && <p className="text-red-500 text-xs mt-1">{errors.customer_name.message}</p>}
                      </div>
                      <div>
                        <Label>Company *</Label>
                        <Input {...register('customer_company')} placeholder="Company name" className="mt-1" />
                        {errors.customer_company && <p className="text-red-500 text-xs mt-1">{errors.customer_company.message}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Work Email *</Label>
                        <Input {...register('customer_email')} type="email" placeholder="you@company.com" className="mt-1" />
                        {errors.customer_email && <p className="text-red-500 text-xs mt-1">{errors.customer_email.message}</p>}
                      </div>
                      <div>
                        <Label>Phone</Label>
                        <Input {...register('customer_phone')} placeholder="+49 ..." className="mt-1" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Job Title</Label>
                        <Input {...register('job_title')} placeholder="e.g. Design Engineer" className="mt-1" />
                      </div>
                      <div>
                        <Label>Company Website</Label>
                        <Input {...register('website')} placeholder="https://..." className="mt-1" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Review */}
                {step === 4 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-[#0F1F3D]">Review Your Submission</h3>
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 space-y-3 text-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div><span className="text-[#64748B]">Project:</span> <strong>{watch('project_name')}</strong></div>
                        <div><span className="text-[#64748B]">Part:</span> <strong>{watch('part_name')}</strong></div>
                        <div><span className="text-[#64748B]">Technology:</span> <strong>{watch('technology') || '—'}</strong></div>
                        <div><span className="text-[#64748B]">Material:</span> <strong>{watch('material') || '—'}</strong></div>
                        <div><span className="text-[#64748B]">Quantity:</span> <strong>{watch('quantity') || '—'}</strong></div>
                        <div><span className="text-[#64748B]">Confidentiality:</span> <strong className="capitalize">{watch('confidentiality_level')?.replace('_', ' ')}</strong></div>
                        <div><span className="text-[#64748B]">Contact:</span> <strong>{watch('customer_name')}</strong></div>
                        <div><span className="text-[#64748B]">Email:</span> <strong>{watch('customer_email')}</strong></div>
                      </div>
                    </div>
                    <div className="bg-[#FFF7ED] border border-orange-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-[#EA580C] shrink-0 mt-0.5" />
                        <p className="text-sm text-[#0F172A]">
                          I understand that CapacityBridge is currently an early-stage prototype and
                          I should not upload commercially sensitive CAD files until the secure production environment is confirmed.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Checkbox id="prototype_consent" onCheckedChange={(c) => setValue('prototype_consent', c === true)} />
                      <Label htmlFor="prototype_consent" className="text-sm cursor-pointer">
                        I acknowledge the above and consent to CapacityBridge storing this project interest record.
                      </Label>
                    </div>
                    {errors.prototype_consent && <p className="text-red-500 text-xs">{errors.prototype_consent.message}</p>}
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="px-6 pb-6 flex items-center justify-between border-t border-[#E2E8F0] pt-4">
                <Button type="button" variant="ghost" onClick={() => step > 0 ? setStep(s => s - 1) : onClose()}>
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  {step === 0 ? 'Cancel' : 'Back'}
                </Button>
                {step < steps.length - 1 ? (
                  <Button type="button" onClick={() => setStep(s => s + 1)} className="bg-[#1D4ED8] text-white">
                    Next <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={loading} className="bg-[#1D4ED8] text-white">
                    {loading ? 'Submitting...' : 'Submit Project Interest'}
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
            <h3 className="text-xl font-bold text-[#0F1F3D] mb-3">Project Interest Submitted</h3>
            <p className="text-[#64748B] mb-6">
              Your project interest has been recorded. The CapacityBridge team will contact you to discuss
              next steps, including pilot participation and early supplier matching.
            </p>
            <Button onClick={onClose} className="bg-[#1D4ED8] text-white">Close</Button>
          </div>
        )}
      </div>
    </div>
  );
}
