import { QueryClient } from '@tanstack/react-query';

// TODO: Optimize client options
export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 1, // 1 minute
		},
	},
});
