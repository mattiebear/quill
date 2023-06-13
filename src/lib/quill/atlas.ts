import { Blueprint } from './blueprint';
import { Tile } from './tile';
import { Direction } from './types';

/**
 * Atlas
 * @description An atlas is the primary map instance which is composed of tiles, each representing a single point in the map.
 * The grid is currently a 2D square grid, but could be expanded to 3D or hex in the future.
 */
export class Atlas {
	private _tiles: Map<string, Tile>;

	constructor() {
		this._tiles = new Map<string, Tile>();
	}

	set(x: number, y: number, tile: Tile) {
		const key = this.coord(x, y);
		this._tiles.set(key, tile);
	}

	get(x: number, y: number) {
		const key = this.coord(x, y);
		return this._tiles.get(key);
	}

	add(x: number, y: number, blueprint: Blueprint, direction: Direction) {
		if (!this.has(x, y)) {
			this.set(x, y, new Tile());
		}

		const tile = this.get(x, y);
		tile?.add(blueprint, direction);
	}

	has(x: number, y: number) {
		const key = this.coord(x, y);
		return this._tiles.has(key);
	}

	each(callback: (tile: Tile, x: number, y: number) => void) {
		this._tiles.forEach((tile, key) => {
			const [x, y] = key.split(',').map((coord) => parseInt(coord));
			callback(tile, x, y);
		});
	}

	private coord(x: number, y: number) {
		return `${x},${y}`;
	}
}
