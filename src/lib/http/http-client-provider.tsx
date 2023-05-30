import { useAuth } from '@clerk/clerk-react';
import { FC, PropsWithChildren, useMemo } from 'react';

import { createHttpClient } from '.';
import { StaticStore } from '../store/static-store';
import { httpContext } from './http-context';

export const HttpClientProvider: FC<PropsWithChildren> = ({ children }) => {
	const { getToken } = useAuth();

	const client = useMemo(() => {
		return createHttpClient({
			baseURL: import.meta.env.VITE_APP_API_BASE_URL,
			getToken,
		});
	}, [getToken]);

	StaticStore.set('http', client);

	return <httpContext.Provider value={client}>{children}</httpContext.Provider>;
};
