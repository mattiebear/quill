import { Any, JsonObject, JsonProperty } from 'json2typescript';

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

@JsonObject('Atlas')
export class Atlas {
	@JsonProperty('version', String)
	version = '';

	@JsonProperty('data', Any)
	data: PersistedNode[] = [];
}
