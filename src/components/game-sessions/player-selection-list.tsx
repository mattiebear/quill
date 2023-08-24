import { Table, TableContainer, Tbody } from '@chakra-ui/react';
import { FC } from 'react';
import { Control, useController } from 'react-hook-form';

import { User } from '@/entites/user';

import { useConnectedUsers } from './hooks/use-connected-users';
import { PlayerSelectionRow } from './player-selection-row';
import { FormState } from './types';

interface PlayerSelectionListProps {
	control: Control<FormState>;
}

export const PlayerSelectionList: FC<PlayerSelectionListProps> = ({
	control,
}) => {
	const users = useConnectedUsers();

	const { field } = useController({
		name: 'userIds',
		control,
	});

	const handleAddPlayer = (user: User) => {
		field.onChange(field.value.concat(user.id));
	};

	const handleRemovePlayer = (user: User) => {
		field.onChange(field.value.filter((id) => id !== user.id));
	};

	return (
		<TableContainer color="text.table" w="full">
			<Table variant="simple">
				<Tbody>
					{users.map((user) => {
						return (
							<PlayerSelectionRow
								key={user.id}
								isSelected={field.value.includes(user.id)}
								onAddPlayer={handleAddPlayer}
								onRemovePlayer={handleRemovePlayer}
								user={user}
							/>
						);
					})}
				</Tbody>
			</Table>
		</TableContainer>
	);
};
