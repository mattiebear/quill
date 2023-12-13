import { TokenStore } from '../../store/token-store';

interface RemoveTokenData {
	tokenId: string;
}

export class RemoveToken {
	public static event = 'remove-token';

	constructor(public data: RemoveTokenData) {}

	async run() {
		TokenStore.getState().removeToken(this.data.tokenId);
	}
}
