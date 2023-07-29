import en from '../lib/i18n/locales/en.json';

declare module 'i18next' {
	interface CustomTypeOptions {
		defaultNS: 'en';
		resources: {
			en: (typeof en)['translation'];
		};
	}
}
