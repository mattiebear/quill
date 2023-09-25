import { createConsumer, logger } from '@rails/actioncable';

import { MapEntity } from '@/entites/map-entity';
import { getToken } from '@/lib/auth';
import { container, inject, Lifespan } from '@/lib/di';
import { Channel, relay } from '@/lib/events';

import { EngineConfig } from '../core/engine-config';
import { StoryEvent } from '../types/event';

// TODO: Set based on app environment
logger.enabled = true;

type Connection = { send: (data: any) => void; unsubscribe: VoidFunction };

export class Broadcast {
	connection: Connection;
	consumer: ReturnType<typeof createConsumer>;

	constructor(private config: EngineConfig) {
		this.initChannels();
		// this.initRelay();
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

	// initRelay() {
	// 	// TODO: Add unsubscribes
	// 	relay
	// 		.channel(Channel.Story)
	// 		.on(StoryEvent.LoadMap, (event: { map: MapEntity }) => {
	// 			// TODO: Fix naming
	// 			this.channel.send({
	// 				event: 'select-map-id',
	// 				data: { id: event.map.id },
	// 			});
	// 		});
	// }

	destroy() {
		this.connection.unsubscribe();
	}

	url(token: string) {
		// TODO: Get from ENV
		const url = new URL('http://localhost:3000/cable');
		url.searchParams.append('token', token);

		return url.toString();
	}
}

inject(Broadcast, [EngineConfig]);

container.register(Broadcast, {
	class: Broadcast,
	lifespan: Lifespan.Resolution,
});
