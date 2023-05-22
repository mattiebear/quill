import { FC } from 'react'
import { RouterProvider } from '@/lib/router'
import { QueryClientProvider } from '@/lib/queries'

import { AuthProvider } from '../../lib/auth';
import { HttpClientProvider } from '@/lib/http';

export const App: FC = () => {
	return (
		<AuthProvider>
			<HttpClientProvider>
				<QueryClientProvider>
					<RouterProvider />
				</QueryClientProvider>
			</HttpClientProvider>
		</AuthProvider>
	)
}
