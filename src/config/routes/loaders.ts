import { fetchConnectionsList } from '@/api/connections';
import { fetchGameSessionsList } from '@/api/game-sessions';
import { fetchGameSessionDetail } from '@/api/game-sessions/detail';
import { fetchMapDetail, fetchMapsList } from '@/api/maps';
import { fetchTileManifest } from '@/api/tiles/meta';
import { fetchTokenManifest } from '@/api/tokens/meta';
import { Floor } from '@/lib/engine/map/floor';
import { resetTileStore, TileStore } from '@/lib/engine/store/tile-store';

type Loader = (args: any) => Promise<any>;

export const mapEditorLoader: Loader = async ({ params }) => {
	resetTileStore();

	const data = await fetchMapDetail(params.id);

	const { floors } = data.data.atlas.data;

	// TODO: Make some utility to do all of this
	TileStore.setState({
		floors: floors.map((floor: any) => Floor.from(floor)),
	});

	return data;
};

export const gameSessionLoader: Loader = ({ params }) => {
	return Promise.all([
		fetchGameSessionDetail(params.id),
		fetchTileManifest(),
		fetchTokenManifest(),
	]);
};

export const mapsLoader: Loader = () => fetchMapsList();

export const friendsLoader: Loader = () => fetchConnectionsList();

export const gameSessionsLoader: Loader = () => {
	return Promise.all([fetchConnectionsList(), fetchGameSessionsList()]);
};
