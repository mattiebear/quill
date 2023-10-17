import { Message } from '@/lib/messaging/message';

import { Changeset } from '..';

export class MapAltered extends Message {
	constructor(public changeset: Changeset) {
		super();
	}
}
