import { CardinalSprite } from './cardinal-sprite';
import { StructureType } from './types';

export class Blueprint {
	private _name: string;
	private _sprite: CardinalSprite;
	private _type: StructureType;

	constructor(name: string, sprite: CardinalSprite, type: StructureType) {
		this._name = name;
		this._sprite = sprite;
		this._type = type;
	}

	get name() {
		return this._name;
	}

	get sprite() {
		return this._sprite;
	}

	get type() {
		return this._type;
	}
}
