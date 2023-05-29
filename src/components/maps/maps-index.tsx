import { Container, Heading, SimpleGrid } from '@chakra-ui/react';
import { FC } from 'react';

import { AddMapButton } from './add-map-button';

export const MapsIndex: FC = () => {
	return (
		<>
			<Heading color="text.heading" fontWeight="medium" size="md" py={8}>
				Maps
			</Heading>

			<Container maxW="container.lg">
				<SimpleGrid columns={4} spacing={4}>
					<AddMapButton />
				</SimpleGrid>
			</Container>
		</>
	);
};
