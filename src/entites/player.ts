import { JsonObject, JsonProperty } from 'json2typescript';

import { User } from '@/entites/user';

export enum PlayerRole {
	Onwer = 'owner',
	Participant = 'participant',
}

@JsonObject('Player')
export class Player {
	@JsonProperty('id', String)
	id = '';

	@JsonProperty('role', String)
	role = PlayerRole.Participant;

	@JsonProperty('userId', String)
	userId = '';

	@JsonProperty('user', User)
	user = new User();
}
