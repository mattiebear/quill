import { GridPosition } from '../../map';

export class RequestAddToken {
	public static event = 'request-add-token';

	constructor(
		public tokenId: string,
		public userId: string,
		public position: GridPosition
	) {}

	// TODO: Refactor to not change position structure
	toJSON() {
		return {
			event: RequestAddToken.event,
			data: {
				tokenId: this.tokenId,
				userId: this.userId,
				pos: this.position.toJSON(),
			},
		};
	}
}
