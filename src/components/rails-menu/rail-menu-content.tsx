import { BoxProps, Flex } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';

interface RailMenuContentProps extends PropsWithChildren, BoxProps {}

export const RailMenuContent: FC<RailMenuContentProps> = (props) => {
	return <Flex px={3} {...props} />;
};
