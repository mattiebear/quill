import { BoxProps, Flex } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';

interface RailProps extends PropsWithChildren, BoxProps {}

export const Rail: FC<RailProps> = (props) => {
	return (
		<Flex
			bg="background.cover"
			borderRadius="lg"
			direction="column"
			p={1.5}
			rowGap={8}
			{...props}
		/>
	);
};
