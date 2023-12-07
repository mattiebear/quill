interface Token {
	id: string;
	image: string;
}

const manifest: Token[] = [
	{
		id: '1',
		image: '',
	},
];

export const useTokenset = () => {
	return manifest;
};
