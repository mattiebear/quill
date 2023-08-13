import { User } from '@/entites/user';

export const matchUsername = (searchValue: string) => (user: User) => {
	return new RegExp(searchValue, 'ig').test(user.username);
};
