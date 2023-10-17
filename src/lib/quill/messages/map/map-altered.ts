import { Message } from '@/lib/messaging/message';

import { Changeset } from '../../map/changeset';

export class MapAltered extends Message {
	constructor(public changeset: Changeset) {
		super();
	}
}
