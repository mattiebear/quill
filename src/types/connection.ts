import { Record } from '@/types/entity';
import { User } from '@/types/user';

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

interface ConnectionUserData extends Record {
	userId: string;
	role: ConnectionUserRole;
	user: User;
}

interface ConnectionWithUser {
	connectionUsers: ConnectionUserData[];
}

export type ConnectionDetailData = ConnectionData;

export interface ConnectionListData
	extends ConnectionData,
		ConnectionWithUser {}
