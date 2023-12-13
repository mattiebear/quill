import { Canvas } from '@react-three/fiber';
import { FC, Suspense } from 'react';

import { useCanvasStyle } from '@/lib/engine/hooks/use-canvas-style';
import { useMapCamera } from '@/lib/engine/hooks/use-map-camera';
import { useMapFloors } from '@/lib/engine/hooks/use-map-floors';
import { useMapLight } from '@/lib/engine/hooks/use-map-light';
import { useMapTokens } from '@/lib/engine/hooks/use-map-tokens';
import { useMapWalls } from '@/lib/engine/hooks/use-map-walls';

import { useMapGrid } from './hooks/use-map-grid';

export const MapRenderer: FC = () => {
	const camera = useMapCamera();
	const floors = useMapFloors();
	const walls = useMapWalls();
	const grid = useMapGrid();
	const light = useMapLight();
	const tokens = useMapTokens();
	const style = useCanvasStyle();

	return (
		<Suspense>
			<Canvas
				orthographic
				camera={{
					zoom: 120,
					position: [4, 4, 4],
				}}
				style={style}
			>
				{light}
				{camera}
				{grid}
				{floors}
				{walls}
				{tokens}
			</Canvas>
		</Suspense>
	);
};
