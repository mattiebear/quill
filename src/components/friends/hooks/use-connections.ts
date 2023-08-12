import { useMemo } from 'react';

import { useConnectionsList } from '@/api/connections';
import { ConnectionStatus } from '@/types/connection';
import { propEq } from '@/utils/lamba';

export const useConnections = () => {
	const { data } = useConnectionsList();

	return useMemo(() => {
		if (!data) {
			return {
				acceptedConnections: [],
				pendingConnections: [],
			};
		}

		const acceptedConnections = data.data.filter(
			propEq('status', ConnectionStatus.Accepted)
		);

		const pendingConnections = data.data.filter(
			propEq('status', ConnectionStatus.Pending)
		);

		return { acceptedConnections, pendingConnections };
	}, [data]);
};
