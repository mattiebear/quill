import { ClerkProvider } from '@clerk/clerk-react';
import { FC, PropsWithChildren } from 'react';

import { Application } from '../application';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<ClerkProvider publishableKey={Application.AuthServiceKey}>
			{children}
		</ClerkProvider>
	);
};
