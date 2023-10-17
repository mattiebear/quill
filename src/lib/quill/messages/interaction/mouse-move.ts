import { Message } from '@/lib/messaging';

import { Position } from '../../utility';

export class MouseMove extends Message {
	constructor(public position: Position) {
		super();
	}
}
