import { QueryClient } from '@tanstack/react-query';
import { create } from 'zustand';

import { EventManager } from '../engine/events/event-manager';
import { HttpClient } from '../http/types';

interface StaticStoreValue {
	eventManager: EventManager;
	getToken: () => Promise<string | null>;
	httpClient: HttpClient;
	queryClient: QueryClient;
}

const StaticStore = create<StaticStoreValue>(() => ({
	eventManager: null as unknown as EventManager,
	getToken: () => Promise.resolve(''),
	httpClient: null as unknown as HttpClient,
	queryClient: null as unknown as QueryClient,
}));

const useStaticStore = StaticStore;

export { StaticStore, useStaticStore };
