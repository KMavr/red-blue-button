import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import type { ReactNode } from 'react';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: { en: { translation: {} } },
  interpolation: { escapeValue: false },
  // Return the key when no translation found
  parseMissingKeyHandler: (key) => key,
});

export function I18nTestWrapper({ children }: { children: ReactNode }) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
