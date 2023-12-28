import { useCallback } from 'react';

import { PlayStore } from '../../store/play-store';

export const useTransmit = () => {
	return useCallback(async (event: any) => {
		const connection = PlayStore.getState().connection;

		if (connection) {
			connection.send(event.toJSON());
		}
	}, []);
};
