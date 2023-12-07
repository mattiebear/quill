import { QueryClient } from '@tanstack/react-query';
import { create } from 'zustand';

import { HttpClient } from '../http/types';

interface StaticStoreValue {
	getToken: () => Promise<string | null>;
	httpClient: HttpClient;
	queryClient: QueryClient;
}

const StaticStore = create<StaticStoreValue>(() => ({
	getToken: () => Promise.resolve(''),
	httpClient: null as unknown as HttpClient,
	queryClient: null as unknown as QueryClient,
}));

const useStaticStore = StaticStore;

export { StaticStore, useStaticStore };
