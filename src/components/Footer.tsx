import { Link, useNavigate } from 'react-router-dom';
import { Zap } from 'lucide-react';

export default function Footer() {
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      const el = document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0F1F3D] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#1D4ED8] rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">CapacityBridge</span>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed mb-3">
              Europe's faster way to source industrial metal 3D printing.
            </p>
            <p className="text-blue-300 text-xs">
              Early-stage TUM innovation project
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-blue-300 mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><button onClick={() => scrollTo('#how-it-works')} className="text-blue-200 hover:text-white text-sm transition-colors">How It Works</button></li>
              <li><button onClick={() => scrollTo('#for-customers')} className="text-blue-200 hover:text-white text-sm transition-colors">For Customers</button></li>
              <li><Link to="/for-suppliers" className="text-blue-200 hover:text-white text-sm transition-colors">For Suppliers</Link></li>
              <li><button onClick={() => scrollTo('#ip-security')} className="text-blue-200 hover:text-white text-sm transition-colors">IP & Security</button></li>
              <li><button onClick={() => scrollTo('#early-access')} className="text-blue-200 hover:text-white text-sm transition-colors">Early Access</button></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-blue-300 mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="mailto:hello@capacitybridge.com" className="text-blue-200 hover:text-white text-sm transition-colors">Contact</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white text-sm transition-colors">Terms of Use</a></li>
            </ul>
          </div>

          {/* Context */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-blue-300 mb-4">Academic Context</h4>
            <p className="text-blue-200 text-sm leading-relaxed">
              Developed as an early-stage innovation project within the{' '}
              <span className="text-white font-medium">Technical University of Munich (TUM)</span>.
            </p>
            <p className="text-blue-300 text-xs mt-3">Munich, Germany</p>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-12 pt-8">
          <p className="text-blue-300 text-xs text-center leading-relaxed">
            © {new Date().getFullYear()} CapacityBridge. All rights reserved.{' '}
            CapacityBridge is currently an early-stage innovation project.
            Marketplace information and supplier examples shown on this website are illustrative.
          </p>
        </div>
      </div>
    </footer>
  );
}
