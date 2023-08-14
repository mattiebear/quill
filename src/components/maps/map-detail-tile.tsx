import { AspectRatio, Card, CardBody, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';

import { MapEntity } from '@/entites/map-entity';

import { MapIcon } from '../icon';

interface MapDetailTileProps {
	map: MapEntity;
}

export const MapDetailTile: FC<MapDetailTileProps> = ({ map }) => {
	return (
		<Card
			bg="gray.800"
			borderColor="blue.400"
			borderRadius="3xl"
			borderStyle="solid"
			borderWidth="1px"
			color="blue.400"
			transitionDuration="normal"
			transitionProperty="common"
			_hover={{
				borderColor: 'blue.200',
				color: 'blue.200',
			}}
		>
			<AspectRatio ratio={2 / 3}>
				<CardBody color="inherit">
					<VStack spacing={6}>
						<MapIcon boxSize={10} color="inherit" />
						<Text color="inherit" textAlign="center" textTransform="capitalize">
							{map.name}
						</Text>
					</VStack>
				</CardBody>
			</AspectRatio>
		</Card>
	);
};
