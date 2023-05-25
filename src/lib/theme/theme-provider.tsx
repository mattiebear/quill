import { PropsWithChildren, FC } from 'react';
import { ChakraProvider } from '@chakra-ui/react'

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
	return <ChakraProvider>{children}</ChakraProvider>;
}
