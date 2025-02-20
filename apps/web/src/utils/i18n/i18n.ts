import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enLocale from '@/utils/i18n/locales/en.json';
import plLocale from '@/utils/i18n/locales/pl.json';

const resources = {
  en: {
    translation: enLocale,
  },

  pl: {
    translation: plLocale,
  },
};

i18n.use(initReactI18next).init({
  lng: 'pl',
  fallbackLng: 'en',
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
