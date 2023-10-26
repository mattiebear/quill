import { BoxProps, Flex, Tooltip } from '@chakra-ui/react';
import { cloneElement, FC, PropsWithChildren, ReactElement } from 'react';

interface RailMenuItemProps extends PropsWithChildren, BoxProps {
	icon: ReactElement;
	label: string;
}

export const RailMenuItem: FC<RailMenuItemProps> = ({ icon, label }) => {
	// TODO: Get from menu state
	const isActive = false;

	return (
		<Flex
			as="button"
			borderRightColor={isActive ? 'text.link.active' : 'transparent'}
			borderRightStyle="solid"
			borderRightWidth={2}
			color={isActive ? 'text.cover.focus' : 'text.cover.peek'}
			cursor="pointer"
			justify="center"
			px={2}
			transitionDuration="normal"
			transitionProperty="common"
			_hover={{
				color: 'text.cover.shine',
				_active: {
					color: 'text.cover.focus',
				},
			}}
			// @ts-ignore
			{...(isActive && { ['data-active']: true })}
		>
			<Tooltip label={label} gutter={12} placement="right" openDelay={500}>
				{cloneElement(icon, { boxSize: 6 })}
			</Tooltip>
		</Flex>
	);
};
