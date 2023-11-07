export const shift =
	<T = unknown>(array: T[]) =>
	(start: number, places: number): T | undefined => {
		if (array.length === 0) {
			return undefined;
		}

		let current = (start + places) % array.length;

		while (current < 0) {
			current += array.length;
		}

		return array[current];
	};

export const find = (array: any[], value: unknown) => {
	return array.findIndex((index) => index === value);
};

export const equals = (a: any[], b: any[]): boolean => {
	if (a.length !== b.length) {
		return false;
	}

	return a.every((value, index) => {
		return b[index] === value;
	});
};
