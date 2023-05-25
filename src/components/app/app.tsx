import { FC } from 'react'
import { RouterProvider } from '@/lib/router'
import { QueryClientProvider } from '@/lib/queries'

import { AuthProvider } from '../../lib/auth';
import { HttpClientProvider } from '@/lib/http';
import { ThemeProvider } from '@/lib/theme';

export const App: FC = () => {
	return (
		<AuthProvider>
			<HttpClientProvider>
				<QueryClientProvider>
					<ThemeProvider>
						<RouterProvider />
					</ThemeProvider>
				</QueryClientProvider>
			</HttpClientProvider>
		</AuthProvider>
	)
}
