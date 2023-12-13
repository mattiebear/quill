import { GridPosition } from '../../map';
import { Point } from '../../map/grid/point';
import { TokenStore } from '../../store/token-store';

interface MoveTokenData {
	tokenId: string;
	x: number;
	y: number;
	z: number;
}

export class MoveToken {
	public static event = 'move-token';

	constructor(public data: MoveTokenData) {}

	async run() {
		const pos = GridPosition.fromPoint(Point.at(this.data));
		TokenStore.getState().moveToken(this.data.tokenId, pos);
	}
}
