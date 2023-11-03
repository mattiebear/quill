import { container, Lifespan } from '@/lib/di';

import { resetActionStore } from '../actions/store';
import { Subscriber } from '../comms/subscriber';
import { CurrentStoryState } from '../messages/story/current-story-state';
import { SelectMap } from '../messages/story/select-map';
import { resetEngineStore, EngineStore as store } from './engine-store';
import { LoadingState } from './types';

export class Store extends Subscriber {
	constructor() {
		super();
		this.initRelay();
	}

	reset() {
		resetActionStore();
		resetEngineStore();
	}

	loadMap() {
		store.setState({ mapDataState: LoadingState.Loading });
	}

	mapLoaded() {
		store.setState({ mapDataState: LoadingState.Complete });
	}

	private initRelay() {
		this.onEvent(CurrentStoryState, ({ mapId }) => {
			store.setState({
				initialDataState: LoadingState.Complete,
				mapId: mapId,
			});
		});

		this.onEvent(SelectMap, ({ map }) => {
			store.setState({
				mapId: map.id,
			});
		});
	}
}

container.register(Store, { class: Store, lifespan: Lifespan.Resolution });
