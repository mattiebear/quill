import { Relay } from '@space-station/relay';
import { QueryClient } from '@tanstack/react-query';
import { create } from 'zustand';

import { HttpClient } from '../http/types';

interface StaticStoreValue {
	getToken: () => Promise<string | null>;
	httpClient: HttpClient;
	queryClient: QueryClient;
	relay: Relay;
}

const staticStore = create<StaticStoreValue>(() => ({
	getToken: () => Promise.resolve(''),
	httpClient: null as unknown as HttpClient,
	queryClient: null as unknown as QueryClient,
	relay: new Relay(),
}));

const useStaticStore = staticStore;

export { staticStore, useStaticStore };
