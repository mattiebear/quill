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
			primary: {
				default: 'purple.500',
			},
			secondary: {
				default: 'blue.400',
			},

			// Feedback
			error: {
				default: 'red.500',
			},
			success: {
				default: 'green.500',
			},
			alert: {
				default: 'red.500',
			},

			// Background
			background: {
				base: {
					default: 'gray.900',
				},
				cover: {
					default: 'gray.800',
				},
				float: {
					default: 'gray.700',
				},
			},

			// Button
			button: {
				cta: {
					light: {
						default: 'white',
					},
					active: {
						default: 'purple.300',
					},
				},
			},

			// Typography
			text: {
				body: {
					default: 'gray.200',
				},
				cover: {
					muted: {
						default: 'gray.600',
					},
					peek: {
						default: 'gray.500',
					},
					shine: {
						default: 'gray.400',
					},
					focus: {
						default: 'gray.200',
					},
				},
				form: {
					input: {
						default: 'gray.200',
					},
					label: {
						default: 'gray.300',
					},
				},
				link: {
					active: {
						default: 'purple.300',
					},
				},
				heading: {
					default: 'gray.300',
				},
				table: {
					default: 'gray.200',
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
