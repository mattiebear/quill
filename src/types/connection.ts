import { User } from '@/types/user';

export enum ConnectionStatus {
	PendingAcceptance = 'pending',
	AwaitingResponse = 'awaiting',
	Accepted = 'accepted',
	Rejected = 'rejected',
	Removed = 'removed',
}

export interface ConnectionData {
	id: string;
	connectedUserId: string;
	status: ConnectionStatus;
	userId: string;
	createdAt: string;
	updatedAt: string;
}

interface ConnectionWithUser {
	connectedUser: User;
}

export type ConnectionDetailData = ConnectionData;

export interface ConnectionListData
	extends ConnectionData,
		ConnectionWithUser {}
