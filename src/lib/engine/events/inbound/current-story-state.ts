import { PlayStore } from '../../store/play-store';

export class CurrentStoryState {
	public static event = 'current-story-state';

	constructor(public mapId: string) {}

	async run() {
		PlayStore.setState({ isLoaded: true, mapId: this.mapId || null });
	}

	public static fromJSON(data: { mapId: string }) {
		return new CurrentStoryState(data.mapId);
	}
}
