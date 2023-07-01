export const cleanPath = (path: string) => {
	return path.replaceAll(/(^\/|\/$)/g, '');
};

export const joinPaths = (...paths: string[]) => {
	return paths.map(cleanPath).join('/');
};
