import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './src/assets/langs/en/translation.json';
import fr from './src/assets/langs/fr/translation.json';

const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources,
});
