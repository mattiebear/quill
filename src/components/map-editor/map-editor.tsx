import { useMapDetail } from '@/api/maps';
import { useTileManifest } from '@/api/tiles/meta';
import { PageLoading } from '@/components/loading';
import { useQuill } from '@/components/map-editor/hooks/use-quill';
import { useIdParam } from '@/lib/router';

import { EditorContext } from './context';
import { EditorUI } from './editor-ui';

export const MapEditor = () => {
	const id = useIdParam();
	const { data } = useMapDetail(id);
	const engine = useQuill();
	const manifest = useTileManifest();

	console.log(manifest.data);

	if (!data) {
		return <PageLoading />;
	}

	return (
		<EditorContext value={{ engine }}>
			<EditorUI />
		</EditorContext>
	);
};
