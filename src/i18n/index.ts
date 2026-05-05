import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '../../translations/en.json';
import el from '../../translations/el.json';
import es from '../../translations/es.json';
import pt from '../../translations/pt.json';
import fr from '../../translations/fr.json';
import de from '../../translations/de.json';
import it from '../../translations/it.json';
import ja from '../../translations/ja.json';
import ko from '../../translations/ko.json';
import zh from '../../translations/zh.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      el: { translation: el },
      es: { translation: es },
      pt: { translation: pt },
      fr: { translation: fr },
      de: { translation: de },
      it: { translation: it },
      ja: { translation: ja },
      ko: { translation: ko },
      zh: { translation: zh },
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
