import { useMemo } from 'react';

import { useConnectionsList } from '@/api/connections';
import { ConnectionStatus } from '@/entites/connection';
import { useCurrentUser } from '@/lib/auth/use-current-user';

export const useConnectedUsers = () => {
	const { data: connections } = useConnectionsList();
	const user = useCurrentUser();

	return useMemo(() => {
		if (!connections) {
			return [];
		}

		return connections
			.filter((connection) => connection.status === ConnectionStatus.Accepted)
			.map((connection) => connection.other(user));
	}, [connections, user]);
};
