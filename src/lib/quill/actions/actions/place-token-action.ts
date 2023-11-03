import { Action } from './action';

export class PlaceTokenAction extends Action {
	constructor(public id: string | null = null) {
		super();
	}

	get isTokenSelected() {
		return !!this.id;
	}
}
