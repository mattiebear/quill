import { Box, Flex, StyleProps } from '@chakra-ui/react';
import { FC, ReactElement, cloneElement } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

interface RailLinkProps extends Pick<NavLinkProps, 'to'>, StyleProps {
	children: ReactElement;
	title: string;
	to: string;
}

export const RailLink: FC<RailLinkProps> = ({ children, to, ...rest }) => {
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
							{cloneElement(children, { boxSize: 6 })}
						</Flex>
					</Box>
				);
			}}
		</Box>
	);
};
