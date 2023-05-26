import { QueryClientProvider as BaseProvider } from '@tanstack/react-query';
import { FC, PropsWithChildren } from 'react';

import { queryClient } from '@/lib/queries/query-client';

export const QueryClientProvider: FC<PropsWithChildren> = ({ children }) => {
	return <BaseProvider client={queryClient}>{children}</BaseProvider>;
};
