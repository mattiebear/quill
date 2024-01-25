import { fetchConnectionsList } from '@/api/connections';
import { fetchMapDetail, fetchMapsList } from '@/api/maps';
import { fetchGameSessionsList } from '@/api/sessions';
import { fetchGameSessionDetail } from '@/api/sessions/detail';
import { TileState } from '@/lib/engine/map/tile-state';
import { resetEditorStore } from '@/lib/engine/store/editor-store';
import { resetPlayStore } from '@/lib/engine/store/play-store';
import { resetTileStore, TileStore } from '@/lib/engine/store/tile-store';
import { resetUIStore } from '@/lib/engine/store/ui-store';

type Loader = (args: any) => Promise<any>;

const resetStores = () => {
	resetEditorStore();
	resetPlayStore();
	resetTileStore();
	resetUIStore();
};

export const mapEditorLoader: Loader = async ({ params }) => {
	resetStores();

	const data = await fetchMapDetail(params.id);

	TileStore.setState(TileState.load(data.data).state());

	return data;
};

export const gameSessionLoader: Loader = ({ params }) => {
	resetStores();

	return fetchGameSessionDetail(params.id);
};

export const mapsLoader: Loader = () => fetchMapsList();

export const friendsLoader: Loader = () => fetchConnectionsList();

export const gameSessionsLoader: Loader = () => {
	return Promise.all([fetchConnectionsList(), fetchGameSessionsList()]);
};
