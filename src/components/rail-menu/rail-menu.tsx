import { Box } from '@chakra-ui/react';
import { Children, FC, PropsWithChildren } from 'react';

import { RailMenuContext, RailMenuItemContext } from './context';
import { RailMenuBindings } from './rail-menu-bindings';
import { RailMenuFrame } from './rail-menu-frame';
import { useRailMenu } from './use-rail-menu';

interface RailMenuProps extends PropsWithChildren {
	onSelect?: (action?: string) => void;
	resetOnEscape?: boolean;
}

export const RailMenu: FC<RailMenuProps> = ({
	children,
	onSelect,
	resetOnEscape = false,
}) => {
	const menu = useRailMenu({ onSelect, resetOnEscape });

	return (
		<RailMenuContext value={menu}>
			<RailMenuBindings items={children}>
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
			</RailMenuBindings>
		</RailMenuContext>
	);
};
