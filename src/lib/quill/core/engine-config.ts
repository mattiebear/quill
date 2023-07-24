import { HttpClient } from '@/lib/http/types';
import { Tileset } from '@/lib/quill/map/tileset';
import { ModuleMapDetailData } from '@/types/map';

interface ConfigValues {
	http: HttpClient;
	map: ModuleMapDetailData;
	tileset: Tileset;
}

export class EngineConfig implements ConfigValues {
	readonly http: HttpClient;
	readonly map: ModuleMapDetailData;
	readonly tileset: Tileset;

	constructor(data: ConfigValues) {
		this.http = data.http;
		this.map = data.map;
		this.tileset = data.tileset;
	}
}
