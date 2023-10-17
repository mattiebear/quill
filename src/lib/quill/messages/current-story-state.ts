import { Message } from '@/lib/messaging/message';

export class CurrentStoryState extends Message {
	constructor(public mapId: string) {
		super();
	}
}
