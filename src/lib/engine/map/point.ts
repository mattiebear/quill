const normalize = (value: number) => Math.round(value) + 0;

export class Point {
	constructor(public x: number, public y: number, public z: number) {}

	normalize() {
		return [this.x, this.y, this.z].map(normalize) as [number, number, number];
	}

	static at({ x, y, z }: { x: number; y: number; z: number }) {
		return new Point(x, y, z);
	}
}
