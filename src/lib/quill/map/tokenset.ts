import { TokenMeta } from '@/entites/token-meta';

export class Tokenset {
	constructor(private readonly _tokens: TokenMeta[]) {}

	get all() {
		return this._tokens;
	}
}
