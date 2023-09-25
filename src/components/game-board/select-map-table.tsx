import { Spinner, Table, TableContainer, Tbody } from '@chakra-ui/react';

import { useMapsList } from '@/api/maps';

import { SelectMapRow } from './select-map-row';

export const SelectMapTable = () => {
	const { data: maps } = useMapsList();

	if (!maps) {
		return <Spinner />;
	}

	return (
		<TableContainer color="text.table" w="full">
			<Table variant="simple">
				<Tbody>
					{maps.map((map) => {
						return <SelectMapRow key={map.id} map={map} />;
					})}
				</Tbody>
			</Table>
		</TableContainer>
	);
};
