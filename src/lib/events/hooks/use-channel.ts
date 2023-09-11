import { useCallback } from 'react';

import { getRelay } from '../get-relay';

export const useChannel = (channel: string) => {
	const send = useCallback(
		(event: string, data?: any) => {
			getRelay().channel(channel).send(event, data);
		},
		[channel]
	);

	return { send };
};
