import { Container, Graphics } from 'pixi.js';

import { container, inject, Lifespan } from '@/lib/di';
import { degToRad } from '@/utils/math';

import { EngineConfig } from '../core/engine-config';
import { Position } from '../utility/position';
import { RenderStack } from './render-stack';

export class Highlighter {
	private highlight = new Container();

	constructor(public config: EngineConfig, private stack: RenderStack) {
		this.createHighlight();
		this.initListeners();
	}

	private createHighlight() {
		// TODO: Also used in Position. DRY up
		const size = Math.sin(degToRad(45)) * 256;

		const rect = new Graphics();
		rect.beginFill(0x8059d4);
		rect.drawRect(0, 0, size, size);
		rect.rotation += degToRad(45);
		rect.alpha = 0.3;

		this.highlight.addChild(rect);
		this.highlight.scale.y = 0.5;

		this.stack.ui.addChild(this.highlight);
	}

	private initListeners() {
		this.stack.main.on('mousemove', (e) => {
			const { x, y } = this.stack.map.toLocal(e.global);

			const pos = Position.atPoint(x, y, 0);
			this.setHighlightPosition(pos);
		});
	}

	private setHighlightPosition(pos: Position) {
		this.highlight.x = pos.screenX;
		this.highlight.y = pos.screenY;
	}
}

inject(Highlighter, [EngineConfig, RenderStack]);

container.register(Highlighter, {
	class: Highlighter,
	lifespan: Lifespan.Resolution,
});
