import { useEffect } from 'react';

import { relay } from '../instance';
import { Message } from '../message';
import { Observer } from '../relay';

export const useObserver = <T extends Message>(
	type: new (...args: any[]) => T,
	handler: Observer<T>
) => {
	useEffect(() => {
		return relay.on(type, handler);
	}, [type, handler]);
};
