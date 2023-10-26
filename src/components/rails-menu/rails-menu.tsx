import { BoxProps } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';

interface RailMenuProps extends PropsWithChildren, BoxProps {}

export const RailMenu: FC<RailMenuProps> = ({ children }) => {
	return <>{children}</>;
};
