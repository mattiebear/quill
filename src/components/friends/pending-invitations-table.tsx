import { Heading, Table, TableContainer, Tbody } from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useConnections } from '@/components/friends/hooks/use-connections';
import { PendingInvitationsRow } from '@/components/friends/pending-invitation-row';

export const PendingInvitationsTable: FC = () => {
	const { pendingConnections: connections } = useConnections();
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
