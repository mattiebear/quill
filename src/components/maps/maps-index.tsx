import { Container, Heading, SimpleGrid } from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useMapsList } from '@/api/maps';
import { DynamicPath } from '@/lib/url/dynamic-path';

import { AddMapTile } from './add-map-tile';
import { MapDetailTile } from './map-detail-tile';

export const MapsIndex: FC = () => {
	const { t } = useTranslation();
	const { data } = useMapsList();

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
				<SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} spacing={4}>
					<Link to="/maps/new">
						<AddMapTile />
					</Link>

					{data?.data.map((map: any) => {
						return (
							<Link
								key={map.id}
								to={new DynamicPath('/maps/:id').for(map).toString()}
							>
								<MapDetailTile map={map} />
							</Link>
						);
					})}
				</SimpleGrid>
			</Container>
		</>
	);
};
