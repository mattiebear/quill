import { MapEntity } from '@/entites/map-entity';

export enum RenderEvent {
	ChangeZoom = 'change-zoom',
}

export enum MapEvent {
	MapAltered = 'map-altered',
	MapSaved = 'map-saved',
	PlaceTile = 'place-tile',
}

export enum StoryEvent {
	CurrentState = 'current-story-state',
	SelectMap = 'select-map',
}

// Websocket event types
export type CurrentStateData = {
	map: string | null;
};

export type SelectMapData = {
	map: MapEntity;
};
