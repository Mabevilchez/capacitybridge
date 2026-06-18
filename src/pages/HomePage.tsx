import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import CustomerBenefits from '@/components/CustomerBenefits';
import IPSecuritySection from '@/components/IPSecuritySection';
import EarlyAccessSection from '@/components/EarlyAccessSection';
import AcademicContextSection from '@/components/AcademicContextSection';
import ProjectSubmissionForm from '@/components/ProjectSubmissionForm';

export default function HomePage() {
  const [showProjectForm, setShowProjectForm] = useState(false);

  const scrollToEarlyAccess = () => {
    const el = document.querySelector('#early-access');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <HeroSection
        onSubmitProject={() => setShowProjectForm(true)}
        onJoinAccess={scrollToEarlyAccess}
      />
      <AcademicContextSection />
      <CustomerBenefits />
      <HowItWorks />
      <IPSecuritySection />
      <div id="submit-project" />
      <EarlyAccessSection id="early-access" />

      {showProjectForm && (
        <ProjectSubmissionForm onClose={() => setShowProjectForm(false)} />
      )}
    </>
  );
}
