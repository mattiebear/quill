import * as PIXI from 'pixi.js';

import { StructureType } from '.';
import { Atlas } from './atlas';

// import sampleUrl from '@/assets/sample.png';

// Primary engine for rendering and interacting with map data. This is the
// bridge between the UI, map rendering, REST API, and websocket connections.
export class QuillEngine {
	private _app: PIXI.Application<HTMLCanvasElement>;
	private _element: HTMLElement;
	private _atlas: Atlas;

	// TODO: Set from config
	private TILE_WIDTH = 256;
	private TILE_HEIGHT = 128;

	init() {
		const heightOffset = this.TILE_HEIGHT / 2;
		const widthOffset = this.TILE_WIDTH / 2;

		PIXI.settings.RESOLUTION = window.devicePixelRatio || 1;

		const app = new PIXI.Application<HTMLCanvasElement>({
			resizeTo: window,
			autoDensity: true,
			// TODO: Get color from theme somehow
			backgroundColor: 0x171923,
		});

		this._element.appendChild(app.view);
		this._app = app;

		// TODO: Total refactor of this
		this._atlas.each((tile, x, y) => {
			const floorTiles = tile.getStructures(StructureType.Floor);

			floorTiles?.forEach((structure) => {
				const image = structure.image || '';
				const xPos = (x - y) * widthOffset + 500;
				const yPos = (x + y) * heightOffset;

				const sprite = PIXI.Sprite.from(image);
				sprite.x = xPos;
				sprite.y = yPos;

				this.app.stage.addChild(sprite);
			});
		});
	}

	remove() {
		this.app.destroy();
	}

	drawTo(element: HTMLElement) {
		this._element = element;
	}

	set atlas(atlas: Atlas) {
		this._atlas = atlas;
	}

	get atlas() {
		return this._atlas;
	}

	get app() {
		return this._app;
	}
}
