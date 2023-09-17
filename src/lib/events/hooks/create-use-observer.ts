import { useEffect } from 'react';

import { getRelay } from '../get-relay';

export const createUseObserver =
	(channel: string) => (event: string, handler: (data: any) => void) => {
		useEffect(() => {
			const relay = getRelay();

			return relay.channel(channel).on(event, handler);
		}, [event, handler]);
	};
