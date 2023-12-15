import { Button, HStack, Spacer, Td, Text, Tr } from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { MapEntity } from '@/entites/map-entity';

import { useSelectMap } from './hooks/use-select-map';

interface SelectMapRowProps {
	map: MapEntity;
}

export const SelectMapRow: FC<SelectMapRowProps> = ({ map }) => {
	const { t } = useTranslation();
	const loadMap = useSelectMap(map);

	return (
		<Tr>
			<Td pl={0}>
				<Text fontWeight="medium">{map.name}</Text>
			</Td>

			<Td pr={0}>
				<HStack>
					<Spacer />
					<Button colorScheme="purple" onClick={loadMap} size="sm">
						{t('common.select')}
					</Button>
				</HStack>
			</Td>
		</Tr>
	);
};
