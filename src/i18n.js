import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi) // Load translations using http (e.g., from public/locales)
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass the i18n instance to react-i18next
  .init({
    supportedLngs: ['en', 'fr', 'ar'],
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
      caches: ['cookie', 'localStorage'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Path to translation files
    },
    react: {
      useSuspense: true, // Enable React Suspense for translations
    },
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
  });

export default i18n;
