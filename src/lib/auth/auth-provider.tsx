import { FC, PropsWithChildren } from 'react'
import { ClerkProvider } from "@clerk/clerk-react";

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<ClerkProvider publishableKey={import.meta.env.VITE_APP_CLERK_PUBLISHABLE_KEY}>
			{children}
		</ClerkProvider>
	)
}
