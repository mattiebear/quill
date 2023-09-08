import { Relay } from '@space-station/relay';
import { QueryClient } from '@tanstack/react-query';
import axios, { AxiosInstance } from 'axios';
import { create } from 'zustand';

interface StaticStoreValue {
	httpClient: AxiosInstance;
	queryClient: QueryClient;
	relay: Relay;
}

const staticStore = create<StaticStoreValue>(() => ({
	httpClient: axios.create(),
	queryClient: new QueryClient(),
	relay: new Relay(),
}));

const useStaticStore = staticStore;

export { staticStore, useStaticStore };
