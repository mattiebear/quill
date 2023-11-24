import { useMapInteractor } from './use-map-interactor';

export const useMapGrid = () => {
	const { onClickGrid, onLeaveGrid, onMoveGrid } = useMapInteractor();

	return (
		<mesh
			onClick={onClickGrid}
			onPointerMove={onMoveGrid}
			onPointerLeave={onLeaveGrid}
			rotation-x={(Math.PI / 180) * -90}
		>
			<planeGeometry args={[3, 3]} />
			<meshStandardMaterial opacity={0.1} transparent />
		</mesh>
	);
};
