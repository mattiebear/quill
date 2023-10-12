import { SignIn, SignUp } from '@clerk/clerk-react';
import { createBrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from '@/components/error';
import { FriendsIndex } from '@/components/friends';
import { GameBoard } from '@/components/game-board';
import { GameSessionsIndex } from '@/components/game-sessions';
import { Home } from '@/components/home';
import { MainLayout } from '@/components/layout/main';
import { MapEditor } from '@/components/map-editor';
import { MapsIndex, MapsNew } from '@/components/maps';
import { Protected } from '@/lib/auth';

import {
	friendsLoader,
	gameSessionLoader,
	gameSessionsLoader,
	mapEditorLoader,
	mapsLoader,
} from './loaders';
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
				loader: mapEditorLoader,
			},
			{
				path: Path.GameSession,
				element: (
					<Protected>
						<GameBoard />
					</Protected>
				),
				loader: gameSessionLoader,
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
						loader: mapsLoader,
					},
					{
						path: Path.NewMap,
						element: <MapsNew />,
					},
					{
						path: Path.Friends,
						element: <FriendsIndex />,
						loader: friendsLoader,
					},
					{
						path: Path.GameSessions,
						element: <GameSessionsIndex />,
						loader: gameSessionsLoader,
					},
				],
			},
		],
	},
]);
