import { StyleProps } from '@chakra-ui/react';
import { useCallback, useRef, useState } from 'react';

export const useRailMenu = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [stack, setStack] = useState<number[]>([]);

	const selectItem = useCallback(
		(location: number[]) => {
			setStack(location);
		},
		[stack, setStack]
	);

	const getIsActive = useCallback(
		(location: number[]) => {
			return location.every((value, index) => {
				return stack[index] === value;
			});
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
