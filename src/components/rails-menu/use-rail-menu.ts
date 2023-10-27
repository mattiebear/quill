import { StyleProps } from '@chakra-ui/react';
import { useCallback, useRef, useState } from 'react';

interface UseRailMenuConfig {
	onSelect?: (action: string) => void;
}

export const useRailMenu = ({ onSelect }: UseRailMenuConfig) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [stack, setStack] = useState<number[]>([]);

	const selectItem = useCallback(
		(location: number[], action?: string) => {
			setStack(location);

			if (onSelect && action) {
				onSelect(action);
			}
		},
		[onSelect, stack, setStack]
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
