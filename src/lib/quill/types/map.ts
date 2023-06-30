import { TileType } from '@/lib/quill';

export enum Direction {
	N = 'N',
	E = 'E',
	S = 'S',
	W = 'W',
}

export interface TileSchema {
	id: string;
	image: string;
	type: TileType;
}
