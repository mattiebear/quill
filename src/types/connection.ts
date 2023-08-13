import { Record } from '@/types/entity';
import { UserData } from '@/types/user';

export enum ConnectionStatus {
	Pending = 'pending',
	Accepted = 'accepted',
}

export enum ConnectionUserRole {
	Requester = 'requester',
	Recipient = 'recipient',
}

export interface ConnectionData extends Record {
	status: ConnectionStatus;
}

export interface ConnectionUserData extends Record {
	userId: string;
	role: ConnectionUserRole;
	user: UserData;
}

interface ConnectionWithUser {
	connectionUsers: ConnectionUserData[];
}

export type ConnectionDetailData = ConnectionData;

export interface ConnectionListData
	extends ConnectionData,
		ConnectionWithUser {}
