import { v4 as uuid } from 'uuid';

export class Crypto {
	public static uniqueId() {
		return uuid();
	}
}
