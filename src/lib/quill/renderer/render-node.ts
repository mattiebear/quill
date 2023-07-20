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
		this.view.sortableChildren = true;
	}

	add(object: RenderObject) {
		this.objects.push(object);
		this.view.addChild(object.sprite);

		this.updateDrawOrder();
	}

	remove(id: string) {
		const object = this.objects.find((rendered) => rendered.id === id);

		if (object) {
			object.sprite.destroy();
			this.objects = this.objects.filter((rendered) => rendered !== object);

			this.updateDrawOrder();
		}
	}

	private updateDrawOrder() {
		this.objects.sort((a, b) => a.order - b.order);
		this.objects.forEach((object, index) => {
			object.sprite.zIndex = index;
		});
	}
}
