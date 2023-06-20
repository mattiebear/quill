import { Sprite, Texture } from 'pixi.js';

import { Direction, StructureType } from '@/lib/quill';
import { Structure } from '@/lib/quill/map/structure';

export class RenderObject {
	public readonly sprite: Sprite;

	constructor(
		public readonly id: string,
		public readonly texture: Texture,
		public readonly order: number
	) {
		this.sprite = new Sprite(texture);
	}

	public static fromStructure(structure: Structure) {
		// TODO: Put this somewhere else
		let order;

		if (structure.type === StructureType.Floor) {
			order = 0;
		} else if (structure.type === StructureType.Object) {
			order = 2;
		} else {
			if (
				structure.direction === Direction.E ||
				structure.direction === Direction.S
			) {
				order = 1;
			} else {
				order = 3;
			}
		}

		return new RenderObject(structure.id, structure.texture, order);
	}
}
