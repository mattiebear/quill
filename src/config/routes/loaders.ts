import { fetchConnectionsList } from '@/api/connections';
import { fetchGameSessionsList } from '@/api/game-sessions';
import { fetchGameSessionDetail } from '@/api/game-sessions/detail';
import { fetchMapDetail, fetchMapsList } from '@/api/maps';
import { fetchTileManifest } from '@/api/tiles/meta';
import { fetchTokenManifest } from '@/api/tokens/meta';
import { TileState } from '@/lib/engine/map/tile-state';
import { resetEditorStore } from '@/lib/engine/store/editor-store';
import { resetTileStore, TileStore } from '@/lib/engine/store/tile-store';

type Loader = (args: any) => Promise<any>;

export const mapEditorLoader: Loader = async ({ params }) => {
	resetEditorStore();
	resetTileStore();

	const data = await fetchMapDetail(params.id);

	TileStore.setState(TileState.load(data.data).state());

	return data;
};

export const gameSessionLoader: Loader = ({ params }) => {
	resetEditorStore();

	return fetchGameSessionDetail(params.id);
};

export const mapsLoader: Loader = () => fetchMapsList();

export const friendsLoader: Loader = () => fetchConnectionsList();

export const gameSessionsLoader: Loader = () => {
	return Promise.all([fetchConnectionsList(), fetchGameSessionsList()]);
};
