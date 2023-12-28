import { createConsumer, logger } from '@rails/actioncable';
import { useEffect } from 'react';

import { Application } from '@/lib/application';
import { getToken } from '@/lib/auth';
import { PlayStore } from '@/lib/engine/store/play-store';

import { useEventDispatch } from './use-event-dispatch';

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

export const useEventInit = (gameSessionId: string) => {
	const dispatch = useEventDispatch();

	useEffect(() => {
		const init = async () => {
			const url = await createURL();
			const consumer = createConsumer(url);

			const connection = consumer.subscriptions.create(
				{
					channel: CHANNEL_NAME,
					story: gameSessionId,
				},

				{
					received: (event: { event: string; data: any }) => {
						dispatch(event);
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
	}, [dispatch, gameSessionId]);
};
