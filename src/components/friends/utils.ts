import { ConnectionListData } from '@/types/connection';

export const matchUsername =
	(searchValue: string) => (connection: ConnectionListData) =>
		new RegExp(searchValue, 'ig').test(connection.connectedUser.username);
