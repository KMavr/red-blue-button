import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const RTL_LANGUAGES = new Set(['ar']);

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'el', label: 'Ελληνικά' },
  { code: 'es', label: 'Español' },
  { code: 'pt', label: 'Português' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'zh', label: '中文' },
  { code: 'ru', label: 'Русский' },
  { code: 'ar', label: 'العربية' },
];

function LanguageSelector() {
  const { i18n } = useTranslation();

  const currentCode = i18n.language.split('-')[0];

  useEffect(() => {
    const dir = RTL_LANGUAGES.has(currentCode) ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = currentCode;
  }, [currentCode]);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    i18n.changeLanguage(e.target.value);
  }

  return (
    <div className="lang-selector">
      <select
        className="lang-selector__select"
        value={currentCode}
        onChange={handleChange}
        aria-label="Select language"
      >
        {LANGUAGES.map(({ code, label }) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSelector;
