import { FC } from 'react';

import { HttpClientProvider } from '@/lib/http';
import { I18nProvider } from '@/lib/i18n';
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
						<I18nProvider>
							<RouterProvider />
						</I18nProvider>
					</ThemeProvider>
				</QueryClientProvider>
			</HttpClientProvider>
		</AuthProvider>
	);
};
