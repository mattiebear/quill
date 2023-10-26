import { BoxProps, Flex } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';

interface RailMenuFrameProps extends PropsWithChildren, BoxProps {}

export const RailMenuFrame: FC<RailMenuFrameProps> = (props) => {
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
