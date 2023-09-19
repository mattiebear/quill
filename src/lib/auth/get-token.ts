import { staticStore } from '../store';

export const getToken = () => {
	return staticStore.getState().getToken();
};
