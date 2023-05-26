import { ClerkProvider } from '@clerk/clerk-react';
import { FC, PropsWithChildren } from 'react';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<ClerkProvider
			publishableKey={import.meta.env.VITE_APP_CLERK_PUBLISHABLE_KEY}
		>
			{children}
		</ClerkProvider>
	);
};
