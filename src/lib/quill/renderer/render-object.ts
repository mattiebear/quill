import * as PIXI from 'pixi.js';

import { Direction, StructureType } from '@/lib/quill';
import { Structure } from '@/lib/quill/map/structure';

export class RenderObject {
	public readonly sprite: PIXI.Sprite;

	constructor(
		public readonly id: string,
		public readonly view: string,
		public readonly order: number
	) {
		// TODO: Do we need to store textures globally for optimization?
		const texture = PIXI.Texture.from(view);
		this.sprite = new PIXI.Sprite(texture);
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

		return new RenderObject(structure.id, structure.view, order);
	}
}
