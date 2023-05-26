import { FC, PropsWithChildren, useRef } from 'react';
import { I18nextProvider } from 'react-i18next';

import { createI18nInstance } from './i18n';

export const I18nProvider: FC<PropsWithChildren> = ({ children }) => {
	const clientRef = useRef(createI18nInstance());

	console.log('I18nProvider', clientRef.current);

	return <I18nextProvider i18n={clientRef.current}>{children}</I18nextProvider>;
};
