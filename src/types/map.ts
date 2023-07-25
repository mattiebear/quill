import { Direction } from '@/lib/quill';

export interface PersistedTile {
	i: string;
	d: Direction;
}

export interface PersistedNode {
	p: [number, number, number];
	t: PersistedTile[];
}

export type AtlasData = PersistedNode[];

export interface MapAtlas {
	data: AtlasData;
	version: string;
}

export interface ModuleMapData {
	id: string;
	atlas: MapAtlas;
	name: string;
	userId: string;
}

export type ModuleMapDetailData = ModuleMapData;

export type ModuleMapListData = Omit<ModuleMapData, 'atlas'>;
