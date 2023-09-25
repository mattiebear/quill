import { GameSession } from '@/entites/game-session';
import { MapEntity } from '@/entites/map-entity';
import { Tileset } from '@/lib/quill';

export enum EngineMode {
	Editor,
	Play,
}

interface ConfigValues {
	el: HTMLDivElement;
	gameSession?: GameSession;
	map?: MapEntity;
	mode: EngineMode;
	tileset: Tileset;
}

export class EngineConfig implements ConfigValues {
	readonly el: HTMLDivElement;
	readonly gameSession: GameSession;
	readonly map: MapEntity;
	readonly mode: EngineMode;
	readonly tileset: Tileset;

	constructor(data: ConfigValues) {
		Object.assign(this, data);
	}

	get isEditorMode() {
		return this.mode === EngineMode.Editor;
	}

	get isPlayMode() {
		return this.mode === EngineMode.Play;
	}
}
