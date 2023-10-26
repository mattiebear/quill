import { BoxProps, Flex } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';

interface RailMenuProps extends PropsWithChildren, BoxProps {}

export const RailMenu: FC<RailMenuProps> = (props) => {
	return (
		<Flex
			bg="background.cover"
			borderRadius="3xl"
			direction="column"
			p={1.5}
			rowGap={8}
			{...props}
		/>
	);
};
