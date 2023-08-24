import { Avatar, Button, Td, Text, Tr } from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { User } from '@/entites/user';

interface PlayerSelectionRowProps {
	user: User;
}

export const PlayerSelectionRow: FC<PlayerSelectionRowProps> = ({ user }) => {
	const { t } = useTranslation();

	return (
		<Tr>
			<Td pl={0} pr={2}>
				<Avatar src={user.imageUrl} />
			</Td>
			<Td w="full" pl={2}>
				<Text fontWeight="medium">{user.username}</Text>
			</Td>
			<Td pr={0}>
				<Button colorScheme="cyan" variant="outline">
					{t('common.add')}
				</Button>
			</Td>
		</Tr>
	);
};
