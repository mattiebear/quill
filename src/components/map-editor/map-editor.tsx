import { useMapDetail } from '@/api/maps';
import { useQuill } from '@/components/map-editor/hooks/use-quill';
import { Direction } from '@/lib/quill';
import { useIdParam } from '@/lib/router';
import { MapData } from '@/types/map';
import { assertPresence } from '@/utils/runtime';

import { EditorContext } from './context';
import { EditorUI } from './editor-ui';

const mockData: MapData = [
	{
		p: [0, 0, 0],
		t: [{ i: '1', d: Direction.N }],
	},
	{
		p: [1, 0, 0],
		t: [{ i: '1', d: Direction.W }],
	},
	{
		p: [0, 1, 0],
		t: [{ i: '1', d: Direction.E }],
	},
	{
		p: [1, 1, 0],
		t: [{ i: '1', d: Direction.S }],
	},
];

export const MapEditor = () => {
	const id = useIdParam();
	const { data } = useMapDetail(id);
	const engine = useQuill(mockData);

	assertPresence(data);

	return (
		<EditorContext value={{ engine }}>
			<EditorUI />
		</EditorContext>
	);
};
