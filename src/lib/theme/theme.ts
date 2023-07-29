import { extendTheme } from '@chakra-ui/react';

import { Tooltip } from './tooltip';

export const theme = extendTheme({
	fonts: {
		body: `'Poppins', sans-serif`,
		heading: `'Poppins', sans-serif`,
	},
	semanticTokens: {
		colors: {
			// Brand
			primary: 'purple.500',
			secondary: 'blue.400',

			// Feedback
			error: 'red.500',
			success: 'green.500',

			// Background
			background: {
				base: 'gray.900',
				cover: 'gray.800',
				float: 'gray.700',
			},

			// Button
			button: {
				cta: {
					light: 'white',
					active: 'purple.300',
				},
			},

			// Typography
			text: {
				body: {
					default: 'gray.200',
				},
				cover: {
					muted: 'gray.600',
					peek: 'gray.500',
					focus: 'gray.200',
				},
				form: {
					input: 'gray.200',
					label: 'gray.300',
				},
				link: {
					active: 'purple.300',
				},
				heading: {
					default: 'gray.300',
				},
			},
		},
	},
	styles: {
		global: {
			'html, body': {
				fontFamily: 'body',
				h: 'full',
			},
			'#root': {
				h: 'full',
			},
		},
	},
	components: {
		Tooltip,
	},
});
