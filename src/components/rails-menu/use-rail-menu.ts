import { StyleProps } from '@chakra-ui/react';
import { useCallback, useRef, useState } from 'react';

export const useRailMenu = () => {
	const containerRef = useRef<HTMLDivElement>(null);
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

	const getFrameProps = useCallback(
		(level: number): StyleProps => {
			return {
				left: `${3 * level}rem`,
			};
		},
		[stack]
	);

	return {
		containerRef,
		getFrameProps,
		getIsActive,
		selectItem,
	};
};
