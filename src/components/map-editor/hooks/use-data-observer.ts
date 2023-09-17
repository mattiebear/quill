import { Channel, createUseObserver } from '@/lib/events';

export const useDataObserver = createUseObserver(Channel.Data);
