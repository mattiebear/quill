import { JsonObject, JsonProperty } from 'json2typescript';

import { ConnectionUser } from '@/entites/connection-user';
import { User } from '@/entites/user';
import { ConnectionStatus, ConnectionUserRole } from '@/types/connection';
import { assertPresence } from '@/utils/runtime';

@JsonObject('Connection')
export class Connection {
	@JsonProperty('id', String)
	id = '';

	@JsonProperty('status', String)
	status = ConnectionStatus.Pending;

	@JsonProperty('connectionUsers', [ConnectionUser])
	connectionUsers: ConnectionUser[] = [];

	get recipient() {
		return this.getUserByRole(ConnectionUserRole.Recipient);
	}

	get requester() {
		return this.getUserByRole(ConnectionUserRole.Requester);
	}

	other(id?: string) {
		if (this.recipient.id === id) {
			return this.requester;
		}

		return this.recipient;
	}

	private getUserByRole(role: ConnectionUserRole): User {
		const user = this.connectionUsers.find((cu) => cu.role === role);

		assertPresence(user);

		return user.user;
	}
}
