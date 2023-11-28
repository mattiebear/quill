import { CameraControls } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { MathUtils } from 'three';

export const useMapCamera = () => {
	const [controlRef, setControlRef] = useState<CameraControls | null>(null);

	// TODO: Refactor this
	useEffect(() => {
		const listener = (e: any) => {
			const key = e.key;

			if (key === 'd') {
				controlRef?.truck(1, 0, true);
			}

			if (key === 'a') {
				controlRef?.truck(-1, 0, true);
			}

			if (key === 'w') {
				controlRef?.truck(0, -1, true);
			}

			if (key === 's') {
				controlRef?.truck(0, 1, true);
			}

			if (key === 'q') {
				controlRef?.rotate(-90 * MathUtils.DEG2RAD, 0, true);
			}

			if (key === 'e') {
				controlRef?.rotate(90 * MathUtils.DEG2RAD, 0, true);
			}
		};

		document.addEventListener('keyup', listener);

		return () => document.removeEventListener('keyup', listener);
	}, [controlRef]);

	// TODO: Allow pan on drag action
	useEffect(() => {
		if (controlRef) {
			controlRef.mouseButtons.left = 0;
			controlRef.mouseButtons.middle = 0;
			controlRef.mouseButtons.right = 0;
			controlRef.mouseButtons.wheel = 0;
		}
	}, [controlRef]);

	return <CameraControls ref={setControlRef} />;
};
