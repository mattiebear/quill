import { SignIn, SignUp } from '@clerk/clerk-react';
import { createBrowserRouter } from 'react-router-dom';

import { fetchConnectionsList } from '@/api/connections';
import { fetchMapDetail, fetchMapsList } from '@/api/maps';
import { fetchTileManifest } from '@/api/tiles/meta';
import { ErrorBoundary } from '@/components/error';
import { FriendsIndex } from '@/components/friends';
import { Home } from '@/components/home';
import { MainLayout } from '@/components/layout/main';
import { MapEditor } from '@/components/map-editor';
import { MapsIndex, MapsNew } from '@/components/maps';
import { PlaySessionsIndex } from '@/components/play-sessions';
import { Protected } from '@/lib/auth';

import { Path } from './path';

export const router = createBrowserRouter([
	{
		path: '/',
		errorElement: <ErrorBoundary />,
		children: [
			{
				path: `${Path.SignIn}/*`,
				element: <SignIn routing="path" path={Path.SignIn} />,
			},
			{
				path: `${Path.SignUp}/*`,
				element: <SignUp routing="path" path={Path.SignUp} />,
			},
			{
				path: Path.Map,
				element: (
					<Protected>
						<MapEditor />
					</Protected>
				),
				// TODO: Fix this typing. Also, how should we handle the loader for this route?
				// TODO: Move loaders to separate file
				loader: ({ params }) => {
					return Promise.all([
						fetchMapDetail(params.id as string),
						fetchTileManifest(),
					]);
				},
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
						path: Path.Home,
						element: <Home />,
					},
					{
						path: Path.Maps,
						element: <MapsIndex />,
						loader: () => fetchMapsList(),
					},
					{
						path: Path.NewMap,
						element: <MapsNew />,
					},
					{
						path: Path.Friends,
						element: <FriendsIndex />,
						loader: () => fetchConnectionsList(),
					},
					{
						path: Path.PlaySessions,
						element: <PlaySessionsIndex />,
					},
				],
			},
		],
	},
]);
