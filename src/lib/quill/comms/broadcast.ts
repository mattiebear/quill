import { createConsumer, logger } from '@rails/actioncable';

import { Application } from '@/lib/application';
import { getToken } from '@/lib/auth';
import { container, inject, Lifespan } from '@/lib/di';

import { EngineConfig } from '../core/engine-config';
import { AddToken } from '../messages/add-token';
import { CurrentStoryState } from '../messages/current-story-state';
import { SelectMap } from '../messages/select-map';
import { Subscriber } from './subscriber';

logger.enabled = Application.isDevelopment();

type Connection = { send: (data: any) => void; unsubscribe: VoidFunction };

export class Broadcast extends Subscriber {
	connection: Connection;
	consumer: ReturnType<typeof createConsumer>;

	constructor(private config: EngineConfig) {
		super();
		this.initChannels();
		this.initRelay();
	}

	async initChannels() {
		if (!this.config.isPlayMode) {
			return;
		}

		const token = await getToken();

		if (!token) {
			throw new Error('Unable to retrieve user token');
		}

		this.consumer = createConsumer(this.url(token));

		this.connection = this.consumer.subscriptions.create(
			{
				channel: 'StoryChannel',
				story: this.config.gameSession.id,
			},
			{
				received: (event: { event: string; data: any }) => {
					// TODO: Create message from factory
					let message;

					switch (event.event) {
						case 'current-story-state':
							message = new CurrentStoryState(event.data.mapId);
					}

					if (message) {
						this.send(message);
					}
				},
			}
		);
	}

	initRelay() {
		this.onEvent(SelectMap, (message) => {
			// TODO: message.toJSON()
			this.connection.send({
				event: 'select-map',
				data: { mapId: message.map.id },
			});
		});

		this.onEvent(AddToken, (message) => {
			this.connection.send({
				event: 'add-token',
				data: message.token.toJSON(),
			});
		});
	}

	destroy() {
		this.unsubscribeAll();
		this.connection?.unsubscribe();
	}

	url(token: string) {
		const url = new URL(Application.WebsocketURL);
		url.searchParams.append('token', token);

		return url.toString();
	}
}

inject(Broadcast, [EngineConfig]);

container.register(Broadcast, {
	class: Broadcast,
	lifespan: Lifespan.Resolution,
});
