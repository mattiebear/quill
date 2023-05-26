import { FC, PropsWithChildren, useRef } from 'react';

import { init } from './i18n';

export const I18nProvider: FC<PropsWithChildren> = ({ children }) => {
	const loadedRef = useRef(false);

	if (!loadedRef.current) {
		// This needs to be done inline rather than in a useEffect hook
		loadedRef.current = true;
		init();
	}

	return <>{children}</>;
};
