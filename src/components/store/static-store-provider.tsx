import { StaticStore } from '@/lib/static-store';
import { useAuth } from '@clerk/clerk-react';
import { PropsWithChildren, FC, useEffect } from 'react';

export const StaticStoreProvider: FC<PropsWithChildren> = ({ children }) => {
	const { getToken } = useAuth();

	useEffect(() => {
		StaticStore.getInstance().set('getToken', getToken);
	}, [getToken]);

	return <>{children}</>;
};
