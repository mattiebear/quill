import { Blueprint } from './blueprint';
import { Structure } from './structure';
import { Direction, StructureType } from './types';

/**
 * Tile
 * @description A tile is a single point in an atlas containing multiple structures
 */
export class Tile {
	private _structures: Map<StructureType, Structure[]>;

	constructor() {
		this._structures = new Map<StructureType, Structure[]>();
	}

	add(blueprint: Blueprint, direction: Direction) {
		this.addTypeList(blueprint.type);

		const structure = new Structure(blueprint, direction);
		const level = this.getStructures(blueprint.type);

		level?.push(structure);
	}

	getStructures(type: StructureType) {
		return this.structures.get(type);
	}

	get structures() {
		return this._structures;
	}

	private addTypeList(type: StructureType) {
		if (!this._structures.has(type)) {
			this._structures.set(type, []);
		}
	}
}
