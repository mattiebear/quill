import { Box, Flex, StyleProps, Tooltip } from '@chakra-ui/react';
import { FC, ReactElement, cloneElement } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

interface RailLinkProps extends Pick<NavLinkProps, 'to'>, StyleProps {
	children: ReactElement;
	label: string;
	to: string;
}

export const RailLink: FC<RailLinkProps> = ({
	children,
	label,
	to,
	...rest
}) => {
	return (
		<Box as={NavLink} to={to} {...rest}>
			{({ isActive }: { isActive: boolean }) => {
				return (
					<Box py={4}>
						<Flex
							borderLeftColor={isActive ? 'text.link.active' : 'transparent'}
							borderLeftStyle="solid"
							borderLeftWidth={2}
							color={isActive ? 'text.cover.focus' : 'text.cover.muted'}
							justify="center"
							transitionDuration="normal"
							transitionProperty="common"
							_hover={{
								color: 'text.cover.peek',
								_active: {
									color: 'text.cover.focus',
								},
							}}
							{...(isActive && { ['data-active']: true })}
						>
							<Tooltip label={label} placement="right">
								{cloneElement(children, { boxSize: 6 })}
							</Tooltip>
						</Flex>
					</Box>
				);
			}}
		</Box>
	);
};
