import { staticStore } from '../store';

export const getRelay = () => {
	return staticStore.getState().relay;
};
