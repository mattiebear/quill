import { createConsumer, logger } from '@rails/actioncable';

import { MapEntity } from '@/entites/map-entity';
import { Application } from '@/lib/application';
import { getToken } from '@/lib/auth';
import { container, inject, Lifespan } from '@/lib/di';

import { EngineConfig } from '../core/engine-config';
import { Token } from '../map/token';
import { RenderEvent, SendBroadcast, StoryEvent } from '../types/event';
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
				received: (event: { event: string; data: unknown }) => {
					this.send(event.event, event.data);
				},
			}
		);
	}

	initRelay() {
		this.onEvent(StoryEvent.SelectMap, (map: MapEntity) => {
			this.connection.send({
				event: StoryEvent.SelectMap,
				data: { mapId: map.id },
			});
		});

		this.onEvent(RenderEvent.AddToken, (token: Token) => {
			this.connection.send({
				event: SendBroadcast.AddToken,
				data: token.toJSON(),
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
