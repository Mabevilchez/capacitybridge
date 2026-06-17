import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

const schema = z.object({
  full_name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid work email required'),
  company: z.string().min(1, 'Company name is required'),
  country: z.string().min(1, 'Country is required'),
  interest_type: z.string().min(1, 'Please select your role'),
  expected_timing: z.string().optional(),
  message: z.string().optional(),
  consent: z.boolean().refine(v => v === true, 'Consent is required'),
});

type FormData = z.infer<typeof schema>;

const interestTypes = [
  { value: 'customer', label: 'I need metal AM parts' },
  { value: 'supplier', label: 'I provide metal AM services' },
  { value: 'expert', label: 'I am an industry expert' },
  { value: 'research', label: 'I represent a research institution' },
  { value: 'partner', label: 'I am an ecosystem or investment partner' },
];

interface EarlyAccessSectionProps {
  id?: string;
}

export default function EarlyAccessSection({ id }: EarlyAccessSectionProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { consent: false },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const { error } = await supabase.from('leads').insert({
        full_name: data.full_name,
        email: data.email,
        company: data.company,
        country: data.country,
        interest_type: data.interest_type,
        expected_timing: data.expected_timing,
        message: data.message,
        consent: data.consent,
        source: 'early_access_section',
      });

      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      toast({
        title: 'Submission error',
        description: 'There was an error submitting your request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id={id || 'early-access'} className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0F1F3D]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Content */}
          <div className="text-white">
            <p className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-4">Early Access</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Help shape the metal AM sourcing platform you would use.
            </h2>
            <p className="text-blue-200 text-lg leading-relaxed mb-8">
              We are speaking with engineering teams, R&D departments, procurement teams, and
              industrial metal 3D printing suppliers in Germany and across Europe.
            </p>

            <div className="space-y-4 mb-8">
              {[
                'Join discovery interviews',
                'Participate in the early pilot programme',
                'Influence platform features and workflows',
                'Get priority access when the platform launches',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#059669] shrink-0" />
                  <span className="text-blue-100 text-sm">{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-blue-900/50 border border-blue-700 rounded-xl p-4">
              <p className="text-blue-200 text-sm leading-relaxed">
                <strong className="text-white">Munich-based. TUM innovation project.</strong>
                {' '}Developed with a deep understanding of industrial AM requirements in European manufacturing.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-2xl p-8">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#ECFDF5] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-[#059669]" />
                </div>
                <h3 className="text-xl font-bold text-[#0F1F3D] mb-3">Interest Registered</h3>
                <p className="text-[#64748B] leading-relaxed">
                  Thank you. Your interest has been registered. The CapacityBridge team will contact you
                  regarding interviews, pilot opportunities, or early access.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <h3 className="text-xl font-bold text-[#0F1F3D] mb-2">Request Early Access</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="full_name">Full Name *</Label>
                    <Input id="full_name" {...register('full_name')} placeholder="Your name" className="mt-1" />
                    {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">Work Email *</Label>
                    <Input id="email" type="email" {...register('email')} placeholder="you@company.com" className="mt-1" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Company *</Label>
                    <Input id="company" {...register('company')} placeholder="Company name" className="mt-1" />
                    {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Input id="country" {...register('country')} placeholder="e.g. Germany" className="mt-1" />
                    {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
                  </div>
                </div>

                <div>
                  <Label>I am... *</Label>
                  <Select onValueChange={(v) => setValue('interest_type', v)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      {interestTypes.map((t) => (
                        <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.interest_type && <p className="text-red-500 text-xs mt-1">{errors.interest_type.message}</p>}
                </div>

                <div>
                  <Label htmlFor="message">Message (optional)</Label>
                  <Textarea
                    id="message"
                    {...register('message')}
                    placeholder="What are you working on? What challenges do you face sourcing metal AM parts?"
                    className="mt-1 resize-none"
                    rows={3}
                  />
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consent"
                    onCheckedChange={(checked) => setValue('consent', checked === true)}
                  />
                  <Label htmlFor="consent" className="text-sm text-[#64748B] leading-relaxed cursor-pointer">
                    I agree to be contacted by the CapacityBridge team for research, pilot participation,
                    and early access updates. I understand this is an early-stage project.
                  </Label>
                </div>
                {errors.consent && <p className="text-red-500 text-xs">{errors.consent.message}</p>}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1D4ED8] hover:bg-blue-700 text-white"
                  size="lg"
                >
                  {loading ? 'Submitting...' : 'Request Early Access'}
                  {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
