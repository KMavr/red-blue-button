import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LanguageSelector from './components/LanguageSelector/LanguageSelector';
import Footer from './components/Footer/Footer';
import { useScrollToTop } from './hooks/useScrollToTop';
import Spinner from './components/Spinner/Spinner';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const ResultsPage = lazy(() => import('./pages/ResultsPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const WhyBluePage = lazy(() => import('./pages/WhyBluePage'));
const WhyRedPage = lazy(() => import('./pages/WhyRedPage'));

function AppContent() {
  useScrollToTop();
  return (
    <div className="flex min-h-dvh flex-col">
      <LanguageSelector />
      <main className="flex grow flex-col">
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/why-blue" element={<WhyBluePage />} />
            <Route path="/why-red" element={<WhyRedPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
