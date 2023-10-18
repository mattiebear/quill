import { MapEntity } from '@/entites/map-entity';
import { Message } from '@/lib/messaging/message';

export class SelectMap extends Message {
	public static event = 'select-map';

	constructor(public map: MapEntity) {
		super();
	}

	toJSON() {
		return {
			event: SelectMap.event,
			data: {
				mapId: this.map.id,
			},
		};
	}
}
