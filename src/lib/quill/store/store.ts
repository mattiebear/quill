import { container, Lifespan } from '@/lib/di';
import { Channel, relay } from '@/lib/events';

import { CurrentStateData, SelectMapData, StoryEvent } from '../types/event';
import { resetQuillStore, quillStore as store } from './quill-store';
import { LoadingState } from './types';

export class Store {
	constructor() {
		this.initRelay();
	}

	reset() {
		resetQuillStore();
	}

	loadMap() {
		store.setState({ mapDataState: LoadingState.Loading });
	}

	mapLoaded() {
		store.setState({ mapDataState: LoadingState.Complete });
	}

	// TODO: Add unsubs
	private initRelay() {
		const channel = relay.channel(Channel.Story);

		channel.on(StoryEvent.CurrentState, (data: CurrentStateData) => {
			store.setState({
				initialDataState: LoadingState.Complete,
				mapId: data.map,
			});
		});

		channel.on(StoryEvent.SelectMap, (data: SelectMapData) => {
			store.setState({
				mapId: data.map.id,
			});
		});
	}
}

container.register(Store, { class: Store, lifespan: Lifespan.Resolution });
