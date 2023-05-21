import { FC } from 'react'
import { RouterProvider } from '@/lib/router'
import { QueryClientProvider } from '@/lib/queries'

import { AuthProvider } from '../../lib/auth';

export const App: FC = () => {
	return (
		<AuthProvider>
			<QueryClientProvider>
				<RouterProvider />
			</QueryClientProvider>
		</AuthProvider>
	)
}
