import { Box } from '@chakra-ui/react';
import { UserButton } from '@clerk/clerk-react';
import { FC } from 'react';

import {
	Rail,
	RailBottom,
	RailContent,
	RailGroup,
	RailIcon,
	RailLink,
	RailTop,
} from '@/components/rail';

import { HomeIcon, UserIcon } from '../icon';

export const Navbar: FC = () => {
	return (
		<Rail as="nav">
			<RailTop>
				<RailIcon>
					{/* TODO: Add logo */}
					<Box w="full" h="full" bg="purple.500" borderRadius="lg" />
				</RailIcon>
			</RailTop>

			<RailContent>
				<RailGroup label="Home">
					<RailLink label="Home" to="/">
						<HomeIcon />
					</RailLink>

					<RailLink label="Profile" to="/profile">
						<UserIcon />
					</RailLink>
				</RailGroup>
			</RailContent>

			<RailBottom>
				<UserButton />
			</RailBottom>
		</Rail>
	);
};
