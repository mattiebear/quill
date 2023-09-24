import { container, inject, Lifespan } from '@/lib/di';

import { MapLoader } from '../map/map-loader';
import { PlayStage, quillStore } from '../store';

type DistEvent<T extends string, D> = {
	event: T;
	data: D;
};

type InitialStateData = {
	map: string | null;
};

type InitialMapState = DistEvent<'current-story-state', InitialStateData>;

export type DistributorEvent = InitialMapState;

export class Distributor {
	constructor(private loader: MapLoader) {}

	emit(event: DistributorEvent) {
		switch (event.event) {
			case 'current-story-state':
				return this.loadInitialState(event.data);
		}
	}

	private loadInitialState(data: InitialStateData) {
		quillStore.setState({ playStage: PlayStage.MapSelect });

		if (data.map) {
			this.loader.load(data.map);
		}
	}
}

inject(Distributor, [MapLoader]);

container.register(Distributor, {
	class: Distributor,
	lifespan: Lifespan.Resolution,
});
