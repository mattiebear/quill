import { ThreeEvent } from '@react-three/fiber';
import { useCallback, useMemo } from 'react';

import { Token } from '../map';
import { PagePosition } from '../map/grid/page-position';
import { PlayAction, PlayStore, usePlayStore } from '../store/play-store';
import { useTokenStore } from '../store/token-store';

const height = 1.2;

export const useMapTokens = () => {
	const tokens = useTokenStore((state) => state.tokens);
	const action = usePlayStore((state) => state.action);

	const handleClick = useCallback(
		(e: ThreeEvent<MouseEvent>, token: Token) => {
			e.stopPropagation();

			if (action === PlayAction.SelectToken) {
				const pos = PagePosition.fromEvent(e);

				PlayStore.setState({
					interactionPosition: pos,
					selectedToken: token,
				});
			}
		},
		[action]
	);

	return useMemo(() => {
		return tokens.map((token) => {
			const pos: [number, number, number] = [
				token.position.x,
				token.position.y + height / 2,
				token.position.z,
			];

			return (
				<mesh
					key={token.id}
					position={pos}
					onClick={(e) => handleClick(e, token)}
				>
					<boxGeometry args={[0.5, height, 0.5]} />
					<meshStandardMaterial color="green" />
				</mesh>
			);
		});
	}, [handleClick, tokens]);
};
