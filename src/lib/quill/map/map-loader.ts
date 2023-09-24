import { JsonConvert } from 'json2typescript';

import { fetchMapDetail } from '@/api/maps';
import { MapEntity } from '@/entites/map-entity';
import { container, inject, Lifespan } from '@/lib/di';
import { Channel, relay } from '@/lib/events';

import { StoryEvent } from '..';
import { LoadingState, PlayStage, quillStore } from '../store';
import { Atlas } from './atlas';

export class MapLoader {
	constructor(private atlas: Atlas) {
		this.initRelay();
	}

	async load(id: string) {
		if (this.loadedMapId === id) {
			return quillStore.setState({ loadMapState: LoadingState.Complete });
		}

		quillStore.setState({ loadMapState: LoadingState.Loading });

		const response = await fetchMapDetail(id);
		const convert = new JsonConvert();

		const map = convert.deserializeObject(response.data, MapEntity);

		quillStore.setState({
			loadMapState: LoadingState.Complete,
			playStage: PlayStage.Play,
		});

		this.atlas.load(map.atlas);
	}

	get loadedMapId() {
		return quillStore.getState().selectedMapId;
	}

	initRelay() {
		// TODO: Add unsubscribes
		relay
			.channel(Channel.Story)
			.on(StoryEvent.LoadMap, ({ map }: { map: MapEntity }) => {
				this.load(map.id);
			});
	}
}

inject(MapLoader, [Atlas]);

container.register(MapLoader, {
	class: MapLoader,
	lifespan: Lifespan.Resolution,
});
