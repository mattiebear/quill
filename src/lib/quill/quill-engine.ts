import * as PIXI from 'pixi.js';

// import sampleUrl from '@/assets/sample.png';

// Primary engine for rendering and interacting with map data. This is the
// bridge between the UI, map rendering, REST API, and websocket connections.
export class QuillEngine {
	private _app: PIXI.Application<HTMLCanvasElement>;

	initialize() {
		PIXI.settings.RESOLUTION = window.devicePixelRatio || 1;

		const app = new PIXI.Application<HTMLCanvasElement>({
			resizeTo: window,
			autoDensity: true,
			// TODO: Get color from theme somehow
			backgroundColor: 0x171923,
		});

		// TODO: Pass by ref?
		document.getElementById('root')?.appendChild(app.view);

		// const sprite = PIXI.Sprite.from(sampleUrl);
		// app.stage.addChild(sprite);

		this._app = app;

		return this;
	}

	destroy() {
		this.app.destroy();
	}

	get app() {
		return this._app;
	}
}
