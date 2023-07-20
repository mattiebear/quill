import { Direction } from '@/lib/quill';

interface PersistedTile {
	i: string;
	d: Direction;
}

interface PersistedNode {
	p: [number, number, number];
	t: PersistedTile[];
}

export type MapData = PersistedNode[];
