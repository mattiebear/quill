import { Blueprint } from './blueprint';
import { Direction } from './types';

/**
 * Structure
 * @description A tile is a single unit of an atlas containing a single sprite
 */
export class Structure {
	private _blueprint: Blueprint;
	private _direction: Direction;

	constructor(blueprint: Blueprint, direction: Direction) {
		this._blueprint = blueprint;
		this._direction = direction;
	}

	get type() {
		return this._blueprint.type;
	}

	get direction() {
		return this._direction;
	}

	get blueprint() {
		return this._blueprint;
	}

	get image() {
		return this.blueprint.sprite.image(this.direction);
	}
}
