import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
	radii: {
		none: '0',
		sm: '0.75rem',
		base: '1rem',
		md: '1.25rem',
		lg: '1.5rem',
		full: '9999px',
	},
	semanticTokens: {
		colors: {
			// Brand
			primary: 'purple.500',

			// Feedback
			error: 'red.500',
			success: 'green.500',

			// Background
			background: {
				base: 'gray.900',
				cover: 'gray.800',
			},

			// Typography
			text: {
				body: {
					default: 'gray.200',
				},
				cover: {
					muted: 'gray.600',
					focus: 'gray.200',
				},
				link: {
					active: 'purple.300',
				},
			},
		},
	},
	styles: {
		global: {
			'html, body': {
				h: 'full',
			},
			'#root': {
				h: 'full',
			},
		},
	},
});
