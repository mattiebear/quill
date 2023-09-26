import { useAuth } from '@clerk/clerk-react';
import { FC, PropsWithChildren, useMemo } from 'react';

import { createHttpClient } from '.';
import { Application } from '../application';
import { staticStore } from '../store';

export const HttpClientProvider: FC<PropsWithChildren> = ({ children }) => {
	const { getToken } = useAuth();

	const httpClient = useMemo(() => {
		return createHttpClient({
			baseURL: Application.ApiBaseURL,
			getToken,
		});
	}, [getToken]);

	staticStore.setState({ getToken, httpClient });

	return <>{children}</>;
};
