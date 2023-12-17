import { GridPosition } from '../../map';
import { TokenStore } from '../../store/token-store';

interface MoveTokenData {
	tokenId: string;
	pos: [number, number, number];
}

export class MoveToken {
	public static event = 'move-token';

	constructor(public data: MoveTokenData) {}

	async run() {
		const pos = new GridPosition(...this.data.pos);
		TokenStore.getState().moveToken(this.data.tokenId, pos);
	}
}
