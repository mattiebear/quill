import { useCallback } from 'react';

import { getRelay } from '../get-relay';
import { Message } from '../message';

export const useRelay = () => {
	const send = useCallback((message: Message) => {
		getRelay().send(message);
	}, []);

	return { send };
};
