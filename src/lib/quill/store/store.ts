import { container, Lifespan } from '@/lib/di';
import { Channel, relay } from '@/lib/events';

import { CurrentStateData, SelectMapData, StoryEvent } from '../types/event';
import { resetQuillStore, quillStore as store } from './quill-store';
import { LoadingState } from './types';

export class Store {
	private subscriptions: VoidFunction[] = [];

	constructor() {
		this.initRelay();
	}

	reset() {
		resetQuillStore();
	}

	destroy() {
		this.subscriptions.forEach((unsubscribe) => unsubscribe());
	}

	loadMap() {
		store.setState({ mapDataState: LoadingState.Loading });
	}

	mapLoaded() {
		store.setState({ mapDataState: LoadingState.Complete });
	}

	private initRelay() {
		const channel = relay.channel(Channel.Story);

		this.subscriptions.push(
			channel.on(StoryEvent.CurrentState, (data: CurrentStateData) => {
				store.setState({
					initialDataState: LoadingState.Complete,
					mapId: data.map,
				});
			})
		);

		this.subscriptions.push(
			channel.on(StoryEvent.SelectMap, (data: SelectMapData) => {
				store.setState({
					mapId: data.map.id,
				});
			})
		);
	}
}

container.register(Store, { class: Store, lifespan: Lifespan.Resolution });
