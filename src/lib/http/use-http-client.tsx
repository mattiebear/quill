import { useContext } from 'react';

import { httpContext } from './http-context';

export const useHttpClient = () => {
	return useContext(httpContext);
};
