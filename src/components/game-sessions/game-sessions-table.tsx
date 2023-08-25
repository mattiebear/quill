import { Heading, Table, TableContainer, Tbody } from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { GameSessionRow } from './game-session-row';
import { useActiveGameSessions } from './hooks/use-active-game-sessions';

export const GameSessionsTable: FC = () => {
	const { t } = useTranslation();
	const sessions = useActiveGameSessions();

	return (
		<TableContainer color="text.table" w="full">
			<Heading as="h4" fontSize="lg" fontWeight="medium">
				{t('gameSessions.active.tableTitle')}
			</Heading>
			<Table variant="simple">
				<Tbody>
					{sessions.map((session) => (
						<GameSessionRow key={session.id} session={session} />
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
};
