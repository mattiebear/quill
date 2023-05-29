import { SignIn, SignUp } from '@clerk/clerk-react';
import { createBrowserRouter } from 'react-router-dom';

import { Home } from '@/components/home';
import { AuthMainLayout } from '@/components/layout/main';
import { MapsIndex } from '@/components/maps';
import { MapsNew } from '@/components/maps/maps-new';
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
		element: <AuthMainLayout />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/maps',
				element: <MapsIndex />,
			},
			{
				path: '/maps/new',
				element: <MapsNew />,
			},
			{
				path: '/profile',
				element: <Profile />,
			},
		],
	},
]);
