import { createConsumer, logger } from '@rails/actioncable';

import { MapEntity } from '@/entites/map-entity';
import { getToken } from '@/lib/auth';
import { container, inject, Lifespan } from '@/lib/di';
import { Channel, relay } from '@/lib/events';

import { EngineConfig } from '../core/engine-config';
import { StoryEvent } from '../types/event';
import { Distributor, DistributorEvent } from './distributor';

// TODO: Set based on app environment
logger.enabled = true;

export class Broadcast {
	consumer: ReturnType<typeof createConsumer>;
	subscriptions: { unsubscribe: VoidFunction }[] = [];
	storyChannel: any;

	constructor(private config: EngineConfig, private distributor: Distributor) {
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

		// TODO: Get from ENV
		const url = new URL('http://localhost:3000/cable');
		url.searchParams.append('token', token);

		this.consumer = createConsumer(url.toString());

		const subscription = this.consumer.subscriptions.create(
			{
				channel: 'StoryChannel',
				story: this.config.gameSession.id,
			},
			{
				received: (event: DistributorEvent) => {
					this.distributor.emit(event);
				},
			}
		);

		this.storyChannel = subscription;

		this.subscriptions.push(subscription);
	}

	initRelay() {
		// TODO: Add unsubscribes
		relay
			.channel(Channel.Story)
			.on(StoryEvent.LoadMap, ({ map }: { map: MapEntity }) => {
				this.storyChannel.send({ event: 'select-map-id', id: map.id });
			});
	}

	destroy() {
		this.subscriptions.forEach((sub) => {
			sub.unsubscribe();
		});
	}
}

inject(Broadcast, [EngineConfig, Distributor]);

container.register(Broadcast, {
	class: Broadcast,
	lifespan: Lifespan.Resolution,
});
