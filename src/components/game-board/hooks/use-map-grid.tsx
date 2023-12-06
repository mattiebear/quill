import { useMapInteractor } from '@/lib/engine/hooks/use-map-interactor';

import { useGameBoardClick } from './use-game-board-click';

export const useMapGrid = () => {
	const onClick = useGameBoardClick();
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
