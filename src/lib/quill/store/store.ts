import { container, Lifespan } from '@/lib/di';
import { Channel } from '@/lib/events';

import { RelayControl } from '../comms/relay-control';
import { CurrentStateData, SelectMapData, StoryEvent } from '../types/event';
import { resetQuillStore, quillStore as store } from './quill-store';
import { LoadingState } from './types';

export class Store extends RelayControl {
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
		this.on(
			Channel.Story,
			StoryEvent.CurrentState,
			(data: CurrentStateData) => {
				store.setState({
					initialDataState: LoadingState.Complete,
					mapId: data.map,
				});
			}
		);

		this.on(Channel.Story, StoryEvent.SelectMap, (data: SelectMapData) => {
			store.setState({
				mapId: data.map.id,
			});
		});
	}
}

container.register(Store, { class: Store, lifespan: Lifespan.Resolution });
