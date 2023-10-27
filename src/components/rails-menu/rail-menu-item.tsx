import { BoxProps, Flex, Portal, SlideFade, Tooltip } from '@chakra-ui/react';
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

interface RailMenuItemProps extends PropsWithChildren, BoxProps {
	icon: ReactElement;
	keyBinding?: string;
	label: string;
}

export const RailMenuItem: FC<RailMenuItemProps> = ({
	children,
	icon,
	keyBinding,
	label,
}) => {
	const { level, location, index } = useRailMenuItemContext();
	const { containerRef, getFrameProps, getIsActive, selectItem } =
		useRailMenuContext();

	useKeyBinding(keyBinding, location);

	const isActive = getIsActive(level, index);

	return (
		<>
			<Flex
				as="button"
				borderRightColor={isActive ? 'text.link.active' : 'transparent'}
				borderRightStyle="solid"
				borderRightWidth={2}
				color={isActive ? 'text.cover.focus' : 'text.cover.peek'}
				cursor="pointer"
				justify="center"
				onClick={() => selectItem(level, index)}
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
				<Tooltip label={label} gutter={12} placement="right" openDelay={1500}>
					{cloneElement(icon, { boxSize: 6 })}
				</Tooltip>
			</Flex>

			{children && (
				<Portal containerRef={containerRef}>
					<SlideFade in={isActive}>
						<RailMenuFrame {...getFrameProps(level + 1)}>
							{Children.map(children, (child, index) => {
								return (
									<RailMenuItemContext
										value={{
											level: level + 1,
											index,
											location: [...location, index],
										}}
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
