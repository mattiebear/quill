import { JsonObject, JsonProperty } from 'json2typescript';

import { assertPresence } from '@/utils/runtime';

import { Player, PlayerRole } from './player';

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

	get owner() {
		const player = this.players.find(
			(player) => player.role === PlayerRole.Onwer
		);

		assertPresence(player);

		return player.user;
	}
}
