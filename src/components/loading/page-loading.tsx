import { Flex, Spinner } from '@chakra-ui/react';
import { FC } from 'react';

export const PageLoading: FC = () => {
	return (
		<Flex alignItems="center" justifyContent="center">
			<Spinner />
		</Flex>
	);
};
