import * as PIXI from 'pixi.js';

import { Position } from '@/lib/quill';
import { RenderObject } from '@/lib/quill/renderer/render-object';

export class RenderNode {
	private objects: RenderObject[] = [];

	public readonly view = new PIXI.Container();

	constructor(public readonly position: Position) {
		this.view.x = position.screenX;
		this.view.y = position.screenY;
		this.view.zIndex = position.zIndex;
	}

	add(object: RenderObject) {
		this.objects.push(object);
		this.view.addChild(object.sprite);

		this.updateDrawOrder();
	}

	private updateDrawOrder() {
		this.objects.sort((a, b) => a.order - b.order);
		this.objects.forEach((object, index) => {
			object.sprite.zIndex = index;
		});
	}
}
