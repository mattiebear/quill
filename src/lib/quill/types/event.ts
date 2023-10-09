import { MapEntity } from '@/entites/map-entity';

// TODO: Clean these up somehow?
export enum RenderEvent {
	ChangeZoom = 'render-change-zoom',
	AddToken = 'render-add-token',
}

export enum MapEvent {
	MapAltered = 'map-altered',
	MapSaved = 'map-saved',
	PlaceTile = 'map-place-tile',
}

export enum StoryEvent {
	CurrentState = 'story-current-story-state',
	SelectMap = 'story-select-map',
	PlaceToken = 'story-place-token',
}

// Websocket event types
export type CurrentStateData = {
	map: string | null;
};

export type SelectMapData = {
	map: MapEntity;
};
