export function assertPresence<T>(
	data: T,
	message = 'Data does not exist'
): asserts data is Exclude<T, undefined | null> {
	if (typeof data === 'undefined' || data === null) {
		throw new Error(message);
	}
}
