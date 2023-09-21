import { Text } from '@chakra-ui/react';

import { useGameSessionDetail } from '@/api/game-sessions/detail';
import { useIdParam } from '@/lib/router';
import { assertPresence } from '@/utils/runtime';

import { useGameBoard } from './hooks/use-game-board';
import { PlayUI } from './play-ui';

// import { createConsumer } from '@rails/actioncable';
// import * as ActionCable from '@rails/actioncable';
// import { useCallback, useEffect, useRef } from 'react';

// import { getToken } from '@/lib/auth';
// import { useIdParam } from '@/lib/router';

// TODO: All of this is temporary to just test the ws connection
// It will likely be moved to engine sync after initial views are set up
// ActionCable.logger.enabled = true;

// const useTestConnection = () => {
// 	const id = useIdParam();
// 	const subscriptionRef = useRef<ActionCable.Subscription>();

// 	const setup = useCallback(async () => {
// 		const token = await getToken();
// 		// TODO: Add to ENV
// 		const consumer = createConsumer(
// 			`http://localhost:3000/cable?token=${token}`
// 		);

// 		subscriptionRef.current = consumer.subscriptions.create(
// 			{
// 				channel: 'StoryChannel',
// 				story: id,
// 			},
// 			{
// 				received(data) {
// 					console.log('received', data);
// 				},
// 			}
// 		);
// 	}, [id]);

// 	useEffect(() => {
// 		setup();

// 		return () => {
// 			subscriptionRef.current?.unsubscribe();
// 		};
// 	}, [setup]);
// };

export const GameBoard = () => {
	// useTestConnection();
	const id = useIdParam();
	const { data: gameSession } = useGameSessionDetail(id);

	assertPresence(gameSession);

	useGameBoard(gameSession);

	return <PlayUI />;
};
