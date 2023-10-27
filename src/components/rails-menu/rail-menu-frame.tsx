import { Flex } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';

type RailMenuFrameProps = PropsWithChildren;

export const RailMenuFrame: FC<RailMenuFrameProps> = (props) => {
	return (
		<Flex
			bg="background.cover"
			borderRadius="lg"
			direction="column"
			py={3}
			rowGap={4}
			position="absolute"
			{...props}
		/>
	);
};
