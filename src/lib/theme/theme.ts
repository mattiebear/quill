import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
	semanticTokens: {
		colors: {
			// Brand
			primary: 'purple.500',

			// Feedback
			error: 'red.500',
			success: 'green.500',
		},
	},
});
