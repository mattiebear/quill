import { Container, Heading, SimpleGrid } from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { AddMapButton } from './add-map-button';

export const MapsIndex: FC = () => {
	const { t } = useTranslation();

	return (
		<>
			<Heading
				color="text.heading"
				fontWeight="medium"
				size="md"
				py={8}
				textTransform="capitalize"
			>
				{t('maps.indexTitle')}
			</Heading>

			<Container maxW="container.lg">
				<SimpleGrid columns={4} spacing={4}>
					<Link to="/maps/new">
						<AddMapButton />
					</Link>
				</SimpleGrid>
			</Container>
		</>
	);
};
