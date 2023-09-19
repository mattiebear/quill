import { useAuth } from '@clerk/clerk-react';
import { FC, PropsWithChildren, useMemo } from 'react';

import { createHttpClient } from '.';
import { staticStore } from '../store';

export const HttpClientProvider: FC<PropsWithChildren> = ({ children }) => {
	const { getToken } = useAuth();

	const httpClient = useMemo(() => {
		return createHttpClient({
			baseURL: import.meta.env.VITE_APP_API_BASE_URL,
			getToken,
		});
	}, [getToken]);

	staticStore.setState({ getToken, httpClient });

	return <>{children}</>;
};
