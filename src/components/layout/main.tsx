import { Box, Grid } from '@chakra-ui/react';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { withAuthRequired } from '@/lib/auth';

import { Navbar } from '../navbar';

export const MainLayout: FC = () => {
	return (
		<Grid
			bg="background.base"
			p={2}
			h="full"
			columnGap={6}
			templateColumns="6rem 1fr"
		>
			<Navbar />

			<Box as="main">
				<Outlet />
			</Box>
		</Grid>
	);
};

export const AuthMainLayout = withAuthRequired(MainLayout);
