import { Canvas } from '@react-three/fiber';
import { FC, Suspense } from 'react';

import { useMapCamera } from '@/lib/engine/hooks/use-map-camera';
import { useMapFloors } from '@/lib/engine/hooks/use-map-floors';
import { useMapLight } from '@/lib/engine/hooks/use-map-light';

export const MapRenderer: FC = () => {
	const camera = useMapCamera();
	const floors = useMapFloors();
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
			</Canvas>
		</Suspense>
	);
};
