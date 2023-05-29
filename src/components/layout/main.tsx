import { Box, Center, Grid } from '@chakra-ui/react';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { withAuthRequired } from '@/lib/auth';

import { Navbar } from '../navbar';

export const MainLayout: FC = () => {
	return (
		<Center bg="background.base" h="full" p={2}>
			<Box flexGrow={1} h="full" maxW="container.xl">
				<Grid h="full" columnGap={2} templateColumns="6rem 1fr">
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
