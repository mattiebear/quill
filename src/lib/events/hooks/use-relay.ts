import { useCallback } from 'react';

import { getRelay } from '../get-relay';
import { Channel } from '../relay';

export const useRelay = () => {
	const send = useCallback((event: string, data?: any) => {
		getRelay().channel(Channel.Quill).send(event, data);
	}, []);

	return { send };
};
