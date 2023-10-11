import { MapEntity } from '@/entites/map-entity';
import { container, Lifespan } from '@/lib/di';

import { Subscriber } from '../comms/subscriber';
import { CurrentStateData, StoryEvent } from '../types/event';
import { resetQuillStore, quillStore as store } from './quill-store';
import { LoadingState } from './types';

export class Store extends Subscriber {
	constructor() {
		super();
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

	private initRelay() {
		this.onEvent(StoryEvent.CurrentState, (data: CurrentStateData) => {
			store.setState({
				initialDataState: LoadingState.Complete,
				mapId: data.mapId,
			});
		});

		this.onEvent(StoryEvent.SelectMap, (map: MapEntity) => {
			store.setState({
				mapId: map.id,
			});
		});
	}
}

container.register(Store, { class: Store, lifespan: Lifespan.Resolution });
