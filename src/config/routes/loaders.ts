import { fetchConnectionsList } from '@/api/connections';
import { fetchGameSessionsList } from '@/api/game-sessions';
import { fetchGameSessionDetail } from '@/api/game-sessions/detail';
import { fetchMapDetail, fetchMapsList } from '@/api/maps';
import { fetchTileManifest } from '@/api/tiles/meta';
import { fetchTokenManifest } from '@/api/tokens/meta';

type Loader = (args: any) => Promise<any>;

export const mapEditorLoader: Loader = ({ params }) => {
	return Promise.all([fetchMapDetail(params.id), fetchTileManifest()]);
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
