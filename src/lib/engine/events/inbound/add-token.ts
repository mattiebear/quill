import { Token, TokenData } from '../../map';
import { TokenStore } from '../../store/token-store';

export class AddToken {
	public static event = 'add-token';

	constructor(public data: TokenData) {}

	async run() {
		const token = Token.from(this.data);
		TokenStore.getState().placeToken(token);
	}
}
