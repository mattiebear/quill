import { QueryClientProvider as BaseProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FC, PropsWithChildren } from 'react';

import { queryClient } from '@/lib/queries/query-client';

import { staticStore } from '../store';

export const QueryClientProvider: FC<PropsWithChildren> = ({ children }) => {
	staticStore.setState({ queryClient });

	return (
		<BaseProvider client={queryClient}>
			{children}
			<ReactQueryDevtools position="bottom-right" />
		</BaseProvider>
	);
};
