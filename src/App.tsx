import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PrototypeBanner from '@/components/PrototypeBanner';
import HomePage from '@/pages/HomePage';
import ForSuppliersPage from '@/pages/ForSuppliersPage';
import AdminDashboard from '@/pages/AdminDashboard';
import ProjectSubmissionForm from '@/components/ProjectSubmissionForm';

function App() {
  const [showProjectForm, setShowProjectForm] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-white font-sans antialiased">
        <PrototypeBanner />
        <Navbar onOpenProjectForm={() => setShowProjectForm(true)} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage onOpenProjectForm={() => setShowProjectForm(true)} />} />
            <Route path="/for-suppliers" element={<ForSuppliersPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
        {showProjectForm && (
          <ProjectSubmissionForm onClose={() => setShowProjectForm(false)} />
        )}
      </div>
    </Router>
  );
}

export default App;
