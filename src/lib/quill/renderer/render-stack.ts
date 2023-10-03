import { Container, Rectangle } from 'pixi.js';

import { container, Lifespan } from '@/lib/di';

export class RenderStack {
	public main = new Container();
	public map = new Container();
	public tiles = new Container();
	public ui = new Container();

	constructor() {
		this.tiles.zIndex = 0;
		this.tiles.sortableChildren = true;

		this.ui.zIndex = 1;

		this.map.addChild(this.tiles, this.ui);

		this.main.eventMode = 'static';
		this.main.addChild(this.map);
	}

	setHitArea(target: Rectangle) {
		this.main.hitArea = target;
	}
}

container.register(RenderStack, {
	class: RenderStack,
	lifespan: Lifespan.Resolution,
});
