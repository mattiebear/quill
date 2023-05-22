import { FC, PropsWithChildren, useMemo } from 'react';
import { httpContext } from './http-context';
import { useAuth } from '@clerk/clerk-react';
import { createHttpClient } from '.';

export const HttpClientProvider: FC<PropsWithChildren> = ({ children }) => {
	const { getToken }= useAuth();

	const client = useMemo(() =>{
		return createHttpClient({ baseURL: import.meta.env.VITE_APP_API_BASE_URL, getToken })
	}, [getToken])

	return (
		<httpContext.Provider value={{ client }}>
			{children}
		</httpContext.Provider>
	)
}
