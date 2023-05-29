import './fonts';

import { ChakraProvider } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';

import { theme } from './theme';

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
	return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};
