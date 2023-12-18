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
		const { clearTokens, placeToken } = TokenStore.getState();

		clearTokens();

		PlayStore.setState({ isLoaded: true, mapId: this.data.mapId || null });

		this.data.tokens.forEach((data) => {
			placeToken(Token.from(data));
		});
	}
}
