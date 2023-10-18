import { FederatedPointerEvent } from 'pixi.js';

import { container, inject, Lifespan } from '@/lib/di';

import { Subscriber } from '../comms/subscriber';
import { EngineConfig } from '../core/engine-config';
import { MouseDown } from '../messages/interaction/mouse-down';
import { MouseMove } from '../messages/interaction/mouse-move';
import { MouseUp } from '../messages/interaction/mouse-up';
import { Position } from '../utility/position';
import { RenderStack } from './render-stack';

export class Interactor extends Subscriber {
	constructor(public config: EngineConfig, private stack: RenderStack) {
		super();
		this.init();
	}

	init() {
		this.stack.main.on('mousedown', (e) => {
			const position = this.currentPosition(e);
			this.send(new MouseDown(position));
		});

		this.stack.main.on('mouseup', (e) => {
			const position = this.currentPosition(e);
			this.send(new MouseUp(position));
		});

		this.stack.main.on('mousemove', (e) => {
			const position = this.currentPosition(e);
			this.send(new MouseMove(position));
		});
	}

	currentPosition(e: FederatedPointerEvent) {
		const { x, y } = this.stack.map.toLocal(e.global);
		return Position.atPoint(x, y, 0);
	}
}

inject(Interactor, [EngineConfig, RenderStack]);

container.register(Interactor, {
	class: Interactor,
	lifespan: Lifespan.Resolution,
});
