import { Box } from '@chakra-ui/react';
import { Children, FC, PropsWithChildren } from 'react';

import { RailMenuContext, RailMenuItemContext } from './context';
import { RailMenuFrame } from './rail-menu-frame';
import { useRailMenu } from './use-rail-menu';

interface RailMenuProps extends PropsWithChildren {
	onSelect?: (action: string) => void;
}

export const RailMenu: FC<RailMenuProps> = ({ children, onSelect }) => {
	const menu = useRailMenu({ onSelect });

	return (
		<RailMenuContext value={menu}>
			<Box position="relative" ref={menu.containerRef}>
				<RailMenuFrame>
					{Children.map(children, (child, index) => {
						return (
							<RailMenuItemContext value={{ location: [index] }}>
								{child}
							</RailMenuItemContext>
						);
					})}
				</RailMenuFrame>
			</Box>
		</RailMenuContext>
	);
};
