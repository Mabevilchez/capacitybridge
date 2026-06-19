import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  onOpenProjectForm?: () => void;
}

export default function Navbar({ onOpenProjectForm }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'For Customers', href: '/#for-customers' },
    { label: 'For Suppliers', href: '/for-suppliers' },
    { label: 'IP & Security', href: '/#ip-security' },
    { label: 'Early Access', href: '/#early-access' },
  ];

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith('/#')) {
      if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => scrollTo(href.substring(1)), 300);
      } else {
        scrollTo(href.substring(1));
      }
    } else {
      navigate(href);
      setMobileMenuOpen(false);
    }
  };

  const handleSubmitProject = () => {
    setMobileMenuOpen(false);
    if (onOpenProjectForm) {
      onOpenProjectForm();
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#E2E8F0] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1D4ED8] rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-[#0F1F3D] font-bold text-lg tracking-tight">CapacityBridge</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-sm text-[#64748B] hover:text-[#0F1F3D] font-medium transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSubmitProject}
              className="border-[#1D4ED8] text-[#1D4ED8] hover:bg-[#EFF6FF]"
            >
              Submit a Project
            </Button>
            <Button
              size="sm"
              onClick={() => handleNavClick('/for-suppliers')}
              className="bg-[#1D4ED8] hover:bg-blue-700 text-white"
            >
              Join as a Supplier
            </Button>
          </div>

          <button
            className="md:hidden p-2 text-[#64748B]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#E2E8F0] px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="block w-full text-left text-sm text-[#64748B] hover:text-[#0F1F3D] font-medium py-2"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 flex flex-col gap-2 border-t border-[#E2E8F0]">
            <Button
              variant="outline"
              onClick={handleSubmitProject}
              className="border-[#1D4ED8] text-[#1D4ED8] hover:bg-[#EFF6FF] w-full"
            >
              Submit a Project
            </Button>
            <Button
              onClick={() => handleNavClick('/for-suppliers')}
              className="bg-[#1D4ED8] hover:bg-blue-700 text-white w-full"
            >
              Join as a Supplier
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
