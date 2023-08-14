import { MapEntity } from '@/entites/map-entity';
import { HttpClient } from '@/lib/http/types';
import { Tileset } from '@/lib/quill';

interface ConfigValues {
	http: HttpClient;
	map: MapEntity;
	tileset: Tileset;
}

export class EngineConfig implements ConfigValues {
	readonly http: HttpClient;
	readonly map: MapEntity;
	readonly tileset: Tileset;

	constructor(data: ConfigValues) {
		this.http = data.http;
		this.map = data.map;
		this.tileset = data.tileset;
	}
}
