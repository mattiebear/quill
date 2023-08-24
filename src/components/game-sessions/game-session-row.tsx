import { Avatar, AvatarGroup, Button, Td, Text, Tr } from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { GameSession } from '@/entites/game-session';

import { StatusTag } from './status-tag';

interface GameSessionsRowProps {
	session: GameSession;
}

export const GameSessionRow: FC<GameSessionsRowProps> = ({ session }) => {
	const { t } = useTranslation();

	const name =
		session.name ||
		t('gameSessions.sessionDefaultName', { name: session.owner.username });

	return (
		<Tr>
			<Td pl={0}>
				<AvatarGroup>
					{session.players.map(({ user }) => (
						<Avatar id={user.id} name={user.username} src={user.imageUrl} />
					))}
				</AvatarGroup>
			</Td>
			<Td>
				<Text fontWeight="medium">{name}</Text>
			</Td>
			<Td w="full">
				<StatusTag status={session.status} />
			</Td>
			<Td pr={0}>
				<Button colorScheme="purple" size="sm">
					{t('gameSessions.joinSessionButton')}
				</Button>
			</Td>
		</Tr>
	);
};
