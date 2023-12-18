import { ThreeEvent } from '@react-three/fiber';
import { pick } from 'ramda';
import { useCallback, useMemo } from 'react';
import { Color } from 'three';

import { useCurrentUser } from '@/lib/auth/use-current-user';

import { Token } from '../map';
import { PagePosition } from '../map/grid/page-position';
import { PlayAction, PlayStore, usePlayStore } from '../store/play-store';
import { useTokenStore } from '../store/token-store';

const height = 1.2;

export const useMapTokens = () => {
	const user = useCurrentUser();
	const tokens = useTokenStore((state) => state.tokens);
	const { action, selectedToken } = usePlayStore(
		pick(['action', 'selectedToken'])
	);

	const handleClick = useCallback(
		(e: ThreeEvent<MouseEvent>, token: Token) => {
			e.stopPropagation();

			if (user.id !== token.userId) {
				return;
			}

			if (action === PlayAction.SelectToken) {
				const pos = PagePosition.fromEvent(e);

				PlayStore.setState({
					interactionPosition: pos,
					isTokenMenuOpen: true,
					selectedToken: token,
				});
			}
		},
		[action, user]
	);

	return useMemo(() => {
		return tokens.map((token) => {
			const pos: [number, number, number] = [
				token.position.x,
				token.position.y + height / 2,
				token.position.z,
			];

			let color: Color | string = new Color(0x544b4d);

			if (token === selectedToken) {
				color = 'green';
			} else if (token.userId === user.id) {
				color = 'blue';
			}

			return (
				<mesh
					key={token.id}
					position={pos}
					onClick={(e) => handleClick(e, token)}
				>
					<boxGeometry args={[0.5, height, 0.5]} />
					<meshStandardMaterial color={color} />
				</mesh>
			);
		});
	}, [handleClick, selectedToken, tokens, user]);
};
