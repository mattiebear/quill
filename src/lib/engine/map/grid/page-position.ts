import { ThreeEvent } from '@react-three/fiber';

export class PagePosition {
	constructor(public x: number, public y: number) {}

	static fromEvent(e: ThreeEvent<MouseEvent>) {
		return new PagePosition(e.pageX, e.pageY);
	}
}
