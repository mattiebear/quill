import { Box, Center, Grid } from '@chakra-ui/react';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { withAuthRequired } from '@/lib/auth/with-auth-required';

import { Navbar } from '../navbar';

export const MainLayout: FC = () => {
	return (
		<Center bg="background.base" h="full" p={2}>
			<Box flexGrow={1} h="full" maxW="container.xl">
				<Grid h="full" templateColumns="6rem 1fr">
					<Navbar />

					<Box as="main">
						<Outlet />
					</Box>
				</Grid>
			</Box>
		</Center>
	);
};

export const AuthMainLayout = withAuthRequired(MainLayout);
