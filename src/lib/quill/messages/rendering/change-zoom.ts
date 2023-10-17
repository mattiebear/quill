import { Message } from '@/lib/messaging/message';

export class ChangeZoom extends Message {
	public amount: number;

	constructor(direction: 'in' | 'out') {
		super();
		this.amount = direction === 'in' ? 10 : -10;
	}
}
