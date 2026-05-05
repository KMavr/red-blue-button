import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ResultsPage from './pages/ResultsPage';
import PrivacyPage from './pages/PrivacyPage';
import LanguageSelector from './components/LanguageSelector';

export default function App() {
  return (
    <BrowserRouter>
      <LanguageSelector />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <footer className="site-footer">
        <Link to="/privacy">Privacy Policy</Link>
      </footer>
    </BrowserRouter>
  );
}
