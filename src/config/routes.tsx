import { SignIn, SignUp } from '@clerk/clerk-react';
import { createBrowserRouter } from 'react-router-dom';

import { fetchMapDetail, fetchMapsList } from '@/api/maps';
import { Home } from '@/components/home';
import { MainLayout } from '@/components/layout/main';
import { MapEditor } from '@/components/map-editor';
import { MapsIndex, MapsNew } from '@/components/maps';
import { Protected } from '@/lib/auth';

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
		element: (
			<Protected>
				<MainLayout />
			</Protected>
		),
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
				// TODO: Fix this typing
				loader: ({ params }) => fetchMapDetail(params.id as string),
			},
		],
	},
]);
