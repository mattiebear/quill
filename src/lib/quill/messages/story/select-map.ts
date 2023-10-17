import { MapEntity } from '@/entites/map-entity';
import { Message } from '@/lib/messaging/message';

export class SelectMap extends Message {
	public static name = 'select-map';

	constructor(public map: MapEntity) {
		super();
	}

	toJSON() {
		return {
			event: SelectMap.name,
			data: {
				mapId: this.map.id,
			},
		};
	}
}
