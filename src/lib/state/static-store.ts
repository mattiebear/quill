import { QueryClient } from '@tanstack/react-query';
import axios, { AxiosInstance } from 'axios';
import { create } from 'zustand';

interface StaticStoreValue {
	httpClient: AxiosInstance;
	queryClient: QueryClient;
}

const staticStore = create<StaticStoreValue>(() => ({
	httpClient: axios.create(),
	queryClient: new QueryClient(),
}));

const useStaticStore = staticStore;

export { staticStore, useStaticStore };
