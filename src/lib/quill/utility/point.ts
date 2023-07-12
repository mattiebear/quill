export class Point {
	constructor(public readonly x: number, public readonly y: number) {}

	distanceTo(point: Point) {
		return Math.sqrt(
			Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2)
		);
	}

	difference(point: Point) {
		return [this.x - point.x, this.y - point.y];
	}

	public static origin() {
		return new Point(0, 0);
	}
}
