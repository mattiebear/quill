import { useUser } from '@clerk/clerk-react';
import { useMemo } from 'react';

import { useConnectionsList } from '@/api/connections';
import { ConnectionStatus } from '@/types/connection';

export const useConnections = () => {
	const { data: connections } = useConnectionsList();
	const { user } = useUser();

	return useMemo(() => {
		if (!connections) {
			return {
				acceptedConnections: [],
				pendingConnections: [],
			};
		}

		const acceptedConnections = connections.filter(
			(conn) => conn.status === ConnectionStatus.Accepted
		);

		const pendingConnections = connections.filter(
			(conn) =>
				conn.status === ConnectionStatus.Pending &&
				conn.recipient.id === user?.id
		);

		return {
			acceptedConnections,
			pendingConnections,
		};
	}, [connections]);
};
