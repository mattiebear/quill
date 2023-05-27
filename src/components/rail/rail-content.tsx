import { Box } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';

export const RailContent: FC<PropsWithChildren> = ({ children }) => {
	return <Box flexGrow={1}>{children}</Box>;
};
