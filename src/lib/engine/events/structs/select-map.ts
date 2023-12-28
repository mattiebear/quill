import { MapEntity } from '@/entites/map-entity';

export class SelectMap {
	public static event = 'select-map';

	constructor(public map: MapEntity) {}

	toJSON() {
		return {
			event: SelectMap.event,
			data: {
				mapId: this.map.id,
			},
		};
	}
}
