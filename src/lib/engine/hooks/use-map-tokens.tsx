import { useMemo } from 'react';

import { useTokenStore } from '../store/token-store';

const height = 1.2;

export const useMapTokens = () => {
	const tokens = useTokenStore((state) => state.tokens);

	return useMemo(() => {
		return tokens.map((token) => {
			const pos: [number, number, number] = [
				token.position.x,
				token.position.y + height / 2,
				token.position.z,
			];

			return (
				<mesh key={token.id} position={pos}>
					<boxGeometry args={[0.5, height, 0.5]} />
					<meshStandardMaterial color="green" />
				</mesh>
			);
		});
	}, [tokens]);
};
