import { Token, TokenData } from '../../map';

export class AddToken {
	public static event = 'add-token';

	constructor(public data: TokenData) {}

	async run() {
		const token = Token.from(this.data);
		console.log('receive add token', { token });
	}

	static fromJSON(data: TokenData) {
		return new AddToken(data);
	}
}
