import { Heading, Table, TableContainer, Tbody } from '@chakra-ui/react';
import { useUser } from '@clerk/clerk-react';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ActiveConnectionsRow } from '@/components/friends/active-connections-row';
import { useFriendsContext } from '@/components/friends/context';
import { useConnections } from '@/components/friends/hooks/use-connections';
import { matchUsername } from '@/components/friends/utils';

const useActiveConnections = () => {
	const { acceptedConnections } = useConnections();
	const { searchValue } = useFriendsContext();
	const { user } = useUser();

	return useMemo(() => {
		return acceptedConnections.filter((connection) =>
			matchUsername(searchValue)(connection.other(user?.id))
		);
	}, [acceptedConnections, searchValue]);
};

export const ActiveConnectionsTable: FC = () => {
	const connections = useActiveConnections();
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
