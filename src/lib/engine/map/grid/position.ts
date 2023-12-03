export interface Position {
	equals(pos: Position): boolean;
	toArray(): (number | string)[];
	toCoords(): [number, number, number];
	toString(): string;
}
