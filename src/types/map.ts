import { Direction } from '@/lib/quill';

interface PersistedTile {
	p: [number, number, number];
	t: string;
	d: Direction;
}

export type MapData = PersistedTile[];
