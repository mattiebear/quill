import { Message } from '@/lib/messaging/message';

import { TokenData } from '../types/tokens';

export class CurrentStoryState extends Message {
	public static name = 'current-story-state';

	constructor(public mapId: string, public tokens: TokenData[]) {
		super();
	}

	public static fromJSON(data: { mapId: string; tokens: TokenData[] }) {
		return new CurrentStoryState(data.mapId, data.tokens);
	}
}
