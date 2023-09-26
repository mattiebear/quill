import { createConsumer, logger } from '@rails/actioncable';

import { MapEntity } from '@/entites/map-entity';
import { Application } from '@/lib/application';
import { getToken } from '@/lib/auth';
import { container, inject, Lifespan } from '@/lib/di';
import { Channel, relay } from '@/lib/events';

import { EngineConfig } from '../core/engine-config';
import { StoryEvent } from '../types/event';

logger.enabled = Application.isDevelopment();

type Connection = { send: (data: any) => void; unsubscribe: VoidFunction };

export class Broadcast {
	connection: Connection;
	consumer: ReturnType<typeof createConsumer>;

	private subscriptions: VoidFunction[] = [];

	constructor(private config: EngineConfig) {
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
				received: (event: { event: string; data: unknown }) => {
					relay.channel(Channel.Story).send(event.event, event.data);
				},
			}
		);
	}

	initRelay() {
		const channel = relay.channel(Channel.Story);

		this.subscriptions.push(
			channel.on(StoryEvent.SelectMap, (event: { map: MapEntity }) => {
				this.connection.send({
					event: StoryEvent.SelectMap,
					data: { id: event.map.id },
				});
			})
		);
	}

	destroy() {
		this.subscriptions.forEach((unsubscribe) => unsubscribe());
		this.connection.unsubscribe();
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
