import { GridPosition, Token } from '../../map';

export class RequestMoveToken {
	public static event = 'request-move-token';

	constructor(public token: Token, public position: GridPosition) {}

	toJSON() {
		return {
			event: RequestMoveToken.event,
			data: {
				tokenId: this.token.id,
				x: this.position.x,
				y: this.position.y,
				z: this.position.z,
			},
		};
	}
}
