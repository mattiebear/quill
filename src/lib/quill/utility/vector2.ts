import { Point } from '@/lib/quill/utility/point';
import { degToRad, div, radToDeg } from '@/utils/math';

export class Vector2 {
	// TODO: Optimize to only calculate endpoint if something changed
	private _origin: Point;
	private _magnitude: number;
	private _angle: number;

	constructor(origin: Point, magnitude: number, angle: number) {
		this._origin = origin;
		this._magnitude = magnitude;
		this._angle = angle;
	}

	get angle() {
		return this._angle;
	}

	get magnitude() {
		return this._magnitude;
	}

	get origin() {
		return this._origin;
	}

	get endpoint() {
		// console.log(this.angle);
		const rad = degToRad(this.angle);

		const x = this.magnitude * Math.cos(rad);
		const y = this.magnitude * Math.sin(rad);

		// The +0 is to coerce any -0 instances to unsigned 0
		return new Point(x + 0, y + 0);
	}

	rotate(degrees: number) {
		this._angle += degrees;
		return this;
	}

	public static connect(origin: Point, endpoint: Point) {
		const magnitude = endpoint.distanceTo(origin);
		const [dx, dy] = endpoint.difference(origin);

		let t = radToDeg(Math.atan(div(dy, dx)));

		if (dx < 0) {
			t += 180;
		}

		return new Vector2(origin, magnitude, t);
	}
}
