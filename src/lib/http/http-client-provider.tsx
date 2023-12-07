import { useAuth } from '@clerk/clerk-react';
import { FC, PropsWithChildren, useMemo } from 'react';

import { Application } from '../application';
import { StaticStore } from '../store';
import { createHttpClient } from './create-http-client';

export const HttpClientProvider: FC<PropsWithChildren> = ({ children }) => {
	const { getToken } = useAuth();

	const httpClient = useMemo(() => {
		return createHttpClient({
			baseURL: Application.ApiBaseURL,
			getToken,
		});
	}, [getToken]);

	StaticStore.setState({ getToken, httpClient });

	return <>{children}</>;
};
