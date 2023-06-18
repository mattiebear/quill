export type Listener = (data: any) => void;

export interface SubscriptionRelay {
	subscribe: (event: string, listener: Listener) => VoidFunction;
}

export interface Subscriber {
	link: (source: SubscriptionRelay) => void;
}

export enum Direction {
	N = 'N',
	E = 'E',
	S = 'S',
	W = 'W',
}
