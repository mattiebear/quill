import { Direction } from '@/lib/quill';

export interface PersistedTile {
	i: string;
	d: Direction;
}

export interface PersistedNode {
	p: [number, number, number];
	t: PersistedTile[];
}

export type MapData = PersistedNode[];
