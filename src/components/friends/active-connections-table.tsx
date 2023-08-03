import { Heading, Table, TableContainer, Tbody } from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ActiveConnectionsRow } from '@/components/friends/active-connections-row';
import { useConnections } from '@/components/friends/hooks/use-connections';

export const ActiveConnectionsTable: FC = () => {
	const { acceptedConnections: connections } = useConnections();
	const { t } = useTranslation();

	if (!connections.length) {
		return null;
	}

	return (
		<TableContainer color="text.table" w="full">
			<Heading as="h4" fontSize="lg" fontWeight="medium">
				{t('friends.active.tableTitle', { count: connections.length })}
			</Heading>
			<Table variant="simple">
				<Tbody>
					{connections.map((connection) => {
						return (
							<ActiveConnectionsRow
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
