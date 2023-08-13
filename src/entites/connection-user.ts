import { JsonObject, JsonProperty } from 'json2typescript';

import { User } from '@/entites/user';
import { ConnectionUserRole } from '@/types/connection';

@JsonObject('ConnectionUser')
export class ConnectionUser {
	@JsonProperty('id', String)
	id = '';

	@JsonProperty('role', String)
	role = ConnectionUserRole.Requester;

	@JsonProperty('userId', String)
	userId = '';

	@JsonProperty('user', User)
	user = new User();
}
