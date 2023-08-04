import { Box } from '@chakra-ui/react';
import { UserButton } from '@clerk/clerk-react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { CountBadge } from '@/components/counter';
import { useConnections } from '@/components/friends';
import { HomeIcon, MapIcon, UserGroupIcon } from '@/components/icon';
import {
	Rail,
	RailBottom,
	RailContent,
	RailGroup,
	RailIcon,
	RailLink,
	RailTop,
} from '@/components/rail';

export const Navbar: FC = () => {
	const { t } = useTranslation();
	const { pendingConnections } = useConnections();

	return (
		<Rail as="nav">
			<RailTop>
				<RailIcon>
					{/* TODO: Add logo */}
					<Box w="full" h="full" bg="purple.500" borderRadius="3xl" />
				</RailIcon>
			</RailTop>

			<RailContent>
				<RailGroup label={t('navigation.groupAssets')}>
					<RailLink label={t('navigation.home')} to="/">
						<HomeIcon />
					</RailLink>

					<RailLink label={t('navigation.maps')} to="/maps">
						<MapIcon />
					</RailLink>

					<RailLink label={t('navigation.friends')} to="/friends">
						<CountBadge count={pendingConnections.length}>
							<UserGroupIcon />
						</CountBadge>
					</RailLink>
				</RailGroup>
			</RailContent>

			<RailBottom>
				<UserButton />
			</RailBottom>
		</Rail>
	);
};
