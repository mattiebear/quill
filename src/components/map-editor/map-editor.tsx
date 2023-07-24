import { useMapDetail } from '@/api/maps';
import { useQuill } from '@/components/map-editor/hooks/use-quill';
import { useIdParam } from '@/lib/router';
import { assertPresence } from '@/utils/runtime';

import { EditorContext } from './context';
import { EditorUI } from './editor-ui';

export const MapEditor = () => {
	const id = useIdParam();
	const { data } = useMapDetail(id);

	assertPresence(data);

	const engine = useQuill(data);

	return (
		<EditorContext value={{ engine }}>
			<EditorUI />
		</EditorContext>
	);
};
