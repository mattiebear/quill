export type ReceivedEvent<E extends string, T = any> = {
	event: E;
	data: T;
};
