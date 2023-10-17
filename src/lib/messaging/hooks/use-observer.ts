import { useLayoutEffect } from 'react';

import { relay } from '../instance';
import { Message } from '../message';
import { Observer } from '../relay';

export const useObserver = <T extends Message>(
	type: new (...args: any[]) => T,
	handler: Observer<T>
) => {
	useLayoutEffect(() => {
		relay.on(type, handler);
	}, [handler, type]);
};
