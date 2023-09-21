import { createConsumer, logger } from '@rails/actioncable';

import { getToken } from '@/lib/auth';
import { container, inject, Lifespan } from '@/lib/di';

import { EngineConfig } from './engine-config';

// Set based on app environment
logger.enabled = true;

type BroadcastEvent<T extends string, U extends Record<string, unknown>> = {
	event: T;
	data: U;
};

type InitialStoryState = BroadcastEvent<'current-story-state', { map: string }>;

type EventType = InitialStoryState;

export class Broadcast {
	consumer: ReturnType<typeof createConsumer>;
	subscriptions: { unsubscribe: VoidFunction }[] = [];

	constructor(private config: EngineConfig) {
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
				received: (data) => {
					this.disperseEvent(data);
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

	disperseEvent(data: EventType) {
		switch (data.event) {
			case 'current-story-state':
				console.log(data.data);
				break;
		}
	}
}

inject(Broadcast, [EngineConfig]);

container.register(Broadcast, {
	class: Broadcast,
	lifespan: Lifespan.Resolution,
});
