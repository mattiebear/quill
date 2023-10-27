import { Box, BoxProps } from '@chakra-ui/react';
import { Children, FC, PropsWithChildren } from 'react';

import { RailMenuContext, RailMenuItemContext } from './context';
import { RailMenuFrame } from './rail-menu-frame';
import { useRailMenu } from './use-rail-menu';

interface RailMenuProps extends PropsWithChildren, BoxProps {}

/*
NEEDS

on click item, check if it has children. If it does, display another frame
active item needs to be stored in state if it's the last one
otherwise menu can control own state

*/

export const RailMenu: FC<RailMenuProps> = ({ children }) => {
	const menu = useRailMenu();

	return (
		<RailMenuContext value={menu}>
			<Box position="relative" ref={menu.containerRef}>
				<RailMenuFrame>
					{Children.map(children, (child, index) => {
						return (
							<RailMenuItemContext value={{ level: 0, index }}>
								{child}
							</RailMenuItemContext>
						);
					})}
				</RailMenuFrame>
			</Box>
		</RailMenuContext>
	);
};
