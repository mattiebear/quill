import { useUser } from '@clerk/clerk-react';
import { useMemo } from 'react';

import { User } from '@/entites/user';
import { assertPresence } from '@/utils/runtime';

export const useCurrentUser = () => {
	const { user: userData } = useUser();

	assertPresence(userData);

	return useMemo(() => {
		return new User(userData);
	}, [userData]);
};
