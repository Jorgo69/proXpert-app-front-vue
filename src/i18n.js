import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import fr from './locales/fr.json';

const i18n = createI18n({
  legacy: false,
  locale: 'fr',
  fallbackLocale: 'en',
  messages: { fr, en },
  globalInjection: true,
});

export default i18n;