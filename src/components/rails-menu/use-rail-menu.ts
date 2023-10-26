import { useCallback, useState } from 'react';

export const useRailMenu = () => {
	const [stack, setStack] = useState<number[]>([]);

	const selectItem = useCallback(
		(level: number, index: number) => {
			if (stack[level] === index) {
				return;
			}

			setStack(stack.slice(0, level).concat(index));
		},
		[stack, setStack]
	);

	const getIsActive = useCallback(
		(level: number, index: number) => {
			return stack[level] === index;
		},
		[stack]
	);

	return {
		getIsActive,
		selectItem,
	};
};
