import { useCallback } from 'react';

import { Direction } from '@/lib/quill';
import { quillStore } from '@/lib/quill/store';
import { find, shift } from '@/utils/array';

export const useRotateTile = () => {
	const rotate = useCallback((places: number) => {
		const directions = Object.values(Direction);
		const { selectedDirection: selected } = quillStore.getState();

		const index = find(directions, selected);
		const value = shift(directions)(index, places);

		quillStore.setState({ selectedDirection: value });
	}, []);

	const rotateLeft = useCallback(() => rotate(-1), [rotate]);
	const rotateRight = useCallback(() => rotate(1), [rotate]);

	return { rotateLeft, rotateRight };
};
