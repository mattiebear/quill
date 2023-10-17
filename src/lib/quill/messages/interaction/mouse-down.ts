import { Message } from '@/lib/messaging';

import { Position } from '../../utility';

export class MouseDown extends Message {
	constructor(public position: Position) {
		super();
	}
}
