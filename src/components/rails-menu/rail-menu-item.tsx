import { BoxProps, Flex, Portal, SlideFade, Tooltip } from '@chakra-ui/react';
import {
	Children,
	cloneElement,
	FC,
	PropsWithChildren,
	ReactElement,
} from 'react';

import { RailMenuFrame } from '.';
import {
	RailMenuItemContext,
	useRailMenuContext,
	useRailMenuItemContext,
} from './context';

interface RailMenuItemProps extends PropsWithChildren, BoxProps {
	icon: ReactElement;
	label: string;
}

export const RailMenuItem: FC<RailMenuItemProps> = ({
	children,
	icon,
	label,
}) => {
	const { level, index } = useRailMenuItemContext();
	const { containerRef, getFrameProps, getIsActive, selectItem } =
		useRailMenuContext();

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
				<Tooltip label={label} gutter={12} placement="right" openDelay={500}>
					{cloneElement(icon, { boxSize: 6 })}
				</Tooltip>
			</Flex>

			{children && (
				<Portal containerRef={containerRef}>
					<SlideFade in={isActive}>
						<RailMenuFrame {...getFrameProps(level + 1)}>
							{Children.map(children, (child, index) => {
								return (
									<RailMenuItemContext value={{ level: level + 1, index }}>
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
