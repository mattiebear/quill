import { useMemo } from 'react';

import { useConnectionsList } from '@/api/connections';
import { Connection, ConnectionStatus } from '@/entites/connection';
import { useCurrentUser } from '@/lib/auth/use-current-user';

interface UseConnections {
	activeConnections: Connection[];
	pendingConnections: Connection[];
	totalConnections: number;
}

export const useConnections = (): UseConnections => {
	const { data: connections } = useConnectionsList();
	const user = useCurrentUser();

	return useMemo(() => {
		if (!connections) {
			return {
				activeConnections: [],
				pendingConnections: [],
				totalConnections: 0,
			};
		}

		const activeConnections = connections.filter(
			(conn) => conn.status === ConnectionStatus.Accepted
		);

		const pendingConnections = connections.filter(
			(conn) =>
				conn.status === ConnectionStatus.Pending &&
				conn.recipient.id === user.id
		);

		return {
			activeConnections,
			pendingConnections,
			totalConnections: connections.length,
		};
	}, [connections]);
};
