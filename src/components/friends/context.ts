import { createContext } from '@/utils/context';

interface FriendsContextValue {
	searchValue: string;
}

export const [FriendsContext, useFriendsContext] =
	createContext<FriendsContextValue>({
		defaultValue: { searchValue: '' },
	});
