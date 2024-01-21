import { JsonObject, JsonProperty } from 'json2typescript';

import { ConnectionUser, ConnectionUserRole } from '@/entites/connection-user';
import { User } from '@/entites/user';
import { assertPresence } from '@/utils/runtime';

export enum ConnectionStatus {
	Pending = 'pending',
	Accepted = 'accepted',
}

@JsonObject('Connection')
export class Connection {
	@JsonProperty('id', String)
	id = '';

	@JsonProperty('status', String)
	status = ConnectionStatus.Pending;

	@JsonProperty('users', [ConnectionUser])
	users: ConnectionUser[] = [];

	get recipient() {
		return this.getUserByRole(ConnectionUserRole.Recipient);
	}

	get requester() {
		return this.getUserByRole(ConnectionUserRole.Requester);
	}

	other(user: User) {
		return this.recipient.id === user.id ? this.requester : this.recipient;
	}

	private getUserByRole(role: ConnectionUserRole): User {
		const user = this.users.find((cu) => cu.role === role);

		assertPresence(user);

		return user.user;
	}
}
