import { GridPosition } from '../../map';

export class RequestAddToken {
	public static event = 'request-add-token';

	constructor(public tokenId: string, public position: GridPosition) {}

	toJSON() {
		return {
			event: RequestAddToken.event,
			data: {
				tokenId: this.tokenId,
				pos: this.position.toJSON(),
			},
		};
	}
}
