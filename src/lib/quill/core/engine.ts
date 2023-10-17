import { container, inject } from '@/lib/di';

import { Broadcast } from '../comms/broadcast';
import { Sync } from '../comms/sync';
import { MapLoader } from '../map/map-loader';
import { TileMap } from '../map/tile-map';
import { TileMapDistributor } from '../map/tile-map-distributor';
import { TokenMap } from '../map/token-map';
import { TokenMapDistributor } from '../map/token-map-distributor';
import { Renderer } from '../renderer';
import { Store } from '../store/store';
import { EngineConfig } from './engine-config';

export class Engine {
	constructor(
		public config: EngineConfig,
		public renderer: Renderer,
		public tileMap: TileMap,
		public tokenMap: TokenMap,
		public sync: Sync,
		public broadcast: Broadcast,
		public loader: MapLoader,
		public store: Store,
		public tileDistributor: TileMapDistributor,
		public tokenDistributor: TokenMapDistributor
	) {}

	initialize() {
		this.store.reset();
		return this;
	}

	// Should these be handled in an event?
	destroy() {
		this.renderer.destroy();
		this.broadcast.destroy();
		this.store.destroy();
		this.tileMap.destroy();
		this.sync.destroy();
		this.tileDistributor.destroy();
		this.tokenDistributor.destroy();
	}
}

inject(Engine, [
	EngineConfig,
	Renderer,
	TileMap,
	TokenMap,
	Sync,
	Broadcast,
	MapLoader,
	Store,
	TileMapDistributor,
	TokenMapDistributor,
]);

container.register(Engine);
