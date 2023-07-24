import { useMapDetail } from '@/api/maps';
import { useQuill } from '@/components/map-editor/hooks/use-quill';
import { useIdParam } from '@/lib/router';
import { ModuleMapDetailData } from '@/types/map';

import { EditorContext } from './context';
import { EditorUI } from './editor-ui';

export const MapEditor = () => {
	const id = useIdParam();
	const { data } = useMapDetail(id);
	const engine = useQuill(data as ModuleMapDetailData);

	return (
		<EditorContext value={{ engine }}>
			<EditorUI />
		</EditorContext>
	);
};
