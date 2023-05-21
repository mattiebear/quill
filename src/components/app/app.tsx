import { FC } from 'react'
import { ClerkProvider } from "@clerk/clerk-react";
import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'

import { router } from '@/config/router'
import { queryClient } from '@/lib/query-client';
import { StaticStoreProvider } from '../store/static-store-provider';

export const App: FC = () => {
	return (
		<ClerkProvider publishableKey={import.meta.env.VITE_APP_CLERK_PUBLISHABLE_KEY}>
			<StaticStoreProvider>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
				</QueryClientProvider>
			</StaticStoreProvider>
		</ClerkProvider>
	)
}
