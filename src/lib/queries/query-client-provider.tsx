import { QueryClientProvider as BaseProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FC, PropsWithChildren } from 'react';

import { queryClient } from '@/lib/queries/query-client';

import { StaticStore } from '../store/static-store';

export const QueryClientProvider: FC<PropsWithChildren> = ({ children }) => {
	StaticStore.set('queryClient', queryClient);

	return (
		<BaseProvider client={queryClient}>
			{children}
			<ReactQueryDevtools position="bottom-right" />
		</BaseProvider>
	);
};
