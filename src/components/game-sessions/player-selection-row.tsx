import { Avatar, Button, Td, Text, Tr } from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { User } from '@/entites/user';

interface PlayerSelectionRowProps {
	isSelected: boolean;
	onAddPlayer: (user: User) => void;
	onRemovePlayer: (user: User) => void;
	user: User;
}

export const PlayerSelectionRow: FC<PlayerSelectionRowProps> = ({
	isSelected,
	onAddPlayer,
	onRemovePlayer,
	user,
}) => {
	const { t } = useTranslation();

	return (
		<Tr>
			<Td pl={0} pr={2}>
				<Avatar name={user.username} src={user.imageUrl} />
			</Td>
			<Td w="full" pl={2}>
				<Text fontWeight="medium">{user.username}</Text>
			</Td>
			<Td pr={0}>
				{isSelected ? (
					<Button
						colorScheme="blue"
						onClick={() => onRemovePlayer(user)}
						variant="solid"
					>
						{t('common.remove')}
					</Button>
				) : (
					<Button
						colorScheme="blue"
						onClick={() => onAddPlayer(user)}
						variant="outline"
					>
						{t('common.add')}
					</Button>
				)}
			</Td>
		</Tr>
	);
};
