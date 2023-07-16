export const assertPresence = (
	entity: unknown,
	message = 'Value is not present'
) => {
	if (!entity) {
		throw new Error(message);
	}
};
