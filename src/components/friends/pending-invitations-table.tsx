import { Heading, Table, TableContainer, Tbody } from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useFriendsContext } from '@/components/friends/context';
import { useConnections } from '@/components/friends/hooks/use-connections';
import { PendingInvitationsRow } from '@/components/friends/pending-invitation-row';
import { matchUsername } from '@/components/friends/utils';

const usePendingConnections = () => {
	const { pendingConnections } = useConnections();
	const { searchValue } = useFriendsContext();

	return useMemo(() => {
		return pendingConnections.filter(matchUsername(searchValue));
	}, [pendingConnections, searchValue]);
};

export const PendingInvitationsTable: FC = () => {
	const connections = usePendingConnections();
	const { t } = useTranslation();

	if (!connections.length) {
		return null;
	}

	return (
		<TableContainer color="text.table" w="full">
			<Heading as="h4" fontSize="lg" fontWeight="medium">
				{t('friends.pending.tableTitle')}
			</Heading>
			<Table variant="simple">
				<Tbody>
					{connections.map((connection) => {
						return (
							<PendingInvitationsRow
								key={connection.id}
								connection={connection}
							/>
						);
					})}
				</Tbody>
			</Table>
		</TableContainer>
	);
};
