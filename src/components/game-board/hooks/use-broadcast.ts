import { createConsumer, logger } from '@rails/actioncable';
import { useEffect } from 'react';

import { Application } from '@/lib/application';
import { getToken } from '@/lib/auth';
import { getEventManager } from '@/lib/engine/events/get-event-manager';
import { PlayStore } from '@/lib/engine/store/play-store';

import { useStoryContext } from '../context';

const CHANNEL_NAME = 'StoryChannel';

logger.enabled = Application.isDevelopment();

const createURL = async () => {
	const token = await getToken();

	if (!token) {
		throw new Error('Unable to retrieve user token');
	}

	const url = new URL(Application.WebsocketURL);
	url.searchParams.append('token', token);

	return url.toString();
};

export const useBroadcast = () => {
	const { gameSession } = useStoryContext();

	useEffect(() => {
		const init = async () => {
			const url = await createURL();
			const eventManager = await getEventManager();
			const consumer = createConsumer(url);

			const connection = consumer.subscriptions.create(
				{
					channel: CHANNEL_NAME,
					story: gameSession.id,
				},

				{
					received: (event: { event: string; data: any }) => {
						eventManager.dispatch(event);
					},
				}
			);

			PlayStore.setState({ connection });
		};

		init();

		return () => {
			const connection = PlayStore.getState().connection;

			if (connection) {
				connection.unsubscribe();
			}
		};
	}, [gameSession]);
};
