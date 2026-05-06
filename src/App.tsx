import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ResultsPage from './pages/ResultsPage';
import PrivacyPage from './pages/PrivacyPage';
import AboutPage from './pages/AboutPage';
import WhyBluePage from './pages/WhyBluePage';
import WhyRedPage from './pages/WhyRedPage';
import LanguageSelector from './components/LanguageSelector';
import { useScrollToTop } from './hooks/useScrollToTop';

function AppContent() {
  useScrollToTop();
  return (
    <>
      <LanguageSelector />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/why-blue" element={<WhyBluePage />} />
        <Route path="/why-red" element={<WhyRedPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <footer className="fixed bottom-0 left-0 right-0 flex justify-center gap-6 border-t border-line bg-canvas px-6 py-[1.5rem] z-50">
        <span className="text-secondary text-xs tracking-[0.05em]">© 2026 redor.blue</span>
        <Link to="/about" className="text-secondary text-xs no-underline tracking-[0.05em] hover:text-primary">The Dilemma</Link>
        <Link to="/privacy" className="text-secondary text-xs no-underline tracking-[0.05em] hover:text-primary">Privacy Policy</Link>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
