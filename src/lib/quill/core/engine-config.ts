import { MapEntity } from '@/entites/map-entity';
import { Tileset } from '@/lib/quill';

interface ConfigValues {
	el: HTMLDivElement;
	map: MapEntity;
	tileset: Tileset;
}

export class EngineConfig implements ConfigValues {
	readonly el: HTMLDivElement;
	readonly map: MapEntity;
	readonly tileset: Tileset;

	constructor(data: ConfigValues) {
		Object.assign(this, data);
	}
}
