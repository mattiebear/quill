import { Container, Heading, SimpleGrid } from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useMapsList } from '@/api/maps';
import { VarPath } from '@/lib/url/var-path';

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
							<Link to={new VarPath('/maps/:id').for(map).toString()}>
								<MapDetailTile key={map.id} map={map} />
							</Link>
						);
					})}
				</SimpleGrid>
			</Container>
		</>
	);
};
