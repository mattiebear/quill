import { Button, HStack, Spacer, Td, Text, Tr } from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { MapEntity } from '@/entites/map-entity';

interface MapRowProps {
	map: MapEntity;
	onSelectMap: (map: MapEntity) => void;
}

export const MapRow: FC<MapRowProps> = ({ map, onSelectMap }) => {
	const { t } = useTranslation();

	return (
		<Tr>
			<Td pl={0}>
				<Text fontWeight="medium">{map.name}</Text>
			</Td>

			<Td pr={0}>
				<HStack>
					<Spacer />
					<Button
						colorScheme="purple"
						onClick={() => onSelectMap(map)}
						size="sm"
					>
						{t('common.select')}
					</Button>
				</HStack>
			</Td>
		</Tr>
	);
};
