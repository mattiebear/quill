export interface Position {
	equals(pos: Position): boolean;
	toJSON(): (number | string)[];
	toCoords(): [number, number, number];
	toString(): string;
}
