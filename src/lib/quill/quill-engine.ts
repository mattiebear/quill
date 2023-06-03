import * as PIXI from 'pixi.js';

import sampleUrl from '@/assets/sample.png';

// Primary engine for rendering and interacting with map data. This is the
// bridge between the UI, map rendering, REST API, and websocket connections.
export class QuillEngine {
	private _app: PIXI.Application<HTMLCanvasElement>;

	initialize() {
		// TODO: Set size based on current screen size
		this._app = new PIXI.Application({
			width: 640,
			height: 360,
		});

		document.body.appendChild(this.app.view);

		const sprite = PIXI.Sprite.from(sampleUrl);
		this.app.stage.addChild(sprite);

		return this;
	}

	destroy() {
		this.app.destroy();
	}

	get app() {
		return this._app;
	}
}
