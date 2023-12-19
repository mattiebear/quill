import { PlayStore } from '../../store/play-store';
import { TokenStore } from '../../store/token-store';

interface ChangeMapData {
	mapId: string;
}

export class ChangeMap {
	public static event = 'change-map';

	constructor(public data: ChangeMapData) {}

	async run() {
		TokenStore.getState().clearTokens();

		PlayStore.setState({ mapId: this.data.mapId });
	}
}
