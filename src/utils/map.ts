export const findOrCreateByKey = <T>(
	map: Map<any, T>,
	key: any,
	defaultValue: T
): T => {
	if (!map.has(key)) {
		map.set(key, defaultValue);
	}

	const result = map.get(key);

	if (!result) {
		throw new Error('Unexpected undefined when fetching by key');
	}

	return result;
};
