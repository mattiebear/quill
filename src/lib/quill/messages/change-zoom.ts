import { Message } from '@/lib/messaging/message';

export class ChangeZoom extends Message {
	constructor(public amount: number) {
		super();
	}
}
