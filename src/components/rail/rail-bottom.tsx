import { Flex } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';

export const RailBottom: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Flex justify="center" py={6}>
			{children}
		</Flex>
	);
};
