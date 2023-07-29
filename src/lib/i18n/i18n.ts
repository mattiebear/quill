import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';

const initialize = () => {
	return i18n.use(initReactI18next).init({
		resources: {
			en,
		},
		fallbackLng: 'en',
		interpolation: {
			escapeValue: false,
		},
	});
};

export const createI18nInstance = () => {
	if (!i18n.isInitialized) {
		initialize().then();
	}

	return i18n;
};
