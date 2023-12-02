import { Canvas } from '@react-three/fiber';
import { FC, Suspense } from 'react';

import { useMapCamera } from '@/lib/engine/hooks/use-map-camera';
import { useMapFloors } from '@/lib/engine/hooks/use-map-floors';
import { useMapLight } from '@/lib/engine/hooks/use-map-light';
import { useMapWalls } from '@/lib/engine/hooks/use-map-walls';

export const MapRenderer: FC = () => {
	const camera = useMapCamera();
	const floors = useMapFloors();
	const walls = useMapWalls();
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
				{floors}
				{walls}
			</Canvas>
		</Suspense>
	);
};
