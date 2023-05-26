import {
	RedirectToSignIn,
	SignIn,
	SignUp,
	SignedIn,
	SignedOut,
} from '@clerk/clerk-react';
import { createBrowserRouter } from 'react-router-dom';

import { Home } from '@/components/home';
import { MenuLayout } from '@/components/layout/menu';
import { Profile } from '@/components/profile';

export const router = createBrowserRouter([
	{
		path: '/sign-in/*',
		element: <SignIn routing="path" path="/sign-in" />,
	},
	{
		path: '/sign-up/*',
		element: <SignUp routing="path" path="/sign-up" />,
	},
	{
		path: '/',
		element: <MenuLayout />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/profile',
				element: (
					<>
						<SignedIn>
							<Profile />
						</SignedIn>
						<SignedOut>
							<RedirectToSignIn />
						</SignedOut>
					</>
				),
			},
		],
	},
]);
