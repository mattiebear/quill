import { Token } from '../../map';

export class RequestRemoveToken {
	public static event = 'request-remove-token';

	constructor(public token: Token) {}

	toJSON() {
		return {
			event: RequestRemoveToken.event,
			data: {
				tokenId: this.token.id,
			},
		};
	}
}
