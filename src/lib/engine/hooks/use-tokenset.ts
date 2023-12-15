export interface TokenSchema {
	id: string;
	image: string;
}

const manifest: TokenSchema[] = [
	{
		id: '1',
		image: '',
	},
];

export const useTokenset = () => {
	return manifest;
};
