import { useMemo } from 'react';

import { Floor1 } from '@/lib/tiles/floor-1';

export const useEditorTiles = () => {
	const floors = useMemo(() => {
		return [<Floor1 key={1} />];
	}, []);

	return { floors };
};
