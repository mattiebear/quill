import { FC } from 'react'
import { ClerkProvider } from "@clerk/clerk-react";
import { RouterProvider } from 'react-router-dom'

import { router } from '@/config/router'

export const App: FC = () => {
	return (
		<ClerkProvider publishableKey={import.meta.env.VITE_APP_CLERK_PUBLISHABLE_KEY}>
			<RouterProvider router={router} />
		</ClerkProvider>
	)
}
