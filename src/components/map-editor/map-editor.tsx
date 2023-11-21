import { useMapDetail } from '@/api/maps';
// import { useMapEditor } from '@/components/map-editor/hooks/use-map-editor';
import { useIdParam } from '@/lib/router';
import { assertPresence } from '@/utils/runtime';

import { EditorContext } from './context';
import { EditorUI } from './editor-ui';
import { MapRenderer } from './map-renderer';

export const MapEditor = () => {
	const id = useIdParam();
	const { data: map } = useMapDetail(id);

	assertPresence(map);

	// useMapEditor(map);

	return (
		<EditorContext value={{ map }}>
			<MapRenderer />
			<EditorUI />
		</EditorContext>
	);
};
