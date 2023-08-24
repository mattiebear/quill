import { Table, TableContainer, Tbody } from '@chakra-ui/react';

import { useConnectedUsers } from './hooks/use-connected-users';
import { PlayerSelectionRow } from './player-selection-row';

export const PlayerSelectionList = () => {
	const users = useConnectedUsers();

	return (
		<TableContainer color="text.table" w="full">
			<Table variant="simple">
				<Tbody>
					{users.map((user) => {
						return <PlayerSelectionRow key={user.id} user={user} />;
					})}
				</Tbody>
			</Table>
		</TableContainer>
	);
};
