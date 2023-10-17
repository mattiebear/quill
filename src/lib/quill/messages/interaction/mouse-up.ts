import { Message } from '@/lib/messaging';

import { Position } from '../../utility';

export class MouseUp extends Message {
	constructor(public position: Position) {
		super();
	}
}
