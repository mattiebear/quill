import { FC } from 'react';

import { HttpClientProvider } from '@/lib/http';
import { QueryClientProvider } from '@/lib/queries';
import { RouterProvider } from '@/lib/router';
import { ThemeProvider } from '@/lib/theme';

import { AuthProvider } from '../../lib/auth';

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
	);
};
