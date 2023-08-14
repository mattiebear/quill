import { Heading, Table, TableContainer, Tbody } from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useFriendsContext } from '@/components/friends/context';
import { useConnections } from '@/components/friends/hooks/use-connections';
import { PendingInvitationsRow } from '@/components/friends/pending-invitation-row';
import { matchUsername } from '@/components/friends/utils';
import { useCurrentUser } from '@/lib/auth/use-current-user';

const usePendingConnections = () => {
	const { pendingConnections } = useConnections();
	const { searchValue } = useFriendsContext();
	const user = useCurrentUser();

	return useMemo(() => {
		return pendingConnections.filter((connection) =>
			matchUsername(searchValue)(connection.other(user))
		);
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
