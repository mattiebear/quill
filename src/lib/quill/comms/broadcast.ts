import { createConsumer, logger } from '@rails/actioncable';

import { getToken } from '@/lib/auth';
import { container, inject, Lifespan } from '@/lib/di';

import { EngineConfig } from '../core/engine-config';
import { Distributor, DistributorEvent } from './distributor';

// TODO: Set based on app environment
logger.enabled = true;

export class Broadcast {
	consumer: ReturnType<typeof createConsumer>;
	subscriptions: { unsubscribe: VoidFunction }[] = [];

	constructor(private config: EngineConfig, private distributor: Distributor) {
		this.initChannels();
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

		this.subscriptions.push(subscription);
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
