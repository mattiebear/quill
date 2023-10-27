import { Flex, Portal, SlideFade, Tooltip } from '@chakra-ui/react';
import {
	Children,
	cloneElement,
	FC,
	PropsWithChildren,
	ReactElement,
} from 'react';

import {
	RailMenuItemContext,
	useRailMenuContext,
	useRailMenuItemContext,
} from './context';
import { RailMenuFrame } from './rail-menu-frame';
import { useKeyBinding } from './use-key-binding';

interface RailMenuItemProps extends PropsWithChildren {
	action?: string;
	icon: ReactElement;
	keyBinding?: string;
	label: string;
}

export const RailMenuItem: FC<RailMenuItemProps> = ({
	action,
	children,
	icon,
	keyBinding,
	label,
}) => {
	const { location } = useRailMenuItemContext();
	const { containerRef, getFrameProps, getIsActive, selectItem } =
		useRailMenuContext();

	useKeyBinding(keyBinding, location, action);

	const isActive = getIsActive(location);
	const tooltipLabel = keyBinding ? `${label} (${keyBinding})` : label;

	return (
		<>
			<Flex
				as="button"
				borderRightColor={isActive ? 'menu.active' : 'transparent'}
				borderRightStyle="solid"
				borderRightWidth={2}
				color={isActive ? 'text.cover.focus' : 'text.cover.peek'}
				cursor="pointer"
				justify="center"
				onClick={() => selectItem(location, action)}
				px={2}
				transitionDuration="normal"
				transitionProperty="common"
				_hover={{
					color: 'text.cover.shine',
					_active: {
						color: 'text.cover.focus',
					},
				}}
				{...(isActive && { ['data-active']: true })}
			>
				<Tooltip
					label={tooltipLabel}
					gutter={12}
					placement="right"
					openDelay={800}
				>
					{cloneElement(icon, { boxSize: 6 })}
				</Tooltip>
			</Flex>

			{children && (
				<Portal containerRef={containerRef}>
					<SlideFade in={isActive} unmountOnExit>
						<RailMenuFrame {...getFrameProps(location.length)}>
							{Children.map(children, (child, index) => {
								return (
									<RailMenuItemContext
										value={{ location: [...location, index] }}
									>
										{child}
									</RailMenuItemContext>
								);
							})}
						</RailMenuFrame>
					</SlideFade>
				</Portal>
			)}
		</>
	);
};
