import { User } from '@/entites/user';
import { Message } from '@/lib/messaging/message';

import { Position } from '../utility';

export class PlaceToken extends Message {
	constructor(public id: string, public position: Position, public user: User) {
		super();
	}
}
