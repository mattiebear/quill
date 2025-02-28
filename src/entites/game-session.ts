import { JsonObject, JsonProperty } from 'json2typescript';

import { assertPresence } from '@/utils/runtime';

import { Player, PlayerRole } from './player';
import { User } from './user';

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

	isOwnedBy(user: User): boolean {
		return this.owner.id === user.id;
	}

	get isActive() {
		return this.status === GameSessionStatus.Active;
	}

	get isPending() {
		return this.status === GameSessionStatus.Pending;
	}

	get isComplete() {
		return this.status === GameSessionStatus.Complete;
	}

	get owner() {
		const player = this.players.find(
			(player) => player.role === PlayerRole.Onwer
		);

		assertPresence(player);

		return player.user;
	}
}
