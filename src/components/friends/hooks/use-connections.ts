import { useMemo } from 'react';

import { useConnectionsList } from '@/api/connections';
import { ConnectionStatus } from '@/types/connection';
import { propEq } from '@/utils/lamba';
import { assertPresence } from '@/utils/runtime';

export const useConnections = () => {
	const { data } = useConnectionsList();

	assertPresence(data);

	return useMemo(() => {
		const acceptedConnections = data.data.filter(
			propEq('status', ConnectionStatus.Accepted)
		);

		const pendingConnections = data.data.filter(
			propEq('status', ConnectionStatus.PendingAcceptance)
		);

		const awaitingConnections = data.data.filter(
			propEq('status', ConnectionStatus.AwaitingResponse)
		);

		return { acceptedConnections, pendingConnections, awaitingConnections };
	}, [data]);
};
