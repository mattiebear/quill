import { StaticStore } from '../store';

export const getToken = () => {
	return StaticStore.getState().getToken();
};
