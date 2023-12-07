import { Token, TokenData } from '../../map';
import { PlayStore } from '../../store/play-store';
import { TokenStore } from '../../store/token-store';

interface CurrentStoryStateData {
	mapId: string;
	tokens: TokenData[];
}

export class CurrentStoryState {
	public static event = 'current-story-state';

	constructor(public data: CurrentStoryStateData) {}

	async run() {
		const placeToken = TokenStore.getState().placeToken;

		PlayStore.setState({ isLoaded: true, mapId: this.data.mapId || null });

		this.data.tokens.forEach((data) => {
			const token = Token.from(data);
			placeToken(token);
		});
	}

	public static fromJSON(data: CurrentStoryStateData) {
		return new CurrentStoryState(data);
	}
}
