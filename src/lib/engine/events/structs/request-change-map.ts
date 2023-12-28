import { MapEntity } from '@/entites/map-entity';

export class RequestChangeMap {
	public static event = 'request-change-map';

	constructor(public map: MapEntity) {}

	toJSON() {
		return {
			event: RequestChangeMap.event,
			data: {
				mapId: this.map.id,
			},
		};
	}
}
