import { container, Lifespan } from '@/lib/di';

import { Subscriber } from '../comms/subscriber';
import { CurrentStoryState } from '../messages/current-story-state';
import { SelectMap } from '../messages/select-map';
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
