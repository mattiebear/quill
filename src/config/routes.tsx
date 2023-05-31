import { SignIn, SignUp } from '@clerk/clerk-react';
import { createBrowserRouter } from 'react-router-dom';

import { fetchMapsList } from '@/api/maps';
import { Home } from '@/components/home';
import { AuthMainLayout } from '@/components/layout/main';
import { MapEditor } from '@/components/map-editor';
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
				loader: () => fetchMapsList(),
			},
			{
				path: '/maps/new',
				element: <MapsNew />,
			},
			{
				path: '/maps/:id',
				element: <MapEditor />,
			},
		],
	},
]);
