import { useMapDetail } from '@/api/maps';
import { PageLoading } from '@/components/loading';
import { useQuill } from '@/components/map-editor/hooks/use-quill';
import { useIdParam } from '@/lib/router';

import { EditorContext } from './context';
import { EditorUI } from './editor-ui';

export const MapEditor = () => {
	const id = useIdParam();
	const { data } = useMapDetail(id);
	const engine = useQuill();

	if (!data) {
		return <PageLoading />;
	}

	return (
		<EditorContext value={{ engine }}>
			<EditorUI />
		</EditorContext>
	);
};
