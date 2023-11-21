export class Position {
	constructor(public x: number, public y: number, public z: number) {}

	toString() {
		this.toArray().join(':');
	}

	toArray(): [number, number, number] {
		return [this.x, this.y, this.z];
	}
}
