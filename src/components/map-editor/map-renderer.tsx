import { Canvas } from '@react-three/fiber';
import { FC, Suspense } from 'react';

import { useMapGrid } from '@/components/map-editor/hooks/use-map-grid';
import { useMapCamera } from '@/lib/engine/map/hooks/use-map-camera';
import { useMapFloors } from '@/lib/engine/map/hooks/use-map-floors';
import { useMapLight } from '@/lib/engine/map/hooks/use-map-light';
import { useMapWalls } from '@/lib/engine/map/hooks/use-map-walls';
import { useTileGhost } from '@/lib/engine/map/hooks/use-tile-ghost';

export const MapRenderer: FC = () => {
	const camera = useMapCamera();
	const floors = useMapFloors();
	const walls = useMapWalls();
	const grid = useMapGrid();
	const ghost = useTileGhost();
	const light = useMapLight();

	return (
		<Suspense>
			<Canvas
				orthographic
				camera={{
					zoom: 120,
					position: [4, 4, 4],
				}}
			>
				{light}
				{camera}
				{grid}
				{ghost}
				{floors}
				{walls}
			</Canvas>
		</Suspense>
	);
};
