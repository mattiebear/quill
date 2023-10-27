import { Flex } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';

type RailMenuContentProps = PropsWithChildren;

export const RailMenuContent: FC<RailMenuContentProps> = (props) => {
	return <Flex px={3} {...props} />;
};
