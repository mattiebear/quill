import { FC } from 'react';

import { AuthProvider } from '@/lib/auth';
import { HttpClientProvider } from '@/lib/http';
import { I18nProvider } from '@/lib/i18n';
import { EventProvider } from '@/lib/messaging';
import { QueryClientProvider } from '@/lib/queries';
import { RouterProvider } from '@/lib/router';
import { ThemeProvider } from '@/lib/theme';

export const App: FC = () => {
	return (
		<I18nProvider>
			<ThemeProvider>
				<EventProvider>
					<QueryClientProvider>
						<AuthProvider>
							<HttpClientProvider>
								<RouterProvider />
							</HttpClientProvider>
						</AuthProvider>
					</QueryClientProvider>
				</EventProvider>
			</ThemeProvider>
		</I18nProvider>
	);
};
