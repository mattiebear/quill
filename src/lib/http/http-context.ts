import axios, { AxiosInstance } from 'axios';
import { createContext } from 'react';

interface HttpContextValue {
	client: AxiosInstance
}

export const httpContext = createContext<HttpContextValue>({
	client: axios.create()
});
