export enum ConnectionStatus {
	PendingAcceptance = 'pending',
	AwaitingResponse = 'awaiting',
	Accepted = 'accepted',
	Rejected = 'rejected',
}

export interface ConnectionData {
	id: string;
	connectedUserId: string;
	status: ConnectionStatus;
	userId: string;
	createdAt: string;
	updatedAt: string;
}

export type ConnectionDetailData = ConnectionData;
