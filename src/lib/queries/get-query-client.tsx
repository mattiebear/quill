import { staticStore } from '../state';

export const getQueryClient = () => {
	return staticStore.getState().queryClient;
};
