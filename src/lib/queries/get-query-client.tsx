import { QueryClient } from '@tanstack/react-query';

import { StaticStore } from '../store/static-store';

export const getQueryClient = () => {
	return StaticStore.fetch<QueryClient>('queryClient');
};
