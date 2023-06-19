import { Relay } from '@/lib/quill/core/relay';

export type Listener = (data: any) => void;

export interface Subscriber {
	link: (source: Relay) => void;
}

export enum Direction {
	N = 'N',
	E = 'E',
	S = 'S',
	W = 'W',
}

export enum MapEvent {
	MapAltered = 'map-altered',
}
