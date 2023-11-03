import { useMemo } from 'react';

import { ActionManager } from '..';
import { ActionStore } from '../store';

export const useActionManager = () => {
	return useMemo(() => {
		return new ActionManager(ActionStore);
	}, []);
};
