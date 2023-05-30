import { AspectRatio, Card, CardBody, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { PlusCircleIcon } from '../icon';

interface MapDetailTileProps {
	map: any;
}

export const MapDetailTile: FC<MapDetailTileProps> = ({ map }) => {
	const { t } = useTranslation();

	return (
		<Card>
			<AspectRatio ratio={2 / 3}>
				<CardBody color="inherit">
					<VStack spacing={6}>
						<PlusCircleIcon boxSize={10} color="inherit" />
						<Text color="inherit" textTransform="capitalize">
							{map.name}
						</Text>
					</VStack>
				</CardBody>
			</AspectRatio>
		</Card>
	);
};
