import { Box, StyleProps, forwardRef } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

import { CountCoin } from '@/components/counter/count-coin';

interface CountBadgeProps extends PropsWithChildren, StyleProps {
	count: number;
	displayZero?: boolean;
	max?: number;
}

export const CountBadge = forwardRef<CountBadgeProps, 'div'>(
	({ children, count, displayZero = false, max = 9, ...rest }, ref) => {
		const showCoin = !!count || displayZero;
		const text = count > max ? `${max}+` : count;

		return (
			<Box position="relative" ref={ref} {...rest}>
				{children}
				{showCoin && <CountCoin pos="absolute" text={text} />}
			</Box>
		);
	}
);
