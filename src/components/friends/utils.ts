import { ConnectionListData } from '@/types/connection';

export const matchUsername =
	(searchValue: string) => (connection: ConnectionListData) => {
		// FIXME: Disabled. Fix after adding data entity
		searchValue;
		connection;
		return false;
		// new RegExp(searchValue, 'ig').test(connection.connectedUser.username);
	};
