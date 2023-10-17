import { MapEntity } from '@/entites/map-entity';
import { Message } from '@/lib/messaging/message';

export class SelectMap extends Message {
	constructor(public map: MapEntity) {
		super();
	}
}
