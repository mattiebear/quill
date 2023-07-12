export const degToRad = (rad: number) => {
	return (rad * Math.PI) / 180;
};

export const radToDeg = (deg: number) => {
	return (deg * 180) / Math.PI;
};

export const div = (n: number, d: number) => {
	if (d === 0) {
		return n === 0 ? 0 : Infinity;
	}

	return n / d;
};
