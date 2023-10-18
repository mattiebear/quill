import { createConsumer, logger } from '@rails/actioncable';

import { Application } from '@/lib/application';
import { getToken } from '@/lib/auth';
import { container, inject, Lifespan } from '@/lib/di';
import { Message } from '@/lib/messaging';
import { factory } from '@/lib/messaging/factory';

import { EngineConfig } from '../core/engine-config';
import { AddToken } from '../messages/story/add-token';
import { RequestAddToken } from '../messages/story/request-add-token';
import { SelectMap } from '../messages/story/select-map';
import { Subscriber } from './subscriber';

logger.enabled = Application.isDevelopment();

type Connection = { send: (data: any) => void; unsubscribe: VoidFunction };

const CHANNEL_NAME = 'StoryChannel';

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
				channel: CHANNEL_NAME,
				story: this.config.gameSession.id,
			},
			{
				received: (event: { event: string; data: any }) => {
					const message = factory.build(event);

					if (message) {
						this.send(message);
					}
				},
			}
		);
	}

	initRelay() {
		this.connect(SelectMap, RequestAddToken);
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

	private connect(...messages: any[]) {
		for (const ctor of messages) {
			this.onEvent(ctor, (message) => {
				this.connection.send(message.toJSON());
			});
		}
	}
}

inject(Broadcast, [EngineConfig]);

container.register(Broadcast, {
	class: Broadcast,
	lifespan: Lifespan.Resolution,
});
