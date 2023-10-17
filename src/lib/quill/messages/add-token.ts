import { Message } from '@/lib/messaging/message';

import { Token } from '../map/token';

export class AddToken extends Message {
	constructor(public token: Token) {
		super();
	}
}
