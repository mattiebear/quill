import { Container, Heading } from '@chakra-ui/react';
import { FC } from 'react';

export const PlaySessionsIndex: FC = () => {
	return (
		<>
			<Heading
				color="text.heading"
				fontWeight="medium"
				size="md"
				py={8}
				textTransform="capitalize"
			>
				Play sessions
			</Heading>

			<Container maxW="container.lg">content</Container>
		</>
	);
};
