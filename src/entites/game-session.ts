import { JsonObject, JsonProperty } from 'json2typescript';

import { Player } from './player';

export enum GameSessionStatus {
	Pending = 'pending',
	Active = 'active',
	Complete = 'complete',
}

@JsonObject('GameSession')
export class GameSession {
	@JsonProperty('id', String)
	id = '';

	@JsonProperty('name', String)
	name = '';

	@JsonProperty('status', String)
	status = GameSessionStatus.Pending;

	@JsonProperty('players', [Player])
	players: Player[] = [];
}
