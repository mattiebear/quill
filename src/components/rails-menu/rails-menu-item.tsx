import { BoxProps, Flex } from '@chakra-ui/react';
import { FC, PropsWithChildren, ReactElement } from 'react';

interface RailMenuItemProps extends PropsWithChildren, BoxProps {
	icon: ReactElement;
	label: string;
}

export const RailMenuItem: FC<RailMenuItemProps> = (props) => {
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
