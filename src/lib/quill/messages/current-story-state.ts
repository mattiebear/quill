import { Message } from '@/lib/messaging/message';

export class CurrentStoryState extends Message {
	public static name = 'current-story-state';

	constructor(public mapId: string) {
		super();
	}

	public static fromJSON(data: any) {
		return new CurrentStoryState(data.mapId);
	}
}
