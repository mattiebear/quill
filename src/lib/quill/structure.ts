import { Blueprint } from '.';
import { Direction } from './cardinal-sprite';

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
}
