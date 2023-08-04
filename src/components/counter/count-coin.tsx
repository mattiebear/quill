import { Flex, StyleProps } from '@chakra-ui/react';
import { FC } from 'react';

interface CountCoinProps extends StyleProps {
	text: string | number;
}

export const CountCoin: FC<CountCoinProps> = ({ text, ...rest }) => {
	return (
		<Flex
			alignItems="center"
			bg="alert"
			borderRadius="full"
			boxSize={4}
			color="white"
			fontSize="xs"
			fontWeight="medium"
			justifyContent="center"
			right={-2}
			top={-2}
			{...rest}
		>
			{text}
		</Flex>
	);
};
