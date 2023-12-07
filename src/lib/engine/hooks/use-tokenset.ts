// import { useMemo } from 'react';

interface Token {
	id: string;
	image: string;
	// type: TileType;
}

const manifest: Token[] = [
	{
		id: '1',
		image: '',
		// type: 'floor',
	},
];

export const useTokenset = () => {
	return manifest;
};
