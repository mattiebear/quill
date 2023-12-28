import { useMapInteractor } from '@/lib/engine/map/hooks/use-map-interactor';

import { useEditorClick } from './use-editor-click';

export const useMapGrid = () => {
	const onClick = useEditorClick();
	const { onClickGrid, onLeaveGrid, onMoveGrid } = useMapInteractor({
		onClick,
	});

	return (
		<mesh
			onClick={onClickGrid}
			onPointerMove={onMoveGrid}
			onPointerLeave={onLeaveGrid}
			rotation-x={(Math.PI / 180) * -90}
		>
			{/* TODO: Make full size */}
			<planeGeometry args={[3, 3]} />
			<meshStandardMaterial opacity={0.1} transparent />
		</mesh>
	);
};
