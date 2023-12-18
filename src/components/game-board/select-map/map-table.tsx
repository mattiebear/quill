import { Spinner, Table, TableContainer, Tbody } from '@chakra-ui/react';
import { FC } from 'react';

import { useMapsList } from '@/api/maps';
import { MapEntity } from '@/entites/map-entity';

import { MapRow } from './map-row';

interface MapTableProps {
	onSelectMap: (map: MapEntity) => void;
}

export const MapTable: FC<MapTableProps> = (props) => {
	const { data: maps } = useMapsList();

	if (!maps) {
		return <Spinner />;
	}

	return (
		<TableContainer color="text.table" w="full">
			<Table variant="simple">
				<Tbody>
					{maps.map((map) => {
						return <MapRow key={map.id} map={map} {...props} />;
					})}
				</Tbody>
			</Table>
		</TableContainer>
	);
};
