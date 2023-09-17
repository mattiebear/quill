import { staticStore } from '../store';

export const getQueryClient = () => {
	return staticStore.getState().queryClient;
};
