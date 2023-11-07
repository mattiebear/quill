import { StyleProps } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { equals } from '@/utils/array';

interface UseRailMenuConfig {
	onSelect?: (action?: string) => void;
	resetOnEscape: boolean;
}

export const useRailMenu = ({ onSelect, resetOnEscape }: UseRailMenuConfig) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [stack, setStack] = useState<number[]>([]);

	const selectItem = useCallback(
		(location: number[], action?: string) => {
			if (equals(location, stack)) {
				return;
			}

			setStack(location);

			if (onSelect) {
				onSelect(action);
			}
		},
		[onSelect, setStack, stack]
	);

	const getIsActive = useCallback(
		(location: number[]) => {
			return location.every((value, index) => {
				return stack[index] === value;
			});
		},
		[stack]
	);

	const getFrameProps = useCallback((level: number): StyleProps => {
		return {
			left: `${3 * level}rem`,
		};
	}, []);

	useEffect(() => {
		if (!resetOnEscape) {
			return;
		}

		const listener = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				selectItem([]);
			}
		};

		document.addEventListener('keyup', listener);

		return () => document.removeEventListener('keyup', listener);
	}, [resetOnEscape, selectItem]);

	return {
		containerRef,
		getFrameProps,
		getIsActive,
		selectItem,
	};
};
