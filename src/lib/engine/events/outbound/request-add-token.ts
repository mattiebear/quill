import { Position } from '../../map';

export class RequestAddToken {
	public static event = 'request-add-token';

	constructor(
		public tokenId: string,
		public userId: string,
		public position: Position
	) {}

	toJSON() {
		return {
			event: RequestAddToken.event,
			data: {
				tokenId: this.tokenId,
				userId: this.userId,
				...this.position.toJSON(),
			},
		};
	}
}
